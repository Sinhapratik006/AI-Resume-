export default function MinimalTemplate({ data }) {
  const { fullName, email, phone, location, github, linkedin, portfolio,
    summary, experience, education, skills, achievements, certifications, projects, languages } = data;

  const links = [
    github && { label: 'GitHub', url: github },
    linkedin && { label: 'LinkedIn', url: linkedin },
    portfolio && { label: 'Portfolio', url: portfolio },
  ].filter(Boolean);

  return (
    <div id="resume-preview" style={{
      fontFamily: 'Calibri, Segoe UI, sans-serif',
      background: '#ffffff',
      color: '#222',
      width: '100%',
      minHeight: '297mm',
      padding: '15mm 16mm',
      fontSize: '11px',
      lineHeight: '1.55',
    }}>
      {/* Name */}
      <div style={{ marginBottom: '10px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 4px', color: '#111' }}>
          {fullName || 'Your Name'}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0', color: '#555', fontSize: '10.5px' }}>
          {[email, phone, location, ...links.map(l => l.url.replace('https://',''))].filter(Boolean).map((item, i, arr) => (
            <span key={i}>
              {item}
              {i < arr.length - 1 && <span style={{ margin: '0 6px', color: '#ccc' }}>|</span>}
            </span>
          ))}
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '8px 0 10px' }} />

      {summary && <MinSection title="Summary">
        <p style={{ margin: 0 }}>{summary}</p>
      </MinSection>}

      {experience?.length > 0 && <MinSection title="Work Experience">
        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '9px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 700 }}>{exp.title} — {exp.company}</span>
              <span style={{ color: '#666', fontSize: '10px' }}>{exp.startDate} – {exp.endDate || 'Present'}</span>
            </div>
            {exp.description && exp.description.split('\n').filter(Boolean).map((line, j) => (
              <div key={j} style={{ paddingLeft: '14px', color: '#333' }}>• {line.replace(/^•\s*/, '')}</div>
            ))}
          </div>
        ))}
      </MinSection>}

      {education?.length > 0 && <MinSection title="Education">
        {education.map((edu, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span><strong>{edu.degree}</strong>, {edu.school}{edu.gpa ? ` — GPA: ${edu.gpa}` : ''}</span>
            <span style={{ color: '#666', fontSize: '10px' }}>{edu.year}</span>
          </div>
        ))}
      </MinSection>}

      {skills?.length > 0 && <MinSection title="Skills">
        <p style={{ margin: 0 }}>{skills.join(' • ')}</p>
      </MinSection>}

      {projects?.length > 0 && <MinSection title="Projects">
        {projects.map((p, i) => (
          <div key={i} style={{ marginBottom: '6px' }}>
            <strong>{p.name}</strong>
            {p.tech && <span style={{ color: '#666', fontSize: '10px' }}> ({p.tech})</span>}
            {p.link && <a href={p.link} style={{ color: '#1a56db', fontSize: '9.5px', marginLeft: '6px' }}>{p.link.replace('https://', '')}</a>}
            {p.description && <div style={{ paddingLeft: '14px', color: '#333' }}>{p.description}</div>}
          </div>
        ))}
      </MinSection>}

      {achievements?.length > 0 && <MinSection title="Achievements">
        {achievements.map((a, i) => (
          <div key={i} style={{ marginBottom: '4px' }}>
            <strong>{a.title}</strong>
            {a.org && <span style={{ color: '#555' }}>, {a.org}</span>}
            {a.year && <span style={{ color: '#888', fontSize: '10px' }}> ({a.year})</span>}
            {a.description && <span style={{ color: '#555' }}>: {a.description}</span>}
          </div>
        ))}
      </MinSection>}

      {certifications?.length > 0 && <MinSection title="Certifications">
        {certifications.map((c, i) => (
          <div key={i} style={{ marginBottom: '4px' }}>
            <strong>{c.name}</strong>
            {c.issuer && <span style={{ color: '#555' }}>, {c.issuer}</span>}
            {c.year && <span style={{ color: '#888', fontSize: '10px' }}> ({c.year})</span>}
          </div>
        ))}
      </MinSection>}

      {languages?.length > 0 && <MinSection title="Languages">
        <p style={{ margin: 0 }}>{languages.join(' • ')}</p>
      </MinSection>}
    </div>
  );
}

function MinSection({ title, children }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', borderBottom: '1px solid #e0e0e0', paddingBottom: '2px', marginBottom: '5px', color: '#111' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
