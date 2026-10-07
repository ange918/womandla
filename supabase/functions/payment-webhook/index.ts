import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (request) => {
  const stripeSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  const fedapaySecret = Deno.env.get("FEDAPAY_WEBHOOK_SECRET");
  const kkiapaySecret = Deno.env.get("KKIAPAY_SECRET");
  if (!stripeSecret && !fedapaySecret && !kkiapaySecret) {
    return new Response(
      JSON.stringify({
        enabled: false,
        message: "Aucun secret de webhook. L’événement est ignoré, aucun don n’est marqué payé.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  const payload = await request.text();
  return new Response(
    JSON.stringify({
      enabled: true,
      status: "stub",
      receivedBytes: payload.length,
      message: "Secret présent. Vérifier la signature puis mettre à jour public.dons.statut. Non implémenté dans ce stub.",
    }),
    { headers: { "Content-Type": "application/json" } },
  );
});
