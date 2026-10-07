"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ButtonLink, Card, Container } from "@/components/site/ui";
import { useSessionJson } from "@/lib/session";
import { formatFcfa, fr } from "@/lib/utils";

type Stored = {
  reference: string;
  persisted: boolean;
  payment: { message: string; status: string; enabled: boolean };
  don: { type: string; montant: number; nom: string; email: string; moyen: string };
};

function Confirmation() {
  const params = useSearchParams();
  const ref = params.get("ref");
  const saved = useSessionJson<Stored>("womandla-don");
  const stored = saved && (!ref || saved.reference === ref) ? saved : null;

  return (
    <Container className="py-16">
      <Card className="mx-auto max-w-2xl p-8">
        <p className="eyebrow text-primary">Confirmation</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold">Intention de don enregistrée</h1>
        <p className="mt-4 font-display text-2xl font-extrabold text-primary">{stored?.reference ?? ref ?? "Référence indisponible"}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {stored?.payment.message ??
            "Le détail de cette session n’est plus dans le navigateur. Aucun paiement n’est confirmé sans message du prestataire."}
        </p>
        {stored ? (
          <dl className="mt-6 grid gap-2 text-sm">
            <div className="flex justify-between gap-4 border-b border-line py-2">
              <dt>Montant</dt>
              <dd className="font-bold">{formatFcfa(stored.don.montant)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-line py-2">
              <dt>Type</dt>
              <dd className="font-bold">{stored.don.type}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-line py-2">
              <dt>Moyen</dt>
              <dd className="font-bold">{stored.don.moyen}</dd>
            </div>
            <div className="flex justify-between gap-4 py-2">
              <dt>Reçu e-mail</dt>
              <dd className="font-bold">{stored.payment.enabled ? "Stub, non envoyé" : "Non envoyé"}</dd>
            </div>
          </dl>
        ) : null}
        <p className="mt-4 text-xs text-muted">
          {stored?.persisted
            ? "La ligne est enregistrée dans Supabase avec le statut d’intention."
            : fr("Supabase n’est pas configuré : la référence vit dans cette session de navigateur uniquement.")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/don?type=mensuel" variant="sun">
            Voir le don mensuel
          </ButtonLink>
          <Link href="/" className="inline-flex items-center text-sm font-bold text-primary">
            Retour à l’accueil
          </Link>
        </div>
      </Card>
    </Container>
  );
}

export default function DonConfirmationPage() {
  return (
    <Suspense fallback={<Container className="py-16">Chargement…</Container>}>
      <Confirmation />
    </Suspense>
  );
}
