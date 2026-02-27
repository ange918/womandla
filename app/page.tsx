"use client";

import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ResponseSection from "@/components/ResponseSection";
import PartnerMarquee from "@/components/PartnerMarquee";
import Link from "next/link";
import { ArrowRightIcon, StarIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      
      {/* About Section right after Hero */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">À propos de WOMANDLA</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-dark mb-8 tracking-tight">Le catalyseur de l'excellence féminine au Bénin</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                WOMANDLA n'est pas qu'un programme, c'est un mouvement national. Présent dans les 77 communes, nous identifions, formons et propulsons les jeunes femmes vers l'autonomie et le leadership.
              </p>
              <Link href="/a-propos" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
                En savoir plus sur notre vision <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800" 
                alt="Women collaboration" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Vision & Mission Section */}
      <section className="py-24 bg-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-2xl shadow-sm border-t-4 border-primary">
              <h3 className="text-2xl font-bold text-dark mb-4">Notre Vision</h3>
              <p className="text-gray-600">Devenir le levier national de référence pour l'émergence d'une nouvelle génération de femmes leaders et actrices du développement économique local dans chaque commune du Bénin.</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border-t-4 border-gold">
              <h3 className="text-2xl font-bold text-dark mb-4">Notre Mission</h3>
              <p className="text-gray-600">Mettre en œuvre des programmes de formation, d'incubation et de soutien financier permettant aux jeunes femmes de s'émanciper durablement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions pour l'autonomisation */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-dark mb-16">Nos solutions pour l'autonomisation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Transformation Agro-alimentaire", desc: "Formation aux techniques de conservation et de transformation des produits locaux.", icon: "🌾" },
              { title: "Fabrication de Savon", desc: "Apprentissage de la production artisanale et semi-industrielle de produits d'hygiène.", icon: "🧼" },
              { title: "Entrepreneuriat Digital", desc: "Maîtrise des outils numériques pour booster la visibilité et les ventes.", icon: "💻" }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-light hover:bg-primary hover:text-white transition-all group">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-xl mb-4">{item.title}</h3>
                <p className="text-gray-600 group-hover:text-white/90">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PartnerMarquee />
      <StatsSection />
      <ResponseSection />

      {/* Stratégie Nationale */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-8 tracking-tight">Une Stratégie Nationale de Déploiement</h2>
              <div className="space-y-6">
                {[
                  { id: 1, title: "Phase 1 : Pilote Stratégique", desc: "Lancement dans les communes pôles pour validation du modèle d'intervention.", bg: "bg-primary" },
                  { id: 2, title: "Phase 2 : Extension Départementale", desc: "Déploiement progressif dans chaque département du Bénin.", bg: "bg-secondary" },
                  { id: 3, title: "Phase 3 : Couverture Nationale", desc: "Intégration des 77 communes dans le dispositif d'autonomisation.", bg: "bg-gold" },
                  { id: 4, title: "Phase 4 : Mise à l'Échelle", desc: "Pérennisation des acquis et transfert de compétences localement.", bg: "bg-dark" }
                ].map((phase) => (
                  <div key={phase.id} className="flex gap-4">
                    <div className={`w-12 h-12 ${phase.bg} text-white rounded-full flex items-center justify-center font-bold flex-shrink-0`}>{phase.id}</div>
                    <div>
                      <h4 className="font-bold text-dark text-lg">{phase.title}</h4>
                      <p className="text-gray-600 text-sm">{phase.desc}</p>
                    </div>
                  </div>
                ))}
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

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-dark mb-16">Questions Fréquemment Posées</h2>
          <div className="space-y-4">
            {[
              { q: "Comment rejoindre le programme ?", a: "Le recrutement se fait par appel à candidatures dans les mairies de chaque commune." },
              { q: "Quels sont les critères d'éligibilité ?", a: "Être une jeune femme résidant au Bénin, âgée de 18 à 35 ans, avec un projet ou une envie d'entreprendre." },
              { q: "Les formations sont-elles gratuites ?", a: "Oui, l'intégralité du parcours de formation est prise en charge par WOMANDLA et ses partenaires." }
            ].map((item, i) => (
              <details key={i} className="group bg-light rounded-xl p-6 cursor-pointer">
                <summary className="font-bold text-lg list-none flex justify-between items-center">
                  {item.q}
                  <span className="transition-transform group-open:rotate-180">↓</span>
                </summary>
                <p className="mt-4 text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl md:text-5xl font-bold mb-16">Elles témoignent</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Afiwa", role: "Entrepreneure, Cotonou", text: "Grâce à WOMANDLA, j'ai pu structurer mon projet de transformation agro-alimentaire et obtenir mon premier financement." },
              { name: "Bernice", role: "Leader Communautaire, Parakou", text: "Le programme m'a donné les outils de leadership nécessaires pour porter la voix des femmes de ma commune." },
              { name: "Clarisse", role: "Bénéficiaire, Ouidah", text: "La formation technique était d'une qualité exceptionnelle. Je me sens enfin prête à relever les défis du marché." }
            ].map((avis, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <StarIcon key={s} className="w-5 h-5 text-gold" />)}
                </div>
                <p className="text-gray-600 italic mb-6">"{avis.text}"</p>
                <div className="font-bold text-dark">{avis.name}</div>
                <div className="text-primary text-sm font-medium">{avis.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-white text-dark text-center border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Investissez dans l'avenir du Bénin</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/soutenir" className="bg-gold text-white px-10 py-4 rounded-lg font-bold hover:scale-105 transition-all flex items-center gap-2">
              Faire un don <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link href="/partenaires" className="border-2 border-primary text-primary px-10 py-4 rounded-lg font-bold hover:bg-primary hover:text-white transition-all">
              Devenir partenaire
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
