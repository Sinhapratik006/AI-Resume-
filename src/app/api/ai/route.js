const API_URL = 'https://api.anthropic.com/v1/messages';

export async function POST(request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return Response.json({ error: 'Missing ANTHROPIC_API_KEY' }, { status: 500 });
  }

  try {
    const { prompt, systemPrompt } = await request.json();

    if (!prompt) {
      return Response.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt || 'You are a professional resume writer. Be concise, impactful, and ATS-friendly.',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data.error?.message || 'Anthropic request failed' },
        { status: response.status },
      );
    }

    return Response.json({ text: data.content?.[0]?.text || '' });
  } catch (error) {
    return Response.json({ error: error.message || 'AI request failed' }, { status: 500 });
  }
}
