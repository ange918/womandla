import type { Metadata } from "next";
import { ButtonLink, Card, Container, EmptyState, PageHero } from "@/components/site/ui";
import {
  activities,
  deployment,
  expectedResults,
  faq,
  filieres,
  globalObjective,
  howItWorks,
  methodology,
  objectives,
  solutions,
} from "@/lib/content";
import FaqAccordion from "@/components/site/FaqAccordion";
import { fr } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Formations, incubation et déploiement du programme WOMANDLA.",
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title="Une architecture d’intervention conçue pour des résultats concrets."
        text="Découvrez l’approche déjà décrite sur le site : formation technique, incubation et déploiement vers les 77 communes."
        actions={
          <>
            <ButtonLink href="/postuler" variant="sun">
              Se faire accompagner
            </ButtonLink>
            <ButtonLink href="/don" variant="primary">
              Soutenir un parcours
            </ButtonLink>
          </>
        }
      />

      <section className="bg-white py-16">
        <Container>
          <h2 className="font-display text-3xl font-extrabold">Méthodologie</h2>
          <p className="mt-4 max-w-3xl text-muted">{fr(methodology)}</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {howItWorks.map((step, index) => (
              <li key={step.title}>
                <Card className="h-full p-5">
                  <p className="font-display text-sm font-extrabold text-primary">0{index + 1}</p>
                  <p className="mt-2 font-display text-lg font-extrabold">{step.title}</p>
                  <p className="mt-2 text-sm text-muted">{fr(step.text)}</p>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-5 md:grid-cols-2">
          <Card className="border-l-8 border-l-primary p-8">
            <h2 className="font-display text-2xl font-extrabold">Objectif global</h2>
            <p className="mt-3 text-muted">{fr(globalObjective)}</p>
          </Card>
          <Card className="p-8">
            <h2 className="font-display text-2xl font-extrabold">Public accompagné</h2>
            <p className="mt-3 text-muted">{fr(faq[1].a)} {fr(faq[2].a)}</p>
          </Card>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <h2 className="font-display text-3xl font-extrabold">Filières publiées</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {filieres.filter((item) => item.id !== "autre").map((item) => (
              <article key={item.id} className="overflow-hidden rounded-[22px] border border-line bg-white">
                <img src={item.image} alt="" className="h-44 w-full object-cover" />
                <div className="p-5">
                  <h3 className="font-display text-xl font-extrabold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">Photos d’illustration libres, pas des ateliers WOMANDLA identifiés.</p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-extrabold">Objectifs</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {objectives.map((item) => (
                <li key={item} className="rounded-2xl bg-white p-4">{item}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">Les effectifs et pourcentages qui se contredisaient d’une page à l’autre ne sont plus affichés.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-extrabold">Résultats attendus</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {expectedResults.map((item) => (
                <li key={item} className="rounded-2xl bg-white p-4 text-ink">{item}</li>
              ))}
            </ul>
            <div className="mt-4">
              <EmptyState
                title="Pas de cible chiffrée"
                text="Les hausses de revenu, nombres de coopératives et autres résultats quantifiés seront publiés lorsqu’ils seront sourcés."
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-dark py-16 text-white">
        <Container>
          <h2 className="font-display text-3xl font-extrabold">Activités clés</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((activity) => (
              <div key={activity} className="rounded-2xl border border-white/15 p-4">
                <p className="font-bold">{activity}</p>
                <div className="mt-3 h-1 w-8 bg-gold" />
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-white/75">{deployment.pilotText}</p>
          <p className="mt-3 max-w-3xl text-sm text-white/75">{deployment.expansionText}</p>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <h2 className="mb-4 font-display text-2xl font-extrabold">Budget</h2>
          <EmptyState
            title="Répartition non publiée"
            text="Les deux tableaux du site se contredisaient. Aucune part ni aucun montant n’est affiché tant qu’une version sourcée n’est pas fournie. L’engagement conservé sur les dons reste : 100 % vers les kits de formation et de démarrage."
          />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="mb-4 font-display text-3xl font-extrabold">Projets</h2>
          <EmptyState
            title="Aucun projet nominatif n’est publié."
            text="Les trois solutions du site — transformation agro-alimentaire, savon, entrepreneuriat digital — sont décrites ci-dessus. Il n’y a pas de liste filtrable de projets par commune."
          />
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {solutions.map((item) => (
              <li key={item.title} className="rounded-[22px] bg-white p-5 text-sm">
                <p className="font-bold">{item.title}</p>
                <p className="mt-1 text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-primary py-12 text-white">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-extrabold">Le parcours de formation est pris en charge.</h2>
          <ButtonLink href="/postuler" variant="sun">Postuler</ButtonLink>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-extrabold">Questions fréquentes</h2>
          <FaqAccordion items={faq} />
        </Container>
      </section>
    </>
  );
}
