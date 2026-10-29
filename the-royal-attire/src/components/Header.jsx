import React, { useState } from 'react';
import { Crown, Instagram, Facebook, MessageCircle, Menu, X } from 'lucide-react';

/**
 * Custom Pinterest SVG Icon since Lucide doesn't include Pinterest by default
 */
function PinterestIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.33 1.365-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.537.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Collection', href: '#collection' },
    { name: 'Atelier', href: '#atelier' },
    { name: 'Heritage', href: '#heritage' },
    { name: 'Visit', href: '#visit' },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com',
      ariaLabel: 'Follow us on Instagram',
    },
    {
      name: 'Pinterest',
      customIcon: PinterestIcon,
      href: 'https://pinterest.com',
      ariaLabel: 'Explore our Pinterest boards',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com',
      ariaLabel: 'Connect with us on Facebook',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: 'https://wa.me/?text=Hello%20The%20Royal%20Attire',
      ariaLabel: 'Chat with our Concierge on WhatsApp',
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#EA9B1B]/95 backdrop-blur-md border-b border-amber-900/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Brand Logo/Title */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-900 to-amber-950 flex items-center justify-center text-amber-200 shadow-md group-hover:scale-105 transition-transform">
            <Crown className="w-4 h-4 text-[#F3DFB2]" />
          </div>
          <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 group-hover:text-amber-950 transition-colors">
            The Royal Attire
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold tracking-wider uppercase text-neutral-900/80 hover:text-neutral-950 hover:underline underline-offset-8 decoration-amber-900/40 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Social Icons & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 border-l border-neutral-900/15 pl-4">
            {socialLinks.map((item) => {
              const IconComponent = item.icon || item.customIcon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  className="w-8 h-8 rounded-full bg-amber-950/10 hover:bg-neutral-900 hover:text-amber-200 text-neutral-900 flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <IconComponent className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-900 hover:bg-amber-950/10 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#EA9B1B] border-b border-amber-900/20 px-6 py-6 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif font-semibold text-neutral-950 hover:text-amber-900 py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-amber-900/20">
            {socialLinks.map((item) => {
              const IconComponent = item.icon || item.customIcon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  className="w-10 h-10 rounded-full bg-neutral-900 text-amber-200 flex items-center justify-center"
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

