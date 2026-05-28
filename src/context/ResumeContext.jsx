import { createContext, useContext, useState, useEffect } from 'react';

const ResumeContext = createContext(null);

export const defaultResumeData = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  github: '',
  linkedin: '',
  portfolio: '',
  summary: '',
  experience: [],
  education: [],
  skills: [],
  achievements: [],
  certifications: [],
  projects: [],
  languages: [],
};

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem('resumeData');
      return saved ? JSON.parse(saved) : defaultResumeData;
    } catch { return defaultResumeData; }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [template, setTemplate] = useState('classic');
  const [isDark, setIsDark] = useState(() => {
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

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
};
