import React from 'react';

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
  const textColor = variant === 'light' ? 'text-[#F5EFDD]' : 'text-[#1E241A]';
  const subtitleColor = variant === 'light' ? 'text-[#8FBF6E]' : 'text-[#4A5D3A]';

  return (
    <a href="#home" className={`inline-flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {/* Organic Stylized Leaf / Sprout Icon */}
      <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#4A5D3A]/20 border border-[#7CB259]/30 group-hover:border-[#7CB259] transition-all duration-300">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.8" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-5 h-5 text-[#8FBF6E] group-hover:scale-105 transition-transform duration-300"
        >
          <path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12A10 10 0 0 1 12 2z" className="opacity-20 fill-[#7CB259]" />
          <path d="M12 22C12 12 19 8 19 8" />
          <path d="M12 22C12 16 7 12 7 12" />
          <path d="M12 22V12" />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#7CB259] animate-pulse" />
      </div>

      <div className="flex flex-col">
        <span className={`font-serif text-xl sm:text-2xl font-medium tracking-wider leading-tight ${textColor}`}>
          renovo <span className="text-[#8FBF6E] mx-0.5 font-sans font-light text-sm">•</span> massagem
        </span>
        {showSubtitle && (
          <span className={`text-[10px] tracking-[0.25em] uppercase font-light -mt-0.5 ${subtitleColor}`}>
            Belo Horizonte
          </span>
        )}
      </div>
    </a>
  );
};
