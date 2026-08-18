import React from 'react';
import {
  GraduationCap,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  CheckCircle2,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export const Education: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t.education.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.education.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.education.subtitle}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical central timeline line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-indigo-500 via-indigo-400 to-slate-300 dark:to-slate-800 hidden sm:block" />

          <div className="space-y-12">
            {EDUCATION_DATA.map((item, index) => {
              const isEven = index % 2 === 0;
              const isCurrent = item.id === 'bca';
              const isTechTraining = item.id === 'learning-hub-mern';

              return (
                <div
                  key={item.id}
                  id={`education-item-${item.id}`}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Badge Center Node */}
                  <div className={`hidden sm:flex absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white dark:bg-slate-900 border-2 ${
                    isTechTraining
                      ? 'border-emerald-500 text-emerald-500'
                      : 'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400'
                  } items-center justify-center shadow-md z-10`}>
                    {isTechTraining ? (
                      <Code2 className="w-4 h-4" />
                    ) : (
                      <GraduationCap className="w-4 h-4" />
                    )}
                  </div>

                  {/* Content Card (Takes half the grid width) */}
                  <div className="w-full sm:w-[calc(50%-2rem)]">
                    <div
                      className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border transition-all duration-300 ${
                        isCurrent
                          ? 'border-indigo-300 dark:border-indigo-800/80 shadow-md ring-1 ring-indigo-500/20'
                          : isTechTraining
                          ? 'border-emerald-300/80 dark:border-emerald-800/60 shadow-md ring-1 ring-emerald-500/10'
                          : 'border-slate-200 dark:border-slate-800 shadow-sm'
                      }`}
                    >
                      {/* Top status & period */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                            isCurrent
                              ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800'
                              : isTechTraining
                              ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {item.status}
                        </span>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Calendar className={`w-3.5 h-3.5 ${isTechTraining ? 'text-emerald-500' : 'text-indigo-500'}`} />
                          {item.period}
                        </span>
                      </div>

                      {/* Degree & Institution */}
                      <div className="pt-4 space-y-1.5">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                          {item.degree}
                        </h3>
                        {item.websiteUrl ? (
                          <a
                            href={item.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center gap-1 text-xs sm:text-sm font-semibold ${
                              isTechTraining
                                ? 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300'
                                : 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300'
                            } hover:underline group/inst`}
                            title={`Visit ${item.institution} official portal`}
                          >
                            <span>{item.institution}</span>
                            <ExternalLink className={`w-3 h-3 ${isTechTraining ? 'text-emerald-500' : 'text-indigo-400'} group-hover/inst:translate-x-0.5 transition-transform`} />
                          </a>
                        ) : (
                          <div className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                            <span>{item.institution}</span>
                          </div>
                        )}
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{item.location}</span>
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Key Highlights */}
                      <div className="mt-4 space-y-1.5">
                        {item.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Relevant Coursework */}
                      {item.courses && item.courses.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Relevant Coursework
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {item.courses.map((course) => (
                              <span
                                key={course}
                                className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* University Spotlight Banner */}
        <div className="mt-16 max-w-3xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-indigo-900/10 via-slate-900/5 to-sky-900/10 dark:from-indigo-950/40 dark:via-slate-900 dark:to-sky-950/40 border border-indigo-200/70 dark:border-indigo-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-600/30">
              SVU
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Swami Vivekananda University (SVU)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Barrackpore, Kolkata • Department of Computer Applications
              </p>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
            Current: BCA 2nd Year
          </div>
        </div>
      </div>
    </section>
  );
};
