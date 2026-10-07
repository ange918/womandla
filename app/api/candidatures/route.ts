import { candidatureSchema } from "@/lib/validators";
import { createCandidature } from "@/services/candidatures";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) return Response.json({ error: "Formulaire illisible." }, { status: 400 });

  const raw = form.get("payload");
  if (typeof raw !== "string") return Response.json({ error: "Candidature manquante." }, { status: 400 });

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return Response.json({ error: "JSON invalide." }, { status: 400 });
  }

  const parsed = candidatureSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Candidature invalide." }, { status: 400 });
  }

  const audio = form.get("audio");
  const piece = form.get("piece");
  const audioFile = audio instanceof File && audio.size > 0 ? audio : null;
  const pieceFile = piece instanceof File && piece.size > 0 ? piece : null;
  if ((audioFile && audioFile.size > MAX_BYTES) || (pieceFile && pieceFile.size > MAX_BYTES)) {
    return Response.json({ error: "Chaque fichier doit faire moins de 8 Mo." }, { status: 413 });
  }

  try {
    const record = await createCandidature(parsed.data, { audio: audioFile, piece: pieceFile });
    return Response.json(record);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Enregistrement impossible.";
    return Response.json({ error: message }, { status: 500 });
  }
}
