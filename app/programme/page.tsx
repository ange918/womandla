"use client";

import { motion } from "framer-motion";
import { 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  MapIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";

export default function ProgrammePage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <header className="max-w-4xl mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">Le Programme National</h1>
          <div className="h-1.5 w-24 bg-gold mb-8"></div>
          <p className="text-xl text-gray-600">
            Une architecture d'intervention conçue pour l'excellence et la pérennité des résultats sur le terrain.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-6 text-primary">
                <ExclamationTriangleIcon className="w-7 h-7" />
                <h2 className="text-2xl font-bold text-dark uppercase tracking-wide">Contexte & Justification</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Le Bénin dispose d'un potentiel démographique jeune exceptionnel. Cependant, les jeunes femmes font face à des barrières structurelles limitant leur accès à des opportunités de haut niveau. WOMANDLA intervient pour briser ces barrières par un renforcement de capacités systématique.
              </p>
            </section>

            <section className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-6 text-gold">
                <CheckCircleIcon className="w-7 h-7" />
                <h2 className="text-2xl font-bold text-dark uppercase tracking-wide">Objectifs Spécifiques</h2>
              </div>
              <ul className="space-y-4">
                {[
                  "Former 3 850 jeunes femmes aux compétences techniques et managériales.",
                  "Faciliter l'accès au financement pour 77 micro-projets communaux.",
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

            <div className="bg-light p-8 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-xl text-dark mb-4 flex items-center gap-2">
                <DocumentTextIcon className="w-6 h-6 text-primary" /> Ressources
              </h3>
              <button className="w-full text-left p-3 hover:bg-white rounded transition-colors text-sm font-medium border-b border-gray-200 flex justify-between items-center">
                Dossier de Présentation (PDF)
                <span className="text-gold">↓</span>
              </button>
              <button className="w-full text-left p-3 hover:bg-white rounded transition-colors text-sm font-medium flex justify-between items-center">
                Fiche Technique Budget
                <span className="text-gold">↓</span>
              </button>
            </div>
          </aside>
        </div>

        {/* Budget Table Placeholder */}
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
                  <td className="p-6 font-medium text-dark">Formation & Ingénierie Pédagogique</td>
                  <td className="p-6">45%</td>
                  <td className="p-6"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">CRITIQUE</span></td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="p-6 font-medium text-dark">Appui Direct & Équipements</td>
                  <td className="p-6">35%</td>
                  <td className="p-6"><span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">HAUTE</span></td>
                </tr>
                <tr>
                  <td className="p-6 font-medium text-dark">Suivi, Évaluation & Communication</td>
                  <td className="p-6">20%</td>
                  <td className="p-6"><span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">STANDARD</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
