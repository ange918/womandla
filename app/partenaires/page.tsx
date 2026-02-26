"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PartenairesPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <header className="mb-20 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6 tracking-tight">Nos Partenaires</h1>
          <div className="h-1.5 w-24 bg-gold mx-auto mb-8"></div>
          <p className="text-xl text-gray-600">
            Ils nous font confiance et soutiennent activement l'autonomisation des femmes au Bénin.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-video bg-light rounded-xl flex items-center justify-center border border-gray-100 grayscale hover:grayscale-0 transition-all cursor-pointer opacity-60 hover:opacity-100">
              <span className="text-gray-400 font-bold uppercase tracking-tighter">PARTENAIRE {i}</span>
            </div>
          ))}
        </div>

        <div className="bg-primary p-12 md:p-20 rounded-[3rem] text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Rejoindre notre réseau de partenaires</h2>
          <p className="max-w-2xl mx-auto text-gray-200 mb-10 leading-relaxed">
            Que vous soyez une institution publique, une entreprise privée ou un organisme international, votre contribution peut changer le destin de milliers de jeunes femmes.
          </p>
          <Link href="/contact" className="bg-gold text-white px-10 py-4 rounded-xl font-bold hover:scale-105 transition-all inline-block shadow-xl">
            Devenir Partenaire Officiel
          </Link>
        </div>
      </div>
    </div>
  );
}
