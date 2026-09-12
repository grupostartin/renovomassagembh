import React from 'react';
import { NEED_OPTIONS, NeedOption, getWhatsAppLink } from '../data/siteData';
import { ArrowDown, MessageCircle, Sparkles } from 'lucide-react';

import serviceRelaxingImg from '../assets/images/service_relaxing_1784953138023.jpg';
import serviceTherapeuticImg from '../assets/images/service_therapeutic_1784953146980.jpg';
import serviceReflexologyImg from '../assets/images/service_reflexology_1784953168367.jpg';

const NEED_IMAGES: Record<string, string> = {
  'relaxar-descansar': serviceRelaxingImg,
  'aliviar-dores': serviceTherapeuticImg,
  'desintoxicar-desinchar': serviceRelaxingImg,
  'pes-pernas': serviceReflexologyImg,
};

interface NeedPickerProps {
  onSelectNeed?: (need: NeedOption) => void;
  activeNeedId?: string | null;
}

export const NeedPicker: React.FC<NeedPickerProps> = ({ onSelectNeed, activeNeedId }) => {
  const handleCardClick = (need: NeedOption) => {
    if (onSelectNeed) {
      onSelectNeed(need);
    }
    const target = document.getElementById('servicos');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="necessidades" className="py-16 sm:py-20 bg-[#F2F0EA] text-[#15140C] border-b border-[#C4B49A]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4D5240]/10 border border-[#4D5240]/25 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#4D5240]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#4D5240]">
              Escolha por necessidade
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#15140C] mb-3">
            O que seu corpo precisa hoje?
          </h2>
          <p className="text-base sm:text-lg text-[#15140C]/75 font-normal leading-relaxed">
            Escolha o que mais combina com o que você está sentindo.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {NEED_OPTIONS.map((need) => {
            const isSelected = activeNeedId === need.id;
            const img = NEED_IMAGES[need.id] || serviceRelaxingImg;

            return (
              <div
                key={need.id}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#4E7A36] ring-2 ring-[#4E7A36] shadow-xl'
                    : 'border-[#C4B49A]/30 hover:border-[#4E7A36] shadow-md hover:shadow-xl hover:-translate-y-1'
                } bg-white`}
                onClick={() => handleCardClick(need)}
              >
                {/* Background Image Container */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden">
                  <img
                    src={img}
                    alt={need.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15140C]/85 via-[#15140C]/40 to-transparent" />

                  {/* Title pill over image */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-[#4E7A36] text-[#F2F0EA] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
                      Foco do atendimento
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#F2F0EA] leading-tight">
                      {need.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <p className="text-sm text-[#15140C]/80 font-normal leading-relaxed mb-4">
                    “{need.subtitle}”
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#C4B49A]/20">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(need);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#4D5240]/10 hover:bg-[#4D5240] text-[#4D5240] hover:text-[#F2F0EA] text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <span>Ver massagens indicadas</span>
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={getWhatsAppLink(need.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-transparent hover:bg-[#4E7A36]/10 text-[#4E7A36] text-xs font-semibold transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Falar direto no WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
