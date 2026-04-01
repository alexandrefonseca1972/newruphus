export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' } });
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { nome, email, telefone, interesse, origem } = await req.json();
    if (!nome || !email) {
      return new Response(JSON.stringify({ error: 'Nome e email obrigatórios' }), { status: 400 });
    }

    const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    // Log lead (visible in Vercel Runtime Logs)
    console.log(JSON.stringify({
      event: 'LEAD',
      nome,
      email,
      telefone: telefone || '',
      interesse: interesse || '',
      origem: origem || 'Site',
      timestamp
    }));

    return new Response(JSON.stringify({ ok: true, timestamp }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
