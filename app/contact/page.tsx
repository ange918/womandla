import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/contact/ContactForm";
import FaqAccordion from "@/components/site/FaqAccordion";
import { Card, Container, EmptyState, PageHero } from "@/components/site/ui";
import { faq, org } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter WOMANDLA à Cotonou.",
};

const profiles = [
  { title: "Jeune femme", text: "Pour une candidature, le formulaire dédié est plus complet.", href: "/postuler" },
  { title: "Don", text: "Le parcours de don ne débite rien sans prestataire configuré.", href: "/don" },
  { title: "Partenaire", text: "Institutions, entreprises et organisations internationales.", href: "/partenaires" },
  { title: "Presse", text: "Aucun kit média n’est déposé. Écrivez via le formulaire." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Une question ? Un projet ?"
        text="Notre équipe est à votre écoute pour construire l’avenir ensemble."
      />
      <section className="py-14">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {profiles.map((item) => (
                <Card key={item.title} className="p-4">
                  <h2 className="font-display text-lg font-extrabold">{item.title}</h2>
                  <p className="mt-1 text-sm text-muted">{item.text}</p>
                  {item.href ? (
                    <a href={item.href} className="mt-2 inline-block text-sm font-bold text-primary">
                      Continuer
                    </a>
                  ) : null}
                </Card>
              ))}
            </div>
            <Card className="p-6">
              <h2 className="font-display text-xl font-extrabold">Siège national</h2>
              <p className="mt-2 text-sm text-muted">
                {org.addressLines[0]}
                <br />
                {org.addressLines[1]}
              </p>
              <p className="mt-4 text-sm">
                <a className="font-bold text-primary" href={`mailto:${org.email}`}>{org.email}</a>
                <br />
                <a className="font-bold text-primary" href={`tel:${org.phone.replace(/\s/g, "")}`}>{org.phone}</a>
              </p>
              <p className="mt-3 text-xs text-muted">
                Le pied de page précédent affichait {org.phoneFooterLegacy}. Les deux numéros sont signalés, aucun n’a été remplacé par un numéro de maquette.
              </p>
            </Card>
            <EmptyState
              title="Carte et antennes à compléter"
              text="Aucune coordonnée GPS ni adresse d’antenne n’est publiée. Le siège indiqué reste celui de la page Contact actuelle."
            />
          </div>
          <Suspense fallback={<p>Chargement du formulaire…</p>}>
            <ContactForm />
          </Suspense>
        </Container>
      </section>
      <section className="bg-white py-14">
        <Container className="max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-extrabold">Questions fréquentes</h2>
          <FaqAccordion items={faq} />
        </Container>
      </section>
    </>
  );
}
