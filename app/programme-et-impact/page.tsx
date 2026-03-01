"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import { 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  MapIcon, 
  DocumentTextIcon, 
  PresentationChartLineIcon,
  ArrowDownTrayIcon,
  ChartBarIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";

export default function ProgramImpactPage() {
  return (
    <>
      <HeroSection 
        title="Programme & Impact"
        subtitle="Découvrez notre approche structurée et les résultats concrets de notre engagement pour l'autonomisation des femmes."
        image="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200"
        showButtons={false}
      />

      <div className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Contexte & Objectif Global */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-red-50 p-10 rounded-3xl border-l-8 border-red-500"
            >
              <div className="flex items-center gap-4 mb-6">
                <ExclamationTriangleIcon className="w-10 h-10 text-red-500" />
                <h2 className="text-2xl font-bold text-dark">Contexte</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Au Bénin, les jeunes femmes font face à des barrières structurelles limitant leur accès aux ressources économiques. 
                Le chômage et le sous-emploi touchent disproportionnellement cette frange de la population, freinant le développement local.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary/5 p-10 rounded-3xl border-l-8 border-primary"
            >
              <div className="flex items-center gap-4 mb-6">
                <PresentationChartLineIcon className="w-10 h-10 text-primary" />
                <h2 className="text-2xl font-bold text-dark">Objectif Global</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Contribuer à la réduction de la pauvreté et à l'autonomisation durable des jeunes femmes béninoises par le renforcement 
                de leurs capacités techniques, entrepreneuriales et financières.
              </p>
            </motion.div>
          </div>

          {/* Objectifs Spécifiques & Résultats Attendus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            <section>
              <h3 className="text-2xl font-bold text-dark mb-8">Objectifs Spécifiques</h3>
              <ul className="space-y-4">
                {[
                  "Former 5000 femmes aux métiers de transformation locale.",
                  "Faciliter l'accès au micro-crédit pour 2000 porteuses de projets.",
                  "Créer un réseau d'entraide et de mentorat national."
                ].map((obj, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="bg-gold text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm mt-1">{i+1}</span>
                    <p className="text-gray-700">{obj}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-dark mb-8">Résultats Attendus</h3>
              <div className="space-y-4">
                {[
                  "Augmentation de 40% des revenus moyens des bénéficiaires.",
                  "Création de 150 coopératives féminines structurées.",
                  "Réduction significative de l'exode rural féminin."
                ].map((res, i) => (
                  <div key={i} className="flex gap-4 items-center bg-green-50 p-4 rounded-xl">
                    <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <p className="text-gray-700 font-medium">{res}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Activités & Méthodologie */}
          <section className="mb-24 bg-dark text-white p-12 rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold mb-8">Activités Clés</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {["Ateliers techniques", "Incubation business", "Suivi post-formation", "Plaidoyer local"].map((act, i) => (
                    <div key={i} className="border border-white/20 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">{act}</h4>
                      <div className="w-8 h-1 bg-gold"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-8">Méthodologie</h2>
                <p className="text-gray-300 leading-relaxed">
                  Notre approche repose sur le "Faire-Faire" et l'ancrage communautaire. 
                  Nous utilisons des outils participatifs et des démonstrations pratiques 
                  pour garantir une assimilation rapide des compétences techniques.
                </p>
              </div>
            </div>
          </section>

          {/* Budget Table */}
          <section className="mb-24 overflow-x-auto">
            <h2 className="text-3xl font-bold text-dark mb-8">Répartition Budgétaire Prévisionnelle</h2>
            <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden shadow-sm">
              <thead className="bg-light">
                <tr>
                  <th className="p-6 font-bold text-dark">Poste de dépense</th>
                  <th className="p-6 font-bold text-dark">Description</th>
                  <th className="p-6 font-bold text-dark">Part (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { item: "Formation Technique", desc: "Formateurs, matériel, logistique", share: "45%" },
                  { item: "Appui Financier", desc: "Fonds de roulement, micro-subventions", share: "30%" },
                  { item: "Suivi & Évaluation", desc: "Monitoring, rapports, audits", share: "15%" },
                  { item: "Fonctionnement", desc: "Administration, communication", share: "10%" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-6 font-bold text-primary">{row.item}</td>
                    <td className="p-6 text-gray-600">{row.desc}</td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gold" style={{ width: row.share }}></div>
                        </div>
                        <span className="font-bold">{row.share}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Déploiement & Indicateurs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            <div className="bg-light p-10 rounded-3xl">
              <div className="flex items-center gap-4 mb-6">
                <MapIcon className="w-10 h-10 text-primary" />
                <h2 className="text-2xl font-bold text-dark">Déploiement National</h2>
              </div>
              <p className="text-gray-700 mb-6">
                Le programme est déployé par vagues successives couvrant les 77 communes du Bénin, 
                en commençant par les zones à fort potentiel agro-industriel.
              </p>
              <div className="aspect-video bg-white rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                Visualisation de la carte de déploiement
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-dark">Indicateurs de Performance (KPIs)</h2>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Bénéficiaires", value: "5000+", icon: UserGroupIcon },
                  { label: "Taux de réussite", value: "92%", icon: ChartBarIcon },
                  { label: "Impact revenus", value: "+40%", icon: PresentationChartLineIcon },
                  { label: "Communes", value: "77/77", icon: MapIcon }
                ].map((kpi, i) => (
                  <div key={i} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <kpi.icon className="w-8 h-8 text-gold mb-4" />
                    <div className="text-2xl font-bold text-dark">{kpi.value}</div>
                    <div className="text-sm text-gray-500">{kpi.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ODD Section */}
          <section className="mb-24 py-16 bg-primary/5 rounded-3xl px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dark mb-4">Contribution aux ODD</h2>
              <p className="text-gray-600">Notre programme s'aligne sur les Objectifs de Développement Durable des Nations Unies.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { n: 1, t: "Pas de pauvreté", c: "bg-red-600" },
                { n: 5, t: "Égalité entre les sexes", c: "bg-orange-600" },
                { n: 8, t: "Travail décent", c: "bg-red-900" },
                { n: 10, t: "Inégalités réduites", c: "bg-pink-600" }
              ].map((odd) => (
                <div key={odd.n} className={`${odd.c} text-white w-32 h-32 p-4 flex flex-col justify-between rounded-lg shadow-lg`}>
                  <span className="text-2xl font-bold">{odd.n}</span>
                  <span className="text-xs font-bold leading-tight">{odd.t}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Rapports téléchargeables */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold text-dark mb-8 flex items-center gap-3">
              <DocumentTextIcon className="w-8 h-8 text-primary" />
              Rapports & Documentation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Rapport d'Impact 2024",
                "Plan Stratégique 2025-2027",
                "Guide Méthodologique de Formation"
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-2xl hover:border-primary transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <DocumentTextIcon className="w-10 h-10 text-gray-400 group-hover:text-primary" />
                    <span className="font-bold text-dark">{doc}</span>
                  </div>
                  <ArrowDownTrayIcon className="w-6 h-6 text-gray-400 group-hover:text-primary" />
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
