import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, Card, Container, EmptyState, PageHero } from "@/components/site/ui";
import { documents, odds, targetStats } from "@/lib/content";

export const metadata: Metadata = {
  title: "Impact",
  description: "Couverture visée de WOMANDLA : 77 communes. Les autres indicateurs d’impact ne sont pas encore publiés.",
};

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="L’impact se mesurera avec des chiffres sourcés."
        text="La couverture visée reste celle du programme : 77 communes. Les autres indicateurs ne sont pas affichés."
        actions={
          <>
            <ButtonLink href="/don" variant="sun">Faire un don</ButtonLink>
            <ButtonLink href="/postuler" variant="ghost">Se faire accompagner</ButtonLink>
          </>
        }
      />

      <section className="bg-white py-16">
        <Container>
          <h2 className="font-display text-3xl font-extrabold">Couverture visée</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-[240px_1fr]">
            {targetStats.map((stat) => (
              <Card key={stat.label} className="p-6">
                <p className="font-display text-4xl font-extrabold text-gold-deep">{stat.value}</p>
                <p className="mt-2 font-bold">{stat.label}</p>
                <p className="mt-1 text-xs text-muted">{stat.hint}</p>
              </Card>
            ))}
            <EmptyState
              title="Pas d’autre indicateur"
              text="Les taux d’insertion, nombres de projets, scores d’autonomie et résultats de phase pilote ont été retirés : ils n’avaient pas de source vérifiée."
            />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="mb-4 font-display text-3xl font-extrabold">Résultats mesurés</h2>
          <EmptyState
            title="Aucun résultat chiffré n’est publié."
            text="Cette zone accueillera les indicateurs lorsque l’équipe les aura documentés. Aucun chiffre de remplacement n’est affiché."
          />
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
            text="Aucun témoignage nominatif n’est publié. Aucune galerie avant / après n’est disponible."
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
