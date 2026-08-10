import React, { useState } from 'react';
import { getWhatsAppLink } from '../data/siteData';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [tooltipVisible, setTooltipVisible] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      
      {/* Quick Tooltip Popup */}
      {tooltipVisible && (
        <div className="relative bg-[#15140C] text-[#F2F0EA] border border-[#4E7A36]/40 px-4 py-2.5 rounded-2xl shadow-xl text-xs flex items-center gap-3 animate-bounce">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4E7A36] animate-ping" />
            <span className="font-medium">Agende via WhatsApp!</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTooltipVisible(false);
            }}
            className="text-[#F2F0EA]/60 hover:text-[#F2F0EA]"
            aria-label="Fechar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          {/* Arrow pointing down */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#15140C] border-r border-b border-[#4E7A36]/40 rotate-45" />
        </div>
      )}

      {/* Floating Button */}
      <a
        href={getWhatsAppLink('Olá! Vim pelo site da Renovo Massagem e gostaria de agendar um horário.')}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#4E7A36] text-[#F2F0EA] shadow-2xl hover:bg-[#4D5240] hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Atendimento rápido via WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#4E7A36] animate-ping opacity-30" />
        <MessageCircle className="w-7 h-7 fill-current stroke-current" />
      </a>

    </div>
  );
};
