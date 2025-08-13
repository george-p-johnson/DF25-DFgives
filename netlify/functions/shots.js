// netlify/functions/shots.js
const GAS_URL = process.env.GAS_URL; // set in Netlify UI

exports.handler = async (event) => {
  if (!GAS_URL) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing GAS_URL' }) };
  }

  try {
    if (event.httpMethod === 'GET') {
      const r = await fetch(GAS_URL);
      const text = await r.text();
      if (!r.ok) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Upstream error', status: r.status, body: text }) };
      }
      return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: text };
    }

    if (event.httpMethod === 'POST') {
      const r = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: event.body, // pass through the JSON
      });
      const text = await r.text();
      if (!r.ok) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Upstream error', status: r.status, body: text }) };
      }
      return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: text };
    }

    return { statusCode: 405, body: 'Method Not Allowed' };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: String(e) }) };
  }
};
