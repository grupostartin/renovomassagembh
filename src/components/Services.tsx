import React, { useState, useMemo } from 'react';
import { SERVICES, COUPLE_MASSAGE, NEED_OPTIONS, getWhatsAppLink } from '../data/siteData';
import { Service } from '../types';
import { ServiceModal } from './ServiceModal';
import { GlassButton } from './GlassButton';
import { Sparkles, Clock3, Tag, MessageCircle, Info, Users, ArrowRight } from 'lucide-react';

interface ServicesProps {
  activeNeedFilterId?: string | null;
  onClearFilter?: () => void;
}

export const Services: React.FC<ServicesProps> = ({ activeNeedFilterId, onClearFilter }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [localFilter, setLocalFilter] = useState<string | null>(activeNeedFilterId || null);

  // Sync if prop changes
  React.useEffect(() => {
    if (activeNeedFilterId !== undefined) {
      setLocalFilter(activeNeedFilterId);
    }
  }, [activeNeedFilterId]);

  const activeNeed = NEED_OPTIONS.find((n) => n.id === localFilter);

  const filteredServices = useMemo(() => {
    if (!localFilter || !activeNeed) return SERVICES;
    return SERVICES.filter((s) => activeNeed.relatedServiceIds.includes(s.id));
  }, [localFilter, activeNeed]);

  return (
    <section id="servicos" className="py-24 bg-[#EAE5DB] text-[#15140C] relative overflow-hidden">
      
      {/* Decorative background watermark */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#4E7A36]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 rounded-full bg-[#C4B49A]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4D5240]/10 border border-[#4D5240]/25 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#4D5240]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#4D5240]">
              Atendimento personalizado em Belo Horizonte
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#15140C] mb-4">
            Nossas massagens
          </h2>
          
          <p className="text-base sm:text-lg text-[#15140C]/80 font-normal leading-relaxed">
            Encontre a massagem que combina com o que você precisa hoje.
            <br className="hidden sm:inline" /> Se estiver em dúvida,{' '}
            <a
              href={getWhatsAppLink('Olá! Estou em dúvida sobre qual massagem escolher na Renovo Massagem. Pode me ajudar?')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4E7A36] font-semibold underline hover:text-[#3F5D35] transition-colors"
            >
              fale conosco e ajudamos você a escolher
            </a>.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 md:mb-12 no-scrollbar md:flex-wrap md:justify-center">
          <button
            type="button"
            onClick={() => {
              setLocalFilter(null);
              if (onClearFilter) onClearFilter();
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all shrink-0 ${
              !localFilter
                ? 'bg-[#4D5240] text-[#F2F0EA] shadow-md'
                : 'bg-white/80 text-[#15140C]/75 hover:bg-white border border-[#C4B49A]/30'
            }`}
          >
            Todas as massagens ({SERVICES.length})
          </button>

          {NEED_OPTIONS.map((need) => {
            const isActive = localFilter === need.id;
            return (
              <button
                key={need.id}
                type="button"
                onClick={() => setLocalFilter(isActive ? null : need.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#4E7A36] text-[#F2F0EA] shadow-md'
                    : 'bg-white/80 text-[#15140C]/75 hover:bg-white border border-[#C4B49A]/30'
                }`}
              >
                {need.title}
              </button>
            );
          })}
        </div>

        {/* Active Filter Notice if filtered */}
        {localFilter && activeNeed && (
          <div className="mb-6 p-4 rounded-2xl bg-white/70 border border-[#4E7A36]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#4E7A36]">
                Filtrando por: {activeNeed.title}
              </p>
              <p className="text-sm text-[#15140C]/80 mt-0.5">
                {activeNeed.subtitle}
              </p>
            </div>
            <button
              onClick={() => {
                setLocalFilter(null);
                if (onClearFilter) onClearFilter();
              }}
              className="text-xs font-semibold text-[#4D5240] hover:text-[#15140C] underline shrink-0"
            >
              Mostrar todas as massagens
            </button>
          </div>
        )}

        {/* Services Grid (3 colunas no mobile: 3-3-1 / 3 colunas no desktop) */}
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 lg:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#C4B49A]/30 hover:border-[#4E7A36] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div 
                  className="relative h-24 sm:h-52 w-full overflow-hidden cursor-pointer"
                  onClick={() => setSelectedService(service)}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15140C]/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Category badge */}
                  <span className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#15140C]/80 text-[#F2F0EA] text-[9px] sm:text-xs font-medium backdrop-blur-md">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#9BC47C]" />
                    <span className="hidden sm:inline">{service.category}</span>
                    <span className="sm:hidden">{service.category.split(' ')[0]}</span>
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-2 sm:p-6">
                  {/* 1. Nome */}
                  <h3 
                    onClick={() => setSelectedService(service)}
                    className="font-serif text-xs sm:text-2xl font-semibold text-[#15140C] mb-1 sm:mb-2 hover:text-[#4E7A36] transition-colors cursor-pointer line-clamp-2 leading-tight"
                  >
                    {service.title}
                  </h3>

                  {/* 2. Descrição curta (Desktop e telas maiores) */}
                  <p className="hidden sm:block text-xs sm:text-sm text-[#15140C]/75 font-normal leading-relaxed mb-4 sm:min-h-[44px]">
                    {service.shortDescription}
                  </p>

                  {/* 3. Duração e 4. Valor */}
                  <div className="pt-1.5 sm:pt-3 border-t border-[#C4B49A]/25 space-y-1 sm:space-y-2">
                    <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-medium text-[#15140C]/75">
                      <Clock3 className="w-3 h-3 sm:w-4 sm:h-4 text-[#4D5240] shrink-0" />
                      <span className="truncate">
                        {service.sessionOptions.map((o) => `${o.durationMinutes}m`).join('/')}
                      </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-[#15140C]/75">
                      <Tag className="w-4 h-4 text-[#4E7A36] shrink-0" />
                      <span>
                        <strong>Valor:</strong> Sob consulta no WhatsApp
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Botão AGENDAR + Botão Detalhes */}
              <div className="p-2 sm:px-6 sm:pb-6 sm:pt-1 space-y-1 sm:space-y-2">
                {/* Botão AGENDAR */}
                <GlassButton
                  href={getWhatsAppLink(`Olá! Gostaria de agendar a *${service.title}* na Renovo Massagem.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  className="w-full uppercase tracking-wider text-[10px] sm:text-sm py-1.5 sm:py-2.5 px-1"
                >
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 fill-current shrink-0" />
                  <span>Agendar</span>
                </GlassButton>

                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="w-full inline-flex items-center justify-center gap-1 py-1 text-[10px] sm:text-xs font-semibold text-[#4D5240] hover:text-[#15140C] transition-colors"
                >
                  <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Ver mais detalhes</span>
                  <span className="sm:hidden">Detalhes</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* ─── 6. Massagem em Dupla (Destaque Especial) ────────────────────── */}
        <div className="mt-8 md:mt-16 bg-gradient-to-br from-[#1a1910] via-[#24261a] to-[#15140C] rounded-3xl p-6 sm:p-12 text-[#F2F0EA] border border-[#4E7A36]/30 shadow-2xl relative overflow-hidden">
          
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#4E7A36]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4E7A36]/25 border border-[#4E7A36]/40 text-[#F2F0EA] text-xs font-bold uppercase tracking-widest mb-3">
                <Users className="w-4 h-4 text-[#9BC47C]" />
                <span>Experiência compartilhada</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#F2F0EA] mb-2 sm:mb-3">
                {COUPLE_MASSAGE.title}
              </h3>

              <p className="text-sm sm:text-lg text-[#F2F0EA]/85 font-light leading-relaxed mb-3">
                {COUPLE_MASSAGE.description}
              </p>

              <p className="text-xs text-[#C4B49A]/90 italic">
                * Realizada para casais, amigos, mães e filhas ou qualquer dupla, no mesmo ambiente e ao mesmo tempo.
              </p>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <GlassButton
                href={getWhatsAppLink(COUPLE_MASSAGE.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{COUPLE_MASSAGE.buttonText}</span>
              </GlassButton>
            </div>
          </div>

        </div>

      </div>

      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

    </section>
  );
};
