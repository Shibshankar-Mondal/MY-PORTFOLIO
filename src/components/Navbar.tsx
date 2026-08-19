import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Menu, X, FileText, Mail, Globe, Check, Command, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { NAV_ITEMS } from '../data/portfolioData';
import { BrandLogo } from './BrandLogo';
import { Language } from '../types';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenCommandPalette }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t, languageOptions } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => item.id);
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const getLocalizedNavName = (id: string, defaultName: string) => {
    switch (id) {
      case 'home':
        return t.nav.home;
      case 'about':
        return t.nav.about;
      case 'skills':
        return t.nav.skills;
      case 'projects':
        return t.nav.projects;
      case 'education':
        return t.nav.education;
      case 'contact':
        return t.nav.contact;
      default:
        return defaultName;
    }
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/80 dark:bg-slate-950/90 bg-white/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            id="brand-logo-link"
            className="focus:outline-none"
          >
            <BrandLogo size="md" />
          </a>

          {/* Desktop Nav Items (visible on large desktop 1024px+) */}
          <nav
            id="desktop-nav"
            className="hidden lg:flex items-center gap-0.5 bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-md p-1 rounded-full border border-slate-200/80 dark:border-slate-800/80 shadow-inner"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const localizedName = getLocalizedNavName(item.id, item.name);
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-1 text-xs xl:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white bg-indigo-600 shadow-md shadow-indigo-500/30'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/60 hover:border-indigo-200/60 dark:hover:border-indigo-800/60 hover:shadow-sm'
                  }`}
                >
                  {localizedName}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Language Switcher Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                id="language-toggle-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                aria-label="Change language / ভাষা পরিবর্তন / भाषा बदलें"
                title="Change language"
                className="flex items-center gap-1 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/90 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700/70 transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span className="font-semibold uppercase tracking-wider text-xs">
                  {language}
                </span>
                <span className="hidden xl:inline text-xs text-slate-500 dark:text-slate-400">
                  • {languageOptions.find((l) => l.code === language)?.nativeName}
                </span>
              </button>

              {/* Dropdown Menu */}
              {langDropdownOpen && (
                <div
                  id="language-dropdown-menu"
                  className="absolute right-0 mt-1.5 w-40 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 mb-0.5">
                    {t.nav.language}
                  </div>
                  {languageOptions.map((opt) => {
                    const isSelected = language === opt.code;
                    return (
                      <button
                        key={opt.code}
                        id={`lang-option-${opt.code}`}
                        onClick={() => {
                          setLanguage(opt.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 font-semibold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">{opt.nativeName}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            ({opt.label})
                          </span>
                        </div>
                        {isSelected && <Check className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Command Palette Trigger */}
            {onOpenCommandPalette && (
              <button
                id="header-command-palette-btn"
                onClick={onOpenCommandPalette}
                title="Search & Quick Actions (Cmd+K / Ctrl+K)"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/90 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700/70 transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-indigo-500" />
                <span className="hidden md:inline font-normal text-slate-500 dark:text-slate-400">Search</span>
                <kbd className="hidden md:inline-flex items-center gap-0.5 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  <Command className="w-2.5 h-2.5" />K
                </kbd>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              className="relative p-1.5 sm:p-2 rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/70 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 animate-in spin-in-90 duration-300" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 animate-in spin-in-90 duration-300" />
              )}
              <span className="sr-only">Toggle theme</span>
            </button>

            {/* Resume Button */}
            <button
              id="header-resume-btn"
              onClick={onOpenResume}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800/90 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 transition-all shadow-sm cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t.nav.resume}</span>
            </button>

            {/* Contact CTA */}
            <button
              id="header-hire-btn"
              onClick={() => scrollToSection('contact')}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20 active:scale-95 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-indigo-200" />
              <span>{t.nav.getInTouch}</span>
            </button>

            {/* Mobile / Tablet Hamburger Menu */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open navigation menu"
              className="p-1.5 sm:p-2 rounded-lg lg:hidden text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 pt-3 pb-6 space-y-3 shadow-xl transition-all"
        >
          {/* Mobile Language Selector Segment */}
          <div className="bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t.nav.language}:</span>
            </span>
            <div className="flex items-center gap-1">
              {languageOptions.map((opt) => {
                const isSelected = language === opt.code;
                return (
                  <button
                    key={opt.code}
                    id={`mobile-lang-${opt.code}`}
                    onClick={() => setLanguage(opt.code)}
                    className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {opt.nativeName}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const localizedName = getLocalizedNavName(item.id, item.name);
              return (
                <button
                  key={item.id}
                  id={`mobile-link-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {localizedName}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              id="mobile-theme-toggle-btn"
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-xl text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <span className="flex items-center gap-2">
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-600" />
                )}
                <span>{t.nav.theme}</span>
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono capitalize">
                {theme} mode
              </span>
            </button>

            <button
              id="mobile-resume-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <FileText className="w-4 h-4 text-indigo-500" />
              <span>{t.nav.viewResume}</span>
            </button>
            <button
              id="mobile-contact-btn"
              onClick={() => scrollToSection('contact')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-500"
            >
              <Mail className="w-4 h-4 text-indigo-200" />
              <span>{t.nav.contactShibshankar}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

