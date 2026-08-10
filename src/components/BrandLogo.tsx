import React from 'react';
import newLogo from '../assets/images/Captura_de_tela_2026-08-10_000636-removebg-preview.png';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = '', 
  variant = 'light',
  showSubtitle = true 
}) => {
  return (
    <a href="#home" className={`inline-flex items-center gap-3 group cursor-pointer ${className}`}>
      {/* Nova Logo PNG — cores originais preservadas em ambos os contextos */}
      <img
        src={newLogo}
        alt="Renovo Massagem"
        className="h-14 sm:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        style={{
          // No fundo escuro, clareamos a logo (brightness + saturate para manter o verde)
          // No fundo claro, mostramos as cores originais da logo
          filter: variant === 'light'
            ? 'brightness(1.8) saturate(1.2)'
            : 'none',
        }}
      />
    </a>
  );
};
