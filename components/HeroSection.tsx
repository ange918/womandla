"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/30 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
              Autonomiser les jeunes femmes. <br />
              <span className="text-gold">Transformer durablement le Bénin.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl">
              Un programme national d'envergure dédié à l'excellence, l'entrepreneuriat et le leadership féminin dans les 77 communes.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/partenaires" 
                className="bg-gold text-white px-8 py-4 rounded font-bold hover:scale-105 transition-transform shadow-lg"
              >
                Devenir Partenaire
              </Link>
              <Link 
                href="/soutenir" 
                className="bg-primary border border-secondary text-white px-8 py-4 rounded font-bold hover:bg-secondary transition-colors shadow-lg"
              >
                Soutenir le Programme
              </Link>
              <button className="text-white border-b-2 border-white/30 pb-1 hover:border-gold transition-colors text-sm font-semibold tracking-wider uppercase">
                Télécharger le Dossier
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10"
          >
            <Image
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800"
              alt="Formation féminine au Bénin"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
