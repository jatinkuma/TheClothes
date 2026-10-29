import React from 'react';
import { Crown, MapPin, Phone, Mail, Instagram, Facebook, MessageCircle, ArrowUp } from 'lucide-react';

/**
 * Custom Pinterest SVG Icon
 */
function PinterestIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.33 1.365-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.537.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="visit" className="bg-[#140D08] text-[#F3DFB2] pt-20 pb-12 border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-amber-900/25">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Crown className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                The Royal Attire
              </span>
            </div>
            
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Curators of imperial Rajasthani sartorial heritage. Every thread, pleat, and jewel honours the royal courts of Jodhpur, Jaipur, and Mewar.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-amber-600/30 text-amber-200 border border-amber-900/30 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-amber-600/30 text-amber-200 border border-amber-900/30 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Pinterest"
              >
                <PinterestIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-amber-600/30 text-amber-200 border border-amber-900/30 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/?text=Hello%20The%20Royal%20Attire"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-emerald-600/30 text-emerald-400 border border-amber-900/30 flex items-center justify-center transition-all hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Showroom Details Column (Prompt Requirement) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              VISIT THE SHOWROOM
            </h4>
            <div className="font-serif text-xl sm:text-2xl text-white font-semibold leading-snug">
              Chandpole Bazaar, Rajasthan 302001
            </div>
            <div className="space-y-2 text-sm text-neutral-400 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Historic Walled City, Jaipur District</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Private Viewings: +91 141 234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>concierge@theroyalattire.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <a href="#collection" className="hover:text-amber-400 transition-colors">
                  The Royal Collection
                </a>
              </li>
              <li>
                <a href="#atelier" className="hover:text-amber-400 transition-colors">
                  Atelier & Karigars
                </a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-amber-400 transition-colors">
                  Centuries of Heritage
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-amber-400 transition-colors">
                  Showroom Appointments
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            &copy; {new Date().getFullYear()} The Royal Attire. All rights reserved. Made by hand, worn by royalty.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}

