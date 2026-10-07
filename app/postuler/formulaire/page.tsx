import type { Metadata } from "next";
import { Suspense } from "react";
import CandidatureWizard from "@/components/postuler/CandidatureWizard";
import { Container, PageHero } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Candidature",
  description: "Formulaire de candidature WOMANDLA en cinq étapes.",
};

export default function FormulairePage() {
  return (
    <>
      <PageHero
        eyebrow="Candidature"
        title="Cinq étapes, un numéro de dossier."
        text="Le brouillon reste dans ce navigateur. L’enregistrement serveur et les pièces jointes ne partent que si Supabase est configuré."
      />
      <section className="py-10">
        <Container className="max-w-3xl">
          <Suspense fallback={<p>Chargement du formulaire…</p>}>
            <CandidatureWizard />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
