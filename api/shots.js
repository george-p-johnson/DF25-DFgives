// api/shots.js  (Vercel Serverless Function)
// export default async function handler(req, res) {
//   // USE THE GAS URL THAT RETURNED JSON IN YOUR LOCAL PROXY (the working one)
// //   const GAS_URL = 'https://script.google.com/macros/s/AKfycbw3V_yc-26Os4d8DJE9mzy4o853djLs_LujRQjZmD23fAOTu-85RuVfZeOGMwXN6vc/exec';

// const GAS_URL = 'https://script.google.com/macros/s/AKfycbx3Ve1GOp90lyHgugxSZ7uSVMJaq6a4bXqCd-Imn0O5MikCV1010kjBLlIBQAHTfGFf/exec';
//   try {
//     if (req.method === 'GET') {
//       const r = await fetch(GAS_URL);
//       const text = await r.text();
//       if (!r.ok) return res.status(500).json({ error: 'Upstream error', status: r.status, body: text });
//       res.setHeader('Content-Type', 'application/json');
//       return res.status(200).send(text);
//     }

//     if (req.method === 'POST') {
//       const r = await fetch(GAS_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(req.body || {}),
//       });
//       const text = await r.text();
//       if (!r.ok) return res.status(500).json({ error: 'Upstream error', status: r.status, body: text });
//       res.setHeader('Content-Type', 'application/json');
//       return res.status(200).send(text);
//     }

//     res.status(405).send('Method Not Allowed');
//   } catch (e) {
//     res.status(500).json({ error: String(e) });
//   }
// }


// api/shots.js
export default async function handler(req, res) {
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbww1gYvRWq3AgOJKO53ni5StyNNv5LM8eoSWRWPzUp_rrkHTeYOyMdGg82z72D_gJBQ/exec';

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
