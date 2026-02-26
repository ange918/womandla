"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BanknotesIcon, HeartIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";

export default function SoutenirPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <header className="mb-20 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6 tracking-tight">Soutenir WOMANDLA</h1>
          <div className="h-1.5 w-24 bg-gold mx-auto mb-8"></div>
          <p className="text-xl text-gray-600">
            Chaque geste compte. Votre soutien financier ou technique permet de pérenniser nos actions dans les 77 communes.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all group">
            <HeartIcon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-dark mb-4">Don Individuel</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">Participez directement au financement de la formation d'une jeune femme.</p>
            <button className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition-colors">Faire un don</button>
          </div>
          
          <div className="bg-white p-10 rounded-3xl border-2 border-gold shadow-xl hover:shadow-2xl transition-all scale-105 relative z-10 group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Recommandé</div>
            <BanknotesIcon className="w-12 h-12 text-gold mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-dark mb-4">Parrainage</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">Soutenez un projet entrepreneurial complet dans une commune spécifique.</p>
            <button className="w-full bg-gold text-white py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">Parrainer une commune</button>
          </div>

          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all group">
            <BuildingLibraryIcon className="w-12 h-12 text-secondary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-dark mb-4">Institutionnel</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">Partenariats stratégiques pour des programmes à grande échelle.</p>
            <button className="w-full bg-dark text-white py-3 rounded-lg font-bold hover:bg-black transition-colors">Contacter le bureau</button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-light p-10 rounded-3xl border border-gray-200">
           <div className="flex flex-col md:flex-row items-center gap-8">
             <div className="md:w-2/3 text-center md:text-left">
               <h3 className="text-2xl font-bold text-dark mb-2">Transparence Financière</h3>
               <p className="text-gray-600 text-sm">100% des fonds collectés sont directement alloués aux programmes opérationnels et à l'appui aux bénéficiaires. Consultez notre charte éthique.</p>
             </div>
             <div className="md:w-1/3">
               <button className="w-full bg-white border border-gray-300 text-dark py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors">Télécharger PDF</button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
