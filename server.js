// // server.js - Simple Heroku server
// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// // In-memory storage for Heroku
// let totalShots = 1234;

// // ✅ GET API route
// app.get("/api/shots", (req, res) => {
//   res.json({ totalShots });
// });

// // ✅ POST API route
// app.post("/api/shots", (req, res) => {
//   const { totalShots: newTotal } = req.body;
  
//   if (typeof newTotal === 'number' && newTotal >= 0) {
//     totalShots = newTotal;
//     res.json({ 
//       totalShots, 
//       message: 'Shots updated successfully (Heroku)' 
//     });
//   } else {
//     res.status(400).json({ error: 'Invalid totalShots value' });
//   }
// });

// // ✅ Serve Vue build
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "dist")));

// // ✅ Catch-all for Vue Router
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist/index.html"));
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📦 Platform: Heroku`);
// });



import express from "express";
import fetch from "node-fetch"; // if using Node 18, built-in fetch works
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const GOOGLE_SHEET_API = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// API route for shots
app.get("/api/shots", async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SHEET_API);
    if (!response.ok) throw new Error(`Sheet returned ${response.status}`);
    const data = await response.json();
    res.json({ totalShots: data.totalShots ?? 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch shots from sheet' });
  }
});

app.post("/api/shots", async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SHEET_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ totalShots: req.body.totalShots }),
    });
    if (!response.ok) throw new Error(`Sheet returned ${response.status}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update shots in sheet' });
  }
});

// Serve frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
