import React from 'react';
import { HERO_IMAGES, TRUST_BADGES, getWhatsAppLink } from '../data/siteData';
import { Wind, Droplets, ShieldCheck, Heart, MapPin, MessageCircle } from 'lucide-react';

export const About: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Wind className="w-6 h-6 text-[#4D5240]" />;
      case 'Droplets':
        return <Droplets className="w-6 h-6 text-[#4D5240]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#4D5240]" />;
      default:
        return <Heart className="w-6 h-6 text-[#4D5240]" />;
    }
  };

  return (
    // Seção clara: creme (#F2F0EA) com texto escuro
    <section id="sobre" className="py-24 bg-[#F2F0EA] text-[#15140C] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden border border-[#C4B49A]/30 shadow-2xl">
              <img
                src={HERO_IMAGES.spaRoom}
                alt="Sala de atendimento aconchegante da Renovo Massagem em Belo Horizonte"
                className="w-full h-[380px] sm:h-[480px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15140C]/45 via-transparent to-transparent" />
              
              {/* Location Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#F2F0EA]/95 backdrop-blur-md border border-[#C4B49A]/25 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4D5240] text-[#F2F0EA] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#15140C]">Localização Privilegiada em BH</h4>
                  <p className="text-xs text-[#15140C]/70">Belo Horizonte - MG • Estacionamento fácil e acesso seguro</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4D5240]/10 border border-[#4D5240]/25">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#4D5240]">
                Conheça a Renovo Massagem
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#15140C]">
              Um refúgio de paz no coração de Belo Horizonte
            </h2>

            <p className="text-base sm:text-lg text-[#15140C]/80 font-normal leading-relaxed">
              Criamos a <strong>Renovo Massagem</strong> como um espaço pensado para o seu reequilíbrio vital. Cada detalhe da nossa estrutura foi planejado para proporcionar uma experiência imersiva de desaceleração, alívio de tensões e reconexão.
            </p>

            <p className="text-sm sm:text-base text-[#15140C]/70 font-normal leading-relaxed">
              Nossas profissionais são altamente qualificadas e empenhadas em entender a singularidade do seu corpo, aplicando técnicas precisas com sensibilidade e respeito ao seu tempo.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#C4B49A]/30">
              {TRUST_BADGES.map((badge) => (
                <div key={badge.id} className="p-4 rounded-2xl bg-white border border-[#C4B49A]/20 flex flex-col items-center text-center shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-[#4D5240]/10 border border-[#4D5240]/20 flex items-center justify-center mb-3">
                    {getIcon(badge.icon)}
                  </div>
                  <h4 className="text-sm font-semibold text-[#15140C] mb-1">{badge.title}</h4>
                  <p className="text-xs text-[#15140C]/65 leading-relaxed">{badge.subtitle}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppLink('Olá! Gostaria de saber mais sobre a Renovo Massagem e agendar meu horário.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#4D5240] text-[#F2F0EA] font-semibold text-sm hover:bg-[#15140C] transition-all duration-300 shadow-lg shadow-[#4D5240]/20"
              >
                <MessageCircle className="w-4 h-4 fill-current text-[#4E7A36]" />
                <span>Converse conosco pelo WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
        
      </div>
    </section>
  );
};
