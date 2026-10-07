import { suiviSchema } from "@/lib/validators";
import { findCandidature } from "@/services/candidatures";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = suiviSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Recherche invalide." }, { status: 400 });
  }

  try {
    const result = await findCandidature(parsed.data.numero, parsed.data.telephone);
    return Response.json({ configured: result.configured, record: result.record });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Recherche impossible.";
    return Response.json({ error: message }, { status: 500 });
  }
}
