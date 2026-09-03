import React from 'react';
import { getWhatsAppLink } from '../data/siteData';

import serviceRelaxingImg from '../assets/images/service_relaxing_1784953138023.jpg';
import serviceTherapeuticImg from '../assets/images/service_therapeutic_1784953146980.jpg';
import serviceReflexologyImg from '../assets/images/service_reflexology_1784953168367.jpg';
import serviceCranioFacialImg from '../assets/images/service_cranio_facial.png';

// ─── "Você precisa de que?" cards ───────────────────────────────────────────
// Cada card representa uma queixa/necessidade real, com link direto ao WhatsApp
const NEED_CARDS = [
  {
    id: 'relaxar',
    label: 'Apenas\nRelaxar',
    image: serviceRelaxingImg,
    message: 'Olá! Preciso de uma massagem relaxante para aliviar o estresse do dia a dia. Quero agendar na Renovo Massagem!',
    accent: '#4D5240',
  },
  {
    id: 'cervical',
    label: 'Cuidar da\nCervical',
    image: serviceCranioFacialImg,
    message: 'Olá! Estou com desconforto na região da cervical e quero saber qual dos serviços da Renovo Massagem é mais adequado para mim.',
    accent: '#4E7A36',
  },
  {
    id: 'insonia',
    label: 'Desacelerar\ne Descansar',
    image: serviceRelaxingImg,
    message: 'Olá! Tenho dificuldade para desacelerar e quero conhecer uma opção relaxante da Renovo Massagem.',
    accent: '#4D5240',
  },
  {
    id: 'lombar',
    label: 'Cuidar da\nLombar e\nCostas',
    image: serviceTherapeuticImg,
    message: 'Olá! Estou com desconforto na lombar e nas costas e quero saber qual dos serviços da Renovo Massagem é mais adequado para mim.',
    accent: '#4E7A36',
  },
  {
    id: 'estresse',
    label: 'Relaxar\no Corpo e\na Mente',
    image: serviceRelaxingImg,
    message: 'Olá! Quero uma pausa para relaxar e conhecer a melhor opção de massagem da Renovo Massagem para mim.',
    accent: '#4D5240',
  },
  {
    id: 'pernas',
    label: 'Descansar\nPés e\nPernas',
    image: serviceReflexologyImg,
    message: 'Olá! Meus pés e pernas estão cansados. Quero conhecer a sessão Crânio Facial + Pés Relax da Renovo Massagem.',
    accent: '#4E7A36',
  },
];

export const MobileNeedPicker: React.FC = () => {
  return (
    // Só aparece em telas mobile (< md). No desktop fica oculto.
    <section className="md:hidden bg-[#F2F0EA] pb-8">
      
      {/* Título da seção */}
      <div className="px-5 pt-8 pb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#8D8074] mb-1">
          Atendimento personalizado
        </p>
        <h2
          className="font-serif leading-snug text-[#15140C]"
          style={{ fontSize: 'clamp(1.6rem, 6vw, 2rem)' }}
        >
          Você precisa de{' '}
          <span className="italic text-[#4D5240]">que hoje?</span>
        </h2>
        <p className="text-xs text-[#8D8074] mt-2 font-light">
          Toque em uma opção para ir direto ao agendamento
        </p>
      </div>

      {/* Grid de cards — 2 colunas, 3 linhas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3px',
          padding: '0 3px',
        }}
      >
        {NEED_CARDS.map((card, idx) => (
          <a
            key={card.id}
            href={getWhatsAppLink(card.message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={card.label.replace(/\n/g, ' ')}
            style={{
              position: 'relative',
              aspectRatio: '1 / 1',
              overflow: 'hidden',
              display: 'block',
              // Bordas arredondadas só nos cantos externos do grid
              borderRadius:
                idx === 0 ? '16px 0 0 0'
                : idx === 1 ? '0 16px 0 0'
                : idx === 4 ? '0 0 0 16px'
                : idx === 5 ? '0 0 16px 0'
                : '0',
            }}
          >
            {/* Foto de fundo */}
            <img
              src={card.image}
              alt={card.label.replace(/\n/g, ' ')}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease',
              }}
              className="need-card-img"
            />

            {/* Overlay gradiente */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(
                  to top,
                  rgba(21,20,12,0.82) 0%,
                  rgba(21,20,12,0.45) 50%,
                  rgba(21,20,12,0.18) 100%
                )`,
                transition: 'background 0.3s ease',
              }}
            />

            {/* Pill indicador de toque */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2.5L9.5 6L6 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.5 6H9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Label do card */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '12px 14px',
              }}
            >
              {/* Accent bar */}
              <div
                style={{
                  width: '22px',
                  height: '2.5px',
                  borderRadius: '99px',
                  background: card.accent === '#4E7A36'
                    ? '#4E7A36'
                    : '#C4B49A',
                  marginBottom: '6px',
                }}
              />
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 'clamp(0.65rem, 3.2vw, 0.78rem)',
                  fontWeight: 700,
                  color: '#F2F0EA',
                  lineHeight: 1.28,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  whiteSpace: 'pre-line',
                  margin: 0,
                  textShadow: '0 1px 6px rgba(0,0,0,0.5)',
                }}
              >
                {card.label}
              </p>
            </div>

          </a>
        ))}
      </div>

      {/* CTA de mais serviços */}
      <div className="px-5 pt-5">
        <a
          href={getWhatsAppLink('Olá! Quero conhecer todos os serviços disponíveis na Renovo Massagem e agendar meu horário.')}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl border-2 border-[#4D5240]/30 text-[#4D5240] font-semibold text-sm hover:bg-[#4D5240] hover:text-[#F2F0EA] transition-all duration-300"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          <span>Ver mais opções de serviços</span>
        </a>
      </div>

      {/* Keyframes para hover touch */}
      <style>{`
        a:active .need-card-img {
          transform: scale(1.05);
        }
      `}</style>

    </section>
  );
};
