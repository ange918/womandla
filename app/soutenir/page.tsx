import type { Metadata } from "next";
import { ButtonLink, Card, Container, PageHero } from "@/components/site/ui";
import { documents, supportBenefits, supportOptions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Soutenir",
  description: "Dons, parrainage et partenariats pour WOMANDLA.",
};

export default function SoutenirPage() {
  return (
    <>
      <PageHero
        eyebrow="Soutenir"
        title="Ensemble, accélérons l’autonomisation des jeunes femmes."
        text="Les trois façons de soutenir déjà publiées sur le site sont conservées. Le paiement en ligne est branché sur le nouveau parcours, sans débit tant que les clés manquent."
        actions={<ButtonLink href="/don" variant="sun">Faire un don</ButtonLink>}
      />
      <section className="bg-white py-16">
        <Container>
          <h2 className="text-center font-display text-3xl font-extrabold">Pourquoi nous soutenir ?</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {supportBenefits.map((item) => (
              <Card key={item.title} className="p-6">
                <h3 className="font-display text-xl font-extrabold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
      <section className="py-16">
        <Container className="grid gap-4 lg:grid-cols-3">
          {supportOptions.map((item) => (
            <Card key={item.title} className="flex flex-col p-6">
              <h2 className="font-display text-2xl font-extrabold">{item.title}</h2>
              <p className="mt-3 flex-1 text-sm text-muted">{item.text}</p>
              <ButtonLink href={item.href} variant={item.title === "Parrainage" ? "sun" : "primary"} className="mt-6">
                {item.cta}
              </ButtonLink>
            </Card>
          ))}
        </Container>
      </section>
      <section className="bg-soft py-14">
        <Container className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-extrabold">Dossier de partenariat</h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Téléchargez notre brochure détaillée pour comprendre nos besoins, nos axes d’intervention et les avantages fiscaux liés à votre soutien.
            </p>
            <p className="mt-2 text-xs text-muted">Le fichier PDF n’est pas dans le repo ({documents[5]}). Le bouton de l’ancienne page ne menait à aucun document.</p>
          </div>
          <ButtonLink href="/contact?profil=partenaire" variant="primary">Demander le dossier</ButtonLink>
        </Container>
      </section>
    </>
  );
}
