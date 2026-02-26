"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "Gouvernement du Bénin", logo: "🇧🇯" },
  { name: "Institut National de la Femme", logo: "🚺" },
  { name: "Plan International", logo: "🌍" },
  { name: "UNICEF", logo: "🇺🇳" },
  { name: "Banque Mondiale", logo: "🏦" },
  { name: "Agence Française de Développement", logo: "🇫🇷" },
];

export default function PartnerMarquee() {
  return (
    <section className="py-12 bg-light overflow-hidden border-y border-gray-100">
      <div className="flex whitespace-nowrap">
        <motion.div 
          className="flex gap-16 items-center"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...partners, ...partners, ...partners].map((partner, i) => (
            <div key={i} className="flex items-center gap-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-3xl">{partner.logo}</span>
              <span className="text-xl font-bold text-gray-400 uppercase tracking-tighter">{partner.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
