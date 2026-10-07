import { isSupabaseConfigured } from "@/lib/env";
import { getSupabaseAdmin } from "@/lib/supabase";
import { newsletterSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "E-mail invalide." }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return Response.json({ persisted: false });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase!.from("newsletter_inscriptions").upsert(
    { email: parsed.data.email.toLowerCase() },
    { onConflict: "email" },
  );
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ persisted: true });
}
