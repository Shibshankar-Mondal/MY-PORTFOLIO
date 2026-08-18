import { Language, LanguageOption } from '../types';

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'bn', label: 'Bengali', nativeName: 'বাংলা' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
];

export interface TranslationSchema {
  // Navigation
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    education: string;
    contact: string;
    resume: string;
    getInTouch: string;
    viewResume: string;
    contactShibshankar: string;
    theme: string;
    language: string;
  };

  // Hero Section
  hero: {
    studentBadge: string;
    greeting: string;
    introPrefix: string;
    roleTitle: string;
    roleHighlight: string;
    bio: string;
    viewProjects: string;
    contactMe: string;
    resume: string;
    location: string;
    barrackporeCollege: string;
    statusBadge: string;
    availableStatus: string;
    workstationTitle: string;
    customPhotoHint: string;
    resetPhoto: string;
  };

  // About Section
  about: {
    badge: string;
    title: string;
    subtitle: string;
    journeyTitle: string;
    journeyP1: string;
    journeyP2: string;
    journeyP3: string;
    highlight1: string;
    highlight2: string;
    highlight3: string;
    highlight4: string;
    tabFocus: string;
    tabInterests: string;
    tabValues: string;
    focusTitle: string;
    focusDesc: string;
    interestsTitle: string;
    interestsDesc: string;
    valuesTitle: string;
    valuesDesc: string;
    quickFactsTitle: string;
    factName: string;
    factInstitution: string;
    factDegree: string;
    factYear: string;
    factLocation: string;
    factStatus: string;
    statusAvailable: string;
  };

  // Skills Section
  skills: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterProgramming: string;
    filterWeb: string;
    filterDatabase: string;
    filterTools: string;
    proficiency: string;
    learning: string;
    intermediate: string;
    proficient: string;
    coreFocus: string;
  };

  // Projects Section
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterFrontend: string;
    filterWeb: string;
    filterDatabase: string;
    viewDetails: string;
    liveDemo: string;
    sourceCode: string;
    keyFeatures: string;
    technologiesUsed: string;
    interactiveDemo: string;
    close: string;
  };

  // Education Section
  education: {
    badge: string;
    title: string;
    subtitle: string;
    currentYear: string;
    completed: string;
    keyHighlights: string;
    relevantCourses: string;
  };

  // Contact Section
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    sendMessageTitle: string;
    sendMessageSubtitle: string;
    yourName: string;
    namePlaceholder: string;
    yourEmail: string;
    emailPlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    yourMessage: string;
    messagePlaceholder: string;
    sendMessageBtn: string;
    sendingBtn: string;
    sentSuccess: string;
    directContactTitle: string;
    primaryEmail: string;
    altEmail: string;
    phone: string;
    location: string;
    university: string;
    copyEmail: string;
    copied: string;
    callNow: string;
  };

  // Footer Section
  footer: {
    bio: string;
    quickLinks: string;
    connect: string;
    studentTitle: string;
    rightsReserved: string;
    builtWith: string;
  };

  // Resume Modal
  resumeModal: {
    title: string;
    subtitle: string;
    downloadPdf: string;
    printResume: string;
    close: string;
    contactInfo: string;
    summary: string;
    education: string;
    skills: string;
    projects: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      education: 'Education',
      contact: 'Contact',
      resume: 'Resume',
      getInTouch: 'Get in Touch',
      viewResume: 'View / Download Resume',
      contactShibshankar: 'Contact Shibshankar',
      theme: 'Theme',
      language: 'Language',
    },
    hero: {
      studentBadge: '2nd Year Student • Swami Vivekananda University (SVU), Barrackpore',
      greeting: "Welcome to my portfolio! 👋 I'm",
      introPrefix: "I'm a BCA Student &",
      roleTitle: 'Aspiring Web Developer',
      roleHighlight: 'Web Developer',
      bio: 'Passionate 2nd-year BCA student at SVU Barrackpore with a strong drive to build modern, responsive, and user-centric web applications. Enthusiastic about full-stack web development, frontend aesthetics, database systems, and clean code principles.',
      viewProjects: 'View My Projects',
      contactMe: 'Contact Me',
      resume: 'Resume',
      location: 'Barrackpore, Kolkata',
      barrackporeCollege: 'SVU Barrackpore',
      statusBadge: 'Status',
      availableStatus: 'Open for Opportunities',
      workstationTitle: 'Developer Workstation',
      customPhotoHint: 'Click to upload custom photo or choose preset',
      resetPhoto: 'Reset to default illustration',
    },
    about: {
      badge: 'About Shibshankar',
      title: 'Curious Learner, Builder & Aspiring Developer',
      subtitle: 'A 2nd-year BCA student at SVU Barrackpore dedicated to crafting clean code, responsive user interfaces, and dependable software solutions.',
      journeyTitle: 'My Journey in Technology',
      journeyP1: 'I am currently a 2nd-year Bachelor of Computer Applications (BCA) student at Swami Vivekananda University (SVU Barrackpore). My passion lies at the intersection of logical problem-solving and modern web development.',
      journeyP2: 'Throughout my academic coursework and personal projects, I have been strengthening my programming fundamentals in C, C++, and JavaScript, while exploring relational databases (SQL) and modern document stores (MongoDB).',
      journeyP3: 'I believe the best way to master computer science is through hands-on practice. That is why I actively build real-world projects—from responsive e-commerce stores to student management databases—constantly refining my frontend engineering and UI design skills.',
      highlight1: 'BCA Student at SVU Barrackpore',
      highlight2: 'Web Development Enthusiast',
      highlight3: 'Programming & DB: Python, C, C++, JS, SQL',
      highlight4: 'Practical Focus: Real-world projects',
      tabFocus: 'Current Focus',
      tabInterests: 'Passions & Interests',
      tabValues: 'Core Values',
      focusTitle: 'Frontend & Full-Stack Mastery',
      focusDesc: 'Deepening understanding of modern JavaScript, component architectures, responsive UI patterns, and backend API integration.',
      interestsTitle: 'Web Tech & Problem Solving',
      interestsDesc: 'Exploring interactive interfaces, database schema optimization, algorithm design, and developer tooling.',
      valuesTitle: 'Clean Code & Continuous Growth',
      valuesDesc: 'Committed to writing readable, maintainable code, actively seeking mentorship, and learning new tools every day.',
      quickFactsTitle: 'Quick Profile Facts',
      factName: 'Name:',
      factInstitution: 'University:',
      factDegree: 'Program:',
      factYear: 'Current Year:',
      factLocation: 'Location:',
      factStatus: 'Status:',
      statusAvailable: 'Available for Internships',
    },
    skills: {
      badge: 'Technical Toolkit',
      title: 'Skills, Languages & Technologies',
      subtitle: 'A transparent showcase of the programming languages, web technologies, databases, and productivity tools I actively practice and use.',
      filterAll: 'All Skills',
      filterProgramming: 'Programming',
      filterWeb: 'Web Development',
      filterDatabase: 'Databases',
      filterTools: 'Tools & Office',
      proficiency: 'Proficiency',
      learning: 'Learning',
      intermediate: 'Intermediate',
      proficient: 'Proficient',
      coreFocus: 'Core Focus',
    },
    projects: {
      badge: 'Featured Projects',
      title: 'Practical Work & Code Creations',
      subtitle: 'Explore real-world web applications and academic software systems designed and developed with clean code principles.',
      filterAll: 'All Projects',
      filterFrontend: 'Frontend',
      filterWeb: 'Web Apps',
      filterDatabase: 'Database Systems',
      viewDetails: 'View Details & Simulator',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code',
      keyFeatures: 'Key Highlights & Features',
      technologiesUsed: 'Technologies Used',
      interactiveDemo: 'Interactive Simulator',
      close: 'Close',
    },
    education: {
      badge: 'Academic Path',
      title: 'Education & Formal Training',
      subtitle: 'My academic journey from school foundations to pursuing a Bachelor of Computer Applications at Swami Vivekananda University.',
      currentYear: 'Currently in 2nd Year',
      completed: 'Completed',
      keyHighlights: 'Academic Highlights',
      relevantCourses: 'Key Coursework & Subjects',
    },
    contact: {
      badge: 'Get in Touch',
      title: "Let's Connect & Collaborate",
      subtitle: 'Have a project idea, internship opportunity, or want to discuss technology? Send me a direct message or connect via phone/email.',
      sendMessageTitle: 'Send a Message',
      sendMessageSubtitle: 'Fill out this form and I will get back to you promptly.',
      yourName: 'Your Full Name',
      namePlaceholder: 'e.g. John Doe',
      yourEmail: 'Your Email Address',
      emailPlaceholder: 'e.g. john@example.com',
      subject: 'Subject',
      subjectPlaceholder: 'e.g. Internship Opportunity / Project Collaboration',
      yourMessage: 'Your Message',
      messagePlaceholder: 'Hi Shibshankar, I would like to connect with you regarding...',
      sendMessageBtn: 'Send Message',
      sendingBtn: 'Sending Message...',
      sentSuccess: 'Message Sent Successfully!',
      directContactTitle: 'Direct Contact Details',
      primaryEmail: 'Primary Email',
      altEmail: 'Alternate Email',
      phone: 'Phone & WhatsApp',
      location: 'Location & City',
      university: 'Current University',
      copyEmail: 'Copy Email',
      copied: 'Copied!',
      callNow: 'Call Now',
    },
    footer: {
      bio: '2nd-year BCA student at Swami Vivekananda University (SVU Barrackpore). Passionate about web development, modern frontend UI, and building dependable digital applications.',
      quickLinks: 'Quick Navigation',
      connect: 'Connect with Me',
      studentTitle: 'Swami Vivekananda University • Barrackpore, Kolkata',
      rightsReserved: 'All rights reserved.',
      builtWith: 'Built with React, TypeScript & Tailwind CSS',
    },
    resumeModal: {
      title: 'Shibshankar Mondal — Resume',
      subtitle: '2nd Year BCA Student • Swami Vivekananda University (SVU Barrackpore)',
      downloadPdf: 'Download PDF',
      printResume: 'Print / Save',
      close: 'Close',
      contactInfo: 'Contact Information',
      summary: 'Professional Summary',
      education: 'Education',
      skills: 'Technical Skills',
      projects: 'Featured Projects',
    },
  },
  bn: {
    nav: {
      home: 'হোম',
      about: 'পরিচিতি',
      skills: 'দক্ষতা',
      projects: 'প্রকল্প',
      education: 'শিক্ষাজীবন',
      contact: 'যোগাযোগ',
      resume: 'রিজিউমে',
      getInTouch: 'যোগাযোগ করুন',
      viewResume: 'রিজিউমে দেখুন / ডাউনলোড',
      contactShibshankar: 'শিবশঙ্করের সাথে যোগাযোগ',
      theme: 'থিম',
      language: 'ভাষা',
    },
    hero: {
      studentBadge: '২য় বর্ষের ছাত্র • স্বামী বিবেকানন্দ বিশ্ববিদ্যালয় (SVU), ব্যারাকপুর',
      greeting: 'আমার পোর্টফোলিওতে স্বাগতম! 👋 আমি',
      introPrefix: 'আমি একজন বিসিএ ছাত্র ও',
      roleTitle: 'উচ্চাকাঙ্ক্ষী ওয়েব ডেভেলপার',
      roleHighlight: 'ওয়েব ডেভেলপার',
      bio: 'এসভিইউ ব্যারাকপুরের উৎসাহী ২য় বর্ষের বিসিএ ছাত্র। আধুনিক, প্রতিক্রিয়াশীল এবং ব্যবহারকারী-বান্ধব ওয়েব অ্যাপ্লিকেশন তৈরিতে নিবেদিতপ্রাণ। ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট, ফ্রন্টএন্ড ডিজাইন, ডাটাবেস সিস্টেম এবং ক্লিন কোডিংয়ে আগ্রহী।',
      viewProjects: 'প্রকল্পগুলি দেখুন',
      contactMe: 'যোগাযোগ করুন',
      resume: 'রিজিউমে',
      location: 'ব্যারাকপুর, কলকাতা',
      barrackporeCollege: 'এসভিইউ ব্যারাকপুর',
      statusBadge: 'অবস্থা',
      availableStatus: 'কাজের সুযোগের জন্য প্রস্তুত',
      workstationTitle: 'ডেভেলপার ওয়ার্কস্টেশন',
      customPhotoHint: 'কাস্টম ছবি আপলোড বা প্রিসেট নির্বাচন করতে ক্লিক করুন',
      resetPhoto: 'ডিফল্ট ইলাস্ট্রেশনে রিসেট করুন',
    },
    about: {
      badge: 'শিবশঙ্কর সম্পর্কে',
      title: 'কৌতূহলী শিক্ষার্থী, নির্মাতা ও ডেভেলপার',
      subtitle: 'এসভিইউ ব্যারাকপুরের ২য় বর্ষের বিসিএ ছাত্র, যিনি নির্ভুল কোড, প্রতিক্রিয়াশীল ইন্টারফেস এবং নির্ভরযোগ্য সফটওয়্যার তৈরিতে নিবেদিত।',
      journeyTitle: 'প্রযুক্তির জগতে আমার পথচলা',
      journeyP1: 'আমি বর্তমানে স্বামী বিবেকানন্দ বিশ্ববিদ্যালয় (SVU ব্যারাকপুর)-এ কম্পিউটার অ্যাপ্লিকেশনের স্নাতক (BCA) ২য় বর্ষের ছাত্র। যৌক্তিক সমস্যা সমাধান ও আধুনিক ওয়েব ডেভেলপমেন্টের প্রতি আমার গভীর আগ্রহ রয়েছে।',
      journeyP2: 'আমার একাডেমিক কোর্স এবং ব্যক্তিগত প্রকল্পের মাধ্যমে আমি C, C++, এবং JavaScript-এ প্রোগ্রামিং বেসিক শক্তিশালী করছি, পাশাপাশি রিলেশনাল ডাটাবেস (SQL) এবং আধুনিক ডকুমেন্ট স্টোর (MongoDB) শিখছি।',
      journeyP3: 'আমি বিশ্বাস করি কম্পিউটার সায়েন্স শেখার সর্বোত্তম উপায় হলো হাতে-কলমে প্র্যাকটিস করা। এজন্য আমি নিয়মিত বাস্তবমুখী প্রজেক্ট তৈরি করি—ই-কমার্স স্টোর থেকে শুরু করে স্টুডেন্ট ম্যানেজমেন্ট সিস্টেম পর্যন্ত।',
      highlight1: 'বিসিএ ছাত্র, এসভিইউ ব্যারাকপুর',
      highlight2: 'ওয়েব ডেভেলপমেন্ট অনুরাগী',
      highlight3: 'প্রোগ্রামিং ও ডিবি: Python, C, C++, JS, SQL',
      highlight4: 'বাস্তবমুখী প্রজেক্ট তৈরিতে ফোকাস',
      tabFocus: 'বর্তমান ফোকাস',
      tabInterests: 'আগ্রহ ও প্যাশন',
      tabValues: 'মূল আদর্শ',
      focusTitle: 'ফ্রন্টএন্ড ও ফুল-স্ট্যাক দক্ষতা',
      focusDesc: 'আধুনিক জাভাস্ক্রিপ্ট, কম্পোনেন্ট আর্কিটেকচার, প্রতিক্রিয়াশীল ইউআই এবং ব্যাকএন্ড এপিআই সমন্বয় শেখা।',
      interestsTitle: 'ওয়েব প্রযুক্তি ও সমস্যা সমাধান',
      interestsDesc: 'ইন্টারেক্টিভ ইন্টারফেস, ডাটাবেস অপ্টিমাইজেশন, অ্যালগরিদম ডিজাইন এবং ডেভেলপার টুলস অনুসন্ধান।',
      valuesTitle: 'ক্লিন কোড ও ধারাবাহিক শিক্ষা',
      valuesDesc: 'সহজে পাঠযোগ্য ও নির্ভরযোগ্য কোড লেখা এবং প্রতিদিন নতুন নতুন প্রযুক্তি শেখার অঙ্গীকার।',
      quickFactsTitle: 'সংক্ষিপ্ত পরিচিতি',
      factName: 'নাম:',
      factInstitution: 'বিশ্ববিদ্যালয়:',
      factDegree: 'কোর্স:',
      factYear: 'বর্তমান বর্ষ:',
      factLocation: 'অবস্থান:',
      factStatus: 'অবস্থা:',
      statusAvailable: 'ইন্টার্নশিপের জন্য প্রস্তুত',
    },
    skills: {
      badge: 'প্রযুক্তিগত দক্ষতা',
      title: 'দক্ষতা, ভাষা ও প্রযুক্তিসমূহ',
      subtitle: 'প্রোগ্রামিং ভাষা, ওয়েব প্রযুক্তি, ডাটাবেস এবং অফিস অ্যাপ্লিকেশনগুলির একটি সুস্পষ্ট বিবরণ যা আমি নিয়মিত অনুশীলন করি।',
      filterAll: 'সকল দক্ষতা',
      filterProgramming: 'প্রোগ্রামিং',
      filterWeb: 'ওয়েব ডেভেলপমেন্ট',
      filterDatabase: 'ডাটাবেস',
      filterTools: 'টুলস ও অফিস',
      proficiency: 'দক্ষতার মাত্রা',
      learning: 'শিখছি',
      intermediate: 'মধ্যবর্তী',
      proficient: 'দক্ষ',
      coreFocus: 'প্রধান ফোকাস',
    },
    projects: {
      badge: 'উল্লেখযোগ্য প্রজেক্ট',
      title: 'বাস্তব প্রজেক্ট ও কোড সৃষ্টি',
      subtitle: 'ক্লিন কোড ও আধুনিক প্রযুক্তিতে তৈরি ওয়েব অ্যাপ্লিকেশন এবং একাডেমিক সফটওয়্যার সিস্টেম দেখুন।',
      filterAll: 'সকল প্রজেক্ট',
      filterFrontend: 'ফ্রন্টএন্ড',
      filterWeb: 'ওয়েব অ্যাপ',
      filterDatabase: 'ডাটাবেস সিস্টেম',
      viewDetails: 'বিস্তারিত ও সিমুলেটর দেখুন',
      liveDemo: 'লাইভ ডেমো',
      sourceCode: 'সোর্স কোড',
      keyFeatures: 'প্রধান বৈশিষ্ট্যসমূহ',
      technologiesUsed: 'ব্যবহৃত প্রযুক্তিসমূহ',
      interactiveDemo: 'ইন্টারেক্টিভ সিমুলেটর',
      close: 'বন্ধ করুন',
    },
    education: {
      badge: 'শিক্ষাগত যোগ্যতা',
      title: 'শিক্ষা ও প্রাতিষ্ঠানিক প্রশিক্ষণ',
      subtitle: 'স্কুল জীবন থেকে শুরু করে স্বামী বিবেকানন্দ বিশ্ববিদ্যালয়ে বিসিএ পর্যন্ত আমার শিক্ষাজীবনের পথচলা।',
      currentYear: 'বর্তমানে ২য় বর্ষে অধ্যয়নরত',
      completed: 'সম্পন্ন',
      keyHighlights: 'শিক্ষাগত প্রধান অর্জন',
      relevantCourses: 'গুরুত্বপূর্ণ পাঠ্যবিষয়সমূহ',
    },
    contact: {
      badge: 'যোগাযোগ করুন',
      title: 'আসুন যুক্ত হই ও একসাথে কাজ করি',
      subtitle: 'কোনো প্রজেক্টের ধারণা, ইন্টার্নশিপের সুযোগ বা প্রযুক্তি নিয়ে আলোচনা করতে চাইলে সরাসরি বার্তা পাঠান অথবা ফোন/ইমেইলে যোগাযোগ করুন।',
      sendMessageTitle: 'বার্তা পাঠান',
      sendMessageSubtitle: 'ফর্মটি পূরণ করুন, আমি দ্রুত আপনার সাথে যোগাযোগ করব।',
      yourName: 'আপনার সম্পূর্ণ নাম',
      namePlaceholder: 'যেমন: রাহুল সেন',
      yourEmail: 'আপনার ইমেইল ঠিকানা',
      emailPlaceholder: 'যেমন: rahul@example.com',
      subject: 'বিষয়',
      subjectPlaceholder: 'যেমন: ইন্টার্নশিপ সুযোগ / প্রজেক্ট আলোচনা',
      yourMessage: 'আপনার বার্তা',
      messagePlaceholder: 'নমস্কার শিবশঙ্কর, আমি আপনার সাথে যোগাযোগ করতে চাই...',
      sendMessageBtn: 'বার্তা পাঠান',
      sendingBtn: 'বার্তা পাঠানো হচ্ছে...',
      sentSuccess: 'বার্তা সফলভাবে পাঠানো হয়েছে!',
      directContactTitle: 'সরাসরি যোগাযোগের বিবরণ',
      primaryEmail: 'প্রধান ইমেইল',
      altEmail: 'বিকল্প ইমেইল',
      phone: 'ফোন ও হোয়াটসঅ্যাপ',
      location: 'ঠিকানা ও শহর',
      university: 'বর্তমান বিশ্ববিদ্যালয়',
      copyEmail: 'ইমেইল কপি করুন',
      copied: 'কপি করা হয়েছে!',
      callNow: 'কল করুন',
    },
    footer: {
      bio: 'স্বামী বিবেকানন্দ বিশ্ববিদ্যালয় (SVU ব্যারাকপুর)-এর ২য় বর্ষের বিসিএ ছাত্র। ওয়েব ডেভেলপমেন্ট, আধুনিক ফ্রন্টএন্ড এবং নির্ভরযোগ্য ডিজিটাল পণ্য তৈরিতে নিবেদিত।',
      quickLinks: 'দ্রুত নেভিগেশন',
      connect: 'সামাজিক মাধ্যম',
      studentTitle: 'স্বামী বিবেকানন্দ বিশ্ববিদ্যালয় • ব্যারাকপুর, কলকাতা',
      rightsReserved: 'সর্বস্বত্ব সংরক্ষিত।',
      builtWith: 'React, TypeScript এবং Tailwind CSS দিয়ে তৈরি',
    },
    resumeModal: {
      title: 'শিবশঙ্কর মন্ডল — রিজিউমে',
      subtitle: '২য় বর্ষের বিসিএ ছাত্র • স্বামী বিবেকানন্দ বিশ্ববিদ্যালয় (SVU ব্যারাকপুর)',
      downloadPdf: 'পিডিএফ ডাউনলোড',
      printResume: 'প্রিন্ট / সেভ',
      close: 'বন্ধ করুন',
      contactInfo: 'যোগাযোগের তথ্য',
      summary: 'পেশাগত সারসংক্ষেপ',
      education: 'শিক্ষাগত যোগ্যতা',
      skills: 'প্রযুক্তিগত দক্ষতা',
      projects: 'উল্লেখযোগ্য প্রজেক্ট',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      about: 'परिचय',
      skills: 'कौशल',
      projects: 'प्रोजेक्ट्स',
      education: 'शिक्षा',
      contact: 'संपर्क',
      resume: 'रिज्यूमे',
      getInTouch: 'संपर्क करें',
      viewResume: 'रिज्यूमे देखें / डाउनलोड',
      contactShibshankar: 'शिवशंकर से संपर्क करें',
      theme: 'थीम',
      language: 'भाषा',
    },
    hero: {
      studentBadge: 'द्वितीय वर्ष के छात्र • स्वामी विवेकानंद विश्वविद्यालय (SVU), बैरकपुर',
      greeting: 'मेरे पोर्टफोलियो में आपका स्वागत है! 👋 मैं हूँ',
      introPrefix: 'मैं बीसीए का छात्र और',
      roleTitle: 'वेब डेवलपर हूँ',
      roleHighlight: 'वेब डेवलपर',
      bio: 'एसवीयू बैरकपुर में बीसीए द्वितीय वर्ष का उत्साही छात्र। आधुनिक, रिस्पॉन्सिव और यूजर-फ्रेंडली वेब एप्लिकेशन बनाने के लिए समर्पित। फुल-स्टैक वेब डेवलपमेंट, फ्रंटएंड डिजाइन, डेटाबेस सिस्टम और क्लीन कोड के प्रति उत्साही।',
      viewProjects: 'प्रोजेक्ट्स देखें',
      contactMe: 'संपर्क करें',
      resume: 'रिज्यूमे',
      location: 'बैरकपुर, कोलकाता',
      barrackporeCollege: 'एसवीयू बैरकपुर',
      statusBadge: 'स्थिति',
      availableStatus: 'अवसरों के लिए उपलब्ध',
      workstationTitle: 'डेवलपर वर्कस्टेशन',
      customPhotoHint: 'कस्टम फोटो अपलोड करने या प्रीसेट चुनने के लिए क्लिक करें',
      resetPhoto: 'डिफ़ॉल्ट चित्रण पर रीसेट करें',
    },
    about: {
      badge: 'शिवशंकर के बारे में',
      title: 'जिज्ञासु शिक्षार्थी, निर्माता और डेवलपर',
      subtitle: 'एसवीयू बैरकपुर में बीसीए द्वितीय वर्ष का छात्र, जो स्वच्छ कोड, रिस्पॉन्सिव यूजर इंटरफेस और विश्वसनीय सॉफ्टवेयर बनाने के लिए समर्पित है।',
      journeyTitle: 'प्रौद्योगिकी में मेरी यात्रा',
      journeyP1: 'मैं वर्तमान में स्वामी विवेकानंद विश्वविद्यालय (SVU बैरकपुर) में बैचलर ऑफ कंप्यूटर एप्लीकेशन (BCA) द्वितीय वर्ष का छात्र हूँ। तार्किक समस्या समाधान और आधुनिक वेब विकास में मेरी गहरी रुचि है।',
      journeyP2: 'अपने शैक्षणिक पाठ्यक्रम और व्यक्तिगत परियोजनाओं के माध्यम से, मैं C, C++ और JavaScript में अपनी प्रोग्रामिंग नींव को मजबूत कर रहा हूँ, साथ ही रिलेशनल डेटाबेस (SQL) और आधुनिक डॉक्यूमेंट स्टोर (MongoDB) सीख रहा हूँ।',
      journeyP3: 'मेरा मानना ​​है कि कंप्यूटर साइंस सीखने का सबसे अच्छा तरीका व्यावहारिक अनुभव है। यही कारण है कि मैं सक्रिय रूप से वास्तविक दुनिया के प्रोजेक्ट्स बनाता हूँ—ई-कॉमर्स स्टोर से लेकर छात्र प्रबंधन डेटाबेस तक।',
      highlight1: 'बीसीए छात्र, एसवीयू बैरकपुर',
      highlight2: 'वेब डेवलपमेंट उत्साही',
      highlight3: 'प्रोग्रामिंग और डीबी: Python, C, C++, JS, SQL',
      highlight4: 'व्यावहारिक प्रोजेक्ट्स पर विशेष ध्यान',
      tabFocus: 'वर्तमान फोकस',
      tabInterests: 'रुचियां और पैशन',
      tabValues: 'मूल सिद्धांत',
      focusTitle: 'फ्रंटएंड और फुल-स्टैक में महारत',
      focusDesc: 'आधुनिक जावास्क्रिप्ट, घटक आर्किटेक्चर, रिस्पॉन्सिव यूआई और बैकएंड एपीआई एकीकरण की गहरी समझ।',
      interestsTitle: 'वेब तकनीक और समस्या समाधान',
      interestsDesc: 'इंटरैक्टिव इंटरफेस, डेटाबेस ऑप्टिमाइज़ेशन, एल्गोरिदम डिजाइन और डेवलपर टूल्स की खोज।',
      valuesTitle: 'क्लीन कोड और निरंतर सीखना',
      valuesDesc: 'स्पष्ट, बनाए रखने योग्य कोड लिखने और प्रतिदिन नए टूल्स सीखने के लिए प्रतिबद्ध।',
      quickFactsTitle: 'संक्षिप्त परिचय',
      factName: 'नाम:',
      factInstitution: 'विश्वविद्यालय:',
      factDegree: 'पाठ्यक्रम:',
      factYear: 'वर्तमान वर्ष:',
      factLocation: 'स्थान:',
      factStatus: 'स्थिति:',
      statusAvailable: 'इंटर्नशिप के लिए उपलब्ध',
    },
    skills: {
      badge: 'तकनीकी टूल्स',
      title: 'कौशल, भाषाएं और प्रौद्योगिकियां',
      subtitle: 'प्रोग्रामिंग भाषाओं, वेब तकनीकों, डेटाबेस और उत्पादकता उपकरणों का एक पारदर्शी प्रदर्शन जिसका मैं नियमित अभ्यास करता हूँ।',
      filterAll: 'सभी कौशल',
      filterProgramming: 'प्रोग्रामिंग',
      filterWeb: 'वेब डेवलपमेंट',
      filterDatabase: 'डेटाबेस',
      filterTools: 'टूल्स और ऑफिस',
      proficiency: 'दक्षता स्तर',
      learning: 'सीख रहा हूँ',
      intermediate: 'मध्यम',
      proficient: 'कुशल',
      coreFocus: 'मुख्य फोकस',
    },
    projects: {
      badge: 'प्रमुख प्रोजेक्ट्स',
      title: 'व्यावहारिक कार्य और कोड निर्माण',
      subtitle: 'क्लीन कोड सिद्धांतों के साथ डिजाइन और विकसित वास्तविक वेब एप्लिकेशन और शैक्षणिक सॉफ्टवेयर सिस्टम देखें।',
      filterAll: 'सभी प्रोजेक्ट्स',
      filterFrontend: 'फ्रंटएंड',
      filterWeb: 'वेब ऐप्स',
      filterDatabase: 'डेटाबेस सिस्टम',
      viewDetails: 'विवरण और सिम्युलेटर देखें',
      liveDemo: 'लाइव डेमो',
      sourceCode: 'सोर्स कोड',
      keyFeatures: 'मुख्य विशेषताएं',
      technologiesUsed: 'उपयोग की गई तकनीकें',
      interactiveDemo: 'इंटरैक्टिव सिम्युलेटर',
      close: 'बंद करें',
    },
    education: {
      badge: 'शैक्षणिक यात्रा',
      title: 'शिक्षा और औपचारिक प्रशिक्षण',
      subtitle: 'स्कूल से लेकर स्वामी विवेकानंद विश्वविद्यालय में बीसीए तक की मेरी शैक्षणिक यात्रा।',
      currentYear: 'वर्तमान में द्वितीय वर्ष में अध्ययनरत',
      completed: 'पूर्ण',
      keyHighlights: 'शैक्षणिक मुख्य बातें',
      relevantCourses: 'प्रमुख पाठ्यक्रम और विषय',
    },
    contact: {
      badge: 'संपर्क करें',
      title: 'आइए जुड़ें और साथ काम करें',
      subtitle: 'क्या आपके पास कोई प्रोजेक्ट विचार या इंटर्नशिप का अवसर है? मुझे सीधा संदेश भेजें या फोन/ईमेल के माध्यम से जुड़ें।',
      sendMessageTitle: 'संदेश भेजें',
      sendMessageSubtitle: 'इस फॉर्म को भरें और मैं आपसे तुरंत संपर्क करूँगा।',
      yourName: 'आपका पूरा नाम',
      namePlaceholder: 'जैसे: राहुल शर्मा',
      yourEmail: 'आपका ईमेल पता',
      emailPlaceholder: 'जैसे: rahul@example.com',
      subject: 'विषय',
      subjectPlaceholder: 'जैसे: इंटर्नशिप का अवसर / प्रोजेक्ट सहयोग',
      yourMessage: 'आपका संदेश',
      messagePlaceholder: 'नमस्ते शिवशंकर, मैं आपसे इस संबंध में जुड़ना चाहता हूँ...',
      sendMessageBtn: 'संदेश भेजें',
      sendingBtn: 'संदेश भेजा जा रहा है...',
      sentSuccess: 'संदेश सफलतापूर्वक भेजा गया!',
      directContactTitle: 'सीधे संपर्क विवरण',
      primaryEmail: 'प्राथमिक ईमेल',
      altEmail: 'वैकल्पिक ईमेल',
      phone: 'फोन और व्हाट्सएप',
      location: 'स्थान और शहर',
      university: 'वर्तमान विश्वविद्यालय',
      copyEmail: 'ईमेल कॉपी करें',
      copied: 'कॉपी किया गया!',
      callNow: 'कॉल करें',
    },
    footer: {
      bio: 'स्वामी विवेकानंद विश्वविद्यालय (SVU बैरकपुर) में बीसीए द्वितीय वर्ष का छात्र। वेब डेवलपमेंट, आधुनिक फ्रंटएंड और उपयोगी डिजिटल एप्लिकेशन बनाने के लिए समर्पित।',
      quickLinks: 'त्वरित नेविगेशन',
      connect: 'सोशल मीडिया पर जुड़ें',
      studentTitle: 'स्वामी विवेकानंद विश्वविद्यालय • बैरकपुर, कोलकाता',
      rightsReserved: 'सर्वाधिकार सुरक्षित।',
      builtWith: 'React, TypeScript और Tailwind CSS से निर्मित',
    },
    resumeModal: {
      title: 'शिवशंकर मोंडल — रिज्यूमे',
      subtitle: 'बीसीए द्वितीय वर्ष का छात्र • स्वामी विवेकानंद विश्वविद्यालय (SVU बैरकपुर)',
      downloadPdf: 'पीडीएफ डाउनलोड',
      printResume: 'प्रिंट / सेव करें',
      close: 'बंद करें',
      contactInfo: 'संपर्क जानकारी',
      summary: 'व्यावसायिक सारांश',
      education: 'शिक्षा',
      skills: 'तकनीकी कौशल',
      projects: 'प्रमुख प्रोजेक्ट्स',
    },
  },
};
