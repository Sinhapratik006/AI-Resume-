'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Sparkles, ChevronRight, ChevronLeft, Loader2, Tag, X } from 'lucide-react';
import { useResume } from '../../context/useResume';
import { STEPS, TOTAL_STEPS } from '../../utils/steps';
import { generateSummary, suggestSkills } from '../../services/aiService';
import toast from 'react-hot-toast';

function TagInput({ value = [], onChange, placeholder }) {
  const [input, setInput] = useState('');

  const addTag = (tag) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && value.length) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div className="min-h-[80px] rounded-xl p-3 flex flex-wrap gap-2 cursor-text"
      style={{ border: '1.5px solid var(--border)', background: 'var(--card)' }}
      onClick={() => document.getElementById('tag-input')?.focus()}>
      {value.map((tag) => (
        <motion.span key={tag} initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium"
          style={{ background: 'var(--amber)22', color: 'var(--amber)', border: '1px solid var(--amber)44' }}>
          <Tag size={10} />
          {tag}
          <button onClick={() => onChange(value.filter(t => t !== tag))} className="hover:opacity-60 ml-0.5">
            <X size={10} />
          </button>
        </motion.span>
      ))}
      <input
        id="tag-input"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => input && addTag(input)}
        placeholder={value.length === 0 ? placeholder : 'Add more...'}
        className="flex-1 min-w-24 bg-transparent outline-none text-sm"
        style={{ color: 'var(--ink)' }}
      />
    </div>
  );
}

function ArraySection({ step, data, onChange }) {
  const emptyItem = Object.fromEntries(step.arrayFields.map(f => [f.key, '']));
  const items = data || [];

  const addItem = () => onChange([...items, { ...emptyItem }]);
  const removeItem = (idx) => onChange(items.filter((_, i) => i !== idx));
  const updateItem = (idx, key, val) => {
    const updated = items.map((item, i) => i === idx ? { ...item, [key]: val } : item);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {items.map((item, idx) => (
          <motion.div key={idx}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="rounded-2xl p-4 relative"
            style={{ border: '1.5px solid var(--border)', background: 'var(--card)' }}>
            <button onClick={() => removeItem(idx)}
              className="absolute top-3 right-3 p-1.5 rounded-lg hover:opacity-80 transition-opacity"
              style={{ color: 'var(--rust)', background: 'var(--rust)11' }}>
              <Trash2 size={13} />
            </button>
            <div className="text-xs font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--muted)' }}>
              #{idx + 1}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {step.arrayFields.map(field => (
                <div key={field.key} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--slate)' }}>
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      rows={field.rows || 3}
                      value={item[field.key] || ''}
                      onChange={e => updateItem(idx, field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full rounded-xl px-3 py-2.5 text-sm outline-none resize-none transition-all"
                      style={{
                        border: '1.5px solid var(--border)',
                        background: 'var(--paper)',
                        color: 'var(--ink)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--amber)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      value={item[field.key] || ''}
                      onChange={e => updateItem(idx, field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full rounded-xl px-3 py-2.5 text-sm outline-none transition-all"
                      style={{
                        border: '1.5px solid var(--border)',
                        background: 'var(--paper)',
                        color: 'var(--ink)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--amber)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button onClick={addItem}
        className="w-full py-3 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 transition-all hover:opacity-80 border-2 border-dashed"
        style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
        <Plus size={16} />
        Add {step.title}
      </button>
    </div>
  );
}

export default function StepForm() {
  const { resumeData, updateField, currentStep, setCurrentStep } = useResume();
  const [aiLoading, setAiLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const step = STEPS[currentStep];

  const validate = () => {
    const newErrors = {};
    step.fields?.forEach(f => {
      if (f.required && !resumeData[f.key]) {
        newErrors[f.key] = `${f.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      if (!step.isArray && !step.isSkills && !validate()) return;
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleAISummary = async () => {
    setAiLoading(true);
    try {
      const summary = await generateSummary(resumeData);
      updateField('summary', summary);
      toast.success('AI summary generated!', { className: 'custom-toast' });
    } catch {
      toast.error('AI unavailable. Check API key.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleAISkills = async () => {
    const jobRole = prompt('What job role are you applying for?');
    if (!jobRole) return;
    setAiLoading(true);
    try {
      const suggestions = await suggestSkills(jobRole, resumeData.skills);
      const newSkills = [...new Set([...resumeData.skills, ...suggestions])];
      updateField('skills', newSkills);
      toast.success('Skills added!', { className: 'custom-toast' });
    } catch {
      toast.error('AI unavailable. Check API key.');
    } finally {
      setAiLoading(false);
    }
  };

  const isLast = currentStep === TOTAL_STEPS - 1;

  return (
    <div className="flex flex-col h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex-1 overflow-y-auto p-6 pb-32"
        >
          {/* Step header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: `${step.color}22`, color: step.color }}>
                <step.icon size={20} />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold" style={{ color: 'var(--ink)' }}>{step.title}</h2>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>{step.subtitle}</p>
              </div>
            </div>
            {/* AI buttons */}
            {step.id === 'summary' && (
              <button onClick={handleAISummary} disabled={aiLoading}
                className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
                style={{ background: 'var(--brand-gradient)', color: 'white', boxShadow: '0 10px 22px var(--shadow)' }}>
                {aiLoading ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
                Generate with AI
              </button>
            )}
            {step.id === 'skills' && (
              <button onClick={handleAISkills} disabled={aiLoading}
                className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
                style={{ background: 'var(--cool-gradient)', color: 'white', boxShadow: '0 10px 22px var(--shadow)' }}>
                {aiLoading ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
                AI Suggest Skills
              </button>
            )}
          </div>

          {/* Fields */}
          {step.isArray ? (
            <ArraySection
              step={step}
              data={resumeData[step.arrayKey]}
              onChange={(val) => updateField(step.arrayKey, val)}
            />
          ) : (
            <div className="space-y-4">
              {step.fields?.map(field => (
                <div key={field.key}>
                  <label className="text-sm font-medium mb-2 flex items-center gap-1.5" style={{ color: 'var(--slate)' }}>
                    {field.icon && <field.icon size={14} />}
                    {field.label}
                    {field.required && <span style={{ color: 'var(--rust)' }}>*</span>}
                  </label>

                  {field.type === 'tags' ? (
                    <TagInput
                      value={resumeData[field.key] || []}
                      onChange={(val) => updateField(field.key, val)}
                      placeholder={field.placeholder}
                    />
                  ) : field.type === 'textarea' ? (
                    <textarea
                      rows={field.rows || 4}
                      value={resumeData[field.key] || ''}
                      onChange={e => updateField(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full rounded-2xl px-4 py-3 text-sm outline-none resize-none transition-all"
                      style={{
                        border: `1.5px solid ${errors[field.key] ? 'var(--rust)' : 'var(--border)'}`,
                        background: 'var(--card)',
                        color: 'var(--ink)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--amber)'}
                      onBlur={e => e.target.style.borderColor = errors[field.key] ? 'var(--rust)' : 'var(--border)'}
                    />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      value={resumeData[field.key] || ''}
                      onChange={e => updateField(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full rounded-2xl px-4 py-3 text-sm outline-none transition-all"
                      style={{
                        border: `1.5px solid ${errors[field.key] ? 'var(--rust)' : 'var(--border)'}`,
                        background: 'var(--card)',
                        color: 'var(--ink)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--amber)'}
                      onBlur={e => e.target.style.borderColor = errors[field.key] ? 'var(--rust)' : 'var(--border)'}
                    />
                  )}
                  {errors[field.key] && (
                    <p className="text-xs mt-1" style={{ color: 'var(--rust)' }}>{errors[field.key]}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Nav buttons */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex justify-between items-center"
        style={{ background: 'var(--paper)', borderTop: '1px solid var(--border)' }}>
        <button onClick={handleBack} disabled={currentStep === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-70 disabled:opacity-30"
          style={{ color: 'var(--slate)' }}>
          <ChevronLeft size={16} />
          Back
        </button>

        <div className="flex items-center gap-1.5">
          {STEPS.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{ background: i === currentStep ? 'var(--amber)' : i < currentStep ? 'var(--sage)' : 'var(--border)' }} />
          ))}
        </div>

        <button onClick={handleNext}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
          style={{ background: 'var(--brand-gradient)', boxShadow: '0 10px 22px var(--shadow)' }}>
          {isLast ? 'Finish' : 'Next'}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
