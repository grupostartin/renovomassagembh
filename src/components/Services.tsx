import React, { useState } from 'react';
import { SERVICES } from '../data/siteData';
import { Service } from '../types';
import { ServiceModal } from './ServiceModal';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    // Seção clara: creme (#F2F0EA)
    <section id="servicos" className="py-24 bg-[#F2F0EA] text-[#15140C] relative overflow-hidden">
      
      {/* Decorative background watermark — bege areia */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#C4B49A]/8 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4D5240]/10 border border-[#4D5240]/25 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#4D5240]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4D5240]">
              Massagens e rituais de cuidado
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#15140C] mb-4">
            Nossos Serviços
          </h2>
          <p className="text-base sm:text-lg text-[#15140C]/70 font-normal">
            Oito experiências de cuidado para diferentes necessidades e momentos
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#C4B49A]/20 hover:border-[#4D5240] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15140C]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Service Category Badge */}
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15140C]/80 text-[#F2F0EA] text-xs font-medium backdrop-blur-md">
                    <Sparkles className="w-3 h-3 text-[#9BC47C]" />
                    {service.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#15140C] mb-2 group-hover:text-[#4D5240] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#15140C]/70 font-normal leading-relaxed mb-4 line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="px-6 pb-6 pt-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedService(service);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4D5240] group-hover:text-[#15140C] transition-colors"
                >
                  <span>Saiba mais</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

    </section>
  );
};
