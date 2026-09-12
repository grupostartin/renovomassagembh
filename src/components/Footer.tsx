import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { SERVICES, getWhatsAppLink, INSTAGRAM_HANDLE, INSTAGRAM_URL, ADDRESS_FULL, GOOGLE_MAPS_URL, GOOGLE_REVIEWS_URL, PHONE_DISPLAY, BUSINESS_HOURS } from '../data/siteData';
import { Instagram, MapPin, Clock, MessageCircle, Heart, ChevronDown } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [hoursOpen, setHoursOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'O que você precisa?', href: '#necessidades' },
    { name: 'Nossas Massagens', href: '#servicos' },
    { name: 'Sobre a Renovo', href: '#sobre' },
    { name: 'Avaliações', href: '#depoimentos' },
    { name: 'Localização', href: '#localizacao' },
    { name: 'Dúvidas', href: '#duvidas' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <footer className="bg-[#15140C] text-[#F2F0EA] pt-16 pb-8 border-t border-[#4D5240]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#4D5240]/20">
          
          {/* Brand Manifesto & Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Logo com variante light */}
            <BrandLogo variant="light" />
            <p className="text-sm text-[#F2F0EA]/80 font-light leading-relaxed max-w-sm pt-2">
              Uma pausa na rotina para aliviar tensões, relaxar o corpo e cuidar do seu bem-estar.
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9BC47C]">
              Cuidado, Alívio e Bem-estar.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1910] border border-[#4D5240]/40 text-[#F2F0EA] hover:border-[#4E7A36] hover:text-[#4E7A36] transition-all"
              >
                <Instagram className="w-3.5 h-3.5 text-[#4E7A36]" />
                <span>Instagram</span>
              </a>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1910] border border-[#4D5240]/40 text-[#F2F0EA] hover:border-[#4E7A36] hover:text-[#4E7A36] transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#4E7A36]" />
                <span>WhatsApp</span>
              </a>
              <a
                href="#localizacao"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1910] border border-[#4D5240]/40 text-[#F2F0EA] hover:border-[#4E7A36] hover:text-[#4E7A36] transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-[#4E7A36]" />
                <span>Localização</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-lg font-semibold text-[#F2F0EA] tracking-wide">
              Links Rápidos
            </h4>
            <ul className="space-y-2 text-sm text-[#F2F0EA]/65">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#4E7A36] transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-lg font-semibold text-[#F2F0EA] tracking-wide">
              Serviços
            </h4>
            <ul className="space-y-2 text-sm text-[#F2F0EA]/65">
              {SERVICES.map((serv) => (
                <li key={serv.id}>
                  <a
                    href="#servicos"
                    className="hover:text-[#4E7A36] transition-colors duration-200"
                  >
                    {serv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours Column (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-semibold text-[#F2F0EA] tracking-wide">
              Contato & Local
            </h4>
            
            <ul className="space-y-3 text-sm text-[#F2F0EA]/75">
              {/* Phone */}
              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#4E7A36] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#4E7A36] underline decoration-[#4E7A36]/40 block"
                  >
                    WhatsApp: {PHONE_DISPLAY}
                  </a>
                </div>
              </li>

              {/* Instagram */}
              <li className="flex items-start gap-2.5">
                <Instagram className="w-4 h-4 text-[#4E7A36] shrink-0 mt-0.5" />
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#4E7A36]"
                >
                  {INSTAGRAM_HANDLE}
                </a>
              </li>

              {/* Rating */}
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#4E7A36] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F2F0EA]/75 hover:text-[#4E7A36] transition-colors"
                >
                  Veja as avaliações reais no Google Maps
                </a>
              </li>

              {/* Address */}
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#4E7A36] shrink-0 mt-0.5" />
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#4E7A36] leading-snug"
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
                  <Clock className="w-4 h-4 text-[#4E7A36] shrink-0" />
                  <span className="text-sm text-[#F2F0EA]/75 group-hover:text-[#4E7A36] transition-colors">
                    Horário de funcionamento
                  </span>
                  <ChevronDown
                    className="w-4 h-4 text-[#4E7A36] ml-auto transition-transform duration-300"
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
                  <div className="pt-2 pl-6 text-xs space-y-1 text-[#F2F0EA]/65">
                    {BUSINESS_HOURS.map((h) => (
                      <p key={h.day} className="flex justify-between gap-4">
                        <span>{h.day}</span>
                        <span className={h.open ? 'text-[#F2F0EA]/85 font-medium' : 'text-[#F2F0EA]/30 italic'}>
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

        {/* Faith Motto */}
        <div className="pt-8 pb-4 flex justify-center">
          <p className="inline-flex items-center gap-2 text-sm text-[#F2F0EA]/60 font-light italic text-center">
            <Heart className="w-4 h-4 text-[#9BC47C] fill-current shrink-0" aria-hidden="true" />
            <span>Uma empresa que ama a Deus e serve as pessoas.</span>
            <Heart className="w-4 h-4 text-[#9BC47C] fill-current shrink-0" aria-hidden="true" />
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-4 border-t border-[#4D5240]/10 flex flex-col lg:flex-row items-center justify-between text-xs text-[#F2F0EA]/45 gap-4">
          <p>© {currentYear} Renovo Massagem. Todos os direitos reservados.</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2" aria-label="Links legais">
            <a href="/politica-de-privacidade" className="hover:text-[#4E7A36] transition-colors">
              Política de Privacidade
            </a>
            <a href="/termos-de-uso" className="hover:text-[#4E7A36] transition-colors">
              Termos de Uso
            </a>
          </nav>
          <p className="flex items-center gap-1">
            <span>Desenvolvido com</span>
            <Heart className="w-3.5 h-3.5 text-[#4E7A36] fill-current" />
            <span>pela</span>
            <a
              href="https://wa.me/5531982781618?text=Quero%20um%20site%20para%20minha%20empresa."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4E7A36] hover:text-[#4D5240] underline decoration-[#4E7A36]/40 transition-colors"
            >
              Agência Startin
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};
