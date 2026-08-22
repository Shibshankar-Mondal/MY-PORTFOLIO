import React, { useState } from 'react';
import {
  GraduationCap,
  Code2,
  Database,
  Rocket,
  Compass,
  CheckCircle2,
  BookOpen,
  Laptop,
  TerminalSquare,
  MapPin,
  Calendar,
  Briefcase,
  ExternalLink,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();
  const [activePillar, setActivePillar] = useState<'focus' | 'interests' | 'values'>('focus');

  return (
    <section id="about" className="py-24 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span>{t.about.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.about.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Story & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Laptop className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>{t.about.journeyTitle}</span>
              </h3>

              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>{t.about.journeyP1}</p>
                <p>{t.about.journeyP2}</p>
                <p>{t.about.journeyP3}</p>
              </div>

              {/* Key Bullet Highlights */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                    {t.about.highlight1}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                    {t.about.highlight2}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                    {t.about.highlight3}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                    {t.about.highlight4}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Focus / Philosophy Tabs */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <button
                  onClick={() => setActivePillar('focus')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activePillar === 'focus'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {t.about.tabFocus}
                </button>
                <button
                  onClick={() => setActivePillar('interests')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activePillar === 'interests'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {t.about.tabInterests}
                </button>
                <button
                  onClick={() => setActivePillar('values')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activePillar === 'values'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {t.about.tabValues}
                </button>
              </div>

              <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed min-h-[60px]">
                {activePillar === 'focus' && (
                  <p>{t.about.focusDesc}</p>
                )}
                {activePillar === 'interests' && (
                  <p>{t.about.interestsDesc}</p>
                )}
                {activePillar === 'values' && (
                  <p>{t.about.valuesDesc}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Quick Profile Cards & Facts */}
          <div className="lg:col-span-5 space-y-4">
            {/* Quick Profile Summary Card */}
            <div className="bg-gradient-to-br from-indigo-900/10 via-slate-900/5 to-slate-900/20 dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-900/40 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-600/30 ring-2 ring-indigo-500/30">
                  SM
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    {PERSONAL_INFO.name}
                  </h4>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    {PERSONAL_INFO.title}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-2 border-b border-slate-200/80 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-indigo-500" />
                    {t.about.factDegree}
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    BCA (2nd Year)
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-200/80 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-sky-500" />
                    {t.about.factInstitution}
                  </span>
                  <a
                    href="https://www.swamivivekanandauniversity.ac.in/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-slate-800 dark:text-slate-200 text-right hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1"
                    title="Swami Vivekananda University (SVU) Official Website"
                  >
                    <span>SVU Barrackpore</span>
                    <ExternalLink className="w-3 h-3 text-indigo-400" />
                  </a>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-200/80 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    {t.about.factLocation}
                  </span>
                  <a
                    href={PERSONAL_INFO.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1 text-right"
                    title="View Swami Vivekananda University on Google Maps"
                  >
                    <span>{PERSONAL_INFO.location}</span>
                    <ExternalLink className="w-3 h-3 text-indigo-400" />
                  </a>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-200/80 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    {t.about.factYear}
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    2025 - 2029
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-amber-500" />
                    {t.about.factStatus}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {t.about.statusAvailable}
                  </span>
                </div>
              </div>
            </div>

            {/* Core Competencies Quick Pill Grid */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Core Domains
              </h4>
              <div className="flex flex-wrap gap-2">
                {['C & C++ OOP', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Responsive UI', 'SQL Queries', 'MongoDB', 'Git / GitHub', 'VS Code'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

