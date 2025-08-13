// proxy.mjs
import express from 'express';

const app = express();
const PORT = 3000;

// Your Apps Script web-app URL (re-deploying GAS can change this URL)
// const SHOTS_API_URL = 'https://script.google.com/macros/s/AKfycbw3V_yc-26Os4d8DJE9mzy4o853djLs_LujRQjZmD23fAOTu-85RuVfZeOGMwXN6vc/exec';

const SHOTS_API_URL = 'https://script.google.com/macros/s/AKfycbx3Ve1GOp90lyHgugxSZ7uSVMJaq6a4bXqCd-Imn0O5MikCV1010kjBLlIBQAHTfGFf/exec';


app.use(express.json());

// Frontend will call /api/shots (same-origin), Vite forwards to http://localhost:3000/api/shots
app.get('/api/shots', async (_req, res) => {
  try {
    const r = await fetch(SHOTS_API_URL);
    // If GAS returns HTML due to mis-deploy, this will throw — log body for debugging:
    if (!r.ok) {
      const text = await r.text();
      console.error('GAS GET non-200:', r.status, text);
      return res.status(500).json({ error: 'Upstream error', status: r.status, body: text });
    }
    const data = await r.json();
    res.json(data);
  } catch (e) {
    console.error('Proxy GET error:', e);
    res.status(500).json({ error: String(e) });
  }
});

app.post('/api/shots', async (req, res) => {
  try {
    const r = await fetch(SHOTS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    if (!r.ok) {
      const text = await r.text();
      console.error('GAS POST non-200:', r.status, text);
      return res.status(500).json({ error: 'Upstream error', status: r.status, body: text });
    }
    const data = await r.json();
    res.json(data);
  } catch (e) {
    console.error('Proxy POST error:', e);
    res.status(500).json({ error: String(e) });
  }
});

app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));
