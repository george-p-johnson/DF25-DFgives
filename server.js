// server.js
const express = require('express');
const path = require('path');
const fetch = require('node-fetch'); // make sure this is installed
const app = express();

const PORT = process.env.PORT || 5000;

// Google Apps Script endpoint
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzJwnfOg5IK_YOjCEil2Ix-piAU-IlYKoG1X5lmeTA3R1pQ5zFMS-nKJmVOgCKeGDE3/exec";

// Proxy /api/shots -> Google Apps Script
app.get('/api/shots', async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching from Google Apps Script:", err);
    res.status(500).json({ error: "Failed to fetch shots" });
  }
});

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
