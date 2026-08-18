export type ThemeMode = 'dark' | 'light';
export type Language = 'en' | 'bn' | 'hi';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeName: string;
  flag?: string;
}

export interface NavItem {
  name: string;
  href: string;
  id: string;
}

export type SkillCategory = 'all' | 'programming' | 'web' | 'database' | 'tools';

export interface SkillItem {
  name: string;
  category: 'programming' | 'web' | 'database' | 'tools';
  level: number; // 0-100 (kept authentic: 65-85% for student)
  levelLabel: 'Learning' | 'Intermediate' | 'Proficient' | 'Core Focus';
  icon: string;
  description: string;
  highlight?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'web' | 'system' | 'frontend';
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  features: string[];
  liveDemoUrl: string;
  githubUrl: string;
  imageBgGradient: string;
  accentColor: string;
  badge: string;
  mockupType: 'browser' | 'dashboard' | 'code';
  imageUrl?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: string;
  description: string;
  highlights: string[];
  courses: string[];
  websiteUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
