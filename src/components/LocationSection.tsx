import React from 'react';
import { ADDRESS_FULL, GOOGLE_MAPS_URL, BUSINESS_HOURS, getWhatsAppLink } from '../data/siteData';
import { GlassButton } from './GlassButton';
import { MapPin, Navigation, MessageCircle, Clock, CheckCircle2, Building } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="localizacao" className="py-10 md:py-24 bg-[#F2F0EA] text-[#15140C] relative overflow-hidden border-t border-[#C4B49A]/30">
      
      {/* Decorative background glow */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-[#4E7A36]/8 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4D5240]/10 border border-[#4D5240]/25 mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#4E7A36]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#4D5240]">
              Palmares • Belo Horizonte / MG
            </span>
          </div>

          {/* 12. Título */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#15140C] mb-4">
            Sua pausa está mais perto do que você imagina.
          </h2>

          {/* 12. Texto de introdução */}
          <p className="text-base sm:text-lg text-[#15140C]/80 font-normal leading-relaxed">
            A <strong>Renovo</strong> está localizada no coração do bairro <strong>Palmares</strong>, na Rua José Cleto, uma das principais vias da região, com fácil acesso pela Avenida Bernardo de Vasconcelos e próxima ao Minas Shopping.
          </p>
        </div>

        {/* Location Grid Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Info Box (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#C4B49A]/35 shadow-xl flex flex-col justify-between">
            <div>
              {/* Highlight Badge: Palmares - Belo Horizonte */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4E7A36]/15 border border-[#4E7A36]/30 text-[#3F5D35] text-xs sm:text-sm font-bold uppercase tracking-wider mb-6">
                <Building className="w-4 h-4" />
                <span>Palmares — Belo Horizonte / MG</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#15140C] mb-2">
                RENOVO MASSAGEM
              </h3>
              
              <p className="text-base sm:text-lg text-[#15140C]/85 font-medium mb-6">
                {ADDRESS_FULL}
              </p>

              {/* Key Access Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#15140C]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#4E7A36] shrink-0" />
                  <span>No coração do bairro Palmares</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#15140C]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#4E7A36] shrink-0" />
                  <span>Fácil acesso pela Av. Bernardo de Vasconcelos</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#15140C]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#4E7A36] shrink-0" />
                  <span>Próxima ao Minas Shopping</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#15140C]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#4E7A36] shrink-0" />
                  <span>Atendimento com hora marcada</span>
                </div>
              </div>
            </div>

            {/* BOTÕES: COMO CHEGAR | AGENDAR PELO WHATSAPP */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6 border-t border-[#C4B49A]/30">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#4D5240] hover:bg-[#15140C] text-[#F2F0EA] font-semibold text-sm transition-all duration-300 shadow-md text-center"
              >
                <Navigation className="w-4 h-4" />
                <span>Como chegar</span>
              </a>

              <GlassButton
                href={getWhatsAppLink('Olá! Gostaria de agendar pelo WhatsApp e saber como chegar ao espaço no bairro Palmares.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Agendar pelo WhatsApp</span>
              </GlassButton>
            </div>
          </div>

          {/* Hours Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1a1910] via-[#24261a] to-[#15140C] text-[#F2F0EA] rounded-3xl p-8 sm:p-10 border border-[#4D5240]/40 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-6 text-[#9BC47C]">
                <Clock className="w-5 h-5" />
                <h4 className="font-serif text-xl sm:text-2xl text-[#F2F0EA]">
                  Horários de Atendimento
                </h4>
              </div>

              <div className="space-y-3 divide-y divide-[#4D5240]/30 text-sm">
                {BUSINESS_HOURS.map((item) => (
                  <div key={item.day} className="pt-3 first:pt-0 flex items-center justify-between">
                    <span className="text-[#F2F0EA]/75">{item.day}</span>
                    <span className={item.open ? 'font-semibold text-[#F2F0EA]' : 'text-[#F2F0EA]/40 italic'}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#4D5240]/30 text-xs text-[#C4B49A]/80">
              <p>
                * Atendimento exclusivamente com agendamento prévio para garantir total pontualidade, silêncio e conforto.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
