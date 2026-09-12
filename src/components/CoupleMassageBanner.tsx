import React from "react";
import { COUPLE_MASSAGE, getWhatsAppLink } from "../data/siteData";
import { Heart, MessageCircle, Sparkles, Users } from "lucide-react";
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

          <a
            id="couple-massage-cta"
            href={getWhatsAppLink(COUPLE_MASSAGE.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#4E7A36] hover:bg-[#5a8f40] text-[#F2F0EA] font-semibold text-sm sm:text-base transition-all duration-300 shadow-2xl shadow-[#4E7A36]/30 hover:shadow-[#4E7A36]/50 hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="w-5 h-5 fill-current" aria-hidden="true" />
            <span>Agendar Massagem em Dupla</span>
          </a>
        </div>
      </div>
    </section>
  );
};
