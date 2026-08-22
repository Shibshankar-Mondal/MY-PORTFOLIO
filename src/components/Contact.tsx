import React, { useState } from 'react';
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Copy,
  Check,
  MapPin,
  PhoneCall,
  GraduationCap,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { playUiSound } from '../utils/soundEffects';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [touched, setTouched] = useState<Record<keyof ContactFormData, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitAttempted, setSubmitAttempted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);

  // Field validation logic
  const validateField = (field: keyof ContactFormData, value: string): string => {
    const trimmed = value.trim();

    switch (field) {
      case 'name':
        if (!trimmed) return 'Please enter your full name';
        if (trimmed.length < 2) return 'Name must be at least 2 characters';
        if (trimmed.length > 60) return 'Name cannot exceed 60 characters';
        if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
          return 'Name should only contain letters and standard punctuation';
        }
        return '';

      case 'email':
        if (!trimmed) return 'Please enter your email address';
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
          return 'Please enter a valid email (e.g. name@domain.com)';
        }
        return '';

      case 'subject':
        if (!trimmed) return 'Please enter a subject line';
        if (trimmed.length < 3) return 'Subject must be at least 3 characters';
        if (trimmed.length > 120) return 'Subject cannot exceed 120 characters';
        return '';

      case 'message':
        if (!trimmed) return 'Please enter your message';
        if (trimmed.length < 10) {
          return `Message is too short (${trimmed.length}/10 min characters)`;
        }
        if (trimmed.length > 500) return 'Message cannot exceed 500 characters';
        return '';

      default:
        return '';
    }
  };

  const handleFieldChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // If the field has been touched or submit was attempted, validate in real time
    if (touched[field] || submitAttempted) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: errorMsg || undefined,
      }));
    }
  };

  const handleFieldBlur = (field: keyof ContactFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({
      ...prev,
      [field]: errorMsg || undefined,
    }));
  };

  const validateAll = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
    (Object.keys(formData) as (keyof ContactFormData)[]).forEach((field) => {
      const errorMsg = validateField(field, formData[field]);
      if (errorMsg) {
        newErrors[field] = errorMsg;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    const isValid = validateAll();
    if (!isValid) {
      playUiSound('error');
      // Focus first invalid field
      const fields: (keyof ContactFormData)[] = ['name', 'email', 'subject', 'message'];
      for (const f of fields) {
        const err = validateField(f, formData[f]);
        if (err) {
          const el = document.getElementById(`contact-${f}`);
          el?.focus();
          break;
        }
      }
      return;
    }

    playUiSound('click');
    setIsSubmitting(true);

    // Simulate reliable form submission with realistic delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playUiSound('success');
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setTouched({
        name: false,
        email: false,
        subject: false,
        message: false,
      });
      setErrors({});
      setSubmitAttempted(false);
    }, 1200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    playUiSound('success');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    playUiSound('success');
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <section id="contact" className="py-24 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
            <Mail className="w-3.5 h-3.5" />
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Email Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {t.contact.primaryEmail}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {PERSONAL_INFO.email}
                    </p>
                  </div>
                </div>

                <button
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {copiedEmail && (
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.contact.copied}</span>
                </div>
              )}
            </div>

            {/* Direct Phone / WhatsApp Contact Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {t.contact.phone}
                    </h4>
                    <a
                      href={PERSONAL_INFO.socials.phone}
                      className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-mono font-medium"
                    >
                      {PERSONAL_INFO.formattedPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    id="call-phone-btn"
                    href={PERSONAL_INFO.socials.phone}
                    title="Call directly"
                    className="p-2 rounded-xl text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                  <button
                    id="copy-phone-btn"
                    onClick={handleCopyPhone}
                    title="Copy phone number to clipboard"
                    className="p-2 rounded-xl text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedPhone ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {copiedPhone && (
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.contact.copied}</span>
                </div>
              )}
            </div>

            {/* Location & Academic Base Card */}
            <div
              id="contact-university-card"
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-all flex items-center justify-between"
            >
              <a
                href="https://www.swamivivekanandauniversity.ac.in/"
                target="_blank"
                rel="noreferrer"
                title="Visit Swami Vivekananda University (SVU) official website"
                className="flex items-center gap-3 group/univ flex-1 mr-2"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover/univ:scale-105 transition-transform shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover/univ:text-indigo-600 dark:group-hover/univ:text-indigo-400 transition-colors flex items-center gap-1.5">
                    <span>{t.contact.university}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover/univ:text-indigo-500 transition-colors" />
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    SVU Barrackpore • Kolkata, West Bengal
                  </p>
                </div>
              </a>

              <a
                id="contact-google-maps-btn"
                href={PERSONAL_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                title="Open Swami Vivekananda University in Google Maps"
                className="p-2.5 rounded-xl text-rose-500 hover:text-white hover:bg-rose-500 dark:hover:bg-rose-600 border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/30 transition-all shrink-0"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>

            {/* Social Profiles Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t.contact.directContactTitle}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {/* GitHub */}
                <a
                  id="social-link-github"
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                >
                  <Github className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold">GitHub</span>
                </a>

                {/* LinkedIn */}
                <a
                  id="social-link-linkedin"
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors group"
                >
                  <Linkedin className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form with Validation */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl relative">
              {isSubmitted ? (
                <div
                  id="contact-form-success-banner"
                  className="text-center py-12 space-y-4 animate-in fade-in"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {t.contact.sentSuccess}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out, Shibshankar will get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="contact-form" className="space-y-5" noValidate>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {t.contact.sendMessageTitle}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.contact.sendMessageSubtitle}
                    </p>
                  </div>

                  {submitAttempted && Object.keys(errors).length > 0 && (
                    <div
                      id="contact-form-validation-alert"
                      role="alert"
                      className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 animate-in fade-in"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Please correct the highlighted fields before submitting your message.</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                        >
                          {t.contact.yourName} <span className="text-rose-500">*</span>
                        </label>
                        {touched.name && !errors.name && formData.name.trim().length >= 2 && (
                          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Valid
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          value={formData.name}
                          onChange={(e) => handleFieldChange('name', e.target.value)}
                          onBlur={() => handleFieldBlur('name')}
                          placeholder={t.contact.namePlaceholder}
                          aria-invalid={touched.name && !!errors.name}
                          aria-describedby={errors.name ? 'contact-name-error' : undefined}
                          className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                            touched.name && errors.name
                              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                              : touched.name && formData.name.trim().length >= 2
                              ? 'border-emerald-500/70 dark:border-emerald-600/70 focus:border-emerald-500 focus:ring-emerald-500/20'
                              : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                          }`}
                        />
                      </div>
                      {touched.name && errors.name && (
                        <p id="contact-name-error" role="alert" className="text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                        >
                          {t.contact.yourEmail} <span className="text-rose-500">*</span>
                        </label>
                        {touched.email && !errors.email && formData.email.trim().length > 0 && (
                          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Valid
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => handleFieldChange('email', e.target.value)}
                          onBlur={() => handleFieldBlur('email')}
                          placeholder={t.contact.emailPlaceholder}
                          aria-invalid={touched.email && !!errors.email}
                          aria-describedby={errors.email ? 'contact-email-error' : undefined}
                          className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                            touched.email && errors.email
                              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                              : touched.email && formData.email.trim().length > 0
                              ? 'border-emerald-500/70 dark:border-emerald-600/70 focus:border-emerald-500 focus:ring-emerald-500/20'
                              : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                          }`}
                        />
                      </div>
                      {touched.email && errors.email && (
                        <p id="contact-email-error" role="alert" className="text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                      >
                        {t.contact.subject} <span className="text-rose-500">*</span>
                      </label>
                      {touched.subject && !errors.subject && formData.subject.trim().length >= 3 && (
                        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Valid
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => handleFieldChange('subject', e.target.value)}
                        onBlur={() => handleFieldBlur('subject')}
                        placeholder={t.contact.subjectPlaceholder}
                        aria-invalid={touched.subject && !!errors.subject}
                        aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                          touched.subject && errors.subject
                            ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                            : touched.subject && formData.subject.trim().length >= 3
                            ? 'border-emerald-500/70 dark:border-emerald-600/70 focus:border-emerald-500 focus:ring-emerald-500/20'
                            : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                        }`}
                      />
                    </div>
                    {touched.subject && errors.subject && (
                      <p id="contact-subject-error" role="alert" className="text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                      >
                        {t.contact.yourMessage} <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        {touched.message && !errors.message && formData.message.trim().length >= 10 && (
                          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Valid
                          </span>
                        )}
                        <span className={`text-[11px] font-mono ${
                          formData.message.length > 450
                            ? 'text-amber-500 font-semibold'
                            : formData.message.length >= 10
                            ? 'text-slate-500 dark:text-slate-400'
                            : 'text-slate-400'
                        }`}>
                          {formData.message.length}/500
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        maxLength={500}
                        value={formData.message}
                        onChange={(e) => handleFieldChange('message', e.target.value)}
                        onBlur={() => handleFieldBlur('message')}
                        placeholder={t.contact.messagePlaceholder}
                        aria-invalid={touched.message && !!errors.message}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                          touched.message && errors.message
                            ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                            : touched.message && formData.message.trim().length >= 10
                            ? 'border-emerald-500/70 dark:border-emerald-600/70 focus:border-emerald-500 focus:ring-emerald-500/20'
                            : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                        }`}
                      />
                    </div>
                    {touched.message && errors.message && (
                      <p id="contact-message-error" role="alert" className="text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Send Message Button */}
                  <button
                    type="submit"
                    id="submit-contact-btn"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] transition-all shadow-lg shadow-indigo-600/25 disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{t.contact.sendingBtn}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.contact.sendMessageBtn}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
