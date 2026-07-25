import React, { useState } from 'react';
import { SERVICES, getWhatsAppLink } from '../data/siteData';
import { X, Calendar, Clock, User, MessageCircle, CheckCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES[0].id);
  const [preferredDay, setPreferredDay] = useState('Segunda-feira');
  const [preferredShift, setPreferredShift] = useState('Manhã (08h às 12h)');
  const [clientName, setClientName] = useState('');

  if (!isOpen) return null;

  const selectedService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const daysOptions = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ];

  const shiftOptions = [
    'Manhã (08h às 12h)',
    'Tarde (13h às 17h)',
    'Noite (17h às 20h)'
  ];

  const handleConfirmAndSend = () => {
    const namePart = clientName.trim() ? `Meu nome é ${clientName.trim()}. ` : '';
    const message = `Olá! ${namePart}Gostaria de agendar uma sessão de *${selectedService.title}* na Renovo Massagem. Prefiro no dia *${preferredDay}*, período da *${preferredShift}*. Como está a disponibilidade?`;
    window.open(getWhatsAppLink(message), '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111812]/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      
      <div 
        className="relative w-full max-w-lg bg-[#F3EFE6] text-[#1E241A] rounded-3xl shadow-2xl p-6 sm:p-8 my-8 border border-[#8A6B4F]/20 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#1E241A]/10 text-[#1E241A] hover:bg-[#1E241A]/20 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="mb-6 pr-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A5D3A]/10 text-[#4A5D3A] text-xs font-semibold uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5" />
            Agendamento Rápido
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E241A]">
            Escolha seu Horário
          </h3>
          <p className="text-xs sm:text-sm text-[#1E241A]/70 mt-1">
            Monte sua preferência para enviarmos a confirmação pelo WhatsApp.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          
          {/* Client Name (Optional) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1E241A]/80 mb-2 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#5C6B47]" />
              Seu Nome (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ex: Maria Silva"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#FBF9F5] border border-[#8A6B4F]/30 focus:border-[#4A5D3A] focus:outline-none text-sm text-[#1E241A]"
            />
          </div>

          {/* Select Service */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1E241A]/80 mb-2">
              Escolha a Massagem
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SERVICES.map((serv) => (
                <button
                  key={serv.id}
                  type="button"
                  onClick={() => setSelectedServiceId(serv.id)}
                  className={`p-3 rounded-xl text-left border text-xs font-medium transition-all flex items-center justify-between ${
                    selectedServiceId === serv.id
                      ? 'bg-[#4A5D3A] text-[#F5EFDD] border-[#4A5D3A] shadow-md'
                      : 'bg-[#FBF9F5] text-[#1E241A] border-[#8A6B4F]/20 hover:border-[#4A5D3A]/50'
                  }`}
                >
                  <span>{serv.title}</span>
                  {selectedServiceId === serv.id && <CheckCircle className="w-4 h-4 text-[#7CB259] shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Day */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1E241A]/80 mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#5C6B47]" />
              Dia Preferencial
            </label>
            <select
              value={preferredDay}
              onChange={(e) => setPreferredDay(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#FBF9F5] border border-[#8A6B4F]/30 focus:border-[#4A5D3A] focus:outline-none text-sm text-[#1E241A]"
            >
              {daysOptions.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {/* Preferred Shift */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1E241A]/80 mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#5C6B47]" />
              Turno de Preferência
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {shiftOptions.map((shift) => (
                <button
                  key={shift}
                  type="button"
                  onClick={() => setPreferredShift(shift)}
                  className={`p-2.5 rounded-xl text-center border text-xs font-medium transition-all ${
                    preferredShift === shift
                      ? 'bg-[#4A5D3A] text-[#F5EFDD] border-[#4A5D3A]'
                      : 'bg-[#FBF9F5] text-[#1E241A] border-[#8A6B4F]/20 hover:border-[#4A5D3A]/50'
                  }`}
                >
                  {shift.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="mt-8 pt-4 border-t border-[#8A6B4F]/20 flex flex-col gap-2">
          <button
            onClick={handleConfirmAndSend}
            className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-[#7CB259] text-[#111812] font-semibold text-base hover:bg-[#8FBF6E] transition-all duration-300 shadow-lg shadow-[#7CB259]/20"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Confirmar e enviar mensagem</span>
          </button>
          <p className="text-[11px] text-center text-[#1E241A]/60">
            Abre diretamente seu WhatsApp com a mensagem pronta.
          </p>
        </div>

      </div>

    </div>
  );
};
