"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "/a-propos" },
  { name: "Programme & Impact", href: "/programme-et-impact" },
  { name: "Partenaires & Soutenir", href: "/partenaires" },
  { name: "Candidater", href: "/candidater" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-primary shadow-lg py-2" : "bg-primary py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="text-white font-bold text-2xl tracking-widest">WOMANDLA</span>
            <span className="text-gold text-[10px] uppercase font-medium leading-none">
              Autonomisation Féminine au Bénin
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white hover:text-gold transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/partenaires"
              className="bg-gold text-white px-5 py-2 rounded font-semibold text-sm hover:bg-opacity-90 transition-all shadow-md"
            >
              Devenir Partenaire
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary border-t border-secondary overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gold transition-colors text-lg"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/partenaires"
                onClick={() => setIsOpen(false)}
                className="bg-gold text-white px-5 py-3 rounded text-center font-bold"
              >
                Devenir Partenaire
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
