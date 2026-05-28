export default function ClassicTemplate({ data }) {
  const { fullName, email, phone, location, github, linkedin, portfolio,
    summary, experience, education, skills, achievements, certifications, projects, languages } = data;

  const contacts = [email, phone, location].filter(Boolean);
  const links = [github, linkedin, portfolio].filter(Boolean);

  return (
    <div id="resume-preview" style={{
      fontFamily: 'Georgia, serif',
      background: '#ffffff',
      color: '#1a1a1a',
      width: '100%',
      minHeight: '297mm',
      padding: '12mm 14mm',
      fontSize: '11px',
      lineHeight: '1.5',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', borderBottom: '2px solid #1a1a1a', paddingBottom: '8px', marginBottom: '12px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', margin: '0 0 4px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          {fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '10px', color: '#555', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
          {contacts.map((c, i) => <span key={i}>{c}</span>)}
          {links.map((l, i) => (
            <a key={i} href={l} style={{ color: '#333', textDecoration: 'none' }}>
              {l.replace('https://', '').replace('http://', '')}
            </a>
          ))}
        </div>
      </div>

      {summary && <Section title="Professional Summary">
        <p style={{ margin: 0, color: '#333' }}>{summary}</p>
      </Section>}

      {experience?.length > 0 && <Section title="Experience">
        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: '12px' }}>{exp.title}</strong>
              <span style={{ fontSize: '10px', color: '#666' }}>{exp.startDate} – {exp.endDate || 'Present'}</span>
            </div>
            <div style={{ color: '#555', fontStyle: 'italic', marginBottom: '3px' }}>{exp.company}</div>
            {exp.description && exp.description.split('\n').filter(Boolean).map((line, j) => (
              <div key={j} style={{ paddingLeft: '12px', color: '#333' }}>• {line.replace(/^•\s*/, '')}</div>
            ))}
          </div>
        ))}
      </Section>}

      {education?.length > 0 && <Section title="Education">
        {education.map((edu, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div>
              <strong>{edu.degree}</strong>
              <div style={{ color: '#555' }}>{edu.school}</div>
            </div>
            <div style={{ textAlign: 'right', color: '#666', fontSize: '10px' }}>
              <div>{edu.year}</div>
              {edu.gpa && <div>GPA: {edu.gpa}</div>}
            </div>
          </div>
        ))}
      </Section>}

      {skills?.length > 0 && <Section title="Skills">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {skills.map((s, i) => (
            <span key={i} style={{ background: '#f0f0f0', padding: '2px 8px', borderRadius: '3px', fontSize: '10px' }}>{s}</span>
          ))}
        </div>
      </Section>}

      {projects?.length > 0 && <Section title="Projects">
        {projects.map((p, i) => (
          <div key={i} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{p.name}</strong>
              {p.link && <a href={p.link} style={{ color: '#333', fontSize: '10px' }}>{p.link.replace('https://', '')}</a>}
            </div>
            {p.tech && <div style={{ color: '#666', fontStyle: 'italic', fontSize: '10px' }}>{p.tech}</div>}
            {p.description && <div style={{ color: '#333' }}>{p.description}</div>}
          </div>
        ))}
      </Section>}

      {achievements?.length > 0 && <Section title="Achievements">
        {achievements.map((a, i) => (
          <div key={i} style={{ marginBottom: '5px' }}>
            <strong>{a.title}</strong>
            {a.org && <span style={{ color: '#555' }}> — {a.org}</span>}
            {a.year && <span style={{ color: '#888', fontSize: '10px' }}> ({a.year})</span>}
            {a.description && <div style={{ color: '#555' }}>{a.description}</div>}
          </div>
        ))}
      </Section>}

      {certifications?.length > 0 && <Section title="Certifications">
        {certifications.map((c, i) => (
          <div key={i} style={{ marginBottom: '5px' }}>
            <strong>{c.name}</strong>
            {c.issuer && <span style={{ color: '#555' }}> — {c.issuer}</span>}
            {c.year && <span style={{ color: '#888', fontSize: '10px' }}> ({c.year})</span>}
          </div>
        ))}
      </Section>}

      {languages?.length > 0 && <Section title="Languages">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {languages.map((l, i) => <span key={i}>{l}</span>)}
        </div>
      </Section>}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <h2 style={{
        fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
        letterSpacing: '1.5px', borderBottom: '1px solid #ccc',
        paddingBottom: '3px', marginBottom: '6px', color: '#1a1a1a',
      }}>{title}</h2>
      {children}
    </div>
  );
}
