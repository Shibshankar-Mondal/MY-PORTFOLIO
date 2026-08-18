import React from 'react';
import {
  ArrowUp,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Heart,
  Code2,
} from 'lucide-react';
import { PERSONAL_INFO, NAV_ITEMS } from '../data/portfolioData';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const getNavLabel = (id: string, fallback: string) => {
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
        return fallback;
    }
  };

  return (
    <footer
      id="portfolio-footer"
      className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-100 dark:border-slate-900">
          {/* Brand Info */}
          <div className="space-y-2 text-center md:text-left">
            <BrandLogo size="sm" showSubtitle={false} />
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              {t.footer.bio}
            </p>
          </div>

          {/* Nav Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-medium">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                {getNavLabel(item.id, item.name)}
              </button>
            ))}
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Profile"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <button
              id="back-to-top-btn"
              onClick={scrollToTop}
              title="Scroll to top"
              aria-label="Scroll to top"
              className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3 text-center sm:text-left">
          <p className="font-medium text-slate-700 dark:text-slate-300">
            {t.footer.rightsReserved}
          </p>
          <p className="flex items-center justify-center gap-1">
            <span>{t.footer.builtWith}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
