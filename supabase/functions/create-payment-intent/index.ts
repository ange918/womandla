import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Content-Type": "application/json",
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: cors });

  const stripe = Deno.env.get("STRIPE_SECRET_KEY");
  const fedapay = Deno.env.get("FEDAPAY_SECRET_KEY");
  const kkiapay = Deno.env.get("KKIAPAY_PRIVATE_KEY");
  const body = await request.json().catch(() => ({}));
  const method = String(body.method ?? "");
  const ready =
    (method === "stripe" && Boolean(stripe)) ||
    (method === "fedapay" && Boolean(fedapay)) ||
    (method === "kkiapay" && Boolean(kkiapay));

  if (!ready) {
    return new Response(
      JSON.stringify({
        enabled: false,
        status: "paiement_desactive",
        message: "Clé absente. Aucun PaymentIntent n’est créé et aucun débit n’a lieu.",
      }),
      { status: 503, headers: cors },
    );
  }

  return new Response(
    JSON.stringify({
      enabled: true,
      status: "stub",
      providerRef: null,
      message:
        "Clé détectée. Brancher ici stripe.paymentIntents.create, FedaPay ou Kkiapay. Ce stub ne contacte pas le prestataire.",
    }),
    { headers: cors },
  );
});
