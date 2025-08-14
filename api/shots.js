// api/shots.js
export default async function handler(req, res) {
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbzJwnfOg5IK_YOjCEil2Ix-piAU-IlYKoG1X5lmeTA3R1pQ5zFMS-nKJmVOgCKeGDE3/exec';

  try {
    if (req.method === 'GET') {
      const r = await fetch(GAS_URL);
      const text = await r.text();
      if (!r.ok) return res.status(500).json({ error: 'Upstream error', status: r.status, body: text });
      res.setHeader('Content-Type', 'application/json');
      // stop any caching since you poll every 5s
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).send(text);
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const r = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const text = await r.text();
      if (!r.ok) return res.status(500).json({ error: 'Upstream error', status: r.status, body: text });
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).send(text);
    }

    res.status(405).send('Method Not Allowed');
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
