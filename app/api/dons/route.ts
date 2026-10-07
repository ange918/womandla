import { buildDonationReference } from "@/lib/dossier";
import { isSupabaseConfigured } from "@/lib/env";
import { getSupabaseAdmin } from "@/lib/supabase";
import { donationSchema } from "@/lib/validators";
import { createPaymentIntent, paymentStatusPayload } from "@/services/payments";

export async function GET() {
  return Response.json(paymentStatusPayload());
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = donationSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Don invalide." }, { status: 400 });
  }

  const reference = buildDonationReference();
  const payment = createPaymentIntent(parsed.data.moyen, reference);
  const statut = payment.enabled ? "intention_stub" : "paiement_desactive";
  let persisted = false;

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase!.from("dons").insert({
      reference,
      type: parsed.data.type,
      montant: parsed.data.montant,
      donateur_nom: parsed.data.nom,
      donateur_email: parsed.data.email,
      donateur_telephone: parsed.data.telephone || null,
      pays: parsed.data.pays,
      moyen: parsed.data.moyen,
      statut,
      provider_ref: payment.providerRef,
    });
    if (error) return Response.json({ error: error.message }, { status: 500 });
    persisted = true;
  }

  return Response.json({
    reference,
    persisted,
    payment,
    don: parsed.data,
  });
}
