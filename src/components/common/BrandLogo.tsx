import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  collapsed?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'dark',
  collapsed = false
}) => {
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Aviation / Trajectory Geometric Mark */}
      <div className="relative w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-[#10243A] shadow-sm border border-[#1769AA]/30">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
        >
          {/* Base structural chevron (Deep Corporate Blue) */}
          <path
            d="M8 26L20 14L32 26L28 29L20 21L12 29L8 26Z"
            fill="#1769AA"
          />
          {/* Precision Forward Trajectory (Accent Gold) */}
          <path
            d="M20 7L24 15L20 18L16 15L20 7Z"
            fill="#D6A84B"
          />
          {/* Dynamic wing accent */}
          <path
            d="M13 18L20 11L27 18L25 20L20 15L15 20L13 18Z"
            fill="#FFFFFF"
            opacity="0.9"
          />
        </svg>
      </div>

      {!collapsed && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center tracking-tight font-extrabold text-lg sm:text-xl font-sans">
            <span className={isLight ? 'text-white' : 'text-[#10243A]'}>AIR DIVE</span>
            <span className="text-[#1769AA] ml-1.5 font-light">GROUP</span>
          </div>
          <span className={`text-[10px] uppercase font-semibold tracking-[0.2em] ${isLight ? 'text-slate-300' : 'text-slate-500'}`}>
            US Staffing & Solutions
          </span>
        </div>
      )}
    </div>
  );
};
