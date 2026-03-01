"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import { 
  HeartIcon, 
  UserGroupIcon, 
  BuildingOffice2Icon, 
  ArrowDownTrayIcon,
  CheckBadgeIcon,
  CurrencyDollarIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export default function SupportPage() {
  const benefits = [
    { title: "Impact Direct", desc: "100% de votre contribution va directement au financement des kits de formation et de démarrage pour les femmes.", icon: SparklesIcon },
    { title: "Transparence", desc: "Recevez des rapports trimestriels détaillés sur l'utilisation des fonds et l'évolution des bénéficiaires.", icon: CheckBadgeIcon },
    { title: "Développement Local", desc: "Soutenez l'économie béninoise en favorisant la transformation des produits locaux.", icon: BuildingOffice2Icon }
  ];

  return (
    <>
      <HeroSection 
        title="Soutenir WOMANDLA"
        subtitle="Ensemble, accélérons l'autonomisation des jeunes femmes pour transformer l'avenir du Bénin."
        image="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1200"
        showButtons={false}
      />

      <div className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Pourquoi soutenir */}
          <section className="mb-24 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-dark mb-12">Pourquoi nous soutenir ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-3xl bg-light border border-gray-100 hover:shadow-xl transition-all"
                >
                  <benefit.icon className="w-12 h-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-dark mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Options de soutien */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
            
            {/* Don individuel */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl shadow-lg border-t-8 border-gold flex flex-col"
            >
              <div className="flex items-center gap-4 mb-8">
                <CurrencyDollarIcon className="w-10 h-10 text-gold" />
                <h3 className="text-2xl font-bold text-dark">Don Individuel</h3>
              </div>
              <p className="text-gray-600 mb-8 flex-grow">
                Contribuez ponctuellement ou mensuellement pour soutenir les frais opérationnels et l'achat de petit matériel de transformation.
              </p>
              <button className="w-full bg-gold text-white py-4 rounded-xl font-bold hover:scale-105 transition-all">
                Faire un don
              </button>
            </motion.div>

            {/* Parrainage */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-dark text-white p-10 rounded-3xl shadow-2xl border-t-8 border-primary flex flex-col"
            >
              <div className="flex items-center gap-4 mb-8">
                <HeartIcon className="w-10 h-10 text-primary" />
                <h3 className="text-2xl font-bold">Parrainage</h3>
              </div>
              <p className="text-gray-300 mb-8 flex-grow">
                Parrainez le parcours complet d'une femme (formation, incubation, kit de démarrage). Suivez son évolution personnellement.
              </p>
              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:scale-105 transition-all">
                Parrainer une femme
              </button>
            </motion.div>

            {/* Partenariat institutionnel */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl shadow-lg border-t-8 border-secondary flex flex-col"
            >
              <div className="flex items-center gap-4 mb-8">
                <BuildingOffice2Icon className="w-10 h-10 text-secondary" />
                <h3 className="text-2xl font-bold text-dark">Institutionnel</h3>
              </div>
              <p className="text-gray-600 mb-8 flex-grow">
                Entreprises et ONG, collaborez sur des projets à grande échelle pour un impact systémique dans les communes.
              </p>
              <button className="w-full bg-secondary text-white py-4 rounded-xl font-bold hover:scale-105 transition-all">
                Nous contacter
              </button>
            </motion.div>
          </div>

          {/* Documentation */}
          <section className="bg-primary/5 rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-dark mb-4">Dossier de Partenariat</h2>
              <p className="text-gray-600">
                Téléchargez notre brochure détaillée pour comprendre nos besoins, nos axes d'intervention et les avantages fiscaux liés à votre soutien.
              </p>
            </div>
            <button className="flex items-center gap-3 bg-white text-primary border-2 border-primary px-8 py-4 rounded-xl font-bold hover:bg-primary hover:text-white transition-all whitespace-nowrap">
              <ArrowDownTrayIcon className="w-6 h-6" />
              Télécharger le PDF
            </button>
          </section>

        </div>
      </div>
    </>
  );
}
