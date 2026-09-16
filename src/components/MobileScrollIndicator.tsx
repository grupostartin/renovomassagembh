import React, { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'home', label: '1. Início' },
  { id: 'servicos', label: '2. Massagens' },
  { id: 'sobre-avaliacoes', label: '3. Sobre' },
  { id: 'localizacao-faq', label: '4. Contato' },
];

export const MobileScrollIndicator: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      const elements = SECTIONS.map(s => document.getElementById(s.id));
      
      for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#15140C]/90 backdrop-blur-md border border-[#4E7A36]/40 px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-1.5 text-xs">
      {SECTIONS.map((sec, idx) => {
        const isActive = activeSection === idx;
        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className={`flex items-center gap-1 font-medium transition-all duration-300 px-2.5 py-1 rounded-full text-[11px] ${
              isActive
                ? 'bg-[#4E7A36] text-[#F2F0EA] shadow-md scale-105'
                : 'text-[#F2F0EA]/60 hover:text-[#F2F0EA]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#F2F0EA]' : 'bg-[#F2F0EA]/40'}`} />
            <span>{isActive ? sec.label : idx + 1}</span>
          </button>
        );
      })}
    </div>
  );
};
