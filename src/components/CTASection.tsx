import React from 'react';
import { getWhatsAppLink } from '../data/siteData';
import { MessageCircle, Sparkles, Calendar } from 'lucide-react';

interface CTASectionProps {
  onOpenBookingModal: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenBookingModal }) => {
  return (
    // Gradiente: verde militar escuro → preto esverdeado
    <section id="contato" className="py-20 bg-gradient-to-r from-[#2a2c1e] via-[#1f2117] to-[#15140C] text-[#F2F0EA] relative overflow-hidden border-y border-[#4D5240]/30">
      
      {/* Background organic blur — verde folha suave */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#4E7A36]/08 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 bg-[#15140C]/40 p-8 sm:p-12 rounded-3xl border border-[#4E7A36]/20 backdrop-blur-md">
          
          <div className="flex items-start gap-5 max-w-2xl">
            <div className="w-14 h-14 rounded-2xl bg-[#4E7A36]/20 border border-[#4E7A36]/40 flex items-center justify-center text-[#4E7A36] shrink-0 mt-1">
              <MessageCircle className="w-8 h-8 fill-current" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#4E7A36] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Atendimento Personalizado BH</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F2F0EA] tracking-wide mb-3">
                Pronta para renovar?
              </h2>

              <p className="text-base sm:text-lg text-[#F2F0EA]/80 font-light leading-relaxed">
                Agende sua massagem e sinta a diferença no seu corpo e na sua mente. Atendimento com hora marcada em Belo Horizonte.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto shrink-0">
            <a
              href={getWhatsAppLink('Olá! Gostaria de verificar horários disponíveis para agendar uma massagem.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#4E7A36] text-[#F2F0EA] font-semibold text-base hover:bg-[#4D5240] transition-all duration-300 shadow-xl shadow-[#4E7A36]/20 hover:shadow-[#4E7A36]/35 hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Agende via WhatsApp</span>
            </a>

            <button
              onClick={onOpenBookingModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#15140C]/60 hover:bg-[#15140C] text-[#F2F0EA] border border-[#4D5240]/45 hover:border-[#4E7A36] text-sm font-medium transition-all duration-300"
            >
              <Calendar className="w-4 h-4 text-[#4E7A36]" />
              <span>Escolher Horário</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
