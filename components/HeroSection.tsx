"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  title?: React.ReactNode;
  subtitle?: string;
  image?: string;
  showButtons?: boolean;
}

export default function HeroSection({ 
  title = <>Autonomiser les jeunes femmes. <br /><span className="text-gold">Transformer durablement le Bénin.</span></>,
  subtitle = "Un programme national d'envergure dédié à l'excellence, l'entrepreneuriat et le leadership féminin dans les 77 communes.",
  image = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
  showButtons = true
}: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-primary min-h-[60vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt="Background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent pointer-events-none z-0" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-7xl font-bold text-white leading-tight tracking-tight">
              {title}
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
            
            {showButtons && (
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  href="/partenaires" 
                  className="bg-gold text-white px-8 py-4 rounded font-bold hover:scale-105 transition-transform shadow-lg"
                >
                  Devenir Partenaire
                </Link>
                <Link 
                  href="/soutenir" 
                  className="bg-white text-primary px-8 py-4 rounded font-bold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Soutenir le Programme
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
