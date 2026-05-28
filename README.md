# ResumeAI - AI-Powered Resume Builder

A modern resume builder built with Next.js, React, Tailwind CSS, and Claude AI.

## Features

- Step-by-step wizard across 10 resume sections
- AI-generated summaries, skill suggestions, and ATS scoring
- Four resume templates: Classic, Modern, Creative, and Minimal
- PDF, DOCX, and PPTX export
- Dark and light mode persisted in localStorage
- Auto-save to browser localStorage
- Responsive form/preview workflow

## Setup

```bash
npm install
```

Create a `.env.local` file in the root:

```bash
ANTHROPIC_API_KEY=your_api_key_heree
```

Run the app:

```bash
npm run dev
```

Build and start production:

```bash
npm run build
npm run start
```

## Structure

```text
src/
  app/             # Next.js App Router pages and API routes
  components/      # UI, wizard, and resume preview components
  context/         # Resume state provider and hooks
  services/        # Client services
  templates/       # Resume templates
  utils/           # Export helpers and step definitions
```

## AI

AI requests are proxied through `src/app/api/ai/route.js`, so the Anthropic API key stays server-side.

## Tech Stack

- Next.js
- React
- Tailwind CSS v4
- Framer Motion
- Lucide React icons
- jsPDF + html2canvas
- docx
- pptxgenjs
- react-hot-toast

Contributor - Pratik Sinha , Shivam Gaur
