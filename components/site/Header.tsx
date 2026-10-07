"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bars3Icon, HeartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { org } from "@/lib/content";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/programmes", label: "Programmes" },
  { href: "/impact", label: "Impact" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="WOMANDLA, accueil">
          <img src="/brand/logo-mark.svg" alt="" className="h-9 w-9 shrink-0" />
          <span className="leading-tight">
            <span className="block font-display text-[17px] font-extrabold tracking-tight text-ink">
              {org.name}
            </span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-muted">
              {org.logoSubtitle}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm xl:flex" aria-label="Navigation principale">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-semibold hover:text-ink",
                isActive(pathname, link.href) ? "text-primary" : "text-muted",
              )}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/postuler"
            className={cn(
              "inline-flex items-center gap-2 rounded-full border-[1.5px] px-4 py-2.5 text-sm font-bold",
              pathname.startsWith("/postuler")
                ? "border-primary bg-primary text-white"
                : "border-primary text-primary hover:bg-soft",
            )}
          >
            Se faire accompagner
          </Link>
          <Link
            href="/don"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-extrabold text-dark shadow-sun hover:brightness-105"
          >
            <HeartIcon className="h-4 w-4" aria-hidden />
            Faire un don
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/don"
            className="inline-flex items-center rounded-full bg-gold px-3 py-2 text-xs font-extrabold text-dark"
          >
            Don
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
            {open ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="menu-mobile" className="fixed inset-0 top-[72px] z-40 bg-dark text-white lg:hidden">
          <nav className="flex h-full flex-col gap-1 overflow-y-auto px-6 py-6" aria-label="Menu mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpenPath(null)}
                className="rounded-2xl px-3 py-3 text-lg font-semibold hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 rounded-[22px] bg-white/5 p-4">
              <p className="eyebrow text-gold">Se faire accompagner</p>
              <Link href="/postuler" onClick={() => setOpenPath(null)} className="mt-3 block font-display text-xl font-extrabold">
                Déposer une candidature
              </Link>
              <Link href="/postuler/suivi" onClick={() => setOpenPath(null)} className="mt-2 block text-sm font-semibold text-white/80">
                Suivre ma candidature
              </Link>
            </div>
            <Link
              href="/don"
              onClick={() => setOpenPath(null)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-4 text-center font-extrabold text-dark"
            >
              <HeartIcon className="h-5 w-5" aria-hidden />
              Faire un don
            </Link>
            <Link href="/soutenir" onClick={() => setOpenPath(null)} className="mt-3 px-3 py-2 text-sm text-white/70">
              Partenaires et autres façons de soutenir
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
