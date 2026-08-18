import React from 'react';
import {
  X,
  Printer,
  Download,
  Mail,
  PhoneCall,
  MapPin,
  GraduationCap,
  Briefcase,
  Code2,
  FileText,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { PERSONAL_INFO, SKILLS_DATA, PROJECTS_DATA, EDUCATION_DATA } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const textContent = `
===================================================================
SHIBSHANKAR MONDAL - RESUME
BCA 2nd Year Student & Aspiring Web Developer
Swami Vivekananda University (SVU Barrackpore), Kolkata, West Bengal
Phone: ${PERSONAL_INFO.phone}
Email: ${PERSONAL_INFO.email}
GitHub: https://github.com
===================================================================

SUMMARY
-------
2nd-year BCA student passionate about web development, programming and creating useful digital experiences. Building strong foundations in C, C++, JavaScript, Web Technologies (HTML, CSS), and Databases (SQL, MongoDB).

EDUCATION
---------
* Bachelor of Computer Applications (BCA) - 2nd Year (2025 - 2029)
  Swami Vivekananda University (SVU), Barrackpore, Kolkata
  Relevant Coursework: Data Structures, OOP (C++), DBMS (SQL), Web Technologies

* Higher Secondary Education (10+2) - Kamdevpur Snehabala Milan Vidyapith (H.S) / WBCHSE (Completed 2025)
* Secondary School Education (10th) - Kamdevpur Snehabala Milan Vidyapith (H.S) / WBBSE (Completed 2023)

TECHNICAL SKILLS
----------------
* Programming: Python, C, C++, JavaScript (ES6+)
* Web Development: HTML5, CSS3, JavaScript, Responsive Web Design
* Databases: SQL, MongoDB
* Office & Accounting: MS Excel, MS Word, MS PowerPoint, Tally Prime / ERP
* Developer Tools: Git, GitHub, VS Code

FEATURED PROJECTS
-----------------
1. Personal Portfolio Website
   - Responsive portfolio built with modern HTML5, CSS3, JavaScript.
   - Dark/Light mode, interactive project showcases, and accessible design.

2. E-Commerce Shoe Store
   - Modern shoe-shopping website with dynamic product cards, category filters, and responsive cart.

3. Student Management System
   - Structured database project for student information tracking and SQL CRUD queries.

===================================================================
`.trim();

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Shibshankar_Mondal_BCA_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="resume-modal-card"
        className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Controls (No-print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {t.resumeModal.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.resumeModal.printResume}</span>
            </button>
            <button
              onClick={handleDownloadText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.resumeModal.downloadPdf}</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close resume modal"
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document View */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex-1 space-y-6 text-sm">
          {/* Header */}
          <div className="border-b-2 border-slate-900 dark:border-slate-100 pb-5 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              SHIBSHANKAR MONDAL
            </h1>
            <p className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400">
              BCA Student (2nd Year) & Aspiring Web Developer
            </p>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Barrackpore, Kolkata, West Bengal, India
              </span>
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
                {PERSONAL_INFO.formattedPhone}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {PERSONAL_INFO.email}
              </span>
              <a
                href="https://www.swamivivekanandauniversity.ac.in/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors group cursor-pointer"
                title="Swami Vivekananda University (SVU) Official Website"
              >
                <GraduationCap className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500" />
                <span>Swami Vivekananda University (SVU)</span>
                <ExternalLink className="w-2.5 h-2.5 text-slate-400 group-hover:text-indigo-500" />
              </a>
            </div>
          </div>

          {/* Professional Objective */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              Objective & Profile
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Motivated 2nd-year BCA student at Swami Vivekananda University (SVU Barrackpore) passionate about web development and core programming. Seeking an internship or entry-level web developer role where I can contribute to creating responsive digital solutions while continuing to learn and master modern frontend and backend technologies.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm">
                      Bachelor of Computer Applications (BCA) — 2nd Year
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <a
                        href="https://www.swamivivekanandauniversity.ac.in/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline inline-flex items-center gap-1"
                        title="Swami Vivekananda University (SVU) Official Website"
                      >
                        <span>Swami Vivekananda University (SVU), Barrackpore</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-500">2025 - 2029</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  <strong>Core Coursework:</strong> Data Structures & Algorithms, Object-Oriented Programming (C++), Database Management Systems (SQL), Web Technologies (HTML, CSS, JS), Computer Architecture.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm">
                      MERN Stack Web Development
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <a
                        href="https://www.learninghub.ind.in/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Learning Hub</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-500">2026 - 2027</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  <strong>Coursework:</strong> MongoDB & Mongoose, Express.js REST APIs, React.js SPAs, Node.js Server Architecture, JWT Auth, Postman, Full-Stack Deployment.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm">
                      Higher Secondary Education (10+2)
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <a
                        href="https://www.justdial.com/South-24-Parganas/Kamdevpur-Snehabala-Milan-Vidyapith-Kamdevpur/9999P3210-3210-230625180707-T6G3_BZDET"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Kamdevpur Snehabala Milan Vidyapith (H.S) — WBCHSE</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-500">Completed 2025</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm">
                      Secondary School Education (10th)
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <a
                        href="https://www.justdial.com/South-24-Parganas/Kamdevpur-Snehabala-Milan-Vidyapith-Kamdevpur/9999P3210-3210-230625180707-T6G3_BZDET"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Kamdevpur Snehabala Milan Vidyapith (H.S) — WBBSE</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-500">Completed 2023</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
              <div>
                <strong>Programming:</strong> Python, C, C++, JavaScript (ES6+)
              </div>
              <div>
                <strong>Web Development:</strong> HTML5, CSS3, JavaScript, Responsive UI
              </div>
              <div>
                <strong>Databases:</strong> SQL, MongoDB
              </div>
              <div>
                <strong>Office & Productivity:</strong> MS Excel, MS Word, MS PowerPoint
              </div>
              <div>
                <strong>Accounting:</strong> Tally Prime / ERP
              </div>
              <div>
                <strong>Developer Tools:</strong> Git, GitHub, VS Code
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              Key Projects
            </h2>
            <div className="space-y-3">
              {PROJECTS_DATA.map((p) => (
                <div key={p.id} className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {p.title}
                    </h3>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-mono">
                      [{p.technologies.slice(0, 3).join(', ')}]
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {p.shortDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
