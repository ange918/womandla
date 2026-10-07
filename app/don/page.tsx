import type { Metadata } from "next";
import { Suspense } from "react";
import DonWizard from "@/components/don/DonWizard";
import { Container, PageHero } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Faire un don",
  description: "Parcours de don WOMANDLA en quatre étapes. Paiement désactivé tant que les clés ne sont pas configurées.",
};

export default function DonPage() {
  return (
    <>
      <PageHero
        eyebrow="Faire un don"
        title="Soutenir l’autonomisation des jeunes femmes."
        text="Quatre étapes : type de don, montant, coordonnées, puis choix du prestataire. Sans clé FedaPay, Kkiapay ou Stripe, aucun paiement n’est lancé."
      />
      <section className="py-12">
        <Container>
          <Suspense fallback={<p>Chargement du parcours…</p>}>
            <DonWizard />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
