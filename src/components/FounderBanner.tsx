import React from "react";
import { FOUNDER_MESSAGE, HERO_IMAGES, getWhatsAppLink } from "../data/siteData";
import { GlassButton } from "./GlassButton";
import { Heart, Quote } from "lucide-react";

export const FounderBanner: React.FC = () => {
  return (
    <section
      id="mensagem-da-fundadora"
      aria-label="Mensagem da fundadora da Renovo Massagem"
      className="relative overflow-hidden bg-[#15140C] -mt-8 rounded-t-[2rem] z-[2] md:mt-0 md:rounded-none"
    >
      {/* Mobile: foto em bloco acima do texto (logo visível). Desktop: foto de fundo. */}
      <div className="relative h-64 md:h-auto md:absolute md:inset-0 z-0">
        <img
          src={HERO_IMAGES.hero}
          alt="Sala de atendimento da Renovo Massagem"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#15140C]/92 via-[#15140C]/75 to-[#15140C]/30" />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#15140C]/60 via-transparent to-transparent" />
        <div className="md:hidden absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#15140C] to-transparent" />
      </div>

      <div className="hidden md:block absolute top-0 left-0 right-0 md:h-32 bg-gradient-to-b from-[#15140C] to-transparent pointer-events-none z-[1]" />

      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full bg-[#4E7A36]/10 blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 md:py-20">
        <div className="max-w-2xl">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4E7A36]/20 border border-[#4E7A36]/40 backdrop-blur-sm mb-5">
            <Heart className="w-3.5 h-3.5 text-[#9BC47C]" aria-hidden="true" />
            <span className="text-xs font-bold tracking-widest text-[#9BC47C] uppercase">
              Quem cuida de você
            </span>
          </div>

          <Quote className="w-8 h-8 text-[#C4B49A]/60 mb-3" aria-hidden="true" />

          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-[#F2F0EA] leading-snug mb-5 tracking-wide">
            {FOUNDER_MESSAGE.quote}
          </blockquote>

          <p className="text-sm text-[#C4B49A] mb-8">
            <span className="font-semibold">{FOUNDER_MESSAGE.author}</span>
            <span className="text-[#C4B49A]/70"> — {FOUNDER_MESSAGE.role}</span>
          </p>

          <GlassButton
            id="founder-cta"
            href={getWhatsAppLink("Olá! Gostaria de agendar uma massagem na Renovo Massagem.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.444h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.48-8.447z"/></svg>
            <span>Agendar minha massagem</span>
          </GlassButton>
        </div>
      </div>
    </section>
  );
};
