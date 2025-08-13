// // proxy.js
// import express from 'express';

// const app = express();
// const PORT = 3000;

// // Replace with your GAS endpoint
// const TARGET_URL = 'https://script.google.com/macros/s/AKfycbx3Ve1GOp90lyHgugxSZ7uSVMJaq6a4bXqCd-Imn0O5MikCV1010kjBLlIBQAHTfGFf/exec';

// app.get('/shots', async (req, res) => {
//   try {
//     const response = await fetch(TARGET_URL);
//     const data = await response.text(); // or response.json() if JSON
//     res.send(data);
//   } catch (err) {
//     console.error('Error fetching from GAS:', err);
//     res.status(500).send('Error fetching data');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Proxy server running at http://localhost:${PORT}`);
// });




// proxy.mjs
import express from 'express';

const app = express();
const PORT = 3000;
const SHOTS_API_URL = 'https://script.google.com/macros/s/AKfycbx3Ve1GOp90lyHgugxSZ7uSVMJaq6a4bXqCd-Imn0O5MikCV1010kjBLlIBQAHTfGFf/exec';

app.use(express.json());

app.get('/shots', async (req, res) => {
  try {
    const response = await fetch(SHOTS_API_URL);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: err.toString() });
  }
});

app.post('/shots', async (req, res) => {
  try {
    const response = await fetch(SHOTS_API_URL, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));
