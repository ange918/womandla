"use client";

import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";

export default function CandidaterPage() {
  return (
    <>
      <HeroSection 
        title="Rejoignez l'Aventure"
        subtitle="Devenez actrice du changement et bénéficiez d'un accompagnement d'excellence."
        image="https://images.unsplash.com/photo-1523240693567-d7962177c24f?auto=format&fit=crop&q=80&w=800"
        showButtons={false}
      />
      <div className="py-24">
        <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-2xl border border-gray-100">
          <h1 className="text-3xl font-bold text-dark mb-2 text-center">Candidature au Programme</h1>
          <p className="text-gray-500 text-center mb-10 text-sm">Veuillez remplir soigneusement tous les champs.</p>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1 tracking-wider">Nom Complet</label>
                <input type="text" required className="w-full border-b-2 border-gray-100 focus:border-primary outline-none py-2 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1 tracking-wider">Âge</label>
                <input type="number" required className="w-full border-b-2 border-gray-100 focus:border-primary outline-none py-2 transition-all" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1 tracking-wider">Commune de résidence</label>
                <input type="text" required className="w-full border-b-2 border-gray-100 focus:border-primary outline-none py-2 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1 tracking-wider">Téléphone</label>
                <input type="tel" required className="w-full border-b-2 border-gray-100 focus:border-primary outline-none py-2 transition-all" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1 tracking-wider">Email</label>
              <input type="email" required className="w-full border-b-2 border-gray-100 focus:border-primary outline-none py-2 transition-all" />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1 tracking-wider">Situation socio-économique</label>
              <select className="w-full border-b-2 border-gray-100 focus:border-primary outline-none py-2 transition-all bg-white">
                <option>Étudiante</option>
                <option>En recherche d'emploi</option>
                <option>Entrepreneure débutante</option>
                <option>Autre</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1 tracking-wider">Motivation (en quelques lignes)</label>
              <textarea rows={4} required className="w-full border-2 border-gray-100 rounded-lg focus:border-primary outline-none p-3 transition-all"></textarea>
            </div>
            
            <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-secondary transition-all shadow-lg transform active:scale-95">
              Soumettre ma Candidature
            </button>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}
