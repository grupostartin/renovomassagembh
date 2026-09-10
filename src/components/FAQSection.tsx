import React, { useState } from 'react';
import { FAQ_ITEMS, getWhatsAppLink } from '../data/siteData';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="duvidas" className="py-24 bg-[#EAE5DB] text-[#15140C] relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#4E7A36]/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4D5240]/10 border border-[#4D5240]/25 mb-4 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#4D5240]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#4D5240]">
              Tire suas dúvidas
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#15140C] mb-4">
            Dúvidas frequentes
          </h2>
          <p className="text-base sm:text-lg text-[#15140C]/75 font-normal leading-relaxed">
            Respostas simples para as principais perguntas sobre nossos atendimentos.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#C4B49A]/30 overflow-hidden shadow-sm transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-[#F8F5EF] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl font-semibold text-[#15140C] leading-snug">
                    {item.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#4D5240]/10 flex items-center justify-center shrink-0 text-[#4D5240]">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#4E7A36]' : ''
                      }`}
                    />
                  </div>
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? '240px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#15140C]/80 leading-relaxed border-t border-[#C4B49A]/15">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct WhatsApp Prompt */}
        <div className="mt-12 p-6 rounded-2xl bg-white/70 border border-[#4E7A36]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-[#15140C]">Ainda tem alguma dúvida?</h4>
            <p className="text-xs sm:text-sm text-[#15140C]/70 mt-0.5">
              Fale diretamente conosco e responderemos com atenção no WhatsApp.
            </p>
          </div>
          <a
            href={getWhatsAppLink('Olá! Tenho uma dúvida sobre a Renovo Massagem.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4E7A36] text-[#F2F0EA] font-semibold text-xs uppercase tracking-wider hover:bg-[#4D5240] transition-colors shrink-0 shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
