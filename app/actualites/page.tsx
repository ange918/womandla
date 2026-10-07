import type { Metadata } from "next";
import NewsletterForm from "@/components/site/NewsletterForm";
import { Container, EmptyState, PageHero } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Journal de WOMANDLA. Aucun article n’est publié pour le moment.",
};

export default function ActualitesPage() {
  return (
    <>
      <PageHero
        eyebrow="Actualités"
        title="Le journal sera alimenté par l’équipe."
        text="Aucun article, dossier de presse ni événement daté n’est présent dans le site actuel."
      />
      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <EmptyState
            title="Aucun article à la une."
            text="La recherche, les filtres et la pagination s’activeront quand des articles réels seront ajoutés dans lib/articles.ts. Les titres des maquettes n’ont pas été inventés."
          />
          <div className="rounded-[22px] bg-dark p-6 text-white">
            <h2 className="font-display text-2xl font-extrabold">Newsletter</h2>
            <p className="mt-2 mb-4 text-sm text-white/70">Une adresse, aucun envoi tant que la messagerie n’est pas branchée.</p>
            <NewsletterForm />
          </div>
        </Container>
      </section>
      <section className="bg-white py-16">
        <Container className="grid gap-4 md:grid-cols-3">
          <EmptyState title="Agenda vide" text="Les prochaines dates seront publiées ici." />
          <EmptyState title="Espace presse" text="Aucun kit média n’est déposé dans le repo." />
          <EmptyState title="Réseaux sociaux" text="Les icônes du pied de page actuel n’avaient pas d’URL. Elles ne sont pas affichées." />
        </Container>
      </section>
    </>
  );
}
