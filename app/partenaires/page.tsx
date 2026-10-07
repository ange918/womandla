import type { Metadata } from "next";
import { ButtonLink, Card, Container, PageHero } from "@/components/site/ui";
import { partners, supportOptions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Partenaires",
  description: "Partenaires cités par WOMANDLA et façons de rejoindre le réseau.",
};

export default function PartenairesPage() {
  return (
    <>
      <PageHero
        eyebrow="Partenaires"
        title="Unissez vos forces aux nôtres."
        text="Que vous soyez une institution publique, une entreprise privée ou un organisme international."
        actions={<ButtonLink href="/contact?profil=partenaire" variant="sun">Devenir partenaire officiel</ButtonLink>}
      />
      <section className="bg-white py-16">
        <Container>
          <h2 className="font-display text-3xl font-extrabold">Ils sont cités sur le site actuel</h2>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
            {partners.map((partner) => (
              <li key={partner.name} className="rounded-[22px] border border-line p-4 text-center">
                <img src={partner.logo} alt="" className="mx-auto h-14 object-contain" />
                <p className="mt-2 text-xs font-bold">{partner.name}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className="py-16">
        <Container className="grid gap-4 md:grid-cols-3">
          {supportOptions.map((item) => (
            <Card key={item.title} className="p-6">
              <h2 className="font-display text-xl font-extrabold">{item.title}</h2>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
              <ButtonLink href={item.href} variant="ghost" className="mt-4">{item.cta}</ButtonLink>
            </Card>
          ))}
        </Container>
      </section>
    </>
  );
}
