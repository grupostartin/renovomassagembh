import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/siteData';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    // Seção escura: preto esverdeado (#15140C)
    <section id="depoimentos" className="py-24 bg-[#15140C] text-[#F2F0EA] relative overflow-hidden">
      
      {/* Background glow — verde militar */}
      <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-[#4D5240]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4D5240]/30 border border-[#4E7A36]/30 mb-4">
            <Quote className="w-3.5 h-3.5 text-[#4E7A36]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#F2F0EA]">
              Experiências Reais
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#F2F0EA] mb-4">
            O que nossos clientes dizem
          </h2>
          <div className="w-12 h-0.5 bg-[#4E7A36] mx-auto mb-4 rounded-full" />
          <p className="text-base sm:text-lg text-[#F2F0EA]/75 font-light">
            Depoimentos de quem já vivenciou nossos rituais de renovação e bem-estar
          </p>
        </div>

        {/* Desktop 3-Card Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-[#1a1910] border border-[#4D5240]/30 hover:border-[#4E7A36]/50 transition-all duration-300 flex flex-col justify-between shadow-xl relative"
            >
              <Quote className="w-8 h-8 text-[#4D5240]/45 absolute top-6 right-6" />

              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#C4B49A]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-[#F2F0EA]/88 font-light leading-relaxed italic mb-6">
                  "{item.text}"
                </p>
              </div>

              {/* Author & Service Badge */}
              <div className="pt-4 border-t border-[#4D5240]/30 flex items-center gap-4">
                <img
                  src={item.avatarUrl}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#4E7A36]/40"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-base font-semibold text-[#F2F0EA]">{item.name}</h3>
                  <p className="text-xs text-[#4E7A36]">{item.serviceUsed}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Mobile / Tablet Carousel View */}
        <div className="lg:hidden relative max-w-xl mx-auto">
          <div className="p-8 rounded-3xl bg-[#1a1910] border border-[#4D5240]/30 shadow-xl relative min-h-[280px] flex flex-col justify-between">
            <Quote className="w-8 h-8 text-[#4D5240]/45 absolute top-6 right-6" />

            <div>
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4 text-[#C4B49A]">
                {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-base text-[#F2F0EA]/88 font-light leading-relaxed italic mb-6">
                "{TESTIMONIALS[activeIndex].text}"
              </p>
            </div>

            {/* Author */}
            <div className="pt-4 border-t border-[#4D5240]/30 flex items-center gap-4">
              <img
                src={TESTIMONIALS[activeIndex].avatarUrl}
                alt={TESTIMONIALS[activeIndex].name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#4E7A36]/40"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-base font-semibold text-[#F2F0EA]">{TESTIMONIALS[activeIndex].name}</h3>
                <p className="text-xs text-[#4E7A36]">{TESTIMONIALS[activeIndex].serviceUsed}</p>
              </div>
            </div>

          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === activeIndex ? 'w-8 bg-[#4E7A36]' : 'w-2.5 bg-[#4D5240]/50'
                  }`}
                  aria-label={`Ir para depoimento ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="p-2.5 rounded-full bg-[#1a1910] border border-[#4D5240]/40 text-[#F2F0EA] hover:bg-[#4D5240]/30"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2.5 rounded-full bg-[#1a1910] border border-[#4D5240]/40 text-[#F2F0EA] hover:bg-[#4D5240]/30"
                aria-label="Próximo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
