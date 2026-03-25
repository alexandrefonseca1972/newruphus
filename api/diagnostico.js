export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' } });
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500 });
  }

  try {
    const { answers } = await req.json();
    if (!answers || answers.length < 5) {
      return new Response(JSON.stringify({ error: 'Invalid answers' }), { status: 400 });
    }

    const [unidades, gargalo, ferramentas, area, faturamento] = answers;

    const prompt = `Você é um consultor especialista em ERP para empresas brasileiras. O Ruphus é um ERP com 22 módulos: CRM (70 perm), Clientes (4), Vendas (4), Fornecedores (4), Financeiro (32), Contas Bancárias (17), Aprovações (7), Contabilidade (12), Fiscal (5), Relatórios (36), Funcionários (9), Departamentos (4), Tickets (5), Checklists (7), Contratos (5), Projetos (4), Gestão de Serviços (7), Workflows (4), Integrações (3), BI com IA (6), Chat (12), Estoque (2).

Um potencial cliente respondeu o diagnóstico:
1. Unidades/empresas gerenciadas: ${unidades}
2. Maior gargalo: ${gargalo}
3. Ferramentas que usa hoje: ${ferramentas}
4. Área que mais consome tempo: ${area}
5. Faturamento mensal: ${faturamento}

Responda APENAS com JSON válido (sem markdown, sem backticks):
{
  "score": <número 40-98, potencial de otimização>,
  "analise": "<2-3 frases analisando a situação específica do cliente, citando os dados dele>",
  "modulos": ["<6 a 10 módulos recomendados do Ruphus, em ordem de prioridade>"],
  "economia_mensal": "<valor em R$ estimado de economia mensal, ex: R$ 8.500>",
  "economia_anual": "<valor em R$ estimado de economia anual>",
  "horas_recuperadas": "<número estimado de horas/mês recuperadas>",
  "quick_wins": ["<3 resultados rápidos que o cliente teria nos primeiros 30 dias>"],
  "risco": "<1 frase sobre o risco de NÃO agir agora>"
}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return new Response(JSON.stringify({ error: 'API error', detail: err }), { status: 502 });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      result = { error: 'Parse error', raw: text };
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
