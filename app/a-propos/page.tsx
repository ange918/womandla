import type { Metadata } from "next";
import { ButtonLink, Card, Container, EmptyState, PageHero } from "@/components/site/ui";
import {
  deployment,
  documents,
  globalObjective,
  governance,
  methodology,
  mission,
  partners,
  phases,
  pilotClaims,
  values,
  vision,
} from "@/lib/content";
import { fr } from "@/lib/utils";

export const metadata: Metadata = {
  title: "À propos",
  description: "Vision, mission, valeurs et déploiement de WOMANDLA au Bénin.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Une organisation dédiée à l’autonomisation socio-économique des jeunes femmes à travers le Bénin."
        text={vision}
      />
      <section className="bg-white py-16">
        <Container className="grid gap-5 md:grid-cols-2">
          <Card className="border-b-8 border-b-primary p-8">
            <h2 className="font-display text-2xl font-extrabold">Notre vision</h2>
            <p className="mt-4 leading-relaxed text-muted">{fr(vision)}</p>
          </Card>
          <Card className="border-b-8 border-b-gold p-8">
            <h2 className="font-display text-2xl font-extrabold">Notre mission</h2>
            <p className="mt-4 leading-relaxed text-muted">{fr(mission)}</p>
          </Card>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <h2 className="mb-6 text-center font-display text-3xl font-extrabold">Nos valeurs fondamentales</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title} className="p-6 text-center">
                <h3 className="font-display text-xl font-extrabold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted">{value.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-extrabold">Notre histoire publiée</h2>
            <p className="mt-4 leading-relaxed text-muted">{fr(pilotClaims.text)}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {pilotClaims.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">
              Chiffres repris de la page À propos actuelle. Une autre page du site parle d’un pilote de 150 jeunes femmes à Bohicon : les deux versions sont conservées, à réconcilier.
            </p>
          </div>
          <div className="arch-round h-80">
            <img
              src="/media/c-groupe-femmes.jpg"
              alt="Illustration : groupe de femmes au Bénin. Photo libre, pas une activité WOMANDLA identifiée."
              className="h-full w-full object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="font-display text-3xl font-extrabold">Théorie du changement</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">{fr(globalObjective)}</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">{fr(methodology)}</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {phases.map((phase) => (
              <li key={phase.id}>
                <Card className="h-full p-5">
                  <p className="text-sm font-bold text-primary">0{phase.id}</p>
                  <p className="mt-1 font-display text-lg font-extrabold">{phase.title}</p>
                  <p className="mt-2 text-sm text-muted">{phase.text}</p>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <h2 className="font-display text-3xl font-extrabold">Où nous agissons</h2>
          <p className="mt-3 max-w-3xl text-muted">{deployment.expansionText}</p>
          <div className="mt-6">
            <EmptyState
              title="Carte et antennes à compléter"
              text="Aucune adresse d’antenne, aucun nom de bureau et aucune équipe terrain ne figurent dans le site actuel. Ils seront ajoutés lorsqu’ils seront fournis."
            />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="font-display text-3xl font-extrabold">Partenaires cités</h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
            {partners.map((partner) => (
              <li key={partner.name} className="rounded-[22px] border border-line bg-white p-4 text-center">
                <img src={partner.logo} alt="" className="mx-auto h-12 object-contain" />
                <p className="mt-2 text-xs font-bold">{partner.name}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-dark py-16 text-white">
        <Container>
          <h2 className="font-display text-3xl font-extrabold">Gouvernance et transparence</h2>
          <p className="mt-4 max-w-2xl text-white/75">{fr(governance)}</p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {documents.map((doc) => (
              <li key={doc} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-4 text-sm">
                <span>{doc}</span>
                <span className="text-xs text-white/50">Fichier non déposé</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <h2 className="font-display text-xl font-extrabold">Bénévolat</h2>
            <p className="mt-2 text-sm text-muted">Le site invite à soutenir le programme. Aucune fiche de mission bénévole n’est publiée.</p>
            <ButtonLink href="/contact?profil=autre" variant="ghost" className="mt-4">
              Écrire à l’équipe
            </ButtonLink>
          </Card>
          <Card className="p-6">
            <h2 className="font-display text-xl font-extrabold">Partenariat</h2>
            <p className="mt-2 text-sm text-muted">Institutions publiques, entreprises et organismes internationaux peuvent rejoindre le réseau.</p>
            <ButtonLink href="/partenaires" variant="ghost" className="mt-4">
              Voir les partenaires
            </ButtonLink>
          </Card>
          <Card className="p-6">
            <h2 className="font-display text-xl font-extrabold">Emplois</h2>
            <p className="mt-2 text-sm text-muted">Aucune offre d’emploi n’est publiée sur le site actuel.</p>
          </Card>
        </Container>
      </section>
    </>
  );
}
