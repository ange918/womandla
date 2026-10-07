import type { Metadata } from "next";
import { Suspense } from "react";
import SuiviCandidature from "@/components/postuler/SuiviCandidature";
import { Container, PageHero } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Suivre ma candidature",
  description: "Consulter le statut d’une candidature WOMANDLA avec le numéro de dossier et le téléphone.",
};

export default function SuiviPage() {
  return (
    <>
      <PageHero
        eyebrow="Suivi"
        title="Où en est votre dossier ?"
        text="La recherche croise le numéro de dossier et le téléphone. La table des candidatures n’est pas lisible publiquement."
      />
      <section className="py-12">
        <Container>
          <Suspense fallback={<p>Chargement du suivi…</p>}>
            <SuiviCandidature />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
