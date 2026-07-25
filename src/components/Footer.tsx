import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { SERVICES, getWhatsAppLink, INSTAGRAM_HANDLE, INSTAGRAM_URL, ADDRESS_FULL, GOOGLE_MAPS_URL, PHONE_DISPLAY, BUSINESS_HOURS, RATING, RATING_COUNT } from '../data/siteData';
import { Instagram, MapPin, Clock, MessageCircle, Heart, ChevronDown } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [hoursOpen, setHoursOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Benefícios', href: '#beneficios' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <footer className="bg-[#111812] text-[#F5EFDD] pt-16 pb-8 border-t border-[#4A5D3A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#4A5D3A]/20">
          
          {/* Brand Manifesto & Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo />
            <p className="text-sm text-[#F5EFDD]/75 font-light leading-relaxed max-w-sm pt-2">
              Seu bem-estar é nossa prioridade. Oferecemos técnicas de massoterapia pensadas para renovar corpo, mente e espírito em um ambiente calmo e acolhedor em Belo Horizonte.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A2418] border border-[#4A5D3A]/40 text-xs font-medium text-[#F5EFDD] hover:border-[#7CB259] hover:text-[#8FBF6E] transition-all"
              >
                <Instagram className="w-4 h-4 text-[#8FBF6E]" />
                <span>{INSTAGRAM_HANDLE}</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-lg font-semibold text-[#F5EFDD] tracking-wide">
              Links Rápidos
            </h4>
            <ul className="space-y-2 text-sm text-[#F5EFDD]/70">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#8FBF6E] transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-lg font-semibold text-[#F5EFDD] tracking-wide">
              Serviços
            </h4>
            <ul className="space-y-2 text-sm text-[#F5EFDD]/70">
              {SERVICES.map((serv) => (
                <li key={serv.id}>
                  <a
                    href="#servicos"
                    className="hover:text-[#8FBF6E] transition-colors duration-200"
                  >
                    {serv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours Column (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-semibold text-[#F5EFDD] tracking-wide">
              Contato & Local
            </h4>
            
            <ul className="space-y-3 text-sm text-[#F5EFDD]/80">
              {/* Phone */}
              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#7CB259] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#8FBF6E] underline decoration-[#7CB259]/40 block"
                  >
                    WhatsApp: {PHONE_DISPLAY}
                  </a>
                </div>
              </li>

              {/* Instagram */}
              <li className="flex items-start gap-2.5">
                <Instagram className="w-4 h-4 text-[#7CB259] shrink-0 mt-0.5" />
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8FBF6E]"
                >
                  {INSTAGRAM_HANDLE}
                </a>
              </li>

              {/* Rating */}
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#7CB259] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-[#F5EFDD]/80">
                  <span className="text-[#7CB259] font-semibold">{RATING.toFixed(1)}</span> · {RATING_COUNT} avaliações no Google
                </span>
              </li>

              {/* Address */}
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7CB259] shrink-0 mt-0.5" />
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8FBF6E] leading-snug"
                >
                  {ADDRESS_FULL}
                </a>
              </li>

              {/* Hours — collapsible accordion */}
              <li className="flex flex-col gap-0">
                <button
                  id="footer-hours-toggle"
                  aria-expanded={hoursOpen}
                  onClick={() => setHoursOpen((v) => !v)}
                  className="flex items-center gap-2.5 w-full text-left group cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-[#7CB259] shrink-0" />
                  <span className="text-sm text-[#F5EFDD]/80 group-hover:text-[#8FBF6E] transition-colors">
                    Horário de funcionamento
                  </span>
                  <ChevronDown
                    className="w-4 h-4 text-[#7CB259] ml-auto transition-transform duration-300"
                    style={{ transform: hoursOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                {/* Animated panel */}
                <div
                  style={{
                    maxHeight: hoursOpen ? '220px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div className="pt-2 pl-6 text-xs space-y-1 text-[#F5EFDD]/70">
                    {BUSINESS_HOURS.map((h) => (
                      <p key={h.day} className="flex justify-between gap-4">
                        <span>{h.day}</span>
                        <span className={h.open ? 'text-[#F5EFDD]/90 font-medium' : 'text-[#F5EFDD]/35 italic'}>
                          {h.hours}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F5EFDD]/50 gap-4">
          <p>© {currentYear} Renovo Massagem. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Desenvolvido com</span>
            <Heart className="w-3.5 h-3.5 text-[#7CB259] fill-current" />
            <span>para seu bem-estar</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
