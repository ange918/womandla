import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

function normalize(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("229")) return digits;
  return `229${digits}`;
}

Deno.serve(async (request) => {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) {
    return new Response(JSON.stringify({ configured: false, record: null }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json().catch(() => ({}));
  const numero = String(body.numero ?? "").toUpperCase();
  const telephone = String(body.telephone ?? "");
  if (!/^WMD-\d{2}-[A-Z]{3}-\d{4}$/.test(numero) || normalize(telephone).length < 11) {
    return new Response(JSON.stringify({ error: "Numéro ou téléphone invalide." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase
    .from("candidatures")
    .select("numero_dossier, statut, prenom, commune, entretien_at, telephone, candidature_evenements(type, message, statut, created_at)")
    .eq("numero_dossier", numero)
    .maybeSingle();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!data || normalize(data.telephone) !== normalize(telephone)) {
    return new Response(JSON.stringify({ configured: true, record: null }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const record = {
    numero_dossier: data.numero_dossier,
    statut: data.statut,
    prenom: data.prenom,
    commune: data.commune,
    entretien_at: data.entretien_at,
    candidature_evenements: data.candidature_evenements,
  };
  return new Response(JSON.stringify({ configured: true, record }), {
    headers: { "Content-Type": "application/json" },
  });
});
