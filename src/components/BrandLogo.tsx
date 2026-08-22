import React from 'react';
import brandLogo from '../assets/images/Captura_de_tela_2026-08-10_000636-removebg-preview.png';

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
    <a
      href="#home"
      aria-label="Renovo Massagem — ir para o início"
      className={`inline-flex items-center gap-3 group cursor-pointer ${className}`}
    >
      <img
        src={brandLogo}
        alt="Renovo Massagem"
        width={411}
        height={315}
        decoding="async"
        draggable={false}
        className="h-14 sm:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        style={{
          filter: variant === 'light'
            ? 'brightness(1.8) saturate(1.2)'
            : 'none',
        }}
      />
    </a>
  );
};
