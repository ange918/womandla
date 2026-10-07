import { ButtonLink, Container, EmptyState } from "@/components/site/ui";

export default function ArticleNotFound() {
  return (
    <Container className="py-20">
      <EmptyState
        title="Cet article n’existe pas."
        text="Aucun contenu n’est publié à cette adresse. Revenez au journal ou proposez un sujet à l’équipe."
      />
      <div className="mt-6">
        <ButtonLink href="/actualites" variant="primary">
          Retour aux actualités
        </ButtonLink>
      </div>
    </Container>
  );
}
