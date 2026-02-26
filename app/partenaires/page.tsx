"use client";

import HeroSection from "@/components/HeroSection";
import Link from "next/link";
import PartnerMarquee from "@/components/PartnerMarquee";
import { BanknotesIcon, HeartIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";

export default function PartenairesSoutenirPage() {
  return (
    <>
      <HeroSection 
        title="Partenaires & Soutien"
        subtitle="Unissez vos forces aux nôtres pour changer durablement le destin de milliers de jeunes femmes au Bénin."
        image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
        showButtons={false}
      />

      <div className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <section className="mb-24">
            <h2 className="text-3xl md:text-5xl font-bold text-dark mb-12 text-center">Ils nous accompagnent</h2>
            <PartnerMarquee />
            
            <div className="mt-16 bg-primary p-12 rounded-[3rem] text-center text-white">
              <h2 className="text-3xl font-bold mb-6">Rejoindre notre réseau</h2>
              <p className="max-w-2xl mx-auto text-gray-200 mb-10 leading-relaxed">
                Que vous soyez une institution publique, une entreprise privée ou un organisme international.
              </p>
              <Link href="/contact" className="bg-gold text-white px-10 py-4 rounded-xl font-bold hover:scale-105 transition-all inline-block shadow-xl">
                Devenir Partenaire Officiel
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-3xl md:text-5xl font-bold text-dark mb-12 text-center">Soutenir l'Initiative</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all group">
                <HeartIcon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-dark mb-4">Don Individuel</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">Participez directement au financement de la formation d'une jeune femme.</p>
                <button className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition-colors">Faire un don</button>
              </div>
              
              <div className="bg-white p-10 rounded-3xl border-2 border-gold shadow-xl hover:shadow-2xl transition-all scale-105 relative z-10 group">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Recommandé</div>
                <BanknotesIcon className="w-12 h-12 text-gold mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-dark mb-4">Parrainage</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">Soutenez un projet entrepreneurial complet dans une commune spécifique.</p>
                <button className="w-full bg-gold text-white py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">Parrainer une commune</button>
              </div>

              <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all group">
                <BuildingLibraryIcon className="w-12 h-12 text-secondary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-dark mb-4">Institutionnel</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">Partenariats stratégiques pour des programmes à grande échelle.</p>
                <button className="w-full bg-dark text-white py-3 rounded-lg font-bold hover:bg-black transition-colors">Contacter le bureau</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
