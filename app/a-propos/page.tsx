"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import { EyeIcon, FlagIcon, ShieldCheckIcon, HeartIcon, ScaleIcon } from "@heroicons/react/24/outline";

export default function AboutPage() {
  return (
    <>
      <HeroSection 
        title="À Propos de WOMANDLA"
        subtitle="Une organisation dédiée à l'autonomisation socio-économique des jeunes femmes à travers le Bénin."
        image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800"
        showButtons={false}
      />
      <div className="py-24">
        <div className="container mx-auto px-4 md:px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="bg-light p-10 rounded-2xl border-l-8 border-primary">
            <div className="flex items-center gap-4 mb-6">
              <EyeIcon className="w-10 h-10 text-primary" />
              <h2 className="text-2xl font-bold text-dark">Notre Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Devenir le levier national de référence pour l'émergence d'une nouvelle génération de femmes leaders et actrices du développement économique local dans chaque commune du Bénin.
            </p>
          </div>
          <div className="bg-light p-10 rounded-2xl border-l-8 border-gold">
            <div className="flex items-center gap-4 mb-6">
              <FlagIcon className="w-10 h-10 text-gold" />
              <h2 className="text-2xl font-bold text-dark">Notre Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Mettre en œuvre des programmes de formation, d'incubation et de soutien financier permettant aux jeunes femmes de s'émanciper durablement et de contribuer à la prospérité nationale.
            </p>
          </div>
        </div>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center text-dark mb-16">Nos Valeurs Fondamentales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <ShieldCheckIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2 text-dark">Transparence</h3>
              <p className="text-gray-600 text-sm">Gestion rigoureuse et redevabilité envers nos bailleurs et bénéficiaires.</p>
            </div>
            <div className="text-center p-8">
              <HeartIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2 text-dark">Engagement</h3>
              <p className="text-gray-600 text-sm">Dévouement total pour la réussite de chaque femme accompagnée.</p>
            </div>
            <div className="text-center p-8">
              <ScaleIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2 text-dark">Équité</h3>
              <p className="text-gray-600 text-sm">Une présence équilibrée dans les 77 communes du territoire national.</p>
            </div>
          </div>
        </section>

        <div className="bg-dark text-white p-12 rounded-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Gouvernance & Transparence</h2>
          <p className="max-w-2xl mx-auto text-gray-300 mb-8">
            Nous appliquons les plus hauts standards internationaux de gestion de projets institutionnels. Nos rapports financiers sont audités annuellement et accessibles à nos partenaires.
          </p>
          <button className="bg-gold text-white px-8 py-3 rounded font-bold hover:scale-105 transition-all">
            Consulter le Rapport Annuel
          </button>
        </div>
      </div>
    </>
  );
}
