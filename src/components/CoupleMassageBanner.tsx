import React from "react";
import { COUPLE_MASSAGE, getWhatsAppLink } from "../data/siteData";
import { GlassButton } from "./GlassButton";
import { Heart, Sparkles, Users } from "lucide-react";
import coupleImg from "../assets/images/hot_stones_zen_1784953117607.jpg";

export const CoupleMassageBanner: React.FC = () => {
  return (
    <section
      id="massagem-em-dupla"
      aria-label="Massagem em Dupla — Experiência Compartilhada"
      className="relative overflow-hidden bg-[#15140C]"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={coupleImg}
          alt="Ambiente relaxante para massagem em dupla na Renovo Massagem"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#15140C]/92 via-[#15140C]/75 to-[#15140C]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15140C]/60 via-transparent to-transparent" />
      </div>

      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full bg-[#4E7A36]/10 blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-2xl">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4E7A36]/20 border border-[#4E7A36]/40 backdrop-blur-sm mb-5">
            <Users className="w-3.5 h-3.5 text-[#9BC47C]" aria-hidden="true" />
            <span className="text-xs font-bold tracking-widest text-[#9BC47C] uppercase">
              Experiência Compartilhada
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F2F0EA] leading-tight mb-4 tracking-wide">
            Massagem em Dupla —{" "}
            <span className="italic text-[#C4B49A]">
              para curtir junto.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#F2F0EA]/80 font-light leading-relaxed mb-3 max-w-xl">
            {COUPLE_MASSAGE.description}
          </p>

          <p className="text-sm text-[#C4B49A]/80 italic mb-8 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-current text-[#C4B49A]/70 shrink-0" aria-hidden="true" />
            Casais, amigas, mães e filhas — qualquer dupla é bem-vinda.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {["No mesmo ambiente", "Ao mesmo tempo", "Sessão simultânea"].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F2F0EA]/10 border border-[#F2F0EA]/15 text-xs text-[#F2F0EA]/80 backdrop-blur-sm"
              >
                <Sparkles className="w-3 h-3 text-[#9BC47C]" aria-hidden="true" />
                {tag}
              </span>
            ))}
          </div>

          <GlassButton
            id="couple-massage-cta"
            href={getWhatsAppLink(COUPLE_MASSAGE.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.444h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.48-8.447z"/></svg>
            <span>Agendar Massagem em Dupla</span>
          </GlassButton>
        </div>
      </div>
    </section>
  );
};
