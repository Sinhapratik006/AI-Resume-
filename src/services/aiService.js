const API_URL = 'https://api.anthropic.com/v1/messages';

async function callClaude(prompt, systemPrompt = '') {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: systemPrompt || 'You are a professional resume writer. Be concise, impactful, and ATS-friendly.',
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  const data = await response.json();
  return data.content?.[0]?.text || '';
}

export async function generateSummary(resumeData) {
  const { fullName, experience, skills, education } = resumeData;
  const expText = experience.map(e => `${e.title} at ${e.company}`).join(', ');
  const skillsText = skills.slice(0, 8).join(', ');
  const prompt = `Write a compelling 3-sentence professional summary for a resume.
Name: ${fullName}
Experience: ${expText || 'Entry level'}
Skills: ${skillsText || 'Various technical skills'}
Education: ${education[0]?.degree || 'Bachelor\'s degree'}

Return ONLY the summary text, no labels or extra formatting.`;
  return callClaude(prompt);
}

export async function suggestSkills(jobRole, existingSkills = []) {
  const prompt = `Suggest 10 highly relevant, ATS-optimized skills for a "${jobRole}" role.
Existing skills: ${existingSkills.join(', ')}
Return ONLY a JSON array of skill strings, like: ["Skill 1", "Skill 2", ...]
No explanation, just the JSON array.`;

  const text = await callClaude(prompt, 'Return only valid JSON arrays. No markdown, no explanation.');
  try {
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch {
    return ['Problem Solving', 'Communication', 'Team Collaboration', 'Agile/Scrum', 'Project Management'];
  }
}

export async function improveExperience(bulletPoint) {
  const prompt = `Rewrite this resume bullet point to be more impactful, quantifiable, and ATS-friendly.
Original: "${bulletPoint}"
Return ONLY the improved bullet point, starting with a strong action verb.`;
  return callClaude(prompt);
}

export async function scoreResume(resumeData) {
  const prompt = `Analyze this resume data and provide an ATS score out of 100 with 3 specific improvement tips.
Name: ${resumeData.fullName}
Skills count: ${resumeData.skills?.length || 0}
Experience entries: ${resumeData.experience?.length || 0}
Summary length: ${resumeData.summary?.length || 0} chars
Has LinkedIn: ${!!resumeData.linkedin}
Has GitHub: ${!!resumeData.github}
Projects: ${resumeData.projects?.length || 0}

Return ONLY valid JSON: {"score": 85, "tips": ["tip1", "tip2", "tip3"], "strengths": ["s1", "s2"]}`;

  const text = await callClaude(prompt, 'Return only valid JSON. No markdown, no explanation.');
  try {
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch {
    return { score: 72, tips: ['Add more quantifiable achievements', 'Include relevant keywords', 'Expand your skills section'], strengths: ['Complete contact info', 'Has work experience'] };
  }
}
