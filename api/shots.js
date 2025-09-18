// Create this file at: /api/shots.js
// Simple Vercel serverless function - no external dependencies

// In-memory storage (will reset on cold starts)
let totalShots = 1234;

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ totalShots });
  }

  if (req.method === 'POST') {
    const { totalShots: newTotal } = req.body;
    
    if (typeof newTotal === 'number' && newTotal >= 0) {
      totalShots = newTotal;
      return res.status(200).json({ 
        totalShots, 
        message: 'Shots updated successfully (Vercel)'
      });
    } else {
      return res.status(400).json({ 
        error: 'Invalid totalShots value' 
      });
    }
  }

  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}