import Link from "next/link";
import DonExpress from "@/components/home/DonExpress";
import FaqAccordion from "@/components/site/FaqAccordion";
import NewsletterForm from "@/components/site/NewsletterForm";
import { ButtonLink, Card, Container, EmptyState, Eyebrow } from "@/components/site/ui";
import {
  context,
  deployment,
  faq,
  hero,
  howItWorks,
  missionShort,
  odds,
  partners,
  phases,
  response,
  solutions,
  targetStats,
  testimonials,
  values,
  vision,
} from "@/lib/content";
import { fr } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <section className="mesh overflow-hidden">
        <Container className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="mb-5 inline-flex rounded-full bg-soft px-3 py-1 text-[11px] font-bold text-primary">
              {hero.badge}
            </span>
            <h1 className="font-display text-4xl font-extrabold leading-[1.06] text-ink md:text-6xl">
              {fr(hero.title)} <span className="text-primary">{fr(hero.accent)}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{fr(hero.subtitle)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/don" variant="sun">
                Faire un don
              </ButtonLink>
              <ButtonLink href="/programmes" variant="primary">
                Découvrir nos actions
              </ButtonLink>
            </div>
            <Link href="/postuler" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
              Vous êtes une jeune femme ? Se faire accompagner
            </Link>
          </div>
          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="arch-round h-[460px] md:h-[520px]">
              <img
                src="/media/c-hero-gari.jpg"
                alt="Illustration : transformation du manioc au Bénin. Photo libre, pas une bénéficiaire WOMANDLA."
                className="h-full w-full object-cover object-[62%_40%]"
              />
            </div>
            <Card className="absolute -bottom-4 left-0 w-[230px] p-4 shadow-card md:-left-6">
              <p className="eyebrow text-gold-deep">Sur le terrain</p>
              <p className="mt-1 text-sm font-bold">{hero.pilotCardTitle}</p>
              <p className="text-xs text-muted">{hero.pilotCardText}</p>
            </Card>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <div>
              <Eyebrow>L’impact que nous visons</Eyebrow>
              <h2 className="font-display text-3xl font-extrabold leading-tight md:text-4xl">
                {fr(vision)}
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted">{fr(missionShort)}</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {response.slice(0, 3).map((item) => (
              <div key={item.title} className="rounded-[22px] border border-line bg-pale p-6">
                <p className="font-display text-lg font-extrabold">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {targetStats.map((stat) => (
              <Card key={stat.label} className="p-6">
                <p className="font-display text-4xl font-extrabold text-gold-deep">{stat.value}</p>
                <p className="mt-2 text-sm font-bold">{stat.label}</p>
                <p className="mt-3 text-[11px] font-semibold text-muted">{stat.hint}</p>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">
            Ces chiffres sont les cibles déjà affichées sur le site. Les réalisations mesurées ne sont pas
            publiées ici tant qu’elles n’ont pas été fournies.
          </p>
        </Container>
      </section>

      <section className="mesh py-16 md:py-20">
        <Container>
          <Eyebrow>Étude de cas</Eyebrow>
          <h2 className="mb-6 max-w-3xl font-display text-3xl font-extrabold md:text-4xl">
            Les récits de terrain seront publiés lorsqu’ils seront validés.
          </h2>
          <EmptyState
            title="Aucune étude de cas n’est encore au dossier."
            text="Le site actuel ne contient pas de récit nominatif vérifié. Cette section accueillera une étude (contexte, problème, intervention, résultats) dès que l’équipe en déposera une. Les noms et chiffres des maquettes n’ont pas été repris."
          />
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <Eyebrow>Comment ça marche</Eyebrow>
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">
              Un parcours en 4 étapes, du repérage au suivi.
            </h2>
          </div>
          <ol className="grid gap-6 md:grid-cols-4">
            {howItWorks.map((item, index) => (
              <li key={item.title} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary font-display text-lg font-extrabold text-white shadow-glow">
                  {index + 1}
                </div>
                <p className="eyebrow text-gold-deep">{item.step}</p>
                <p className="mt-1 font-display text-lg font-extrabold">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{fr(item.text)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-light py-16 md:py-20">
        <Container>
          <Eyebrow>Mission</Eyebrow>
          <h2 className="max-w-3xl font-display text-3xl font-extrabold md:text-4xl">{fr(hero.about)}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title} className="p-6">
                <p className="font-display text-xl font-extrabold">{value.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Programmes</Eyebrow>
              <h2 className="font-display text-3xl font-extrabold md:text-4xl">Nos solutions pour l’autonomisation</h2>
            </div>
            <ButtonLink href="/programmes" variant="ghost">
              Voir les programmes
            </ButtonLink>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {solutions.map((item) => (
              <Card key={item.title} className="p-6">
                <p className="font-display text-xl font-extrabold">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-primary py-14 text-white">
        <Container className="grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="eyebrow text-gold">Postulez</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">
              Vous êtes une jeune femme au Bénin ?
            </h2>
            <p className="mt-4 max-w-xl text-white/85">
              {fr(faq[1].a)} {fr(faq[2].a)}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/postuler" variant="sun">
              Se faire accompagner
            </ButtonLink>
            <Link href="/postuler/suivi" className="inline-flex items-center rounded-full border border-white/40 px-5 py-3 text-sm font-bold">
              Suivre ma candidature
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-light py-16 md:py-20">
        <Container>
          <Eyebrow>Témoignages</Eyebrow>
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">Elles témoignent</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Textes déjà publiés sur le site. À confirmer par l’équipe avant de les présenter comme des récits vérifiés.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <Card key={item.name} className="p-6">
                <blockquote>
                  <p className="text-sm leading-relaxed text-ink">« {item.text} »</p>
                  <footer className="mt-4">
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-primary">{item.role}</p>
                  </footer>
                </blockquote>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Où nous agissons</Eyebrow>
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">Une stratégie nationale de déploiement</h2>
            <p className="mt-4 text-muted">{deployment.aside}</p>
            <ol className="mt-6 space-y-4">
              {phases.map((phase) => (
                <li key={phase.id} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white">
                    {phase.id}
                  </span>
                  <div>
                    <p className="font-bold">{phase.title}</p>
                    <p className="text-sm text-muted">{phase.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <Card className="flex min-h-72 flex-col justify-between p-8">
            <div>
              <p className="font-display text-2xl font-extrabold">{deployment.pilotTitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{deployment.pilotText}</p>
            </div>
            <EmptyState
              title="Carte à compléter"
              text="Le site actuel ne contient pas de fichier cartographique. Le visuel des communes sera ajouté lorsqu’il sera fourni."
            />
          </Card>
        </Container>
      </section>

      <section className="bg-primary py-16 text-white">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow text-gold">Don express</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold">Soutenir le programme</h2>
            <p className="mt-3 text-sm text-white/80">
              100 % de votre contribution va directement au financement des kits de formation et de démarrage, selon le texte déjà publié.
            </p>
          </div>
          <DonExpress />
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div>
            <Eyebrow>Événements</Eyebrow>
            <h2 className="mb-4 font-display text-3xl font-extrabold">À venir</h2>
            <EmptyState
              title="Aucun événement publié."
              text="Les dates de sessions, portes ouvertes et rencontres seront listées ici dès qu’elles seront communiquées."
            />
          </div>
          <div>
            <Eyebrow>Actualités</Eyebrow>
            <h2 className="mb-4 font-display text-3xl font-extrabold">Journal</h2>
            <EmptyState
              title="Aucun article pour le moment."
              text="Le site actuel ne publie pas d’articles. La page Actualités est prête à recevoir des contenus réels."
            />
            <ButtonLink href="/actualites" variant="ghost" className="mt-4">
              Ouvrir les actualités
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="bg-light py-16">
        <Container>
          <Eyebrow>Partenaires et ODD</Eyebrow>
          <h2 className="font-display text-3xl font-extrabold">Ils sont cités sur le site actuel</h2>
          <ul className="mt-8 grid grid-cols-2 items-center gap-4 md:grid-cols-5">
            {partners.map((partner) => (
              <li key={partner.name} className="flex h-24 items-center justify-center rounded-[22px] border border-line bg-white p-4">
                <img src={partner.logo} alt={partner.name} className="max-h-14 max-w-full object-contain" />
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">
            Le logo « Gouvernement du Bénin » et celui de l’Institut National de la Femme pointent aujourd’hui vers le même fichier. À distinguer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {odds.map((odd) => (
              <div key={odd.n} className={`${odd.tone} flex h-28 w-28 flex-col justify-between rounded-xl p-3 text-white`}>
                <span className="font-display text-2xl font-extrabold">{odd.n}</span>
                <span className="text-[11px] font-bold leading-tight">{odd.title}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">
            ODD cités sur les pages existantes : 1, 4, 5, 8 et 10. {fr(context)}
          </p>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="max-w-3xl">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mb-6 font-display text-3xl font-extrabold">Questions fréquentes</h2>
          <FaqAccordion items={faq} />
        </Container>
      </section>

      <section className="bg-dark py-16 text-white">
        <Container className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">Newsletter</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold">Recevoir les prochaines nouvelles</h2>
            <p className="mt-3 text-sm text-white/70">
              Pas de liste d’abonnés existante. L’inscription est enregistrée seulement si Supabase est configuré.
            </p>
          </div>
          <NewsletterForm />
        </Container>
      </section>
    </>
  );
}
