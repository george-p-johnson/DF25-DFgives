// server.js - Simple Heroku server
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory storage for Heroku
let totalShots = 1234;

// ✅ GET API route
app.get("/api/shots", (req, res) => {
  res.json({ totalShots });
});

// ✅ POST API route
app.post("/api/shots", (req, res) => {
  const { totalShots: newTotal } = req.body;
  
  if (typeof newTotal === 'number' && newTotal >= 0) {
    totalShots = newTotal;
    res.json({ 
      totalShots, 
      message: 'Shots updated successfully (Heroku)' 
    });
  } else {
    res.status(400).json({ error: 'Invalid totalShots value' });
  }
});

// ✅ Serve Vue build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "dist")));

// ✅ Catch-all for Vue Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📦 Platform: Heroku`);
});