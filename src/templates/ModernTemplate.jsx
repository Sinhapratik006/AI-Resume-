export default function ModernTemplate({ data }) {
  const { fullName, email, phone, location, github, linkedin, portfolio,
    summary, experience, education, skills, achievements, certifications, projects, languages } = data;

  const accent = '#1e3a5f';
  const accentLight = '#e8f0fa';

  return (
    <div id="resume-preview" style={{
      fontFamily: 'Arial, sans-serif',
      background: '#ffffff',
      color: '#1a1a1a',
      width: '100%',
      minHeight: '297mm',
      fontSize: '10.5px',
      display: 'flex',
    }}>
      {/* Left sidebar */}
      <div style={{ width: '32%', background: accent, color: '#fff', padding: '20px 14px', flexShrink: 0 }}>
        {/* Avatar placeholder */}
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 700 }}>
          {(fullName || 'Y')[0]}
        </div>
        <h1 style={{ fontSize: '16px', fontWeight: 700, textAlign: 'center', margin: '0 0 4px', lineHeight: 1.2 }}>
          {fullName || 'Your Name'}
        </h1>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.3)', marginTop: '14px', paddingTop: '12px' }}>
          <SideLabel>Contact</SideLabel>
          {email && <SideItem icon="✉">{email}</SideItem>}
          {phone && <SideItem icon="📱">{phone}</SideItem>}
          {location && <SideItem icon="📍">{location}</SideItem>}
          {linkedin && <SideItem icon="in">{linkedin.replace('https://linkedin.com/in/', '')}</SideItem>}
          {github && <SideItem icon="gh">{github.replace('https://github.com/', '')}</SideItem>}
          {portfolio && <SideItem icon="🌐">{portfolio.replace('https://', '')}</SideItem>}
        </div>

        {skills?.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <SideLabel>Skills</SideLabel>
            {skills.map((s, i) => (
              <div key={i} style={{ marginBottom: '5px' }}>
                <div style={{ fontSize: '10px', marginBottom: '2px' }}>{s}</div>
                <div style={{ height: '3px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: '80%', background: 'rgba(255,255,255,0.7)', borderRadius: '2px' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {languages?.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <SideLabel>Languages</SideLabel>
            {languages.map((l, i) => <SideItem key={i} icon="◆">{l}</SideItem>)}
          </div>
        )}

        {certifications?.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <SideLabel>Certifications</SideLabel>
            {certifications.map((c, i) => (
              <div key={i} style={{ marginBottom: '6px', fontSize: '10px' }}>
                <div style={{ fontWeight: 600 }}>{c.name}</div>
                <div style={{ opacity: 0.75 }}>{c.issuer} {c.year && `· ${c.year}`}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right main content */}
      <div style={{ flex: 1, padding: '20px 16px' }}>
        {summary && (
          <MainSection title="About Me" accent={accent} accentLight={accentLight}>
            <p style={{ margin: 0, color: '#444', lineHeight: 1.6 }}>{summary}</p>
          </MainSection>
        )}

        {experience?.length > 0 && (
          <MainSection title="Experience" accent={accent} accentLight={accentLight}>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '10px', paddingLeft: '10px', borderLeft: `2px solid ${accent}33` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <strong style={{ fontSize: '11px', color: accent }}>{exp.title}</strong>
                  <span style={{ fontSize: '9.5px', color: '#888', background: accentLight, padding: '1px 6px', borderRadius: '20px' }}>
                    {exp.startDate} – {exp.endDate || 'Present'}
                  </span>
                </div>
                <div style={{ color: '#666', marginBottom: '3px', fontStyle: 'italic' }}>{exp.company}</div>
                {exp.description && exp.description.split('\n').filter(Boolean).map((line, j) => (
                  <div key={j} style={{ color: '#444', paddingLeft: '8px' }}>• {line.replace(/^•\s*/, '')}</div>
                ))}
              </div>
            ))}
          </MainSection>
        )}

        {education?.length > 0 && (
          <MainSection title="Education" accent={accent} accentLight={accentLight}>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ color: accent }}>{edu.degree}</strong>
                  <div style={{ color: '#666' }}>{edu.school}</div>
                </div>
                <div style={{ textAlign: 'right', color: '#888', fontSize: '10px' }}>
                  {edu.year}
                  {edu.gpa && <div>GPA: {edu.gpa}</div>}
                </div>
              </div>
            ))}
          </MainSection>
        )}

        {projects?.length > 0 && (
          <MainSection title="Projects" accent={accent} accentLight={accentLight}>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: '8px', padding: '6px 8px', background: accentLight, borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ color: accent }}>{p.name}</strong>
                  {p.tech && <span style={{ fontSize: '9px', color: '#666', fontStyle: 'italic' }}>{p.tech}</span>}
                </div>
                {p.description && <div style={{ color: '#444', marginTop: '2px' }}>{p.description}</div>}
              </div>
            ))}
          </MainSection>
        )}

        {achievements?.length > 0 && (
          <MainSection title="Achievements" accent={accent} accentLight={accentLight}>
            {achievements.map((a, i) => (
              <div key={i} style={{ marginBottom: '5px', paddingLeft: '8px', borderLeft: `2px solid ${accent}` }}>
                <strong>{a.title}</strong>
                {a.org && <span style={{ color: '#666' }}> — {a.org}</span>}
                {a.year && <span style={{ color: '#999', fontSize: '9px' }}> ({a.year})</span>}
                {a.description && <div style={{ color: '#555' }}>{a.description}</div>}
              </div>
            ))}
          </MainSection>
        )}
      </div>
    </div>
  );
}

function SideLabel({ children }) {
  return <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6, marginBottom: '6px' }}>{children}</div>;
}
function SideItem({ icon, children }) {
  return (
    <div style={{ display: 'flex', gap: '6px', marginBottom: '5px', fontSize: '10px', alignItems: 'flex-start', wordBreak: 'break-all' }}>
      <span style={{ opacity: 0.7, flexShrink: 0 }}>{icon}</span>
      <span>{children}</span>
    </div>
  );
}
function MainSection({ title, children, accent }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: '3px', marginBottom: '8px' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
