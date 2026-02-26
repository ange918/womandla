"use client";

import { motion } from "framer-motion";
import { 
  WrenchScrewdriverIcon, 
  SparklesIcon, 
  BriefcaseIcon, 
  ChartBarIcon 
} from "@heroicons/react/24/outline";

const items = [
  {
    icon: WrenchScrewdriverIcon,
    title: "Formation Technique",
    desc: "Apprentissage intensif aux métiers d'avenir et compétences numériques.",
  },
  {
    icon: SparklesIcon,
    title: "Leadership & Soft Skills",
    desc: "Développement de la confiance en soi et capacités de prise de décision.",
  },
  {
    icon: BriefcaseIcon,
    title: "Incubation Pro",
    desc: "Accompagnement personnalisé pour le lancement d'entreprises locales.",
  },
  {
    icon: ChartBarIcon,
    title: "Suivi d'Impact",
    desc: "Mesure continue des résultats sur le tissu économique des communes.",
  },
];

export default function ResponseSection() {
  return (
    <section className="py-24 bg-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4 tracking-tight">Notre Réponse Institutionnelle</h2>
          <div className="h-1.5 w-24 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-600">Un dispositif structuré pour répondre aux défis majeurs de l'emploi et de l'autonomie des femmes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="w-14 h-14 bg-primary/5 rounded-lg flex items-center justify-center mb-6">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
