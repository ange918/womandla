import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (request) => {
  const key = Deno.env.get("RESEND_API_KEY");
  const body = await request.json().catch(() => ({}));
  if (!key) {
    return new Response(
      JSON.stringify({
        enabled: false,
        message: "RESEND_API_KEY absente. Aucun reçu n’est envoyé.",
        to: body.email ?? null,
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(
    JSON.stringify({
      enabled: true,
      status: "stub",
      message: "Clé Resend détectée. L’appel à l’API d’envoi n’est pas branché dans ce stub.",
    }),
    { headers: { "Content-Type": "application/json" } },
  );
});
