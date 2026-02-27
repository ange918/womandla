"use client";

import HeroSection from "@/components/HeroSection";
import { 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  MapIcon,
  DocumentTextIcon,
  PresentationChartLineIcon
} from "@heroicons/react/24/outline";

export default function ProgrammeImpactPage() {
  return (
    <>
      <HeroSection 
        title="Programme & Impact"
        subtitle="Une architecture d'intervention conçue pour l'excellence et des résultats concrets mesurables sur le terrain."
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
        showButtons={false}
      />

      <div className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
            <div className="lg:col-span-2 space-y-12">
              <section className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-6 text-primary">
                  <MapIcon className="w-7 h-7" />
                  <h2 className="text-2xl font-bold text-dark uppercase tracking-wide">Déploiement Stratégique</h2>
                </div>
                <div className="space-y-6">
                  <div className="border-l-4 border-gold pl-6">
                    <h3 className="text-xl font-bold text-dark mb-2">Phase Pilote : Bohicon</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Lancement opérationnel dans la ville carrefour de Bohicon. Cette phase permet de tester notre modèle d'incubation et de formation sur un échantillon représentatif de 150 jeunes femmes avant le déploiement national.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-bold text-dark mb-2">Expansion Nationale</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Extension progressive aux 76 autres communes du Bénin, en s'appuyant sur les centres de promotion sociale et les maisons de l'entreprise pour une couverture territoriale totale.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-6 text-gold">
                  <CheckCircleIcon className="w-7 h-7" />
                  <h2 className="text-2xl font-bold text-dark uppercase tracking-wide">Objectifs Spécifiques</h2>
                </div>
                <ul className="space-y-4">
                  {[
                    "Former 3 850 jeunes femmes aux compétences techniques et managériales.",
                    "Faciliter l'accès au financement pour 77 micro-projets communaux (5M FCFA par commune).",
                    "Créer un réseau national de mentorat féminin.",
                    "Réduire de 15% le chômage des jeunes femmes dans les zones ciblées."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-700">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="space-y-8">
              <div className="bg-primary text-white p-8 rounded-2xl shadow-lg">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <MapIcon className="w-6 h-6" /> Déploiement
                </h3>
                <p className="text-sm text-gray-200 mb-6">77 communes, 12 départements, 1 vision unique.</p>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                    <span>Phase Pilote</span>
                    <span className="font-bold text-gold">Terminée</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                    <span>Extension</span>
                    <span className="font-bold">En cours</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Mise à l'échelle</span>
                    <span className="font-bold text-gray-400">Prévue 2026</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Impact Content Integrated */}
          <section className="mb-24">
            <h2 className="text-3xl md:text-5xl font-bold text-dark mb-12 text-center">Impact & Résultats</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
               {[
                 { label: "Taux d'insertion pro", val: "84%", color: "text-green-600" },
                 { label: "Projets financés", val: "156", color: "text-primary" },
                 { label: "Score d'autonomie", val: "+65%", color: "text-gold" }
               ].map((item, i) => (
                 <div key={i} className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm text-center">
                   <span className={`text-5xl font-bold ${item.color} block mb-2`}>{item.val}</span>
                   <span className="text-gray-500 font-medium uppercase text-xs tracking-widest">{item.label}</span>
                 </div>
               ))}
            </div>

            <div className="bg-light p-12 md:p-20 rounded-[3rem]">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold text-dark mb-6 flex items-center gap-3">
                    <PresentationChartLineIcon className="w-8 h-8 text-primary" /> Alignement ODD
                  </h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Notre action s'inscrit directement dans les Objectifs de Développement Durable (ODD) des Nations Unies, notamment l'ODD 1, 4, 5 et 8.
                  </p>
                  <div className="flex flex-wrap gap-4">
                     {["ODD 4", "ODD 5", "ODD 8"].map(odd => (
                       <div key={odd} className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center font-bold text-primary">{odd}</div>
                     ))}
                  </div>
                </div>
                <div className="md:w-1/2 bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="font-bold text-xl mb-6">Rapports d'Évaluation</h3>
                  <div className="space-y-4">
                    <button className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <span className="flex items-center gap-3 font-medium">
                        <DocumentTextIcon className="w-5 h-5 text-primary" /> Rapport Q4 2025
                      </span>
                      <span className="text-xs font-bold text-gray-400">PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Budget Table */}
          <section className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl">
            <div className="bg-dark p-6">
              <h3 className="text-white font-bold text-xl">Allocation Budgétaire Prévisionnelle</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-light text-dark font-bold text-sm">
                    <th className="p-6">Catégorie d'Investissement</th>
                    <th className="p-6">Répartition (%)</th>
                    <th className="p-6">Priorité</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-600">
                  <tr className="border-b border-gray-50">
                    <td className="p-6 font-medium text-dark">Appui Direct & Financement par Commune</td>
                    <td className="p-6">5 000 000 FCFA</td>
                    <td className="p-6"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">CRITIQUE</span></td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="p-6 font-medium text-dark">Formation & Ingénierie Pédagogique</td>
                    <td className="p-6">45%</td>
                    <td className="p-6"><span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">HAUTE</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
