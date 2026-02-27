"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "Gouvernement du Bénin", logo: "/logos/inf.png" },
  { name: "Institut National de la Femme", logo: "/logos/inf.png" },
  { name: "UN Women", logo: "/logos/unwomen.png" },
  { name: "Plan International", logo: "/logos/plan.jfif" },
  { name: "Affaires Sociales", logo: "/logos/social.jfif" },
];

export default function PartnerMarquee() {
  return (
    <section className="py-12 bg-white overflow-hidden border-y border-gray-100">
      <div className="flex whitespace-nowrap">
        <motion.div 
          className="flex gap-20 items-center"
          animate={{ x: [0, -1030] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {[...partners, ...partners, ...partners].map((partner, i) => (
            <div key={i} className="flex items-center justify-center min-w-[200px] h-20 opacity-90 hover:opacity-100 transition-all duration-500 px-4">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
