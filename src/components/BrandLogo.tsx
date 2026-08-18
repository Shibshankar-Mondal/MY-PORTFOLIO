import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }[size];

  const titleSize = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
  }[size];

  return (
    <div className={`group flex items-center gap-3 select-none ${className}`}>
      {/* Custom Shibshankar Geometric Monogram Emblem */}
      <div
        id="brand-logo-emblem"
        className={`relative ${iconDimensions} rounded-xl bg-gradient-to-br from-indigo-600 via-sky-600 to-purple-600 p-[1.5px] shadow-lg shadow-indigo-600/25 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-300`}
      >
        <div className="w-full h-full rounded-[10.5px] bg-slate-950 flex items-center justify-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 to-sky-400/20 opacity-80 group-hover:opacity-100 transition-opacity" />

          {/* Bespoke "SM" Monogram SVG Logo */}
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 relative z-10 drop-shadow-sm"
          >
            <defs>
              <linearGradient id="sm-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="50%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>
              <linearGradient id="sm-accent" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
            </defs>

            {/* Stylized 'S' Path */}
            <path
              d="M17 12H13.5C11.5 12 10 13.5 10 15.5C10 17.5 11.5 19 13.5 19H16.5C18.5 19 20 20.5 20 22.5C20 24.5 18.5 26 16.5 26H11"
              stroke="url(#sm-grad)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Stylized 'M' Path */}
            <path
              d="M21 26V13L25.5 20L30 13V26"
              stroke="url(#sm-accent)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Glowing Accent Tech Dot */}
            <circle cx="30" cy="12" r="1.5" fill="#38BDF8" />
          </svg>
        </div>
      </div>

      {/* Name & Title Typography */}
      <div>
        <div className={`font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5 ${titleSize} leading-none`}>
          <span>Shibshankar</span>
          <span className="bg-gradient-to-r from-indigo-600 to-sky-600 dark:from-indigo-400 dark:to-sky-400 bg-clip-text text-transparent">
            Mondal
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/80 text-indigo-600 dark:text-indigo-400 font-semibold hidden sm:inline-block">
            BCA
          </span>
        </div>

        {showSubtitle && (
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1 hidden sm:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>SVU Barrackpore • Web Developer</span>
          </p>
        )}
      </div>
    </div>
  );
};
