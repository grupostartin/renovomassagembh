import React from 'react';
import { Service } from '../types';
import { getWhatsAppLink } from '../data/siteData';
import { X, Sparkles, CheckCircle2, AlertCircle, MessageCircle, Heart, Info } from 'lucide-react';

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
        <div className="relative h-56 sm:h-64 w-full overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            decoding="async"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15140C]/90 via-[#15140C]/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-[#F2F0EA]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4E7A36] text-[#F2F0EA] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              {service.category}
            </span>
            <h3 id={`service-title-${service.id}`} className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          
          <p className="text-base text-[#15140C]/80 leading-relaxed font-normal">
            {service.fullDescription}
          </p>

          {/* Recommended For Box */}
          <div className="p-4 rounded-2xl bg-[#4D5240]/10 border border-[#4D5240]/20 flex items-start gap-3">
            <Heart className="w-5 h-5 text-[#4D5240] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#4D5240]">Recomendado para</h4>
              <p className="text-sm font-medium text-[#15140C] mt-0.5">{service.recommendedFor}</p>
            </div>
          </div>

          {/* Main Benefits */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#15140C] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4E7A36]" />
              Principais Benefícios
            </h4>
            <ul className="grid grid-cols-1 gap-2.5">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#15140C]/75">
                  <CheckCircle2 className="w-4 h-4 text-[#4D5240] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* When to choose */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#15140C] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8D8074]" />
              Quando escolher
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.indications.map((ind, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8D8074]/10 text-[#15140C] text-xs font-medium border border-[#8D8074]/20">
                  <AlertCircle className="w-3.5 h-3.5 text-[#8D8074]" />
                  {ind}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl border border-[#C4B49A]/30 bg-white/65 p-4 text-xs leading-relaxed text-[#15140C]/65">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#4D5240]" />
            <p>
              Informe antes da sessão se estiver grávida, usar anticoagulantes ou tiver lesões,
              sensibilidade, doença de pele ou outra condição de saúde. Os serviços promovem
              bem-estar e não substituem avaliação ou tratamento médico.
            </p>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-6 bg-[#E8E5DE] border-t border-[#C4B49A]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#15140C]/65 text-center sm:text-left">
            <p className="font-medium text-[#15140C]">Atendimento em Belo Horizonte - MG</p>
            <p>Sessões com hora marcada e ambiente esterilizado.</p>
          </div>

          <a
            href={getWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#4E7A36] text-[#F2F0EA] font-semibold text-sm hover:bg-[#4D5240] transition-all duration-300 shadow-lg shadow-[#4E7A36]/20"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Agendar este serviço</span>
          </a>
        </div>

      </div>

    </div>
  );
};
