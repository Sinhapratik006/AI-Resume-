'use client';

import { useState, useEffect } from 'react';
import { defaultResumeData } from './defaultResumeData';
import { ResumeContext } from './resumeContextValue';

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(() => {
    try {
      if (typeof window === 'undefined') return defaultResumeData;
      const saved = localStorage.getItem('resumeData');
      return saved ? JSON.parse(saved) : defaultResumeData;
    } catch { return defaultResumeData; }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [template, setTemplate] = useState('classic');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('darkMode') === 'true';
  });
  const [previewMode, setPreviewMode] = useState(false);
  const [sectionOrder, setSectionOrder] = useState([
    'summary', 'experience', 'education', 'skills',
    'projects', 'achievements', 'certifications', 'languages'
  ]);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('darkMode', isDark);
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const updateField = (field, value) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const resetResume = () => {
    setResumeData(defaultResumeData);
    setCurrentStep(0);
  };

  return (
    <ResumeContext.Provider value={{
      resumeData, setResumeData, updateField,
      currentStep, setCurrentStep,
      template, setTemplate,
      isDark, setIsDark,
      previewMode, setPreviewMode,
      sectionOrder, setSectionOrder,
      resetResume,
    }}>
      {children}
    </ResumeContext.Provider>
  );
}
