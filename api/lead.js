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

    // Send via Web3Forms → alexandre.fonseca@live.com
    const w3res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: 'ee8dbe5c-6f15-4e6b-9353-d9379bdaf988',
        subject: '🟠 Novo Lead — ' + nome + ' (' + (interesse || 'Demonstração') + ')',
        from_name: 'Ruphus ERP',
        nome: nome,
        email: email,
        telefone: telefone || 'Não informado',
        interesse: interesse || 'Demonstração geral',
        origem: origem || 'Site',
        horario: timestamp
      })
    });

    const w3data = await w3res.json();

    return new Response(JSON.stringify({ ok: true, email: w3data.success || false, timestamp }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
