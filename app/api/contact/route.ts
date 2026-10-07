import { isSupabaseConfigured } from "@/lib/env";
import { getSupabaseAdmin } from "@/lib/supabase";
import { contactSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Message invalide." }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return Response.json({
      persisted: false,
      message: "Supabase n’est pas configuré. Écrivez à contact@womandla.bj : le message n’a pas été stocké.",
    });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase!.from("messages_contact").insert({
    nom: parsed.data.nom,
    email: parsed.data.email,
    profil: parsed.data.profil,
    message: parsed.data.message,
    consentement_at: new Date().toISOString(),
  });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ persisted: true, message: "Message enregistré. L’équipe le lira depuis Supabase." });
}
