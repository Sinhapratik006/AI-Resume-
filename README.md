<<<<<<< HEAD
# ResumeAI — AI-Powered Resume Builder

A modern, production-grade resume builder built with React, Tailwind CSS, and Claude AI.

## ✨ Features

- **Step-by-step wizard** — guided form across 10 sections
- **AI-powered** — generate summaries, suggest skills, score ATS readiness
- **4 templates** — Classic, Modern (two-column), Creative, Minimal (ATS)
- **Export** — PDF, DOCX, PPTX download
- **Dark/Light mode** — persisted via localStorage
- **Auto-save** — all data saved to browser localStorage
- **Mobile-first** — responsive with preview toggle on small screens
- **ATS Scoring** — AI rates your resume and gives improvement tips

## 🚀 Setup

```bash
npm install
```

Create a `.env` file in the root:
```
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

> **Note:** For production, proxy the Anthropic API through your own backend to protect your key. The app calls the API directly from the browser for demo purposes.

```bash
npm run dev     # development
npm run build   # production build
```

## 📁 Structure

```
src/
├── components/
│   ├── ui/          # Header, ProgressSidebar
│   ├── steps/       # StepForm (wizard)
│   └── resume/      # ResumePreview + export panel
├── templates/       # Classic, Modern, Creative, Minimal
├── context/         # ResumeContext (global state)
├── services/        # aiService.js (Claude API)
└── utils/           # exportUtils.js, steps.js
```

## 🎨 Templates

| Template | Style | ATS-friendly |
|----------|-------|:---:|
| Classic  | Traditional serif, single column | ✅ |
| Modern   | Two-column with sidebar | ✅ |
| Creative | Dark header, grid layout | ⚠️ |
| Minimal  | Pure text, maximum ATS score | ✅ |

## 🤖 AI Features (requires API key)

- **Generate Summary** — creates a 3-sentence professional summary from your data
- **Suggest Skills** — recommends role-specific ATS keywords
- **ATS Score** — rates resume 0–100 with actionable improvement tips

## 📦 Tech Stack

- React 18 + Vite
- Tailwind CSS v4
- Framer Motion
- Lucide React icons
- jsPDF + html2canvas (PDF export)
- docx (Word export)
- pptxgenjs (PowerPoint export)
- react-hot-toast
=======
# AI-Resume-
>>>>>>> 50d57765ffadfded95313eca8866863c4306c21a
