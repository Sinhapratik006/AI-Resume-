import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Presentation, FileType, Loader2, Eye, RefreshCw, Star } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import ClassicTemplate from '../../templates/ClassicTemplate';
import ModernTemplate from '../../templates/ModernTemplate';
import CreativeTemplate from '../../templates/CreativeTemplate';
import MinimalTemplate from '../../templates/MinimalTemplate';
import { exportToPDF, exportToDOCX, exportToPPT } from '../../utils/exportUtils';
import { scoreResume } from '../../services/aiService';
import toast from 'react-hot-toast';

const TEMPLATES = [
  { id: 'classic', label: 'Classic', desc: 'Traditional & elegant' },
  { id: 'modern', label: 'Modern', desc: 'Two-column layout' },
  { id: 'creative', label: 'Creative', desc: 'Bold & colorful' },
  { id: 'minimal', label: 'Minimal', desc: 'ATS-optimized' },
];

const TemplateMap = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  creative: CreativeTemplate,
  minimal: MinimalTemplate,
};

export default function ResumePreview() {
  const { resumeData, template, setTemplate } = useResume();
  const [exporting, setExporting] = useState(null);
  const [score, setScore] = useState(null);
  const [scoring, setScoring] = useState(false);
  const previewRef = useRef(null);

  const TemplateComponent = TemplateMap[template] || ClassicTemplate;

  const handleExport = async (type) => {
    setExporting(type);
    try {
      if (type === 'pdf') await exportToPDF();
      else if (type === 'docx') await exportToDOCX(resumeData);
      else if (type === 'ppt') await exportToPPT(resumeData);
      toast.success(`${type.toUpperCase()} downloaded!`, { className: 'custom-toast' });
    } catch (e) {
      toast.error(`Export failed: ${e.message}`, { className: 'custom-toast' });
    } finally {
      setExporting(null);
    }
  };

  const handleScore = async () => {
    setScoring(true);
    try {
      const result = await scoreResume(resumeData);
      setScore(result);
    } catch {
      toast.error('AI scoring unavailable');
    } finally {
      setScoring(false);
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--cream)' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b shrink-0"
        style={{ borderColor: 'var(--border)', background: 'var(--paper)' }}>
        <div className="flex items-center gap-2">
          <Eye size={15} style={{ color: 'var(--muted)' }} />
          <span className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>Preview</span>
        </div>

        <div className="flex gap-1.5">
          {[
            { type: 'pdf', icon: FileText, label: 'PDF', color: '#e53e3e' },
            { type: 'docx', icon: FileType, label: 'DOCX', color: '#2b6cb0' },
            { type: 'ppt', icon: Presentation, label: 'PPT', color: '#dd6b20' },
          ].map(({ type, icon: Icon, label, color }) => (
            <button key={type} onClick={() => handleExport(type)} disabled={!!exporting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80 disabled:opacity-40"
              style={{ background: `${color}18`, color }}>
              {exporting === type ? <Loader2 size={12} className="animate-spin" /> : <Icon size={12} />}
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Template switcher */}
      <div className="flex gap-2 px-4 py-2.5 overflow-x-auto shrink-0 border-b" style={{ borderColor: 'var(--border)' }}>
        {TEMPLATES.map(t => (
          <button key={t.id} onClick={() => setTemplate(t.id)}
            className="flex flex-col items-center px-3 py-1.5 rounded-xl text-xs shrink-0 transition-all"
            style={{
              background: template === t.id ? 'var(--amber)22' : 'transparent',
              color: template === t.id ? 'var(--amber)' : 'var(--muted)',
              border: `1.5px solid ${template === t.id ? 'var(--amber)' : 'transparent'}`,
              fontWeight: template === t.id ? 600 : 400,
            }}>
            <span>{t.label}</span>
          </button>
        ))}

        <button onClick={handleScore} disabled={scoring}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all hover:opacity-80"
          style={{ background: 'var(--sage)22', color: 'var(--sage)', border: '1.5px solid var(--sage)44' }}>
          {scoring ? <Loader2 size={11} className="animate-spin" /> : <Star size={11} />}
          ATS Score
        </button>
      </div>

      {/* ATS Score panel */}
      <AnimatePresence>
        {score && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
            <div className="p-4" style={{ background: 'var(--card)' }}>
              <div className="flex items-center gap-4 mb-3">
                <div className="relative w-14 h-14">
                  <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="22" fill="none" stroke="var(--border)" strokeWidth="4" />
                    <circle cx="28" cy="28" r="22" fill="none"
                      stroke={score.score >= 80 ? '#7a9e87' : score.score >= 60 ? '#d4a853' : '#c4604a'}
                      strokeWidth="4" strokeDasharray={`${(score.score / 100) * 138} 138`}
                      strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: 'var(--ink)' }}>
                    {score.score}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: 'var(--ink)' }}>ATS Score</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>
                    {score.score >= 80 ? 'Excellent!' : score.score >= 60 ? 'Good, room to improve' : 'Needs work'}
                  </div>
                </div>
                <button onClick={() => setScore(null)} className="ml-auto text-xs" style={{ color: 'var(--muted)' }}>✕</button>
              </div>
              <div className="space-y-1.5">
                {score.tips?.map((tip, i) => (
                  <div key={i} className="flex gap-2 text-xs" style={{ color: 'var(--slate)' }}>
                    <span style={{ color: 'var(--rust)' }}>↑</span> {tip}
                  </div>
                ))}
                {score.strengths?.map((s, i) => (
                  <div key={i} className="flex gap-2 text-xs" style={{ color: 'var(--slate)' }}>
                    <span style={{ color: 'var(--sage)' }}>✓</span> {s}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume preview */}
      <div className="flex-1 overflow-auto p-4" ref={previewRef}>
        <div className="shadow-xl rounded-lg overflow-hidden" style={{ background: 'white', minHeight: '400px', transform: 'scale(1)', transformOrigin: 'top center' }}>
          <TemplateComponent data={resumeData} />
        </div>
      </div>
    </div>
  );
}
