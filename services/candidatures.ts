import { buildDossierNumber, normalizePhone, phonesMatch } from "@/lib/dossier";
import { getSupabaseAdmin } from "@/lib/supabase";
import { candidatureSchema, type CandidatureInput } from "@/lib/validators";

const BUCKET = "candidatures-pieces";

export type CandidatureRecord = {
  numero_dossier: string;
  statut: string;
  persisted: boolean;
  piecesEnregistrees: boolean;
  prenom: string;
  commune: string;
  entretien_at: string | null;
  evenements: { type: string; message: string | null; statut: string | null; created_at: string }[];
};

async function uploadFile(
  supabase: NonNullable<ReturnType<typeof getSupabaseAdmin>>,
  numero: string,
  file: File,
  kind: "audio" | "piece",
) {
  const safeName = file.name.replace(/[^\w.\-]+/g, "_").slice(0, 80);
  const path = `${numero}/${kind}-${Date.now()}-${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (error) throw new Error(error.message);
  return path;
}

export async function createCandidature(input: CandidatureInput, files: { audio?: File | null; piece?: File | null }) {
  const parsed = candidatureSchema.parse(input);
  const supabase = getSupabaseAdmin();
  let numero = buildDossierNumber(parsed.commune);
  const now = new Date().toISOString();

  if (!supabase) {
    return {
      persisted: false,
      piecesEnregistrees: false,
      numero_dossier: numero,
      statut: "recue",
      prenom: parsed.prenom,
      commune: parsed.commune,
      entretien_at: null,
      evenements: [
        {
          type: "statut",
          statut: "recue",
          message: "Dossier préparé dans le navigateur. Supabase n’est pas configuré : il n’est pas enregistré sur le serveur.",
          created_at: now,
        },
      ],
    } satisfies CandidatureRecord;
  }

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const { data: existing } = await supabase
      .from("candidatures")
      .select("id")
      .eq("numero_dossier", numero)
      .maybeSingle();
    if (!existing) break;
    numero = buildDossierNumber(parsed.commune);
  }

  let audioPath: string | null = null;
  let piecePath: string | null = null;
  if (files.audio && files.audio.size > 0) audioPath = await uploadFile(supabase, numero, files.audio, "audio");
  if (files.piece && files.piece.size > 0) piecePath = await uploadFile(supabase, numero, files.piece, "piece");

  const row = {
    numero_dossier: numero,
    prenom: parsed.prenom,
    nom: parsed.nom,
    date_naissance: parsed.dateNaissance,
    telephone: normalizePhone(parsed.telephone),
    whatsapp: parsed.whatsapp ? normalizePhone(parsed.whatsapp) : null,
    email: parsed.email || null,
    langue: parsed.langue,
    canal_prefere: parsed.canal,
    commune: parsed.commune,
    quartier: parsed.quartier,
    situation_familiale: parsed.situation,
    nb_enfants: parsed.nbEnfants,
    besoin_garde: parsed.besoinGarde === "oui",
    niveau: parsed.niveau,
    filiere: parsed.filiere,
    experience: parsed.experience || null,
    disponibilite: parsed.disponibilite,
    motivation: parsed.motivation || null,
    motivation_audio_path: audioPath,
    piece_path: piecePath,
    source: parsed.source,
    statut: "recue",
    consentement_donnees_at: now,
    consentement_whatsapp_at: parsed.consentementWhatsapp ? now : null,
    consentement_image_at: parsed.consentementImage ? now : null,
  };

  const { data, error } = await supabase.from("candidatures").insert(row).select("id, numero_dossier, statut, prenom, commune, entretien_at").single();
  if (error || !data) throw new Error(error?.message ?? "Insertion impossible.");

  await supabase.from("candidature_evenements").insert({
    candidature_id: data.id,
    type: "statut",
    statut: "recue",
    message: "Candidature reçue.",
  });

  return {
    persisted: true,
    piecesEnregistrees: Boolean(audioPath || piecePath) || (!files.audio && !files.piece),
    numero_dossier: data.numero_dossier,
    statut: data.statut,
    prenom: data.prenom,
    commune: data.commune,
    entretien_at: data.entretien_at,
    evenements: [
      { type: "statut", statut: "recue", message: "Candidature reçue.", created_at: now },
    ],
  } satisfies CandidatureRecord;
}

export async function findCandidature(numero: string, telephone: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { configured: false as const, record: null };

  const { data, error } = await supabase
    .from("candidatures")
    .select("id, numero_dossier, statut, prenom, commune, entretien_at, telephone, candidature_evenements(type, message, statut, created_at)")
    .eq("numero_dossier", numero.toUpperCase())
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data || !phonesMatch(data.telephone, telephone)) {
    return { configured: true as const, record: null };
  }

  const evenements = Array.isArray(data.candidature_evenements) ? data.candidature_evenements : [];
  evenements.sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)));

  return {
    configured: true as const,
    record: {
      persisted: true,
      piecesEnregistrees: true,
      numero_dossier: data.numero_dossier,
      statut: data.statut,
      prenom: data.prenom,
      commune: data.commune,
      entretien_at: data.entretien_at,
      evenements,
    } satisfies CandidatureRecord,
  };
}
