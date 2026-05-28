import { Moon, Sun, RotateCcw, Menu, X, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { STEPS } from '../../utils/steps';
import toast from 'react-hot-toast';

export default function Header({ onToggleMobile }) {
  const { isDark, setIsDark, resetResume, previewMode, setPreviewMode, currentStep, setCurrentStep } = useResume();

  const handleReset = () => {
    if (confirm('Reset all resume data? This cannot be undone.')) {
      resetResume();
      toast.success('Resume reset', { className: 'custom-toast' });
    }
  };

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b shrink-0 no-print"
      style={{ background: 'var(--paper)', borderColor: 'var(--border)', zIndex: 50 }}>
      {/* Logo - mobile */}
      <div className="flex items-center gap-2 lg:hidden">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm font-bold"
          style={{ background: 'linear-gradient(135deg, #d4a853, #c4604a)' }}>R</div>
        <span className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>ResumeAI</span>
      </div>

      {/* Center: mobile step selector */}
      <div className="lg:hidden flex items-center gap-2">
        <select
          value={currentStep}
          onChange={e => setCurrentStep(Number(e.target.value))}
          className="text-xs py-1.5 px-2 rounded-lg outline-none border"
          style={{ background: 'var(--card)', color: 'var(--ink)', borderColor: 'var(--border)' }}>
          {STEPS.map((s, i) => <option key={s.id} value={i}>{s.title}</option>)}
        </select>
      </div>

      {/* Desktop center breadcrumb */}
      <div className="hidden lg:flex items-center gap-1 text-xs" style={{ color: 'var(--muted)' }}>
        <span>Resume Builder</span>
        <span>›</span>
        <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{STEPS[currentStep]?.title}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-70"
          style={{ background: 'var(--cream)', color: 'var(--slate)' }}>
          {previewMode ? <EyeOff size={13} /> : <Eye size={13} />}
          {previewMode ? 'Form' : 'Preview'}
        </button>

        <button onClick={handleReset}
          className="p-2 rounded-lg transition-all hover:opacity-70"
          style={{ color: 'var(--muted)' }}
          title="Reset resume">
          <RotateCcw size={15} />
        </button>

        <motion.button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-lg transition-all hover:opacity-70"
          style={{ color: 'var(--muted)' }}
          whileTap={{ rotate: 180 }}>
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </motion.button>
      </div>
    </header>
  );
}
