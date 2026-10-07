import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, Card, Container, EmptyState, PageHero } from "@/components/site/ui";
import { documents, odds, pilotClaims, publishedKpis, targetStats } from "@/lib/content";

export const metadata: Metadata = {
  title: "Impact",
  description: "Indicateurs et objectifs publiés par WOMANDLA. Les mesures de terrain restent à documenter.",
};

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="Ce que le site affirme déjà, et ce qui reste à mesurer."
        text="Les indicateurs ci-dessous sont repris des pages existantes. Ils ne sont pas présentés comme une nouvelle évaluation."
        actions={
          <>
            <ButtonLink href="/don" variant="sun">Faire un don</ButtonLink>
            <ButtonLink href="/postuler" variant="ghost">Se faire accompagner</ButtonLink>
          </>
        }
      />

      <section className="bg-white py-16">
        <Container>
          <h2 className="font-display text-3xl font-extrabold">Cibles de l’accueil</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {targetStats.map((stat) => (
              <Card key={stat.label} className="p-6">
                <p className="font-display text-4xl font-extrabold text-gold-deep">{stat.value}</p>
                <p className="mt-2 font-bold">{stat.label}</p>
                <p className="mt-1 text-xs text-muted">{stat.hint}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="font-display text-3xl font-extrabold">Indicateurs actuellement affichés</h2>
          <p className="mt-3 max-w-3xl text-sm text-muted">
            Ces valeurs viennent des pages Programme et Programme & Impact. Elles se contredisent en partie avec la phase pilote (500 femmes, 80 % d’activité). À vérifier avant de les laisser en ligne.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {publishedKpis.map((kpi) => (
              <Card key={kpi.label} className="p-6">
                <p className="font-display text-4xl font-extrabold text-primary">{kpi.value}</p>
                <p className="mt-2 font-bold">{kpi.label}</p>
                <p className="mt-1 text-xs text-muted">{kpi.source}</p>
              </Card>
            ))}
          </div>
          <Card className="mt-6 p-6">
            <h3 className="font-display text-xl font-extrabold">{pilotClaims.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{pilotClaims.text}</p>
          </Card>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid gap-4 md:grid-cols-2">
          <EmptyState
            title="Graphiques à alimenter"
            text="Pas de série par année, par filière ou par commune dans le repo. Les graphiques des maquettes utilisaient des chiffres d’exemple : ils ne sont pas affichés."
          />
          <EmptyState
            title="Méthodologie de mesure à préciser"
            text="Le site parle d’un suivi d’impact et de rapports audités, sans décrire les indicateurs, la fréquence ni l’échantillon. Ce texte sera ajouté avec les rapports."
          />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="mb-4 font-display text-3xl font-extrabold">Récits et vidéothèque</h2>
          <EmptyState
            title="Aucun récit ni vidéo validé."
            text="Les témoignages nominatifs déjà en ligne sont sur l’accueil, avec une mention qu’ils restent à confirmer. Aucune galerie avant / après n’existe dans le repo."
          />
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <h2 className="font-display text-3xl font-extrabold">Rapports cités</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {documents.map((doc) => (
              <li key={doc} className="flex items-center justify-between rounded-[22px] border border-line bg-light px-5 py-4">
                <span className="font-semibold">{doc}</span>
                <span className="text-xs font-bold text-muted">PDF non déposé</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            {odds.map((odd) => (
              <div key={odd.n} className={`${odd.tone} flex h-24 w-24 flex-col justify-between rounded-lg p-3 text-white`}>
                <span className="font-display text-2xl font-extrabold">{odd.n}</span>
                <span className="text-[11px] font-bold leading-tight">{odd.title}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/don" variant="sun">Faire un don</ButtonLink>
            <ButtonLink href="/postuler" variant="primary">Se faire accompagner</ButtonLink>
            <Link href="/a-propos" className="self-center text-sm font-bold text-primary">
              Lire la gouvernance
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
