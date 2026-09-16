import React, { useState } from 'react';
import { HERO_IMAGES, PROFESSIONAL_CARE_NOTICE, ENXOVAL_NOTICE, getWhatsAppLink } from '../data/siteData';
import { GlassButton } from './GlassButton';
import { MapPin, MessageCircle, Sparkles, ShieldCheck, Star } from 'lucide-react';
import { Testimonials } from './Testimonials';

export const AboutAndReviewsMobile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'reviews'>('about');

  return (
    <section id="sobre-avaliacoes" className="md:hidden py-12 bg-[#F2F0EA] text-[#15140C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4D5240]/10 border border-[#4D5240]/25 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#4E7A36]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#4D5240]">
              Credibilidade & Experiência
            </span>
          </div>

          <h2 className="font-serif text-2xl font-normal text-[#15140C]">
            Sobre a Renovo & Depoimentos
          </h2>
        </div>

        {/* Tab Buttons Switcher */}
        <div className="flex items-center justify-center p-1 bg-[#E9DFD0] rounded-full max-w-xs mx-auto mb-6 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab('about')}
            className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              activeTab === 'about'
                ? 'bg-[#4E7A36] text-[#F2F0EA] shadow-md'
                : 'text-[#15140C]/70 hover:text-[#15140C]'
            }`}
          >
            🏢 O Espaço
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1 ${
              activeTab === 'reviews'
                ? 'bg-[#4E7A36] text-[#F2F0EA] shadow-md'
                : 'text-[#15140C]/70 hover:text-[#15140C]'
            }`}
          >
            <Star className="w-3 h-3 fill-current text-yellow-400" />
            <span>Avaliações 5★</span>
          </button>
        </div>

        {/* TAB 1: ABOUT CONTENT */}
        {activeTab === 'about' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="relative rounded-2xl overflow-hidden border border-[#C4B49A]/30 shadow-lg h-56">
              <img
                src={HERO_IMAGES.spaRoom}
                alt="Espaço aconchegante da Renovo Massagem"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15140C]/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#F2F0EA]/95 backdrop-blur-md border border-[#C4B49A]/30 flex items-center gap-2.5 shadow-sm">
                <MapPin className="w-4 h-4 text-[#4E7A36] shrink-0" />
                <div className="text-xs">
                  <h4 className="font-bold text-[#15140C]">Espaço Renovo em BH</h4>
                  <p className="text-[11px] text-[#15140C]/75">Bairro Palmares • Rua José Cleto, 200</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#C4B49A]/30 space-y-3 text-xs sm:text-sm text-[#15140C]/85 leading-relaxed">
              <p>
                A <strong>Renovo</strong> nasceu com uma proposta clara: oferecer um lugar tranquilo para você parar, receber uma boa massagem e cuidar do corpo no bairro Palmares.
              </p>
              <p>
                Atendimento atencioso, ambiente climatizado, higienizado e focado na sua saúde e relaxamento.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#4D5240]/10 border border-[#4D5240]/25 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#4E7A36] shrink-0 mt-0.5" />
              <p className="text-xs text-[#15140C]/80 leading-snug">
                {PROFESSIONAL_CARE_NOTICE}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#C4B49A]/30 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#4E7A36] shrink-0" />
              <p className="text-xs text-[#15140C]/80 font-medium">
                {ENXOVAL_NOTICE}
              </p>
            </div>

            <GlassButton
              href={getWhatsAppLink('Olá! Gostaria de agendar meu horário na Renovo Massagem.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Agendar pelo WhatsApp</span>
            </GlassButton>
          </div>
        )}

        {/* TAB 2: REVIEWS CONTENT */}
        {activeTab === 'reviews' && (
          <div className="animate-fadeIn">
            <Testimonials isMobileTab />
          </div>
        )}

      </div>
    </section>
  );
};
