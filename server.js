import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// allow JSON
app.use(express.json());

// 🔹 API route for leaderboard shots
app.get("/api/shots", (req, res) => {
  // For now, just return mock data
  res.json({ totalShots: 1234 });
});

// 🔹 Serve Vue frontend
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
