import React from 'react';
import { HERO_IMAGES, FOUNDER_MESSAGE, PROFESSIONAL_CARE_NOTICE, ENXOVAL_NOTICE, getWhatsAppLink } from '../data/siteData';
import { MapPin, MessageCircle, Sparkles, ShieldCheck, Heart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-[#F2F0EA] text-[#15140C] relative overflow-hidden">
      
      {/* Decorative background aura */}
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-[#4D5240]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Real photo of space + Location Tag */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#C4B49A]/30 shadow-2xl">
              <img
                src={HERO_IMAGES.spaRoom}
                alt="Espaço aconchegante da Renovo Massagem no bairro Palmares em Belo Horizonte"
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15140C]/60 via-transparent to-transparent" />
              
              {/* Location Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#F2F0EA]/95 backdrop-blur-md border border-[#C4B49A]/30 flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 rounded-full bg-[#4E7A36] text-[#F2F0EA] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#15140C]">Espaço Renovo em BH</h4>
                  <p className="text-xs text-[#15140C]/75">Bairro Palmares • Rua José Cleto, 200</p>
                </div>
              </div>
            </div>

            {/* Enxoval Note (Item 10) */}
            <div className="mt-4 p-4 rounded-2xl bg-white border border-[#C4B49A]/30 flex items-center gap-3 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-[#4E7A36] shrink-0" />
              <p className="text-xs sm:text-sm text-[#15140C]/80 font-medium">
                {ENXOVAL_NOTICE}
              </p>
            </div>
          </div>

          {/* Right Column: Institutional narrative, Founder message & Professional commitment */}
          <div className="lg:col-span-7 space-y-8">
            
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4D5240]/10 border border-[#4D5240]/25 mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#4D5240]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#4D5240]">
                  Sobre a Renovo
                </span>
              </div>

              {/* 7. Sobre a Renovo: Título */}
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#15140C] mb-6">
                Uma pausa em meio à rotina
              </h2>

              {/* 7. Texto institucional fiel */}
              <div className="space-y-4 text-base sm:text-lg text-[#15140C]/85 font-normal leading-relaxed">
                <p>
                  A <strong>Renovo</strong> nasceu com uma proposta simples: oferecer um lugar onde você possa parar por um momento, receber uma boa massagem e cuidar do corpo em meio à correria do dia a dia.
                </p>
                <p>
                  Aqui, cada cliente é recebido com atenção e respeito. A massagem é realizada de acordo com suas necessidades — seja para aliviar dores e tensões, descansar o corpo ou simplesmente relaxar.
                </p>
                <p>
                  Nosso espaço é simples, confortável e acolhedor. Valorizamos aquilo que consideramos essencial: um atendimento profissional, uma massagem bem-feita e cuidado com cada pessoa que chega até nós.
                </p>
              </div>
            </div>

            {/* 8. Mensagem da Fundadora */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#C4B49A]/35 shadow-md relative">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#4E7A36]/15 border border-[#4E7A36]/30 flex items-center justify-center text-[#4E7A36] shrink-0 mt-1">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <blockquote className="font-serif italic text-base sm:text-lg text-[#15140C]/90 leading-relaxed mb-3">
                    “{FOUNDER_MESSAGE.quote}”
                  </blockquote>
                  <p className="text-sm font-bold text-[#34412F]">
                    {FOUNDER_MESSAGE.author} <span className="font-normal text-[#15140C]/60 text-xs sm:text-sm">— {FOUNDER_MESSAGE.role}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 9. Atendimento Exclusivamente Profissional */}
            <div className="p-5 rounded-2xl bg-[#4D5240]/10 border border-[#4D5240]/25 flex items-start gap-3.5">
              <ShieldCheck className="w-5 h-5 text-[#4D5240] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4D5240] mb-1">
                  Atendimento exclusivamente profissional
                </h4>
                <p className="text-xs sm:text-sm text-[#15140C]/80 leading-relaxed">
                  {PROFESSIONAL_CARE_NOTICE}
                </p>
              </div>
            </div>

            {/* WhatsApp Contact Action */}
            <div className="pt-2">
              <a
                href={getWhatsAppLink('Olá! Gostaria de saber mais sobre a Renovo Massagem e agendar meu horário.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#4E7A36] text-[#F2F0EA] font-semibold text-sm hover:bg-[#4D5240] transition-all duration-300 shadow-lg shadow-[#4E7A36]/20"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Converse conosco pelo WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
        
      </div>
    </section>
  );
};
