import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  Mail,
  FileText,
  Github,
  Linkedin,
  Instagram,
  MapPin,
  ExternalLink,
  Upload,
  Sparkles,
  Terminal,
  Code2,
  Send,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO, PROJECTS_DATA, SKILLS_DATA } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { playUiSound } from '../utils/soundEffects';

interface HeroProps {
  onOpenResume: () => void;
}

const DEFAULT_DEVELOPER_IMAGE = '/images/shibshankar-developer.svg';

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { t } = useLanguage();
  const [avatarImage, setAvatarImage] = useState<string>(DEFAULT_DEVELOPER_IMAGE);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Terminal state
  const [terminalTab, setTerminalTab] = useState<'code' | 'shell'>('shell');
  const [cmdInput, setCmdInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<Array<{ text: string; type: 'input' | 'output' | 'success' | 'system' }>>([
    { text: 'Shibshankar DevShell v2.4 (React 19 + TypeScript)', type: 'system' },
    { text: 'Type "help" or click quick commands below to explore:', type: 'output' },
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedAvatar = localStorage.getItem('user_custom_avatar');
    if (savedAvatar) {
      setAvatarImage(savedAvatar);
    }

    const handleGlobalPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.startsWith('image/')) {
            const file = items[i].getAsFile();
            if (file) {
              processFile(file);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('paste', handleGlobalPaste);
    return () => {
      window.removeEventListener('paste', handleGlobalPaste);
    };
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#a855f7', '#ec4899', '#38bdf8', '#34d399'],
    });
  };

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    playUiSound('terminal');
    const newLogs = [...terminalLogs, { text: `$ ${cmdStr}`, type: 'input' as const }];

    switch (trimmed) {
      case 'help':
        newLogs.push({
          text: 'Available commands: about, skills, projects, education, contact, hire, clear',
          type: 'output',
        });
        break;

      case 'about':
        newLogs.push({
          text: `🎓 Shibshankar Mondal — 2nd Year BCA Student @ SVU Barrackpore. Passionate Web & Software Developer.`,
          type: 'output',
        });
        break;

      case 'skills':
        newLogs.push({
          text: `⚡ Tech Stack: C, C++, Python, JavaScript, HTML5, CSS3, React, SQL, MongoDB, Git & GitHub.`,
          type: 'output',
        });
        break;

      case 'projects':
        newLogs.push({
          text: `🚀 Projects: 1. Personal Portfolio | 2. E-Commerce Shoe Store | 3. 2248 Block Slide | 4. Student Management System`,
          type: 'output',
        });
        break;

      case 'education':
        newLogs.push({
          text: `🏛️ Education: BCA @ Swami Vivekananda University (2025-2029) • MERN Stack @ Learning Hub`,
          type: 'output',
        });
        break;

      case 'contact':
        newLogs.push({
          text: `📬 Email: ${PERSONAL_INFO.email} | 📞 Phone: ${PERSONAL_INFO.phone}`,
          type: 'output',
        });
        break;

      case 'hire':
      case 'sudo hire':
        newLogs.push({
          text: `🎉 Thank you! I am available for internships and exciting software projects. Let's build together!`,
          type: 'success',
        });
        triggerConfetti();
        playUiSound('success');
        break;

      case 'clear':
        setTerminalLogs([]);
        setCmdInput('');
        return;

      default:
        newLogs.push({
          text: `Command not found: "${trimmed}". Type "help" for a list of commands.`,
          type: 'output',
        });
        break;
    }

    setTerminalLogs(newLogs);
    setCmdInput('');
    setTimeout(() => terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setAvatarImage(base64);
        localStorage.setItem('user_custom_avatar', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elPosition = el.getBoundingClientRect().top;
      const offsetPosition = elPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4.5rem)] flex items-center pt-24 pb-16 lg:py-24 overflow-hidden bg-slate-950 text-slate-100"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-indigo-600/10 blur-[130px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/15 blur-[140px] rounded-full" />
        <div className="absolute -bottom-10 left-1/3 w-[500px] h-[300px] bg-sky-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Text & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center flex flex-col items-center">
            {/* Pill Badge */}
            <a
              id="hero-university-badge"
              href="https://www.swamivivekanandauniversity.ac.in/"
              target="_blank"
              rel="noreferrer"
              title="Swami Vivekananda University (SVU) — Official Website"
              className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11162b] hover:bg-[#18203d] border border-indigo-900/70 hover:border-indigo-600/60 text-xs font-medium text-indigo-300 hover:text-indigo-200 transition-all duration-200 shadow-sm hover:shadow-indigo-500/20 active:scale-95 group cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shrink-0" />
              <span>{t.hero.studentBadge}</span>
              <ExternalLink className="w-3 h-3 text-indigo-400/80 group-hover:text-indigo-200 transition-transform group-hover:translate-x-0.5 shrink-0" />
            </a>

            {/* Greeting & Main Headings */}
            <div className="space-y-2 text-center">
              <p className="text-lg sm:text-xl font-medium text-slate-300">
                {t.hero.greeting}
              </p>
              <h1
                id="hero-developer-name-heading"
                className="relative inline-block text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight leading-[1.12] select-none py-1 perspective-1000"
              >
                <span className="relative z-10 font-display font-black tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-3d drop-shadow-[0_8px_20px_rgba(99,102,241,0.55)] transition-transform duration-300 hover:scale-105 inline-block">
                  {PERSONAL_INFO.name}
                </span>
                {/* 3D Extrusion Shadow Layer */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 z-0 font-display font-black tracking-tight text-indigo-950/80 blur-[2px] translate-y-1.5 translate-x-0.5 select-none pointer-events-none hidden sm:inline-block"
                >
                  {PERSONAL_INFO.name}
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-200 pt-1">
                {t.hero.introPrefix}{' '}
                <span className="text-sky-400">{t.hero.roleHighlight}</span>
              </h2>
            </div>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed text-center">
              {t.hero.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
              <button
                id="hero-view-projects-btn"
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>{t.hero.viewProjects}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                id="hero-contact-btn"
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-200 bg-[#121829] hover:bg-[#1a2238] border border-slate-800 hover:border-slate-700 transition-all active:scale-95 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{t.hero.contactMe}</span>
              </button>

              <button
                id="hero-view-resume-btn"
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-200 bg-[#121829] hover:bg-[#1a2238] border border-slate-800 hover:border-slate-700 transition-all active:scale-95 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>{t.hero.resume}</span>
              </button>
            </div>

            {/* Social & Contact Metadata Row */}
            <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-6 pt-4 border-t border-slate-900 text-xs sm:text-sm text-slate-400 w-full">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 text-slate-400" />
                <span>GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4 text-rose-400" />
                <span>Instagram</span>
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>

              <a
                href={PERSONAL_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                title="View Swami Vivekananda University on Google Maps"
              >
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{PERSONAL_INFO.location || 'Barrackpore, Kolkata'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Developer Showcase Card (Image & Terminal) */}
          <div className="lg:col-span-5 w-full">
            <div
              id="hero-developer-showcase-card"
              className="relative rounded-3xl p-1.5 bg-gradient-to-b from-indigo-500/40 via-purple-600/25 to-slate-900/60 border border-indigo-500/35 shadow-[0_0_60px_-15px_rgba(99,102,241,0.45)]"
            >
              <div className="rounded-[22px] bg-[#070b16] border border-slate-800/90 p-3.5 sm:p-4 space-y-3">
                {/* Photo / Workstation Display Container */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative rounded-2xl overflow-hidden aspect-[4/3.8] bg-[#0c1222] border transition-all duration-300 group cursor-pointer ${
                    isDragging
                      ? 'border-indigo-400 ring-4 ring-indigo-500/50 scale-[1.01]'
                      : 'border-slate-800/80 shadow-inner hover:border-indigo-500/50'
                  }`}
                  title="Click or drag-and-drop to upload/change your photo"
                >
                  <img
                    id="hero-showcase-image"
                    src={avatarImage}
                    alt={PERSONAL_INFO.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== window.location.origin + DEFAULT_DEVELOPER_IMAGE) {
                        target.src = DEFAULT_DEVELOPER_IMAGE;
                      }
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Drag-over Backdrop Overlay */}
                  {isDragging && (
                    <div className="absolute inset-0 bg-indigo-950/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 z-40 animate-in fade-in">
                      <Upload className="w-10 h-10 text-indigo-400 animate-bounce mb-2" />
                      <p className="text-sm font-bold text-white">Drop your image here</p>
                      <p className="text-xs text-indigo-200">Release to apply to your showcase card</p>
                    </div>
                  )}

                  {/* Hover Upload Hint Button (Top Right) */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-indigo-500/50 text-xs font-semibold text-indigo-200 shadow-xl">
                      <Upload className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Change Photo</span>
                    </span>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {/* Floating Current Focus Badge Overlay on Photo */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-[#0c1427]/92 backdrop-blur-md border border-slate-800/90 flex items-center justify-between shadow-2xl pointer-events-none z-20">
                    <div>
                      <div className="text-[10px] font-bold tracking-wider text-indigo-400 uppercase flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-indigo-400" />
                        <span>CURRENT FOCUS</span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white tracking-tight mt-0.5">
                        Full-Stack Web Dev &amp; C++ DSA
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#042f2e]/90 border border-teal-500/60 text-teal-300 shrink-0">
                      2nd Year BCA
                    </span>
                  </div>
                </div>

                {/* Bottom Code Terminal Box */}
                <div className="rounded-xl bg-[#050914] border border-slate-800/90 p-3 sm:p-3.5 font-mono text-xs text-slate-300 space-y-2.5 shadow-inner">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/70 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setTerminalTab('shell');
                          playUiSound('tab');
                        }}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                          terminalTab === 'shell'
                            ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Terminal className="w-3 h-3" />
                        <span>dev_shell</span>
                      </button>
                      <button
                        onClick={() => {
                          setTerminalTab('code');
                          playUiSound('tab');
                        }}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                          terminalTab === 'code'
                            ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Code2 className="w-3 h-3" />
                        <span>developer.ts</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Ready</span>
                    </div>
                  </div>

                  {terminalTab === 'code' ? (
                    <div className="space-y-1 text-xs leading-relaxed overflow-x-auto pt-0.5 font-mono">
                      <p>
                        <span className="text-teal-400 font-semibold">const</span>{' '}
                        <span className="text-slate-200">developer</span> = {'{'}
                      </p>
                      <p className="pl-3">
                        <span className="text-slate-300">name:</span>{' '}
                        <span className="text-amber-300">"{PERSONAL_INFO.name}"</span>,
                      </p>
                      <p className="pl-3">
                        <span className="text-slate-300">education:</span>{' '}
                        <span className="text-amber-300">"BCA 2nd Year @ SVU"</span>,
                      </p>
                      <p className="pl-3">
                        <span className="text-slate-300">focus:</span>{' '}
                        <span className="text-emerald-300">["React", "Node.js", "C++ DSA", "SQL"]</span>,
                      </p>
                      <p className="pl-3">
                        <span className="text-slate-300">status:</span>{' '}
                        <span className="text-emerald-400 font-semibold">"Ready for Internships &amp; Projects 🚀"</span>
                      </p>
                      <p>{'}'};</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {/* Terminal log messages */}
                      <div className="max-h-28 overflow-y-auto space-y-1 pr-1 font-mono text-[11px] leading-relaxed scrollbar-thin">
                        {terminalLogs.map((log, idx) => (
                          <div
                            key={idx}
                            className={`${
                              log.type === 'input'
                                ? 'text-indigo-400 font-bold'
                                : log.type === 'success'
                                ? 'text-emerald-400 font-bold bg-emerald-950/40 p-1.5 rounded border border-emerald-500/30'
                                : log.type === 'system'
                                ? 'text-slate-400 italic text-[10px]'
                                : 'text-slate-300'
                            }`}
                          >
                            {log.text}
                          </div>
                        ))}
                        <div ref={terminalEndRef} />
                      </div>

                      {/* Interactive Prompt Input */}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleCommand(cmdInput);
                        }}
                        className="flex items-center gap-1.5 pt-1 border-t border-slate-800/60"
                      >
                        <span className="text-indigo-400 font-bold text-xs shrink-0">&gt;</span>
                        <input
                          type="text"
                          value={cmdInput}
                          onChange={(e) => setCmdInput(e.target.value)}
                          placeholder="Type 'help', 'hire', 'skills'..."
                          className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
                        />
                        <button
                          type="submit"
                          className="p-1 rounded text-slate-400 hover:text-indigo-400 hover:bg-slate-800/80 transition-colors cursor-pointer shrink-0"
                          title="Execute command"
                        >
                          <Send className="w-3 h-3" />
                        </button>
                      </form>

                      {/* Quick Command Suggestion Chips */}
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {['help', 'skills', 'projects', 'hire', 'clear'].map((cmd) => (
                          <button
                            key={cmd}
                            type="button"
                            onClick={() => handleCommand(cmd)}
                            className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 hover:bg-indigo-950 text-slate-400 hover:text-indigo-300 border border-slate-800 hover:border-indigo-500/40 transition-colors cursor-pointer"
                          >
                            {cmd}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
