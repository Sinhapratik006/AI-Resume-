import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { ResumeProvider, useResume } from './context/ResumeContext';
import Header from './components/ui/Header';
import ProgressSidebar from './components/ui/ProgressSidebar';
import StepForm from './components/steps/StepForm';
import ResumePreview from './components/resume/ResumePreview';

function AppShell() {
  const { previewMode } = useResume();

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--paper)' }}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <ProgressSidebar />

        {/* Mobile: toggle between form and preview */}
        <div className="flex flex-1 overflow-hidden lg:hidden">
          <AnimatePresence mode="wait">
            {!previewMode ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 relative overflow-hidden" style={{ background: 'var(--paper)' }}>
                <StepForm />
              </motion.div>
            ) : (
              <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-hidden">
                <ResumePreview />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop: side-by-side */}
        <div className="hidden lg:flex flex-1 overflow-hidden">
          <div className="w-[420px] shrink-0 relative overflow-hidden border-r" style={{ borderColor: 'var(--border)', background: 'var(--paper)' }}>
            <StepForm />
          </div>
          <div className="flex-1 overflow-hidden">
            <ResumePreview />
          </div>
        </div>
      </div>

      <Toaster position="bottom-right" toastOptions={{
        style: { background: 'var(--card)', color: 'var(--ink)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '13px' }
      }} />
    </div>
  );
}

export default function App() {
  return (
    <ResumeProvider>
      <AppShell />
    </ResumeProvider>
  );
}
