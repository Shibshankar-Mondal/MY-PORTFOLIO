import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Command,
  FileText,
  Briefcase,
  Code2,
  GraduationCap,
  Mail,
  Sun,
  Moon,
  Github,
  Linkedin,
  Copy,
  Check,
  Globe,
  ExternalLink,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA, SKILLS_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { playUiSound, isSoundEnabled, setSoundEnabled } from '../utils/soundEffects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Projects' | 'Skills' | 'Preferences' | 'Contact & Social';
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      playUiSound('pop');
    }
  }, [isOpen]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    playUiSound('success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const scrollTo = (id: string) => {
    onClose();
    playUiSound('click');
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elPosition = el.getBoundingClientRect().top;
      const offsetPosition = elPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-home',
      title: 'Go to Home / Hero Section',
      subtitle: 'Developer intro, photo showcase & live terminal',
      category: 'Navigation',
      icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
      action: () => scrollTo('home'),
      shortcut: 'H',
    },
    {
      id: 'nav-about',
      title: 'Go to About Me',
      subtitle: 'Background, SVU university journey & passions',
      category: 'Navigation',
      icon: <FileText className="w-4 h-4 text-sky-400" />,
      action: () => scrollTo('about'),
      shortcut: 'A',
    },
    {
      id: 'nav-skills',
      title: 'Go to Skills & Technologies',
      subtitle: 'C/C++, Python, JS, React, SQL & Tools',
      category: 'Navigation',
      icon: <Code2 className="w-4 h-4 text-emerald-400" />,
      action: () => scrollTo('skills'),
      shortcut: 'S',
    },
    {
      id: 'nav-projects',
      title: 'Go to Featured Projects',
      subtitle: 'Portfolio, E-Commerce, Block Slide Game, Student System',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4 text-purple-400" />,
      action: () => scrollTo('projects'),
      shortcut: 'P',
    },
    {
      id: 'nav-education',
      title: 'Go to Education & Learning Hub',
      subtitle: 'SVU BCA Degree, MERN Stack Certification, Schooling',
      category: 'Navigation',
      icon: <GraduationCap className="w-4 h-4 text-amber-400" />,
      action: () => scrollTo('education'),
      shortcut: 'E',
    },
    {
      id: 'nav-contact',
      title: 'Go to Contact Form',
      subtitle: 'Send message, view email & phone details',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-pink-400" />,
      action: () => scrollTo('contact'),
      shortcut: 'C',
    },
    {
      id: 'action-resume',
      title: 'View & Download Resume',
      subtitle: 'Open full interactive developer CV printable modal',
      category: 'Navigation',
      icon: <FileText className="w-4 h-4 text-indigo-400" />,
      action: () => {
        onClose();
        playUiSound('success');
        onOpenResume();
      },
      shortcut: 'R',
    },

    // Projects Direct Links
    ...PROJECTS_DATA.map((p) => ({
      id: `project-${p.id}`,
      title: p.title,
      subtitle: `Open ${p.badge} — ${p.shortDescription.slice(0, 60)}...`,
      category: 'Projects' as const,
      icon: <ExternalLink className="w-4 h-4 text-indigo-400" />,
      action: () => {
        onClose();
        playUiSound('click');
        if (p.liveDemoUrl) {
          window.open(p.liveDemoUrl, '_blank');
        } else {
          scrollTo('projects');
        }
      },
    })),

    // Skills Matrix
    ...SKILLS_DATA.map((s) => ({
      id: `skill-${s.name.toLowerCase().replace(/\s+/g, '-')}`,
      title: `${s.name} (${s.levelLabel} - ${s.level}%)`,
      subtitle: s.description,
      category: 'Skills' as const,
      icon: <Code2 className="w-4 h-4 text-teal-400" />,
      action: () => scrollTo('skills'),
    })),

    // Preferences & Themes
    {
      id: 'pref-theme',
      title: theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      subtitle: `Current mode: ${theme === 'dark' ? 'Dark Obsidian' : 'Clean Light'}`,
      category: 'Preferences',
      icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />,
      action: () => {
        toggleTheme();
        playUiSound('toggle');
        onClose();
      },
      shortcut: 'T',
    },
    {
      id: 'pref-sound',
      title: soundOn ? 'Mute Sound Effects' : 'Enable UI Sound Effects',
      subtitle: soundOn ? 'Sound synthesizer currently active' : 'Sound synthesizer muted',
      category: 'Preferences',
      icon: soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />,
      action: () => {
        const next = !soundOn;
        setSoundOn(next);
        setSoundEnabled(next);
        if (next) playUiSound('success');
      },
    },
    {
      id: 'toggle-3d-bg',
      title: 'Toggle 3D Background Space',
      subtitle: 'Turn full-screen Three.js WebGL constellation on/off',
      category: 'Preferences',
      icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
      action: () => {
        const current = localStorage.getItem('three_bg_enabled') !== 'false';
        localStorage.setItem('three_bg_enabled', String(!current));
        window.location.reload();
      },
    },
    {
      id: 'lang-en',
      title: 'Change Language: English',
      subtitle: language === 'en' ? 'Currently active' : 'Switch interface to English',
      category: 'Preferences',
      icon: <Globe className="w-4 h-4 text-blue-400" />,
      action: () => {
        setLanguage('en');
        playUiSound('tab');
        onClose();
      },
    },
    {
      id: 'lang-bn',
      title: 'ভাষা পরিবর্তন: বাংলা (Bengali)',
      subtitle: language === 'bn' ? 'বর্তমানে সক্রিয়' : 'বাংলা ইন্টারফেসে পরিবর্তন করুন',
      category: 'Preferences',
      icon: <Globe className="w-4 h-4 text-green-400" />,
      action: () => {
        setLanguage('bn');
        playUiSound('tab');
        onClose();
      },
    },
    {
      id: 'lang-hi',
      title: 'भाषा बदलें: हिन्दी (Hindi)',
      subtitle: language === 'hi' ? 'वर्तमान में सक्रिय' : 'हिन्दी इंटरफेस पर स्विच करें',
      category: 'Preferences',
      icon: <Globe className="w-4 h-4 text-orange-400" />,
      action: () => {
        setLanguage('hi');
        playUiSound('tab');
        onClose();
      },
    },

    // Contact & Social
    {
      id: 'copy-email',
      title: 'Copy Email Address',
      subtitle: PERSONAL_INFO.email,
      category: 'Contact & Social',
      icon: copiedId === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />,
      action: () => handleCopy(PERSONAL_INFO.email, 'email'),
    },
    {
      id: 'copy-phone',
      title: 'Copy Phone Number',
      subtitle: PERSONAL_INFO.formattedPhone,
      category: 'Contact & Social',
      icon: copiedId === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />,
      action: () => handleCopy(PERSONAL_INFO.phone, 'phone'),
    },
    {
      id: 'open-github',
      title: 'Open GitHub Profile',
      subtitle: PERSONAL_INFO.socials.github,
      category: 'Contact & Social',
      icon: <Github className="w-4 h-4 text-slate-300" />,
      action: () => {
        window.open(PERSONAL_INFO.socials.github, '_blank');
        onClose();
      },
    },
    {
      id: 'open-linkedin',
      title: 'Open LinkedIn Profile',
      subtitle: PERSONAL_INFO.socials.linkedin,
      category: 'Contact & Social',
      icon: <Linkedin className="w-4 h-4 text-sky-400" />,
      action: () => {
        window.open(PERSONAL_INFO.socials.linkedin, '_blank');
        onClose();
      },
    },
  ];

  const filtered = query.trim() === ''
    ? commands
    : commands.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      playUiSound('tab');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      playUiSound('tab');
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Click backdrop to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] z-10 animate-in zoom-in-95 duration-150"
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-3 bg-slate-50/50 dark:bg-[#070c18]/60">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, skills, education, actions, or shortcuts..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Clear
            </button>
          )}
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-slate-100 dark:divide-slate-800/40">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Command className="w-8 h-8 mx-auto mb-2 text-slate-400 opacity-50" />
              <p className="text-sm font-medium">No commands or items found</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for "project", "c++", "resume", or "contact"</p>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-3.5 py-3 rounded-xl flex items-center justify-between gap-3 transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-950 dark:text-indigo-200 border-l-4 border-indigo-600 pl-3'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-semibold truncate flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400">
                          {item.category}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {item.shortcut && (
                    <span className="hidden sm:inline-block text-[11px] font-mono font-bold px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                      {item.shortcut}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-[#070c18] border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">↵</kbd> Select
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>UI/UX Pro Max Edition</span>
          </div>
        </div>
      </div>
    </div>
  );
};
