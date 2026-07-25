import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { getWhatsAppLink } from '../data/siteData';
import { Menu, X, MessageCircle } from 'lucide-react';

interface HeaderProps {
  onOpenBookingModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBookingModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Benefícios', href: '#beneficios' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#111812]/95 backdrop-blur-md border-b border-[#4A5D3A]/20 py-3.5 shadow-lg shadow-black/20' 
          : 'bg-gradient-to-b from-[#111812]/80 via-[#111812]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <BrandLogo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#F5EFDD]/80 hover:text-[#8FBF6E] transition-colors duration-200 relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8FBF6E] group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
          </nav>

          {/* WhatsApp CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7CB259] text-[#111812] font-semibold text-sm hover:bg-[#8FBF6E] transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,178,89,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 fill-[#111812] stroke-[#111812]" />
              <span>Agende via WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 rounded-full bg-[#7CB259] text-[#111812] hover:bg-[#8FBF6E]"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#F5EFDD] hover:bg-[#4A5D3A]/20 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111812] border-b border-[#4A5D3A]/30 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-[#F5EFDD] hover:text-[#8FBF6E] hover:bg-[#4A5D3A]/20 transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#4A5D3A]/20 flex flex-col gap-2">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#7CB259] text-[#111812] font-semibold text-base"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Agendar via WhatsApp</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal();
              }}
              className="w-full py-2.5 text-center text-xs text-[#8FBF6E] underline hover:text-[#F5EFDD]"
            >
              Simular Agendamento Rápido
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
