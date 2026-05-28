import "../index.css";

export const metadata = {
  title: "ResumeAI - AI-Powered Resume Builder",
  description: "AI-powered resume builder with templates and exports.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
try {
  if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
  }
} catch {}
`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
