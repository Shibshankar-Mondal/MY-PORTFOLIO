import React, { useState, useRef } from 'react';
import {
  Code,
  Terminal,
  Code2,
  FileCode2,
  Layers,
  Palette,
  Smartphone,
  Database,
  Server,
  GitBranch,
  Github,
  Cpu,
  Binary,
  Sheet,
  FileText,
  Presentation,
  Calculator,
  CheckCircle,
  Filter,
  Search,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { SkillCategory, SkillItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { playUiSound } from '../utils/soundEffects';

interface SkillCardItemProps {
  skill: SkillItem;
  getSkillIcon: (iconName: string) => React.ReactNode;
  proficiencyLabel: string;
}

const SkillCardItem: React.FC<SkillCardItemProps> = ({
  skill,
  getSkillIcon,
  proficiencyLabel,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles (max +/- 10 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale3d(1.025, 1.025, 1.025)`
    );

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY, opacity: 0.18 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)');
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? transformStyle
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
        transition: isHovered
          ? 'transform 0.08s ease-out'
          : 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.45s ease',
      }}
      className={`relative bg-white dark:bg-slate-900 rounded-2xl p-6 border transition-colors duration-300 flex flex-col justify-between overflow-hidden cursor-default select-none ${
        isHovered
          ? 'border-indigo-400/80 dark:border-indigo-500/80 shadow-2xl shadow-indigo-500/15 dark:shadow-indigo-500/25 ring-1 ring-indigo-500/20'
          : 'border-slate-200 dark:border-slate-800 shadow-sm'
      }`}
    >
      {/* 3D dynamic specular sheen layer */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-2xl z-0"
        style={{
          opacity: glarePosition.opacity,
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.45), transparent 65%)`,
        }}
      />

      <div
        className="space-y-4 relative z-10"
        style={{
          transform: isHovered ? 'translateZ(26px)' : 'none',
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Header: Icon & Category Tag */}
        <div className="flex items-center justify-between">
          <div
            className={`w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'scale-110 shadow-md ring-1 ring-indigo-500/30' : ''
            }`}
          >
            {getSkillIcon(skill.icon)}
          </div>
          <span
            className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border transition-colors duration-200 ${
              isHovered
                ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            {skill.levelLabel}
          </span>
        </div>

        {/* Skill Name & Description */}
        <div>
          <h3
            className={`text-base font-bold transition-colors duration-200 ${
              isHovered
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-slate-900 dark:text-white'
            }`}
          >
            {skill.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {skill.description}
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div
        className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/60 space-y-2 relative z-10"
        style={{
          transform: isHovered ? 'translateZ(18px)' : 'none',
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-slate-500 dark:text-slate-400">{proficiencyLabel}</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-mono font-semibold">
            {skill.level}%
          </span>
        </div>
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full transition-all duration-500"
            style={{ width: `${skill.level}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export const Skills: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [skillSearch, setSkillSearch] = useState<string>('');
  const [copiedTechStack, setCopiedTechStack] = useState<boolean>(false);

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-indigo-500" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-sky-500" />;
      case 'Binary':
        return <Binary className="w-5 h-5 text-amber-500 dark:text-amber-400" />;
      case 'FileCode2':
        return <FileCode2 className="w-5 h-5 text-yellow-500" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-orange-500" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-blue-500" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-emerald-500" />;
      case 'Database':
        return <Database className="w-5 h-5 text-indigo-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-emerald-400" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 text-rose-500" />;
      case 'Github':
        return <Github className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-500" />;
      case 'Sheet':
        return <Sheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Presentation':
        return <Presentation className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      default:
        return <Code className="w-5 h-5 text-indigo-500" />;
    }
  };

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const q = skillSearch.toLowerCase().trim();
    if (!q) return matchesCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(q) ||
      skill.description.toLowerCase().includes(q) ||
      skill.levelLabel.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleCopyTechStack = () => {
    const list = SKILLS_DATA.map((s) => `${s.name} (${s.levelLabel} - ${s.level}%)`).join(', ');
    navigator.clipboard.writeText(list);
    setCopiedTechStack(true);
    playUiSound('success');
    setTimeout(() => setCopiedTechStack(false), 2000);
  };

  const categories: Array<{ id: SkillCategory; label: string; count: number }> = [
    { id: 'all', label: t.skills.filterAll, count: SKILLS_DATA.length },
    {
      id: 'programming',
      label: t.skills.filterProgramming,
      count: SKILLS_DATA.filter((s) => s.category === 'programming').length,
    },
    {
      id: 'web',
      label: t.skills.filterWeb,
      count: SKILLS_DATA.filter((s) => s.category === 'web').length,
    },
    {
      id: 'database',
      label: t.skills.filterDatabase,
      count: SKILLS_DATA.filter((s) => s.category === 'database').length,
    },
    {
      id: 'tools',
      label: t.skills.filterTools,
      count: SKILLS_DATA.filter((s) => s.category === 'tools').length,
    },
  ];

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span>{t.skills.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.skills.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.skills.subtitle}
          </p>
        </div>

        {/* Filter Category Tabs & Live Search */}
        <div className="space-y-4 mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Live Search */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                placeholder="Search skills (C++, Python, React, SQL)..."
                className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
              {skillSearch && (
                <button
                  onClick={() => setSkillSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Copy Tech Stack Button */}
            <button
              onClick={handleCopyTechStack}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm transition-all cursor-pointer"
            >
              {copiedTechStack ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Tech Stack Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Tech Stack Summary</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`filter-skill-${cat.id}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    playUiSound('tab');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-indigo-500/50 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Cards Grid with 3D Hover */}
        {filteredSkills.length === 0 ? (
          <div className="py-16 text-center text-slate-400 max-w-md mx-auto space-y-3">
            <Search className="w-10 h-10 mx-auto text-slate-400 opacity-50" />
            <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
              No matching skills found
            </p>
            <p className="text-xs text-slate-500">
              Try searching with another keyword like "React", "C++", "DSA", or "SQL".
            </p>
            <button
              onClick={() => {
                setSkillSearch('');
                setActiveCategory('all');
                playUiSound('tab');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <SkillCardItem
                key={skill.name}
                skill={skill}
                getSkillIcon={getSkillIcon}
                proficiencyLabel={t.skills.proficiency}
              />
            ))}
          </div>
        )}

        {/* Realistic Note / Ethics Badge */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">💡 Transparent Self-Assessment:</span> All ratings reflect honest student proficiency based on coursework at SVU Barrackpore and hands-on coding practice.
          </p>
        </div>
      </div>
    </section>
  );
};

