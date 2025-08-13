// netlify/functions/shots.js
// const GAS_URL = process.env.GAS_URL; // set in Netlify UI

// exports.handler = async (event) => {
//   if (!GAS_URL) {
//     return { statusCode: 500, body: JSON.stringify({ error: 'Missing GAS_URL' }) };
//   }

//   try {
//     if (event.httpMethod === 'GET') {
//       const r = await fetch(GAS_URL);
//       const text = await r.text();
//       if (!r.ok) {
//         return { statusCode: 500, body: JSON.stringify({ error: 'Upstream error', status: r.status, body: text }) };
//       }
//       return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: text };
//     }

//     if (event.httpMethod === 'POST') {
//       const r = await fetch(GAS_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: event.body, // pass through the JSON
//       });
//       const text = await r.text();
//       if (!r.ok) {
//         return { statusCode: 500, body: JSON.stringify({ error: 'Upstream error', status: r.status, body: text }) };
//       }
//       return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: text };
//     }

//     return { statusCode: 405, body: 'Method Not Allowed' };
//   } catch (e) {
//     return { statusCode: 500, body: JSON.stringify({ error: String(e) }) };
//   }
// };



// netlify/functions/shots.js

// Hardcode the GAS URL for now, or use environment variable
const GAS_URL = process.env.GAS_URL || 'https://script.google.com/macros/s/AKfycbx3Ve1GOp90lyHgugxSZ7uSVMJaq6a4bXqCd-Imn0O5MikCV1010kjBLlIBQAHTfGFf/exec';

exports.handler = async (event, context) => {
  // Add CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    if (event.httpMethod === 'GET') {
      console.log('Making GET request to GAS:', GAS_URL);
      
      const response = await fetch(GAS_URL);
      const text = await response.text();
      
      console.log('GAS Response Status:', response.status);
      console.log('GAS Response Body:', text);
      
      if (!response.ok) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Upstream error', 
            status: response.status, 
            body: text 
          })
        };
      }

      // Try to parse as JSON
      try {
        JSON.parse(text); // Validate it's JSON
        return {
          statusCode: 200,
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: text
        };
      } catch (jsonError) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Invalid JSON from upstream', 
            body: text 
          })
        };
      }
    }

    if (event.httpMethod === 'POST') {
      console.log('Making POST request to GAS:', GAS_URL);
      console.log('POST body:', event.body);
      
      const response = await fetch(GAS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: event.body
      });
      
      const text = await response.text();
      
      console.log('GAS POST Response Status:', response.status);
      console.log('GAS POST Response Body:', text);
      
      if (!response.ok) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Upstream error', 
            status: response.status, 
            body: text 
          })
        };
      }

      // Try to parse as JSON
      try {
        JSON.parse(text); // Validate it's JSON
        return {
          statusCode: 200,
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: text
        };
      } catch (jsonError) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Invalid JSON from upstream', 
            body: text 
          })
        };
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
    
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message 
      })
    };
  }
};