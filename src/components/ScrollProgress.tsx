import React, { useState, useEffect } from 'react';
import { ArrowUp, Command, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { playUiSound, isSoundEnabled, setSoundEnabled } from '../utils/soundEffects';

interface ScrollProgressProps {
  onOpenCommandPalette: () => void;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ onOpenCommandPalette }) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercentage(Math.min(100, Math.max(0, progress)));
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playUiSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playUiSound('toggle');
  };

  // Circle radius for progress ring
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <>
      {/* Top Fixed Reading Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(99,102,241,0.8)]"
          style={{ width: `${scrollPercentage}%` }}
        />
      </div>

      {/* Floating Action Controls on Bottom Right */}
      <div
        className={`fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2.5 transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        {/* Quick Command Palette Launcher */}
        <button
          onClick={() => {
            playUiSound('pop');
            onOpenCommandPalette();
          }}
          title="Open Command Palette (Cmd+K / Ctrl+K)"
          className="p-2.5 rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-indigo-500/20 hover:scale-110 hover:border-indigo-500 transition-all duration-200 cursor-pointer group"
        >
          <Command className="w-4 h-4 group-hover:text-indigo-400" />
        </button>

        {/* Quick Sound Toggle */}
        <button
          onClick={toggleSound}
          title={soundOn ? 'Mute Sound Effects' : 'Enable Sound Effects'}
          className={`p-2.5 rounded-full border shadow-xl hover:scale-110 transition-all duration-200 cursor-pointer ${
            soundOn
              ? 'bg-white dark:bg-slate-900 text-emerald-500 dark:text-emerald-400 border-slate-200 dark:border-slate-800 hover:border-emerald-500'
              : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-400'
          }`}
        >
          {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Back To Top with Circular Progress Indicator */}
        <button
          onClick={scrollToTop}
          title={`Scroll to top (${Math.round(scrollPercentage)}%)`}
          className="relative p-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center"
        >
          <svg className="absolute -inset-1 w-11 h-11 -rotate-90 pointer-events-none">
            <circle
              cx="22"
              cy="22"
              r={radius}
              stroke="rgba(99, 102, 241, 0.25)"
              strokeWidth="2.5"
              fill="transparent"
            />
            <circle
              cx="22"
              cy="22"
              r={radius}
              stroke="#818cf8"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-150"
            />
          </svg>
          <ArrowUp className="w-4 h-4 relative z-10" />
        </button>
      </div>
    </>
  );
};
