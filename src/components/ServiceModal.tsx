import React from 'react';
import { Service } from '../types';
import { getWhatsAppLink } from '../data/siteData';
import { GlassButton } from './GlassButton';
import { X, Sparkles, CheckCircle2, AlertCircle, MessageCircle, Heart, Info, Clock3 } from 'lucide-react';

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  const whatsappMessage = `Olá! Gostaria de agendar uma sessão de *${service.title}* na Renovo Massagem.`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#15140C]/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`service-title-${service.id}`}
    >
      
      <div 
        className="relative w-full max-w-2xl bg-[#F2F0EA] text-[#15140C] rounded-3xl shadow-2xl overflow-hidden my-8 border border-[#C4B49A]/25 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#15140C]/60 text-[#F2F0EA] hover:bg-[#15140C] transition-colors shadow-lg"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-36 sm:h-64 w-full overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            decoding="async"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15140C]/90 via-[#15140C]/40 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 text-[#F2F0EA]">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#4E7A36] text-[#F2F0EA] text-[11px] sm:text-xs font-semibold mb-1 sm:mb-2">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {service.category}
            </span>
            <h3 id={`service-title-${service.id}`} className="font-serif text-xl sm:text-3xl font-semibold tracking-wide leading-tight">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-8 space-y-4 sm:space-y-6 max-h-[65vh] sm:max-h-[60vh] overflow-y-auto custom-scrollbar">
          
          <p className="text-xs sm:text-base text-[#15140C]/80 leading-relaxed font-normal">
            {service.fullDescription}
          </p>

          {/* Session duration options */}
          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold text-[#15140C] mb-2 sm:mb-3 flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-[#4D5240]" />
              Duração & Valor
            </h4>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {service.sessionOptions.map((option) => (
                <div
                  key={option.durationMinutes}
                  className="flex items-center justify-between gap-3 rounded-xl sm:rounded-2xl border border-[#C4B49A]/30 bg-white/80 px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-sm"
                >
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-[#15140C]">
                      {option.durationMinutes} minutos
                    </p>
                    {option.note && (
                      <p className="mt-0.5 text-[11px] sm:text-xs text-[#15140C]/60">{option.note}</p>
                    )}
                  </div>
                  {option.price && (
                    <span className="text-sm sm:text-base font-bold text-[#4E7A36]">
                      R$ {option.price}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recommended For Box */}
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#4D5240]/10 border border-[#4D5240]/20 flex items-start gap-2.5 sm:gap-3">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#4D5240] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#4D5240]">Recomendado para</h4>
              <p className="text-xs sm:text-sm font-medium text-[#15140C] mt-0.5 leading-snug">{service.recommendedFor}</p>
            </div>
          </div>

          {/* Main Benefits */}
          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold text-[#15140C] mb-2 sm:mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4E7A36]" />
              Principais Benefícios
            </h4>
            <ul className="grid grid-cols-1 gap-2">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#15140C]/75">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4D5240] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* When to choose */}
          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold text-[#15140C] mb-2 sm:mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8D8074]" />
              Indicações
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {service.indications.map((ind, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#8D8074]/10 text-[#15140C] text-[11px] sm:text-xs font-medium border border-[#8D8074]/20">
                  <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8D8074]" />
                  {ind}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-xl sm:rounded-2xl border border-[#C4B49A]/30 bg-white/65 p-3 sm:p-4 text-[11px] sm:text-xs leading-relaxed text-[#15140C]/65">
            <Info className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-[#4D5240]" />
            <p>
              Informe antes da sessão se tiver alguma condição especial de saúde. Os serviços promovem bem-estar e não substituem tratamento médico.
            </p>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-6 bg-[#E8E5DE] border-t border-[#C4B49A]/25 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="text-[11px] sm:text-xs text-[#15140C]/65 text-center sm:text-left">
            <p className="font-medium text-[#15140C]">Atendimento em Belo Horizonte - MG</p>
            <p className="hidden sm:block">Sessões com hora marcada no bairro Palmares.</p>
          </div>

          <GlassButton
            href={getWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-xs py-2.5 sm:py-3"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Agendar no WhatsApp</span>
          </GlassButton>
        </div>

      </div>

    </div>
  );
};
