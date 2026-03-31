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

    // ── SEND EMAIL via Resend ──
    const resendKey = process.env.RESEND_API_KEY;
    let emailSent = false;

    if (resendKey) {
      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${resendKey}` },
          body: JSON.stringify({
            from: 'Ruphus ERP <leads@ruphus.app>',
            to: ['alexandre.fonseca@live.com'],
            subject: `🟠 Novo Lead — ${nome} (${interesse || 'Demonstração'})`,
            html: `
              <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
                <div style="background:#f97c2b;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
                  <h2 style="margin:0;font-size:18px">Novo Lead — Ruphus ERP</h2>
                  <p style="margin:4px 0 0;font-size:13px;opacity:.8">${timestamp}</p>
                </div>
                <div style="background:#fff;border:1px solid #e5e5e5;border-top:none;padding:24px;border-radius:0 0 12px 12px">
                  <table style="width:100%;font-size:14px;border-collapse:collapse">
                    <tr><td style="padding:8px 0;color:#888;width:120px">Nome</td><td style="padding:8px 0;font-weight:600">${nome}</td></tr>
                    <tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#f97c2b">${email}</a></td></tr>
                    <tr><td style="padding:8px 0;color:#888">Telefone</td><td style="padding:8px 0"><a href="tel:${telefone}" style="color:#f97c2b">${telefone || 'Não informado'}</a></td></tr>
                    <tr><td style="padding:8px 0;color:#888">Interesse</td><td style="padding:8px 0">${interesse || 'Demonstração geral'}</td></tr>
                    <tr><td style="padding:8px 0;color:#888">Origem</td><td style="padding:8px 0">${origem || 'Site'}</td></tr>
                  </table>
                  <div style="margin-top:20px;padding-top:16px;border-top:1px solid #eee">
                    <a href="https://wa.me/55${(telefone||'').replace(/\D/g,'')}" style="display:inline-block;background:#25D366;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600">Responder via WhatsApp</a>
                    <a href="mailto:${email}" style="display:inline-block;background:#f97c2b;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;margin-left:8px">Responder via Email</a>
                  </div>
                </div>
              </div>
            `
          })
        });
        emailSent = emailRes.ok;
      } catch (e) {
        console.error('Email error:', e.message);
      }
    }

    return new Response(JSON.stringify({ 
      ok: true, 
      email: emailSent,
      timestamp 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
