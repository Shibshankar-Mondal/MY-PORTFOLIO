/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThreeBackground } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-indigo-500 selection:text-white flex flex-col font-sans relative">
          {/* Full Screen 3D Interactive WebGL Animation */}
          <ThreeBackground />

          {/* Navigation Bar */}
          <Navbar onOpenResume={() => setIsResumeOpen(true)} />

          {/* Main Content Sections */}
          <main className="flex-1 space-y-0 relative z-10">
            <Hero onOpenResume={() => setIsResumeOpen(true)} />
            <About />
            <Skills />
            <Projects />
            <Education />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />

          {/* Resume Modal */}
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
          />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
