// api/shots.js
export default async function handler(req, res) {
  // Add CORS headers for frontend requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log(`${req.method} /api/shots - Request received`);
  
  const SHEET_URL = process.env.GOOGLE_SHEET_URL;
  if (!SHEET_URL) {
    console.error('Missing GOOGLE_SHEET_URL environment variable');
    return res.status(500).json({ error: 'Missing SHEET_URL env variable' });
  }

  console.log('SHEET_URL:', SHEET_URL.substring(0, 50) + '...');

  try {
    if (req.method === 'GET') {
      console.log('Fetching data from Google Sheet...');
      
      const response = await fetch(SHEET_URL);
      console.log('Google Sheet response status:', response.status);
      
      if (!response.ok) {
        console.error('Google Sheet fetch failed:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        return res.status(500).json({ 
          error: 'Failed to fetch from Google Sheet',
          details: `${response.status}: ${response.statusText}`
        });
      }

      const contentType = response.headers.get('content-type');
      console.log('Response content-type:', contentType);

      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.log('Non-JSON response:', text);
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          console.error('Failed to parse response as JSON:', parseError);
          return res.status(500).json({ 
            error: 'Invalid JSON response from Google Sheet',
            response: text.substring(0, 200)
          });
        }
      }

      console.log('Parsed data:', data);
      return res.status(200).json({ totalShots: data.totalShots || 0 });
    }

    if (req.method === 'POST') {
      console.log('Processing POST request...');
      console.log('Request body:', req.body);
      
      const { totalShots } = req.body;
      if (typeof totalShots !== 'number' || isNaN(totalShots)) {
        console.error('Invalid totalShots value:', totalShots);
        return res.status(400).json({ error: 'totalShots must be a valid number' });
      }

      console.log('Sending update to Google Sheet:', { totalShots });

      const response = await fetch(SHEET_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ totalShots }),
      });

      console.log('Google Sheet POST response status:', response.status);

      if (!response.ok) {
        console.error('Google Sheet POST failed:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('POST error response:', errorText);
        return res.status(500).json({ 
          error: 'Failed to update Google Sheet',
          details: `${response.status}: ${response.statusText}`
        });
      }

      const result = await response.json();
      console.log('POST result:', result);
      return res.status(200).json(result);
    }

    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });

  } catch (err) {
    console.error('Caught error in /api/shots:', err);
    console.error('Error stack:', err.stack);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: err.message,
      // Only include stack trace in development
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }
}



