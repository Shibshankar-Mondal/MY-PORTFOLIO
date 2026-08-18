import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  FolderGit2,
  Eye,
  Layers,
  ShoppingBag,
  Database,
  Laptop,
  Gamepad2,
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { useLanguage } from '../context/LanguageContext';

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'frontend' | 'web' | 'system'>('all');

  const filteredProjects =
    activeFilter === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeFilter);

  const getProjectIllustration = (project: ProjectItem) => {
    switch (project.id) {
      case 'portfolio':
        return (
          <div className="w-full h-full relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-indigo-950/30 flex flex-col justify-end p-5 text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1 rounded-md bg-indigo-500/80 text-white shadow-sm">
                  <Laptop className="w-4 h-4" />
                </span>
                <span className="font-mono text-xs font-bold text-indigo-300">
                  &lt;Shibshankar.dev /&gt;
                </span>
              </div>
              <p className="text-[11px] text-slate-300">Responsive • Dark/Light • Modern</p>
            </div>
          </div>
        );
      case 'ecommerce':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-teal-900/40 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3 shadow-lg shadow-emerald-500/20">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <div className="font-mono text-xs font-semibold text-emerald-300">
              StepStyle Footwear Store
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Product Cards • Cart • Responsive</p>
          </div>
        );
      case 'block-slide':
        return (
          <div className="w-full h-full relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-purple-950/30 flex flex-col justify-end p-5 text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1 rounded-md bg-purple-500/80 text-white shadow-sm">
                  <Gamepad2 className="w-4 h-4" />
                </span>
                <span className="font-mono text-xs font-bold text-purple-300">
                  2248 Block Slide Puzzle
                </span>
              </div>
              <p className="text-[11px] text-slate-300">Interactive Grid • Move Tracker • Game Loop</p>
            </div>
          </div>
        );
      case 'block-slide-game':
        return (
          <div className="w-full h-full relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-sky-950/30 flex flex-col justify-end p-5 text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1 rounded-md bg-sky-500/80 text-white shadow-sm">
                  <Gamepad2 className="w-4 h-4" />
                </span>
                <span className="font-mono text-xs font-bold text-sky-300">
                  Block Slide Game
                </span>
              </div>
              <p className="text-[11px] text-slate-300">Sliding Physics • Combo Scoring • Web App</p>
            </div>
          </div>
        );
      case 'student-mgmt':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-950/60 via-slate-900 to-orange-900/40 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-3 shadow-lg shadow-amber-500/20">
              <Database className="w-7 h-7" />
            </div>
            <div className="font-mono text-xs font-semibold text-amber-300">
              SVU Student DB System
            </div>
            <p className="text-[11px] text-slate-400 mt-1">SQL CRUD • Student Records • Reports</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-24 relative bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>{t.projects.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.projects.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            id="filter-proj-all"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeFilter === 'all'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {t.projects.filterAll} ({PROJECTS_DATA.length})
          </button>
          <button
            id="filter-proj-frontend"
            onClick={() => setActiveFilter('frontend')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeFilter === 'frontend'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {t.projects.filterFrontend}
          </button>
          <button
            id="filter-proj-web"
            onClick={() => setActiveFilter('web')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeFilter === 'web'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {t.projects.filterWeb}
          </button>
          <button
            id="filter-proj-system"
            onClick={() => setActiveFilter('system')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeFilter === 'system'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {t.projects.filterDatabase}
          </button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-800/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Project Visual / Illustration Mockup */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden border-b border-slate-100 dark:border-slate-800 bg-slate-950">
                  {getProjectIllustration(project)}

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 text-white backdrop-blur-md border border-white/10 shadow-sm">
                      {project.badge}
                    </span>
                  </div>

                  {/* Quick View Button overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold text-xs flex items-center gap-1.5 shadow-lg hover:bg-slate-100 transition-transform active:scale-95 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-indigo-600" />
                      <span>{t.projects.viewDetails}</span>
                    </button>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Live Demo, Details & GitHub */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-2">
                <a
                  id={`project-live-btn-${project.id}`}
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm shadow-indigo-600/20 active:scale-95 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{t.projects.liveDemo}</span>
                </a>

                <button
                  id={`project-details-btn-${project.id}`}
                  onClick={() => setSelectedProject(project)}
                  title={t.projects.viewDetails}
                  className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-slate-500" />
                  <span className="hidden sm:inline">{t.projects.viewDetails}</span>
                </button>

                <a
                  id={`project-github-btn-${project.id}`}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  title={t.projects.sourceCode}
                  className="inline-flex items-center justify-center p-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
