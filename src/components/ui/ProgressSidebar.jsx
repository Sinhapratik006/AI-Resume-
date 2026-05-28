'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { STEPS } from '../../utils/steps';
import { useResume } from '../../context/useResume';

export default function ProgressSidebar() {
  const { currentStep, setCurrentStep, resumeData } = useResume();

  const isStepComplete = (stepIndex) => {
    const step = STEPS[stepIndex];
    if (step.isArray) {
      return (resumeData[step.arrayKey]?.length || 0) > 0;
    }
    if (step.isSkills) {
      return (resumeData[step.fields[0].key]?.length || 0) > 0;
    }
    return step.fields?.some(f => f.required && resumeData[f.key]);
  };

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col" style={{ background: 'var(--cream)', borderRight: '1px solid var(--border)' }}>
      <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'var(--brand-gradient)', boxShadow: '0 8px 18px var(--shadow)' }}>R</div>
          <span className="font-display text-lg font-bold" style={{ color: 'var(--ink)' }}>ResumeAI</span>
        </div>
        <div className="mt-4">
          <div className="text-xs font-medium mb-1" style={{ color: 'var(--muted)' }}>
            {currentStep + 1} of {STEPS.length} steps
          </div>
          <div className="h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'var(--brand-gradient)' }}
              animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const active = index === currentStep;
          const complete = isStepComplete(index);
          const accessible = index <= currentStep;

          return (
            <motion.button
              key={step.id}
              onClick={() => accessible && setCurrentStep(index)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-left transition-all"
              style={{
                background: active ? 'var(--card)' : 'transparent',
                color: active ? 'var(--ink)' : accessible ? 'var(--slate)' : 'var(--muted)',
                boxShadow: active ? '0 2px 12px var(--shadow)' : 'none',
                cursor: accessible ? 'pointer' : 'default',
                opacity: accessible ? 1 : 0.5,
              }}
              whileHover={accessible ? { x: 2 } : {}}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs"
                style={{
                  background: active ? `${step.color}22` : complete ? 'color-mix(in srgb, var(--sage) 20%, transparent)' : 'var(--border)',
                  color: active ? step.color : complete ? 'var(--sage)' : 'var(--muted)',
                }}
              >
                {complete && !active ? <Check size={12} /> : <Icon size={13} />}
              </div>
              <div>
                <div className="text-xs font-semibold leading-tight">{step.title}</div>
                {active && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] mt-0.5"
                    style={{ color: 'var(--muted)' }}
                  >
                    {step.subtitle}
                  </motion.div>
                )}
              </div>
              {complete && (
                <div className="ml-auto">
                  <Check size={12} style={{ color: 'var(--sage)' }} />
                </div>
              )}
            </motion.button>
          );
        })}
      </nav>

      <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="text-[10px] text-center" style={{ color: 'var(--muted)' }}>
          Auto-saved to browser
        </div>
      </div>
    </aside>
  );
}
