import React from 'react';
import { BENEFITS, HERO_IMAGES, getWhatsAppLink } from '../data/siteData';
import { Check, Sparkles, MessageCircle } from 'lucide-react';

export const Benefits: React.FC = () => {
  return (
    // Seção escura: preto esverdeado (#15140C)
    <section id="beneficios" className="py-24 bg-[#15140C] text-[#F2F0EA] relative overflow-hidden">
      
      {/* Background glow — verde militar */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-[#4D5240]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Title & Benefits List */}
          <div className="lg:col-span-7 space-y-8">
            
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4D5240]/30 border border-[#4E7A36]/30 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#4E7A36]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#F2F0EA]">
                  Transformação de Dentro para Fora
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#F2F0EA] mb-4">
                Benefícios das Massagens
              </h2>
              <p className="text-base sm:text-lg text-[#F2F0EA]/75 font-light leading-relaxed">
                A massoterapia regular vai além do relaxamento imediato — ela reconfigura a resposta do seu corpo ao estresse físico e mental.
              </p>
            </div>

            {/* List of Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
              {BENEFITS.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#1a1910]/80 border border-[#4D5240]/30 hover:border-[#4E7A36]/50 transition-all duration-300 flex items-start gap-3.5 group"
                >
                  <div className="w-7 h-7 rounded-full bg-[#4E7A36]/20 border border-[#4E7A36]/40 flex items-center justify-center text-[#4E7A36] shrink-0 mt-0.5 group-hover:bg-[#4E7A36] group-hover:text-[#F2F0EA] transition-colors">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#F2F0EA] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#F2F0EA]/65 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={getWhatsAppLink('Olá! Gostaria de agendar uma massagem para aliviar o estresse e tensões acumuladas.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#4E7A36] text-[#F2F0EA] font-semibold text-sm hover:bg-[#4D5240] transition-all duration-300 shadow-lg shadow-[#4E7A36]/20"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Sinta a diferença no seu corpo</span>
              </a>
            </div>

          </div>

          {/* Right Column: Zen Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#4D5240]/40 shadow-2xl group">
              <img
                src={HERO_IMAGES.zenStones}
                alt="Pedras vulcânicas quentes e elementos naturais da Renovo Massagem"
                className="w-full h-[420px] lg:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15140C] via-transparent to-transparent opacity-60" />

              {/* Float Quote Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#15140C]/90 backdrop-blur-md border border-[#4E7A36]/30">
                <p className="font-serif italic text-sm text-[#F2F0EA]/90 leading-relaxed mb-1">
                  "O toque consciente devolve ao corpo a memória de estar em paz."
                </p>
                <p className="text-[11px] font-semibold tracking-wider text-[#4E7A36] uppercase">
                  • Renovo Massagem BH
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
