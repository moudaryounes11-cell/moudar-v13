/**
 * MOUDAR LLM Proxy — Cloudflare Worker
 *
 * PURPOSE: Keeps the Anthropic API key server-side.
 * The browser sends prompts to YOUR domain; the Worker adds the key and forwards.
 *
 * DEPLOYMENT:
 *   1. npm create cloudflare@latest moudar-proxy
 *   2. Replace src/index.js with this file
 *   3. wrangler secret put ANTHROPIC_API_KEY
 *   4. wrangler deploy
 *   5. Set window.MOUDAR_LLM_PROXY = 'https://moudar-proxy.your-account.workers.dev'
 *
 * COST: Free tier = 100,000 requests/day (more than enough)
 */

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',  // Restrict to your domain in production
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Rate limit: simple per-IP (upgrade to Durable Objects for production)
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';

    try {
      const body = await request.json();

      // Validate: only allow known models
      const allowedModels = ['claude-sonnet-4-20250514', 'claude-haiku-4-5-20251001'];
      if (!allowedModels.includes(body.model)) {
        return new Response(JSON.stringify({ error: 'Model not allowed' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Cap max_tokens to prevent abuse
      body.max_tokens = Math.min(body.max_tokens || 4096, 4096);

      // Forward to Anthropic with server-side key
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,        // Secret, never exposed
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      return new Response(JSON.stringify(result), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',  // Restrict in production
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Proxy error: ' + err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};
