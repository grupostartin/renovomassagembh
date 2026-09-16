import React from 'react';
import { HERO_IMAGES, getWhatsAppLink } from '../data/siteData';
import { GlassButton } from './GlassButton';
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
      ? `rgba(78,122,54,${(0.16 + sr(i * 13 + 8) * 0.16).toFixed(2)})`
      : sr(i * 13 + 7) > 0.28
      ? `rgba(77,82,64,${(0.12 + sr(i * 13 + 9) * 0.14).toFixed(2)})`
      : `rgba(141,128,116,${(0.1 + sr(i * 13 + 10) * 0.12).toFixed(2)})`,
}));

interface HeroProps {
  bookingEnabled: boolean;
  onOpenBookingModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ bookingEnabled, onOpenBookingModal }) => {
  return (
    <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden bg-[#E9DFD0] text-[#34412F]">
      {/* Foto real do espaço em tela cheia, com bege concentrado atrás do texto */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGES.main}
          alt="Recepção da Renovo Massagem em Belo Horizonte"
          className="w-full h-full object-cover object-[91%_center] md:object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(233,223,208,0.78)_0%,rgba(233,223,208,0.65)_58%,rgba(233,223,208,0.25)_100%)] md:bg-[#E9DFD0]/5" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(233,223,208,0.40)_0%,rgba(233,223,208,0.20)_30%,rgba(233,223,208,0.00)_56%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#E9DFD0]/40 via-transparent to-[#F8F5EF]/10" />
      </div>

      <div className="absolute -top-24 -left-20 w-[30rem] h-[30rem] rounded-full bg-[#F8F5EF]/45 blur-3xl pointer-events-none" />

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
        <div className="max-w-xl">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#F8F5EF]/90 border border-[#4E7A36]/30 backdrop-blur-sm mb-4 sm:mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#4E7A36] animate-ping" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#3F5D35] uppercase">
              Uma pausa na sua rotina • Palmares, BH
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium tracking-wide text-[#34412F] leading-[1.15] mb-3 sm:mb-6 drop-shadow-[0_1px_0_rgba(255,255,255,0.45)]">
            Seu corpo também precisa de uma <span className="text-[#4E7A36] italic font-semibold">pausa.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl md:text-2xl text-[#34412F]/90 font-normal leading-relaxed mb-6 sm:mb-8 max-w-lg">
            Massagens para aliviar dores e tensões, relaxar o corpo e proporcionar bem-estar no bairro Palmares.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-12">
            <GlassButton
              href={getWhatsAppLink('Olá! Vim pelo site e gostaria de agendar minha massagem na Renovo Massagem.')}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 text-sm"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Agendar minha massagem</span>
            </GlassButton>

            {bookingEnabled && (
              <button
                onClick={onOpenBookingModal}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#F8F5EF]/85 hover:bg-white text-[#34412F] border border-[#4D5240]/25 hover:border-[#4E7A36] text-sm font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                <Calendar className="w-4 h-4 text-[#4E7A36]" />
                <span>Escolher serviço e horário</span>
              </button>
            )}
          </div>

          {/* 3 Key Differentials (Horizontal Scroll or Compact Grid on mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pt-4 sm:pt-6 border-t border-[#4D5240]/20">
            
            <div className="flex items-center sm:items-start gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#F8F5EF]/90 border border-[#4E7A36]/25 flex items-center justify-center text-[#4E7A36] shrink-0 shadow-sm">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-[#34412F]">Ambiente acolhedor</h4>
                <p className="text-[11px] sm:text-xs text-[#34412F]/75 leading-tight sm:leading-snug">Espaço simples, confortável e silencioso.</p>
              </div>
            </div>

            <div className="flex items-center sm:items-start gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#F8F5EF]/90 border border-[#4E7A36]/25 flex items-center justify-center text-[#4E7A36] shrink-0 shadow-sm">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-[#34412F]">Massagem de qualidade</h4>
                <p className="text-[11px] sm:text-xs text-[#34412F]/75 leading-tight sm:leading-snug">Técnica e cuidado personalizado.</p>
              </div>
            </div>

            <div className="flex items-center sm:items-start gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#F8F5EF]/90 border border-[#4E7A36]/25 flex items-center justify-center text-[#4E7A36] shrink-0 shadow-sm">
                <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-[#34412F]">Fácil acesso</h4>
                <p className="text-[11px] sm:text-xs text-[#34412F]/75 leading-tight sm:leading-snug">No coração do bairro Palmares, BH.</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Decorative Bottom Curve Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#F2F0EA] to-transparent pointer-events-none opacity-[0.08]" />
    </section>
  );
};
