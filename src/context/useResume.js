import { useContext } from 'react';
import { ResumeContext } from './resumeContextValue';

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
};
