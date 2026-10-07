import Link from "next/link";
import { footerBlurb, org } from "@/lib/content";
import { fr } from "@/lib/utils";

const columns = [
  {
    title: "Le programme",
    links: [
      { href: "/a-propos", label: "À propos" },
      { href: "/programmes", label: "Programmes" },
      { href: "/impact", label: "Impact" },
      { href: "/actualites", label: "Actualités" },
      { href: "/programme", label: "Ancienne page programme" },
      { href: "/programme-et-impact", label: "Ancienne page programme et impact" },
    ],
  },
  {
    title: "S’engager",
    links: [
      { href: "/postuler", label: "Se faire accompagner" },
      { href: "/postuler/suivi", label: "Suivre ma candidature" },
      { href: "/don", label: "Faire un don" },
      { href: "/soutenir", label: "Bénévolat et partenariat" },
      { href: "/partenaires", label: "Partenaires" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/brand/logo-mark.svg" alt="" className="h-9 w-9" />
            <span className="font-display text-lg font-extrabold">{org.name}</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/70">{fr(footerBlurb)}</p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="eyebrow text-gold">{column.title}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="eyebrow text-gold">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {org.addressLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
            <li>
              <a href={`mailto:${org.email}`} className="hover:text-white">
                {org.email}
              </a>
            </li>
          </ul>
          <p className="mt-3 text-xs text-white/50">Aucun numéro de téléphone n’est publié.</p>
          <p className="mt-4 text-xs text-white/50">
            Réseaux sociaux : liens non publiés sur le site actuel.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-white/50 md:px-8">
          © {new Date().getFullYear()} WOMANDLA. Tous droits réservés. République du Bénin. Photos
          d’illustration : crédits dans /media/CREDITS.md. Elles ne montrent pas de bénéficiaires de
          l’organisation.
        </p>
      </div>
    </footer>
  );
}
