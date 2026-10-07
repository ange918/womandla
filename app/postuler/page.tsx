import type { Metadata } from "next";
import FaqAccordion from "@/components/site/FaqAccordion";
import { ButtonLink, Card, Container, EmptyState, PageHero } from "@/components/site/ui";
import { activities, faq, filieres, howItWorks, org } from "@/lib/content";
import { fr } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Se faire accompagner",
  description: "Candidature au programme WOMANDLA : critères publiés, formulaire en 5 étapes et suivi de dossier.",
};

const steps = [
  "Déposer le dossier en ligne, ou via la mairie de votre commune.",
  "Recevoir un numéro de dossier.",
  "Attendre l’étude du dossier. Aucune convocation n’est envoyée tant que l’équipe ne l’a pas saisie.",
  "Si le dossier est retenu, rejoindre une formation prise en charge.",
];

export default function PostulerPage() {
  return (
    <>
      <PageHero
        eyebrow="Se faire accompagner"
        title="Rejoignez le programme d’autonomisation."
        text="Devenez actrice du changement et bénéficiez d’un accompagnement tel que le site le décrit déjà : formation, incubation et suivi."
        actions={
          <>
            <ButtonLink href="/postuler/formulaire" variant="sun">Commencer la candidature</ButtonLink>
            <ButtonLink href="/postuler/suivi" variant="ghost">Suivre ma candidature</ButtonLink>
          </>
        }
      />

      <section className="bg-white py-16">
        <Container className="grid gap-4 md:grid-cols-3">
          {howItWorks.slice(0, 3).map((item) => (
            <Card key={item.title} className="p-6">
              <p className="eyebrow text-gold-deep">{item.step}</p>
              <h2 className="mt-2 font-display text-xl font-extrabold">{item.title}</h2>
              <p className="mt-2 text-sm text-muted">{fr(item.text)}</p>
            </Card>
          ))}
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="font-display text-2xl font-extrabold">Qui peut postuler ?</h2>
            <p className="mt-3 text-muted">{fr(faq[1].a)}</p>
            <p className="mt-3 text-muted">{fr(faq[0].a)}</p>
            <p className="mt-3 text-muted">{fr(faq[2].a)}</p>
            <p className="mt-4 text-xs text-muted">
              Le formulaire vérifie l’âge 18-35 ans annoncé sur le site. Il ne prétend pas ouvrir une session datée : aucun calendrier de cohorte n’est publié.
            </p>
          </Card>
          <Card className="p-6">
            <h2 className="font-display text-2xl font-extrabold">Ce que le parcours comprend</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {activities.map((item) => (
                <li key={item} className="rounded-2xl bg-pale px-4 py-3 font-semibold">{item}</li>
              ))}
            </ul>
          </Card>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <h2 className="font-display text-3xl font-extrabold">Filières au choix</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {filieres.filter((item) => item.id !== "autre").map((item) => (
              <article key={item.id} className="overflow-hidden rounded-[22px] border border-line">
                <img src={item.image} alt="" className="h-40 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-display text-lg font-extrabold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="mb-6 font-display text-3xl font-extrabold">Étapes après l’envoi</h2>
          <ol className="grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step} className="rounded-[22px] bg-white p-5">
                <p className="font-display text-2xl font-extrabold text-primary">0{index + 1}</p>
                <p className="mt-2 text-sm leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <EmptyState
              title="Calendrier des sessions à publier"
              text="Aucune date de cohorte, aucun nombre de places et aucune clôture ne figurent dans le site actuel. Ils seront affichés ici dès qu’ils seront décidés."
            />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <h2 className="font-display text-3xl font-extrabold">Autres façons de postuler</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card className="p-5">
              <h3 className="font-bold">Mairie</h3>
              <p className="mt-2 text-sm text-muted">{fr(faq[0].a)}</p>
            </Card>
            <Card className="p-5">
              <h3 className="font-bold">Téléphone</h3>
              <p className="mt-2 text-sm text-muted">
                <a className="font-bold text-primary" href={`tel:${org.phone.replace(/\s/g, "")}`}>{org.phone}</a>
                <span className="mt-1 block">Numéro publié sur la page Contact. Le pied de page historique indiquait aussi {org.phoneFooterLegacy} : à unifier.</span>
              </p>
            </Card>
            <Card className="p-5">
              <h3 className="font-bold">E-mail</h3>
              <p className="mt-2 text-sm text-muted">
                <a className="font-bold text-primary" href={`mailto:${org.email}`}>{org.email}</a>
              </p>
            </Card>
          </div>
          <p className="mt-4 text-xs text-muted">
            Aucun numéro WhatsApp officiel n’est publié. Le formulaire peut recueillir le vôtre, sans promettre une réponse automatique.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-extrabold">Questions fréquentes</h2>
          <FaqAccordion items={faq} />
        </Container>
      </section>

      <section className="bg-dark py-14 text-white">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-extrabold">Préparez votre dossier</h2>
            <p className="mt-2 max-w-xl text-sm text-white/75">
              Identité, commune, filière et une motivation écrite ou vocale. La formation annoncée est gratuite : WOMANDLA ne demande pas de paiement pour candidater.
            </p>
          </div>
          <ButtonLink href="/postuler/formulaire" variant="sun">Commencer</ButtonLink>
        </Container>
      </section>
    </>
  );
}
