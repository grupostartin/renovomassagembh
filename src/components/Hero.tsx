import React from 'react';
import { HERO_IMAGES, getWhatsAppLink } from '../data/siteData';
import { MessageCircle, Sparkles, Award, HeartHandshake, Calendar } from 'lucide-react';

// Seeded random so positions are stable
const sr = (s: number) => { const x = Math.sin(s + 1) * 10000; return x - Math.floor(x); };
const HERO_PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x:        sr(i * 13 + 1) * 100,
  size:     2 + sr(i * 13 + 2) * 3.5,
  delay:    sr(i * 13 + 3) * 14,
  duration: 10 + sr(i * 13 + 4) * 16,
  sway:     25 + sr(i * 13 + 6) * 55,
  color:
    sr(i * 13 + 7) > 0.55
      ? `rgba(78,122,54,${(0.5 + sr(i * 13 + 8) * 0.4).toFixed(2)})`
      : sr(i * 13 + 7) > 0.28
      ? `rgba(196,180,154,${(0.45 + sr(i * 13 + 9) * 0.35).toFixed(2)})`
      : `rgba(242,240,234,${(0.3 + sr(i * 13 + 10) * 0.3).toFixed(2)})`,
}));

interface HeroProps {
  onOpenBookingModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBookingModal }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-[#15140C]">
      
      {/* Background Image with new dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGES.main}
          alt="Sessão de massagem relaxante na Renovo Massagem"
          className="w-full h-full object-cover object-center scale-105 filter brightness-90 animate-fade-in"
          referrerPolicy="no-referrer"
        />
        {/* Layered Gradient Overlays — nova paleta */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#15140C]/95 via-[#15140C]/82 to-[#15140C]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15140C] via-transparent to-[#15140C]/55" />
      </div>

      {/* Decorative Radial Blur — verde militar */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#4D5240]/18 blur-3xl pointer-events-none" />

      {/* Floating ambient particles */}
      <style>{`
        @keyframes hero-rise {
          0%   { transform: translateY(0)      translateX(0)            scale(1);   opacity: 0;    }
          7%   { opacity: 1; }
          50%  { transform: translateY(-45vh)  translateX(var(--sway))  scale(0.8); opacity: 0.9; }
          93%  { opacity: 0.2; }
          100% { transform: translateY(-105vh) translateX(calc(var(--sway)*0.4)) scale(0.5); opacity: 0; }
        }
      `}</style>
      {HERO_PARTICLES.map((p) => (
        <div
          key={p.id}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left:   `${p.x}%`,
            bottom: 0,
            width:  `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: p.color,
            boxShadow: `0 0 ${p.size * 5}px ${p.size * 2}px ${p.color}`,
            pointerEvents: 'none',
            zIndex: 2,
            ['--sway' as string]: `${p.sway}px`,
            animation: `hero-rise ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          
          {/* Eyebrow badge — verde militar */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4D5240]/30 border border-[#4E7A36]/35 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#4E7A36] animate-ping" />
            <span className="text-xs font-medium tracking-widest text-[#F2F0EA] uppercase">
              Atendimento Exclusivo em Belo Horizonte - MG
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide text-[#F2F0EA] leading-[1.12] mb-6">
            Renove seu corpo.<br />
            <span className="text-[#4E7A36] italic font-light">Reequilibre</span> sua mente.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-[#F2F0EA]/80 font-light leading-relaxed mb-8 max-w-xl">
            Massagens terapêuticas e rituais de bem-estar que aliviam tensões, reduzem o estresse diário e renovam a sua vitalidade em um ambiente calmo e acolhedor.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16">
            <a
              href={getWhatsAppLink('Olá! Vim pelo site e gostaria de agendar uma massagem na Renovo Massagem.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#4E7A36] text-[#F2F0EA] font-semibold text-base hover:bg-[#4D5240] transition-all duration-300 shadow-xl shadow-[#4E7A36]/20 hover:shadow-[#4E7A36]/40 hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Agendar minha massagem</span>
            </a>

            <button
              onClick={onOpenBookingModal}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#15140C]/60 hover:bg-[#15140C] text-[#F2F0EA] border border-[#4D5240]/45 hover:border-[#4E7A36] text-sm font-medium transition-all duration-300 backdrop-blur-sm"
            >
              <Calendar className="w-4 h-4 text-[#4E7A36]" />
              <span>Escolher serviço e horário</span>
            </button>
          </div>

          {/* 3 Key Differentials */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-[#4D5240]/30">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4D5240]/30 border border-[#4E7A36]/30 flex items-center justify-center text-[#4E7A36] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#F2F0EA]">Ambiente Acolhedor</h4>
                <p className="text-xs text-[#F2F0EA]/65">Pausa e calma no seu dia</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4D5240]/30 border border-[#4E7A36]/30 flex items-center justify-center text-[#4E7A36] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#F2F0EA]">Profissionais Qualificados</h4>
                <p className="text-xs text-[#F2F0EA]/65">Técnicas especializadas</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4D5240]/30 border border-[#4E7A36]/30 flex items-center justify-center text-[#4E7A36] shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#F2F0EA]">Atendimento Personalizado</h4>
                <p className="text-xs text-[#F2F0EA]/65">Foco nas suas necessidades</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Decorative Bottom Curve Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#F2F0EA] to-transparent pointer-events-none opacity-8" />
    </section>
  );
};
