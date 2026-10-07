"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ButtonLink, Card, Container } from "@/components/site/ui";
import { useSessionJson } from "@/lib/session";

type Stored = {
  numero_dossier: string;
  prenom: string;
  persisted: boolean;
  piecesEnregistrees: boolean;
  email?: string;
};

function Confirmation() {
  const params = useSearchParams();
  const dossier = params.get("dossier");
  const saved = useSessionJson<Stored>("womandla-candidature");
  const stored = saved && (!dossier || saved.numero_dossier === dossier) ? saved : null;

  const numero = stored?.numero_dossier ?? dossier;

  return (
    <Container className="py-16">
      <Card className="mx-auto max-w-2xl p-8">
        <p className="eyebrow text-primary">Candidature</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold">
          {stored?.prenom ? `${stored.prenom}, votre dossier est préparé.` : "Votre dossier est préparé."}
        </h1>
        <p className="mt-6 font-display text-3xl font-extrabold text-primary">{numero ?? "Numéro indisponible"}</p>
        <p className="mt-2 text-sm text-muted">Conservez ce numéro avec le téléphone indiqué dans le formulaire.</p>
        <div className="mt-6 rounded-[18px] bg-sun-soft p-4 text-sm text-ink">
          La formation annoncée sur le site est gratuite. WOMANDLA ne demande aucun paiement, ni de code Mobile Money, pour une candidature. Méfiez-vous des messages qui exigeraient des frais.
        </div>
        <ul className="mt-6 space-y-3 text-sm">
          <li className="rounded-2xl bg-pale p-4">
            {stored?.persisted
              ? "Le dossier est enregistré dans Supabase, avec le statut « reçue »."
              : "Supabase n’est pas configuré : le dossier est conservé dans ce navigateur seulement. Branchez la base pour qu’il survive et soit consultable ailleurs."}
          </li>
          <li className="rounded-2xl bg-pale p-4">
            {stored && !stored.persisted
              ? "Les pièces et le message vocal n’ont pas été envoyés au serveur."
              : "Les fichiers joints, s’il y en avait, sont dans le bucket privé candidatures-pieces."}
          </li>
          <li className="rounded-2xl bg-pale p-4">
            Aucune date d’entretien n’est inventée. Elle apparaîtra dans le suivi quand l’équipe l’aura saisie.
          </li>
          <li className="rounded-2xl bg-pale p-4">
            Pas de reçu PDF automatique : aucun modèle validé n’est dans le repo.
            {stored?.email ? ` Un e-mail pourra partir vers ${stored.email} lorsque l’envoi sera branché.` : ""}
          </li>
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={`/postuler/suivi${numero ? `?dossier=${encodeURIComponent(numero)}` : ""}`} variant="primary">
            Suivre ce dossier
          </ButtonLink>
          <ButtonLink href="/" variant="secondary">Retour à l’accueil</ButtonLink>
        </div>
      </Card>
    </Container>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<Container className="py-16">Chargement…</Container>}>
      <Confirmation />
    </Suspense>
  );
}
