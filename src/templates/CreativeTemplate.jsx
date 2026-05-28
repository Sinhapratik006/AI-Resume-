export default function CreativeTemplate({ data }) {
  const { fullName, email, phone, location, github, linkedin, portfolio,
    summary, experience, education, skills, achievements, certifications, projects, languages } = data;

  return (
    <div id="resume-preview" style={{
      fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
      background: '#ffffff',
      color: '#1a1a1a',
      width: '100%',
      minHeight: '297mm',
      fontSize: '10.5px',
    }}>
      {/* Header band */}
      <div style={{ background: '#0f172a', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: '#ffffff', fontSize: '28px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
            {fullName || 'Your Name'}
          </h1>
          <div style={{ display: 'flex', gap: '16px', marginTop: '6px', flexWrap: 'wrap' }}>
            {[email, phone, location].filter(Boolean).map((c, i) => (
              <span key={i} style={{ color: '#94a3b8', fontSize: '10px' }}>{c}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
          {[github, linkedin, portfolio].filter(Boolean).map((l, i) => (
            <a key={i} href={l} style={{ color: '#f59e0b', fontSize: '9px', textDecoration: 'none' }}>
              {l.replace('https://', '').split('/').slice(0, 2).join('/')}
            </a>
          ))}
        </div>
      </div>

      {/* Accent bar */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #f59e0b, #ef4444, #8b5cf6)' }} />

      <div style={{ padding: '16px 24px' }}>
        {summary && (
          <div style={{ marginBottom: '14px', padding: '10px 14px', background: '#f8fafc', borderLeft: '3px solid #f59e0b', borderRadius: '0 8px 8px 0' }}>
            <p style={{ margin: 0, color: '#475569', fontStyle: 'italic', lineHeight: 1.6 }}>{summary}</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            {experience?.length > 0 && (
              <CreSection title="Experience" color="#f59e0b">
                {experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: '10px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{exp.title}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{ color: '#64748b', fontStyle: 'italic' }}>{exp.company}</span>
                      <span style={{ fontSize: '9px', color: '#94a3b8' }}>{exp.startDate}–{exp.endDate || 'Now'}</span>
                    </div>
                    {exp.description && exp.description.split('\n').filter(Boolean).map((line, j) => (
                      <div key={j} style={{ color: '#475569', paddingLeft: '8px', fontSize: '10px' }}>▸ {line.replace(/^•\s*/, '')}</div>
                    ))}
                  </div>
                ))}
              </CreSection>
            )}

            {projects?.length > 0 && (
              <CreSection title="Projects" color="#8b5cf6">
                {projects.map((p, i) => (
                  <div key={i} style={{ marginBottom: '8px', padding: '6px', background: '#f8f4ff', borderRadius: '6px' }}>
                    <strong style={{ color: '#5b21b6' }}>{p.name}</strong>
                    {p.tech && <div style={{ fontSize: '9px', color: '#7c3aed', margin: '1px 0' }}>{p.tech}</div>}
                    {p.description && <div style={{ color: '#475569', fontSize: '10px' }}>{p.description}</div>}
                  </div>
                ))}
              </CreSection>
            )}
          </div>

          <div>
            {education?.length > 0 && (
              <CreSection title="Education" color="#ef4444">
                {education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#0f172a' }}>{edu.degree}</strong>
                    <div style={{ color: '#64748b' }}>{edu.school}</div>
                    <div style={{ fontSize: '9px', color: '#94a3b8' }}>{edu.year}{edu.gpa ? ` · GPA ${edu.gpa}` : ''}</div>
                  </div>
                ))}
              </CreSection>
            )}

            {skills?.length > 0 && (
              <CreSection title="Skills" color="#10b981">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {skills.map((s, i) => (
                    <span key={i} style={{ background: '#f0fdf4', color: '#065f46', padding: '2px 8px', borderRadius: '20px', fontSize: '9.5px', border: '1px solid #bbf7d0' }}>{s}</span>
                  ))}
                </div>
              </CreSection>
            )}

            {achievements?.length > 0 && (
              <CreSection title="Achievements" color="#f59e0b">
                {achievements.map((a, i) => (
                  <div key={i} style={{ marginBottom: '5px', paddingLeft: '8px', borderLeft: '2px solid #fcd34d' }}>
                    <strong>{a.title}</strong>
                    {a.org && <span style={{ color: '#666' }}> · {a.org}</span>}
                    {a.year && <span style={{ color: '#999', fontSize: '9px' }}> ({a.year})</span>}
                  </div>
                ))}
              </CreSection>
            )}

            {certifications?.length > 0 && (
              <CreSection title="Certifications" color="#8b5cf6">
                {certifications.map((c, i) => (
                  <div key={i} style={{ marginBottom: '5px' }}>
                    <strong>{c.name}</strong>
                    <span style={{ color: '#666' }}> · {c.issuer}</span>
                    {c.year && <span style={{ color: '#999', fontSize: '9px' }}> ({c.year})</span>}
                  </div>
                ))}
              </CreSection>
            )}

            {languages?.length > 0 && (
              <CreSection title="Languages" color="#06b6d4">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {languages.map((l, i) => (
                    <span key={i} style={{ background: '#ecfeff', color: '#164e63', padding: '2px 8px', borderRadius: '20px', fontSize: '9.5px' }}>{l}</span>
                  ))}
                </div>
              </CreSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CreSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
        <div style={{ width: '12px', height: '12px', background: color, borderRadius: '2px', flexShrink: 0 }} />
        <h2 style={{ margin: 0, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#0f172a' }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}
