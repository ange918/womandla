"use client";

import { motion } from "framer-motion";
import { PresentationChartLineIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export default function ImpactPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <header className="mb-20 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6 tracking-tight">Impact & Résultats</h1>
          <div className="h-1.5 w-24 bg-gold mx-auto mb-8"></div>
          <p className="text-xl text-gray-600">
            La mesure d'impact est au cœur de notre stratégie. Nous transformons chaque investissement en résultats concrets pour les communautés.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
           {/* Placeholder charts/data points */}
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

        <section className="bg-light p-12 md:p-20 rounded-[3rem] mb-24">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-dark mb-6 flex items-center gap-3">
                <PresentationChartLineIcon className="w-8 h-8 text-primary" /> Alignement ODD
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Notre action s'inscrit directement dans les Objectifs de Développement Durable (ODD) des Nations Unies, notamment l'ODD 1 (Pas de pauvreté), l'ODD 4 (Éducation de qualité), l'ODD 5 (Égalité des sexes) et l'ODD 8 (Travail décent et croissance économique).
              </p>
              <div className="flex flex-wrap gap-4">
                 <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center font-bold text-primary">ODD 4</div>
                 <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center font-bold text-gold">ODD 5</div>
                 <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center font-bold text-secondary">ODD 8</div>
              </div>
            </div>
            <div className="md:w-1/2 bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="font-bold text-xl mb-6">Rapports d'Évaluation</h3>
              <div className="space-y-4">
                <button className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="flex items-center gap-3 font-medium">
                    <DocumentTextIcon className="w-5 h-5 text-primary" /> Rapport Trimestriel Q4 2025
                  </span>
                  <span className="text-xs font-bold text-gray-400">PDF • 2MB</span>
                </button>
                <button className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="flex items-center gap-3 font-medium">
                    <DocumentTextIcon className="w-5 h-5 text-primary" /> Étude d'Impact Baseline 2024
                  </span>
                  <span className="text-xs font-bold text-gray-400">PDF • 5MB</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
