"use client";

import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ResponseSection from "@/components/ResponseSection";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ResponseSection />

      {/* Stratégie Nationale */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-8 tracking-tight">Une Stratégie Nationale de Déploiement</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-dark text-lg">Phase 1 : Pilote Stratégique</h4>
                    <p className="text-gray-600 text-sm">Lancement dans les communes pôles pour validation du modèle d'intervention.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-dark text-lg">Phase 2 : Extension Départementale</h4>
                    <p className="text-gray-600 text-sm">Déploiement progressif dans chaque département du Bénin.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gold text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-dark text-lg">Phase 3 : Couverture Nationale</h4>
                    <p className="text-gray-600 text-sm">Intégration des 77 communes dans le dispositif d'autonomisation.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-dark text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-dark text-lg">Phase 4 : Mise à l'Échelle</h4>
                    <p className="text-gray-600 text-sm">Pérennisation des acquis et transfert de compétences localement.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md aspect-[3/4] bg-light rounded-3xl flex items-center justify-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-primary opacity-5 group-hover:opacity-10 transition-opacity"></div>
                 <span className="text-primary font-bold text-lg">CARTE DU BÉNIN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-dark text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Investissez dans l'avenir du Bénin</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/soutenir" className="bg-gold text-white px-10 py-4 rounded-lg font-bold hover:scale-105 transition-all flex items-center gap-2">
              Faire un don <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link href="/partenaires" className="border-2 border-white text-white px-10 py-4 rounded-lg font-bold hover:bg-white hover:text-dark transition-all">
              Devenir partenaire
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
