import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex flex-col">
              <span className="text-white font-bold text-2xl tracking-widest">WOMANDLA</span>
              <span className="text-gold text-[10px] uppercase font-medium leading-none">
                Autonomisation Féminine au Bénin
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Programme national d'autonomisation des jeunes femmes au Bénin. Une initiative stratégique pour transformer durablement l'avenir du pays.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-semibold mb-6">Liens Rapides</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/a-propos" className="hover:text-gold transition-colors">À propos de nous</Link></li>
              <li><Link href="/programme" className="hover:text-gold transition-colors">Notre Programme</Link></li>
              <li><Link href="/partenaires" className="hover:text-gold transition-colors">Partenaires & Soutenir</Link></li>
              <li><Link href="/candidater" className="hover:text-gold transition-colors">Candidater</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold font-semibold mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>Cotonou, Bénin</li>
              <li>contact@womandla.bj</li>
              <li>+229 00 00 00 00</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-gold font-semibold mb-6">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-300 text-white/80">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-300 text-white/80">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-300 text-white/80">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-300 text-white/80">
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} WOMANDLA. Tous droits réservés. République du Bénin.</p>
        </div>
      </div>
    </footer>
  );
}
