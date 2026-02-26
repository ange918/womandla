"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-dark mb-12 text-center">Contactez-nous</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-light p-8 rounded-2xl">
                <h3 className="font-bold text-xl mb-4 text-primary">Siège National</h3>
                <p className="text-gray-600">
                  Avenue Jean-Paul II, Cotonou<br />
                  République du Bénin
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">@</div>
                  <span className="text-gray-700">contact@womandla.bj</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">T</div>
                  <span className="text-gray-700">+229 21 00 00 00</span>
                </div>
              </div>
            </div>
            
            <form className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-4">
              <div>
                <label className="block text-sm font-bold text-dark mb-1">Nom Complet</label>
                <input type="text" className="w-full border-gray-200 border rounded-lg p-3 outline-none focus:border-primary transition-colors" placeholder="Jean Dupont" />
              </div>
              <div>
                <label className="block text-sm font-bold text-dark mb-1">Email</label>
                <input type="email" className="w-full border-gray-200 border rounded-lg p-3 outline-none focus:border-primary transition-colors" placeholder="jean@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-dark mb-1">Message</label>
                <textarea rows={4} className="w-full border-gray-200 border rounded-lg p-3 outline-none focus:border-primary transition-colors" placeholder="Votre message ici..."></textarea>
              </div>
              <button className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-secondary transition-colors shadow-lg">
                Envoyer le Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
