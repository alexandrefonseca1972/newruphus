// Ruphus ERP — Shared Scripts

// ── REVEAL ──
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v');obs.unobserve(e.target)}})},{threshold:.1,rootMargin:'0px 0px -20px 0px'});
document.querySelectorAll('[data-r]').forEach(el=>obs.observe(el));

// ── NAV SCROLL ──
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('scrolled',scrollY>40),{passive:true});

// ── THEME (fixed) ──
function toggleTheme(){
  const d=document.documentElement;d.classList.toggle('dark');
  localStorage.setItem('theme',d.classList.contains('dark')?'dark':'light');
  const ico=document.getElementById('t-ico');if(ico)ico.textContent=d.classList.contains('dark')?'☾':'☀';
}
(function(){
  if(localStorage.getItem('theme')==='dark'||(!localStorage.getItem('theme')&&matchMedia('(prefers-color-scheme:dark)').matches)){
    document.documentElement.classList.add('dark');
    const ico=document.getElementById('t-ico');if(ico)ico.textContent='☾';
  }
})();

// ── TYPING ──
(function(){const w=['inteligente.','eficiente.','integrada.','automatizada.','estratégica.'];const el=document.getElementById('typed');if(!el)return;let wi=0,ci=0,del=false;
function t(){if(!el)return;const word=w[wi];if(!del){ci++;el.textContent=word.slice(0,ci);if(ci===word.length){del=true;setTimeout(t,2200);return}setTimeout(t,90)}else{ci--;el.textContent=word.slice(0,ci);if(ci===0){del=false;wi=(wi+1)%w.length;setTimeout(t,400);return}setTimeout(t,50)}}setTimeout(t,2500)})();

// ── BENTO TABS ──
function swTab(b,p){b.parentElement.querySelectorAll('.tb').forEach(x=>x.classList.remove('on'));b.classList.add('on');document.querySelectorAll('.pn').forEach(x=>x.classList.remove('show'));document.getElementById('p-'+p).classList.add('show')}

// ── MODULE TABS ──
function showMod(b,i){document.querySelectorAll('.mt').forEach(x=>x.classList.remove('on'));b.classList.add('on');document.querySelectorAll('.mc').forEach(x=>x.classList.remove('show'));document.getElementById('mod-'+i).classList.add('show')}

// ── EDU FILTER ──
function fEdu(b,c){document.querySelectorAll('.ecat').forEach(x=>x.classList.remove('on'));b.classList.add('on');document.querySelectorAll('.ec,.ef-card').forEach(x=>{if(c==='all'||x.dataset.cat===c){x.style.display='';x.style.animation='fadeUp .4s ease'}else x.style.display='none'});
// show/hide featured section wrapper
const feat=document.querySelector('.edu-featured');if(feat){const visibleFeat=feat.querySelectorAll('.ef-card:not([style*="display: none"])');feat.style.display=visibleFeat.length?'':'none'}}

// ── FAQ ──
function togFaq(b){const card=b.parentElement;const a=b.nextElementSibling;const isOpen=a.classList.contains('show');document.querySelectorAll('.faq-a').forEach(x=>x.classList.remove('show'));document.querySelectorAll('.faq-q').forEach(x=>{x.classList.remove('open');x.setAttribute('aria-expanded','false')});document.querySelectorAll('.faq-it').forEach(x=>x.classList.remove('open-card'));if(!isOpen){a.classList.add('show');b.classList.add('open');b.setAttribute('aria-expanded','true');card.classList.add('open-card')}}
function fFaq(btn,cat){document.querySelectorAll('.fq-cat').forEach(x=>x.classList.remove('on'));btn.classList.add('on');document.querySelectorAll('.faq-a').forEach(x=>x.classList.remove('show'));document.querySelectorAll('.faq-q').forEach(x=>x.classList.remove('open'));document.querySelectorAll('.faq-it').forEach(x=>{x.classList.remove('open-card');if(cat==='all'||x.dataset.fcat===cat){x.style.display='';x.style.animation='fadeUp .3s ease'}else{x.style.display='none'}})}

// ── TRANSFORMATION TOGGLE ──
function switchBA(state){const pill=document.getElementById('ba-pill');const before=document.getElementById('ba-before');const after=document.getElementById('ba-after');pill.className='ba-pill state-'+state;before.classList.toggle('show',state==='before');after.classList.toggle('show',state==='after')}

// ── BLOG FILTER ──
function fBlog(btn,cat){document.querySelectorAll('.bc-cat').forEach(x=>x.classList.remove('on'));btn.classList.add('on');document.querySelectorAll('.blog-feat,.ba-card2').forEach(x=>{if(cat==='all'||x.dataset.bcat===cat){x.style.display='';x.style.animation='fadeUp .4s ease'}else{x.style.display='none'}})}

// ── SEGMENT FILTER ──
function fSeg(btn,cat){document.querySelectorAll('.sg-tab').forEach(x=>x.classList.remove('on'));btn.classList.add('on');document.querySelectorAll('.sc').forEach(x=>{if(cat==='all'||x.dataset.scat===cat){x.style.display='';x.style.animation='fadeUp .35s ease'}else{x.style.display='none'}})}

// ── ROI CALCULATOR (fixed) ──
function calcROI(){
  const colEl=document.getElementById('inp-col');
  if(!colEl)return;
  const col=parseInt(colEl.value)||0;
  const fat=parseMoeda(document.getElementById('inp-fat'));
  const hrs=parseInt(document.getElementById('inp-hrs').value)||0;
  const sys=parseInt(document.getElementById('inp-sys').value)||1;
  const hrsEl=document.getElementById('hrs-val');if(hrsEl)hrsEl.textContent=hrs+'h';
  const custoHrs=hrs*4*55;
  const custoSys=(sys-1)*350;
  const custoRetrabalho=fat*0.012;
  const total=custoHrs+custoSys+custoRetrabalho;
  const eco=Math.max(0,total);
  const ecoYr=eco*12;
  const hrsRecup=Math.round(hrs*0.8);
  const el1=document.getElementById('r-custo');if(el1)el1.textContent='R$ '+Math.round(total).toLocaleString('pt-BR');
  const el2=document.getElementById('r-eco');if(el2)el2.textContent='R$ '+Math.round(eco).toLocaleString('pt-BR');
  const el3=document.getElementById('r-eco-yr');if(el3)el3.textContent='R$ '+Math.round(ecoYr).toLocaleString('pt-BR');
  const el4=document.getElementById('r-hrs');if(el4)el4.textContent=hrsRecup*4+'h';
}
calcROI();

// ── COUNTERS ──
const cObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const el=e.target;const t=parseInt(el.dataset.count);if(!t)return;let c=0;const s=Math.max(1,Math.floor(t/35));const iv=setInterval(()=>{c+=s;if(c>=t){c=t;clearInterval(iv)}el.textContent=c},30);cObs.unobserve(el)}})},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>cObs.observe(el));

// ── MASKS & VALIDATION ──
// Phone mask: (00) 00000-0000
function maskFone(el){
  let v=el.value.replace(/\D/g,'');
  if(v.length>11)v=v.slice(0,11);
  if(v.length>6)v=v.replace(/^(\d{2})(\d{5})(\d)/,'($1) $2-$3');
  else if(v.length>2)v=v.replace(/^(\d{2})(\d)/,'($1) $2');
  else if(v.length>0)v=v.replace(/^(\d)/,'($1');
  el.value=v;
}

// Currency mask: R$ 1.234.567
function maskMoeda(el){
  let v=el.value.replace(/\D/g,'');
  if(v.length>12)v=v.slice(0,12);
  if(v.length===0){el.value='';return}
  v=parseInt(v,10).toString();
  v=v.replace(/(\d)(?=(\d{3})+$)/g,'$1.');
  el.value='R$ '+v;
}
function parseMoeda(el){
  if(!el)return 0;
  return parseInt(el.value.replace(/\D/g,''),10)||0;
}

// Validators — set fg state and return bool
function setFg(el,state,msg){
  const fg=el.closest('.fg');if(!fg)return;
  const icon=fg.querySelector('.vicon');
  const hint=fg.querySelector('.hint');
  fg.classList.remove('valid','invalid');
  if(state==='valid'){fg.classList.add('valid');if(icon)icon.textContent='✓';if(hint)hint.textContent=msg||''}
  else if(state==='invalid'){fg.classList.add('invalid');if(icon)icon.textContent='✕';if(hint)hint.textContent=msg||''}
  else{if(icon)icon.textContent='';if(hint)hint.textContent=msg||''}
  checkSubmitState();
}

function vNome(el){
  const v=el.value.trim();
  if(v.length===0){setFg(el,'','Mínimo 3 caracteres');return false}
  if(v.length<3){setFg(el,'invalid','Mínimo 3 caracteres');return false}
  if(!/^[A-Za-zÀ-ÿ\s'.-]+$/.test(v)){setFg(el,'invalid','Use apenas letras');return false}
  setFg(el,'valid','');return true;
}

function vEmail(el){
  const v=el.value.trim();
  if(v.length===0){setFg(el,'','Use seu email profissional');return false}
  const re=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if(!re.test(v)){setFg(el,'invalid','Email inválido');return false}
  setFg(el,'valid','');return true;
}

function vFone(el){
  const raw=el.value.replace(/\D/g,'');
  if(raw.length===0){setFg(el,'','Formato: (00) 00000-0000');return true}// optional
  if(raw.length<10||raw.length>11){setFg(el,'invalid','Número incompleto');return false}
  setFg(el,'valid','');return true;
}

// Submit gating — enable/disable buttons
function checkSubmitState(){
  // Modal
  const mn=document.getElementById('m-nome');
  const me=document.getElementById('m-email');
  const mb=document.getElementById('btn-modal');
  if(mn&&me&&mb){
    const nOk=mn.value.trim().length>=3&&/^[A-Za-zÀ-ÿ\s'.-]+$/.test(mn.value.trim());
    const eOk=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(me.value.trim());
    mb.disabled=!(nOk&&eOk);
  }
  // Inline
  const dn=document.getElementById('di-nome');
  const de=document.getElementById('di-email');
  const db=document.getElementById('btn-inline');
  if(dn&&de&&db){
    const nOk=dn.value.trim().length>=3&&/^[A-Za-zÀ-ÿ\s'.-]+$/.test(dn.value.trim());
    const eOk=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(de.value.trim());
    db.disabled=!(nOk&&eOk);
  }
}

// ── MODAL ──
function openModal(){
  if(window.plausible)plausible('CTA-Demo');
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow='hidden';
  // Reset states
  document.querySelectorAll('#modal .fg').forEach(fg=>{fg.classList.remove('valid','invalid');const h=fg.querySelector('.hint');const ic=fg.querySelector('.vicon');if(h)h.textContent='';if(ic)ic.textContent=''});
  document.getElementById('btn-modal').disabled=true;
}
function closeModal(){document.getElementById('modal').classList.remove('open');document.body.style.overflow=''}

function submitModal(){
  const nOk=vNome(document.getElementById('m-nome'));
  const eOk=vEmail(document.getElementById('m-email'));
  const fOk=vFone(document.getElementById('m-fone'));
  if(!nOk||!eOk||!fOk)return;
  closeModal();
  toast('Demonstração solicitada! Retornamos em até 2h.');
}

function submitInline(){
  const nOk=vNome(document.getElementById('di-nome'));
  const eOk=vEmail(document.getElementById('di-email'));
  const fOk=vFone(document.getElementById('di-fone'));
  if(!nOk||!eOk||!fOk)return;
  toast('Demonstração solicitada! Retornamos em até 2h.');
}

// ── TOAST ──
function toast(msg){const t=document.getElementById('toast-el');document.getElementById('toast-msg').textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),4000)}

/* ═══════════════════════════════════════════════════════════════
   FEATURE 1: CONTADOR DE DESPERDÍCIO
   ═══════════════════════════════════════════════════════════════ */
function initWasteTicker(){
  const el=document.getElementById('waste-amount');
  if(!el)return;
  // R$47/min avg waste for companies without ERP (based on retrabalho stats)
  const perSecond=47/60;
  const start=Date.now();
  const baseDaily=47*60*8; // 8h workday
  function tick(){
    const elapsed=(Date.now()-start)/1000;
    const total=baseDaily+elapsed*perSecond;
    el.textContent='R$ '+total.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
    requestAnimationFrame(tick);
  }
  tick();
}
function closeWaste(){
  const bar=document.querySelector('.waste-bar');
  if(bar){bar.style.display='none';sessionStorage.setItem('waste-closed','1');}
}
if(!sessionStorage.getItem('waste-closed'))document.addEventListener('DOMContentLoaded',initWasteTicker);

/* ═══════════════════════════════════════════════════════════════
   FEATURE 2: MAPA DE CALOR DO ECOSSISTEMA
   ═══════════════════════════════════════════════════════════════ */
const ecoModules=[
  {id:'crm',name:'CRM',perms:70,cat:'vendas',x:450,y:80},
  {id:'clientes',name:'Clientes',perms:4,cat:'vendas',x:320,y:40},
  {id:'fornecedores',name:'Fornecedores',perms:4,cat:'vendas',x:580,y:40},
  {id:'vendas',name:'Vendas',perms:4,cat:'vendas',x:450,y:150},
  {id:'financeiro',name:'Financeiro',perms:32,cat:'financeiro',x:150,y:200},
  {id:'contas',name:'Contas Bancárias',perms:17,cat:'financeiro',x:50,y:130},
  {id:'contabil',name:'Contabilidade',perms:12,cat:'financeiro',x:80,y:280},
  {id:'fiscal',name:'Fiscal',perms:5,cat:'financeiro',x:220,y:280},
  {id:'aprovacoes',name:'Aprovações',perms:7,cat:'financeiro',x:150,y:350},
  {id:'func',name:'Funcionários',perms:9,cat:'pessoas',x:700,y:200},
  {id:'dept',name:'Departamentos',perms:4,cat:'pessoas',x:820,y:130},
  {id:'tickets',name:'Tickets',perms:5,cat:'pessoas',x:800,y:260},
  {id:'checklists',name:'Checklists',perms:7,cat:'pessoas',x:700,y:330},
  {id:'contratos',name:'Contratos',perms:5,cat:'pessoas',x:850,y:330},
  {id:'projetos',name:'Projetos',perms:4,cat:'pessoas',x:750,y:400},
  {id:'servicos',name:'Gestão de Serviços',perms:7,cat:'pessoas',x:600,y:370},
  {id:'workflows',name:'Workflows',perms:4,cat:'plataforma',x:350,y:400},
  {id:'integ',name:'Integrações',perms:3,cat:'plataforma',x:450,y:450},
  {id:'bi',name:'BI com IA',perms:6,cat:'plataforma',x:550,y:450},
  {id:'relatorios',name:'Relatórios',perms:36,cat:'plataforma',x:300,y:470},
  {id:'chat',name:'Chat',perms:12,cat:'plataforma',x:450,y:320},
  {id:'estoque',name:'Estoque',perms:2,cat:'plataforma',x:200,y:430}
];
const ecoLinks=[
  ['crm','clientes'],['crm','vendas'],['crm','fornecedores'],['crm','chat'],
  ['financeiro','contas'],['financeiro','contabil'],['financeiro','fiscal'],['financeiro','aprovacoes'],
  ['financeiro','relatorios'],['financeiro','bi'],['contabil','fiscal'],['contabil','relatorios'],
  ['func','dept'],['func','tickets'],['func','checklists'],['func','contratos'],
  ['projetos','tickets'],['projetos','checklists'],['projetos','servicos'],
  ['servicos','checklists'],['servicos','contratos'],['servicos','chat'],
  ['workflows','aprovacoes'],['workflows','tickets'],['workflows','chat'],
  ['bi','relatorios'],['bi','financeiro'],['bi','crm'],
  ['chat','crm'],['chat','tickets'],['integ','workflows'],['integ','bi'],
  ['estoque','vendas'],['estoque','financeiro'],['vendas','financeiro'],
  ['relatorios','crm'],['relatorios','func']
];
const ecoCatColors={vendas:'#3B82F6',financeiro:'#f97c2b',pessoas:'#8B5CF6',plataforma:'#EC4899'};

function initEcoMap(){
  const wrap=document.getElementById('eco-svg');
  if(!wrap)return;
  const svg=wrap;
  const tooltip=document.getElementById('eco-tip');
  const modMap={};ecoModules.forEach(m=>modMap[m.id]=m);

  // Draw links
  ecoLinks.forEach(([a,b])=>{
    const ma=modMap[a],mb=modMap[b];
    const line=document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1',ma.x);line.setAttribute('y1',ma.y);
    line.setAttribute('x2',mb.x);line.setAttribute('y2',mb.y);
    line.setAttribute('class','eco-link');
    line.setAttribute('data-from',a);line.setAttribute('data-to',b);
    line.setAttribute('stroke',ecoCatColors[ma.cat]);
    svg.appendChild(line);
  });

  // Draw nodes
  ecoModules.forEach(m=>{
    const g=document.createElementNS('http://www.w3.org/2000/svg','g');
    g.setAttribute('class','eco-node');g.setAttribute('data-id',m.id);
    const sz=Math.max(50,Math.sqrt(m.perms)*18);
    const rect=document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('class','eco-node-bg');
    rect.setAttribute('x',m.x-sz/2);rect.setAttribute('y',m.y-16);
    rect.setAttribute('width',sz);rect.setAttribute('height',32);
    rect.setAttribute('rx','12');rect.setAttribute('fill',ecoCatColors[m.cat]);
    g.appendChild(rect);
    const txt=document.createElementNS('http://www.w3.org/2000/svg','text');
    txt.setAttribute('x',m.x);txt.setAttribute('y',m.y+1);
    txt.setAttribute('text-anchor','middle');txt.setAttribute('dominant-baseline','middle');
    txt.textContent=m.name;txt.setAttribute('class','');
    txt.style.fontSize=sz>70?'11px':'9px';txt.style.fill='#fff';txt.style.fontFamily="'Outfit',sans-serif";txt.style.fontWeight='600';
    g.appendChild(txt);
    const cnt=document.createElementNS('http://www.w3.org/2000/svg','text');
    cnt.setAttribute('x',m.x);cnt.setAttribute('y',m.y+16);
    cnt.setAttribute('text-anchor','middle');cnt.setAttribute('class','eco-count');
    cnt.textContent=m.perms+' perm';cnt.style.fontSize='8px';cnt.style.fill='rgba(255,255,255,.6)';cnt.style.fontFamily="'JetBrains Mono',monospace";
    g.appendChild(cnt);

    g.addEventListener('mouseenter',()=>{
      // Highlight connections
      document.querySelectorAll('.eco-link').forEach(l=>{
        if(l.dataset.from===m.id||l.dataset.to===m.id)l.classList.add('active');
        else l.classList.remove('active');
      });
      // Find connected modules
      const connected=[];
      ecoLinks.forEach(([a,b])=>{
        if(a===m.id)connected.push(modMap[b].name);
        if(b===m.id)connected.push(modMap[a].name);
      });
      // Show tooltip
      tooltip.innerHTML='<h4>'+m.name+'</h4><div class="eco-perms">'+m.perms+' permissões granulares</div><div class="eco-conns">Conecta com: '+connected.join(', ')+'</div>';
      tooltip.classList.add('show');
      const rect=wrap.getBoundingClientRect();
      tooltip.style.left=Math.min(m.x*(rect.width/900),rect.width-240)+'px';
      tooltip.style.top=(m.y*(rect.height/500)-80)+'px';
    });
    g.addEventListener('mouseleave',()=>{
      document.querySelectorAll('.eco-link').forEach(l=>l.classList.remove('active'));
      tooltip.classList.remove('show');
    });
    svg.appendChild(g);
  });
}
document.addEventListener('DOMContentLoaded',initEcoMap);

/* ═══════════════════════════════════════════════════════════════
   FEATURE 3: SIMULADOR DE OPERAÇÃO (sandbox)
   ═══════════════════════════════════════════════════════════════ */
const sandboxFlows={
  financeiro:{
    sidebar:['Dashboard','Lançamentos','Contas a Pagar','Contas a Receber','Conciliação'],
    steps:[
      {title:'Dashboard Financeiro',type:'kpis',kpis:[
        {val:'R$ 284.500',lbl:'Receita Mensal'},{val:'R$ 198.200',lbl:'Despesas'},{val:'R$ 86.300',lbl:'Lucro Líquido'},{val:'30,3%',lbl:'Margem'}
      ],chart:[65,72,58,80,75,90,85,92,78,88,95,82]},
      {title:'Novo Lançamento',type:'form',fields:['Descrição: Pagamento fornecedor ABC','Valor: R$ 12.500,00','Categoria: Fornecedores','Conta: Itaú Empresarial','Status: Pendente aprovação']},
      {title:'Aprovação Automática',type:'flow',steps:['✅ Lançamento criado','🔄 Workflow disparado','👤 Enviado para aprovador','✅ Aprovado automaticamente (< R$15k)','💸 Pagamento agendado']},
      {title:'Conciliação Bancária',type:'table',headers:['Data','Descrição','Valor','Match'],rows:[
        ['24/03','PIX Fornecedor ABC','-R$ 12.500','✅ Conciliado'],
        ['23/03','Recebimento Cliente XYZ','+R$ 8.900','✅ Conciliado'],
        ['22/03','Tarifa bancária','-R$ 45,90','⚠️ Pendente'],
        ['21/03','Transferência entre contas','-R$ 25.000','✅ Conciliado']
      ]}
    ]
  },
  crm:{
    sidebar:['Pipeline','Leads','Atividades','Relatórios','Automações'],
    steps:[
      {title:'Pipeline de Vendas',type:'kpis',kpis:[
        {val:'147',lbl:'Leads Ativos'},{val:'R$ 1.2M',lbl:'Pipeline Total'},{val:'23',lbl:'Propostas Enviadas'},{val:'68%',lbl:'Taxa Conversão'}
      ],chart:[30,45,38,52,48,65,58,70,62,75,80,72]},
      {title:'Novo Lead Capturado',type:'flow',steps:['📥 Lead via formulário do site','🤖 IA classifica: Score 8.5/10','🏷️ Tag automática: Enterprise','👤 Atribuído para vendedor','📧 Email de boas-vindas enviado']},
      {title:'Histórico do Lead',type:'table',headers:['Data','Ação','Canal','Status'],rows:[
        ['24/03','Abriu proposta','Email','🟢 Ativo'],
        ['22/03','Demonstração realizada','Reunião','✅ Concluído'],
        ['20/03','Primeiro contato','WhatsApp','✅ Respondeu'],
        ['18/03','Formulário preenchido','Site','✅ Capturado']
      ]},
      {title:'Relatório Inteligente',type:'kpis',kpis:[
        {val:'3,2 dias',lbl:'Tempo Médio Resposta'},{val:'R$ 52k',lbl:'Ticket Médio'},{val:'12',lbl:'Fechamentos/Mês'},{val:'+34%',lbl:'vs. Mês Anterior'}
      ],chart:[40,55,48,62,58,75,68,80,72,85,90,95]}
    ]
  },
  bi:{
    sidebar:['Dashboards','IA Insights','Relatórios','Alertas','Exportar'],
    steps:[
      {title:'Dashboard BI com IA',type:'kpis',kpis:[
        {val:'22',lbl:'Módulos Ativos'},{val:'1.247',lbl:'Registros Hoje'},{val:'99,98%',lbl:'Uptime'},{val:'3',lbl:'Alertas IA'}
      ],chart:[88,92,85,95,90,93,91,96,89,94,97,95]},
      {title:'Insights Gerados por IA',type:'flow',steps:['🧠 Análise: Inadimplência subiu 12% em março','📊 Causa provável: 3 clientes com atraso > 60 dias','💡 Sugestão: Enviar cobrança automatizada via WhatsApp','📈 Impacto estimado: Recuperação de R$ 34.200','✅ Workflow criado automaticamente']},
      {title:'Relatórios Disponíveis',type:'table',headers:['Relatório','Módulo','Última Geração','IA'],rows:[
        ['DRE Mensal','Contabilidade','24/03/2026','🤖 Sim'],
        ['Pipeline Vendas','CRM','24/03/2026','🤖 Sim'],
        ['Fluxo de Caixa','Financeiro','23/03/2026','—'],
        ['Produtividade','Operações','22/03/2026','🤖 Sim']
      ]},
      {title:'Alerta Inteligente',type:'flow',steps:['🚨 Anomalia detectada pela IA','📉 Queda de 18% no faturamento vs. projeção','🔍 Análise: 2 contratos pausados + sazonalidade','📋 Ações sugeridas: Reativar contratos, ajustar projeção','📩 Notificação enviada para gestores']}
    ]
  }
};

function initSandbox(){
  try{
  const wrap=document.getElementById('sandbox-body');
  if(!wrap)return;
  const sidebar=document.getElementById('sand-nav');
  const content=document.getElementById('sand-main');
  if(!sidebar||!content)return;
  let currentFlow='financeiro';
  let currentStep=0;

  function render(){
    const flow=sandboxFlows[currentFlow];
    if(!flow||!flow.steps||!flow.sidebar)return;
    sidebar.innerHTML=flow.sidebar.map((s,i)=>'<a class="'+(i===currentStep?'active':'')+'" onclick="sandboxStep('+i+')">'+['📊','📝','💰','📥','🔄','📈','🤖','📋'][i%8]+' '+s+'</a>').join('');
    const step=flow.steps[currentStep];
    if(!step)return;
    let html='<div class="sand-step active"><h3>'+step.title+'</h3>';
    if(step.type==='kpis'){
      html+='<div class="sand-kpi-row">';
      step.kpis.forEach(k=>html+='<div class="sand-kpi"><div class="val">'+k.val+'</div><div class="lbl">'+k.lbl+'</div></div>');
      html+='</div>';
      if(step.chart){
        const max=Math.max(...step.chart);
        html+='<div class="sand-mini-chart">';
        step.chart.forEach((v,i)=>html+='<span style="height:'+((v/max)*100)+'%;animation-delay:'+(i*0.05)+'s;background:'+(i===step.chart.length-1?'#3B82F6':'var(--teal)')+'"></span>');
        html+='</div>';
      }
    }else if(step.type==='form'){
      html+='<div style="display:flex;flex-direction:column;gap:10px">';
      step.fields.forEach((f,i)=>{
        const[label,val]=f.split(': ');
        html+='<div style="animation:sandFadeIn .4s ease '+(i*.1)+'s backwards"><span style="font-size:.75rem;color:var(--muted);font-weight:600">'+label+'</span><div style="padding:8px 12px;border:1px solid var(--border);border-radius:8px;font-size:.85rem;margin-top:4px;background:var(--bg)">'+val+'</div></div>';
      });
      html+='</div>';
    }else if(step.type==='flow'){
      step.steps.forEach((s,i)=>html+='<div style="padding:10px 14px;border-left:2px solid var(--teal);margin-left:16px;margin-bottom:8px;font-size:.83rem;animation:sandFadeIn .4s ease '+(i*.15)+'s backwards">'+s+'</div>');
    }else if(step.type==='table'){
      html+='<table class="sand-table"><thead><tr>';
      step.headers.forEach(h=>html+='<th>'+h+'</th>');
      html+='</tr></thead><tbody>';
      step.rows.forEach((r,i)=>{html+='<tr style="animation:sandFadeIn .3s ease '+(i*.08)+'s backwards">';r.forEach(c=>html+='<td>'+c+'</td>');html+='</tr>';});
      html+='</tbody></table>';
    }
    // Navigation
    html+='<div class="sand-nav-row">';
    html+='<button onclick="sandboxStep('+(currentStep-1)+')" '+(currentStep===0?'disabled style="opacity:.3"':'')+'>← Anterior</button>';
    html+='<div class="step-dots">';
    flow.steps.forEach((_,i)=>html+='<span class="'+(i===currentStep?'active':'')+'"></span>');
    html+='</div>';
    html+='<button class="primary" onclick="sandboxStep('+(currentStep+1)+')" '+(currentStep===flow.steps.length-1?'disabled style="opacity:.3"':'')+'>Próximo →</button>';
    html+='</div></div>';
    content.innerHTML=html;
  }

  window.sandboxStep=function(i){
    const flow=sandboxFlows[currentFlow];
    if(i<0||i>=flow.steps.length)return;
    currentStep=i;render();
  };
  window.sandboxFlow=function(f){
    currentFlow=f;currentStep=0;
    document.querySelectorAll('.sand-picker button').forEach(b=>b.classList.toggle('active',b.dataset.flow===f));
    const urlEl=document.querySelector('.sand-url');if(urlEl)urlEl.textContent='app.ruphus.app/'+f;
    render();
  };
  render();
  }catch(e){console.error('Sandbox init error:',e)}
}
document.addEventListener('DOMContentLoaded',initSandbox);

/* ═══════════════════════════════════════════════════════════════
   FEATURE 4: DIAGNÓSTICO COM IA
   ═══════════════════════════════════════════════════════════════ */
const diagQuestions=[
  {q:'Quantas empresas ou unidades você gerencia?',opts:['1 a 5','6 a 20','21 a 50','Mais de 50']},
  {q:'Qual seu maior gargalo hoje?',opts:['Financeiro/Cobrança','Comunicação interna','Relatórios e dados','Gestão de equipe','Múltiplos sistemas']},
  {q:'Quantas ferramentas diferentes usa para gerenciar?',opts:['1 a 2','3 a 5','6 a 10','Mais de 10']},
  {q:'Qual área mais consome seu tempo?',opts:['Financeiro','CRM/Vendas','Operações','Contabilidade/Fiscal','TI/Integrações']},
  {q:'Qual seu faturamento mensal aproximado?',opts:['Até R$ 50k','R$ 50k a R$ 200k','R$ 200k a R$ 1M','Acima de R$ 1M']}
];
const diagModuleMap={
  'Financeiro/Cobrança':['Financeiro','Contas Bancárias','Aprovações','Contabilidade'],
  'Comunicação interna':['Chat','Tickets','Workflows','CRM'],
  'Relatórios e dados':['BI com IA','Relatórios','Contabilidade','Fiscal'],
  'Gestão de equipe':['Funcionários','Departamentos','Checklists','Projetos'],
  'Múltiplos sistemas':['Integrações','Workflows','BI com IA','Chat'],
  'Financeiro':['Financeiro','Contas Bancárias','Contabilidade','Fiscal','Aprovações'],
  'CRM/Vendas':['CRM','Clientes','Vendas','Fornecedores'],
  'Operações':['Gestão de Serviços','Checklists','Contratos','Projetos'],
  'Contabilidade/Fiscal':['Contabilidade','Fiscal','Relatórios','BI com IA'],
  'TI/Integrações':['Integrações','Workflows','BI com IA','Estoque']
};

function initDiag(){
  const chat=document.getElementById('diag-chat');
  if(!chat)return;
  let step=0;const answers=[];

  function addMsg(text,isBot,options){
    const div=document.createElement('div');
    div.className='diag-msg '+(isBot?'bot':'user');
    let html='';
    if(isBot)html+='<div class="diag-avatar">🤖</div>';
    html+='<div class="diag-bubble">'+text;
    if(options){
      html+='<div class="diag-options">';
      options.forEach(o=>html+='<button onclick="diagAnswer(\''+o.replace(/'/g,"\\'")+'\')">'+o+'</button>');
      html+='</div>';
    }
    html+='</div>';
    div.innerHTML=html;
    chat.appendChild(div);
    chat.scrollTop=chat.scrollHeight;
  }

  function showTyping(){
    const div=document.createElement('div');
    div.className='diag-msg bot';div.id='diag-typing';
    div.innerHTML='<div class="diag-avatar">🤖</div><div class="diag-bubble"><div class="diag-typing"><span></span><span></span><span></span></div></div>';
    chat.appendChild(div);
    chat.scrollTop=chat.scrollHeight;
  }
  function removeTyping(){const t=document.getElementById('diag-typing');if(t)t.remove();}

  function showResult(){
    const gargalo=answers[1];const area=answers[3];
    const tools=parseInt(answers[2])||3;

    // Try AI-powered diagnostic first
    fetch('/api/diagnostico',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({answers:answers})
    })
    .then(r=>{if(!r.ok)throw new Error('API '+r.status);return r.json()})
    .then(ai=>{
      if(ai.error)throw new Error(ai.error);
      renderAIResult(ai);
    })
    .catch(()=>{
      // Fallback to local scoring
      const modSet=new Set([...(diagModuleMap[gargalo]||[]),...(diagModuleMap[area]||[])]);
      const score=Math.min(95,50+modSet.size*4+tools*2);
      renderAIResult({
        score:score,
        analise:'Com base nas suas respostas, identificamos oportunidades significativas de otimização. Seu gargalo principal ('+gargalo+') e a área que mais consome tempo ('+area+') podem ser resolvidos com os módulos certos.',
        modulos:Array.from(modSet),
        economia_mensal:tools>5?'R$ 15.000':'R$ 7.900',
        economia_anual:tools>5?'R$ 180.000':'R$ 95.000',
        horas_recuperadas:tools>5?'48':'24',
        quick_wins:['Automatizar cobrança via WhatsApp Z-API','Centralizar dados em uma só plataforma','Dashboard de indicadores com BI em tempo real'],
        risco:'Cada mês sem otimização é receita perdida e retrabalho acumulado.'
      });
    });
  }

  function renderAIResult(ai){
    const result=document.getElementById('diag-result');
    const stEl=document.getElementById('diag-steps');if(stEl)stEl.textContent='Concluído ✓';
    result.style.display='block';
    result.innerHTML=
      '<div class="diag-r-header">'+
        '<div class="diag-r-score"><div class="diag-r-num">'+ai.score+'</div><div class="diag-r-of">/100</div></div>'+
        '<div class="diag-r-label">Potencial de otimização</div>'+
      '</div>'+
      '<p class="diag-r-analise">'+ai.analise+'</p>'+
      '<div class="diag-r-metrics">'+
        '<div class="diag-r-m"><div class="diag-r-mv">'+ai.economia_mensal+'</div><div class="diag-r-ml">economia/mês</div></div>'+
        '<div class="diag-r-m"><div class="diag-r-mv">'+ai.economia_anual+'</div><div class="diag-r-ml">economia/ano</div></div>'+
        '<div class="diag-r-m"><div class="diag-r-mv">'+ai.horas_recuperadas+'h</div><div class="diag-r-ml">recuperadas/mês</div></div>'+
      '</div>'+
      '<div class="diag-r-section"><strong>Módulos recomendados</strong><div class="diag-r-mods">'+
        ai.modulos.map(function(m){return '<span>'+m+'</span>'}).join('')+
      '</div></div>'+
      '<div class="diag-r-section"><strong>Resultados em 30 dias</strong><ul class="diag-r-wins">'+
        ai.quick_wins.map(function(w){return '<li><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#f97c2b" stroke-width="2.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>'+w+'</li>'}).join('')+
      '</ul></div>'+
      '<div class="diag-r-risk">⚠️ '+ai.risco+'</div>'+
      '<div class="diag-r-actions">'+
        '<button class="btn btn-t" onclick="openModal()">Agendar demonstração personalizada →</button>'+
        '<button class="btn btn-ol" onclick="diagShareWA()">Enviar resultado via WhatsApp</button>'+
      '</div>';
    
    if(window.plausible)plausible('Diagnostic-Complete',{props:{score:String(ai.score)}});
  }

  window.diagShareWA=function(){
    var r=document.getElementById('diag-result');
    if(!r)return;
    var score=r.querySelector('.diag-r-num');
    var eco=r.querySelector('.diag-r-mv');
    var msg='Fiz o diagnóstico gratuito do Ruphus ERP!\n\n';
    msg+='Score: '+(score?score.textContent:'--')+'/100\n';
    msg+='Economia estimada: '+(eco?eco.textContent:'--')+'/mês\n\n';
    msg+='Faça o seu em: https://newruphus.vercel.app/#diagnostico';
    window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank');
  };

  window.diagAnswer=function(answer){
    // Remove option buttons from last message
    document.querySelectorAll('.diag-options').forEach(o=>o.remove());
    addMsg(answer,false);
    answers.push(answer);
    step++;
    const stEl=document.getElementById('diag-steps');if(stEl)stEl.textContent='Etapa '+Math.min(step,5)+'/5';

    if(step<diagQuestions.length){
      showTyping();
      setTimeout(()=>{removeTyping();addMsg(diagQuestions[step].q,true,diagQuestions[step].opts);},800);
    }else{
      showTyping();
      if(stEl)stEl.textContent='Analisando...';
      setTimeout(()=>{removeTyping();addMsg('Analisando suas respostas com IA...',true);showResult();},1200);
    }
  };

  // Start
  setTimeout(()=>addMsg('Olá! Sou o assistente de diagnóstico do Ruphus. Vou fazer 5 perguntas rápidas para entender sua operação e recomendar os módulos ideais. Vamos lá?',true,['Sim, vamos!']),500);
  window.diagStart=function(){
    step=0;answers.length=0;
    chat.innerHTML='';
    document.getElementById('diag-result').style.display='none';
    setTimeout(()=>addMsg(diagQuestions[0].q,true,diagQuestions[0].opts),600);
  };
}
document.addEventListener('DOMContentLoaded',initDiag);

/* ═══════════════════════════════════════════════════════════════
   FEATURE 5: RADAR DE MATURIDADE DIGITAL
   ═══════════════════════════════════════════════════════════════ */
const radarAxes=['Financeiro','Operacional','Comercial','Contábil','Tecnológico','Pessoas'];
const radarModuleSuggestions={
  Financeiro:['Financeiro','Contas Bancárias','Aprovações'],
  Operacional:['Workflows','Checklists','Gestão de Serviços'],
  Comercial:['CRM','Vendas','Clientes'],
  Contábil:['Contabilidade','Fiscal','Relatórios'],
  Tecnológico:['BI com IA','Integrações','Chat'],
  Pessoas:['Funcionários','Departamentos','Projetos']
};

function initRadar(){
  const canvas=document.getElementById('radar-canvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const values=[5,5,5,5,5,5];

  function draw(){
    const W=canvas.width=300,H=canvas.height=300;
    const cx=W/2,cy=H/2,R=110;
    ctx.clearRect(0,0,W,H);

    // Grid
    for(let ring=1;ring<=5;ring++){
      const r=R*ring/5;
      ctx.beginPath();
      for(let i=0;i<=6;i++){
        const a=Math.PI*2*i/6-Math.PI/2;
        const x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.closePath();
      ctx.strokeStyle='rgba(128,128,128,.15)';ctx.lineWidth=1;ctx.stroke();
    }

    // Axes
    for(let i=0;i<6;i++){
      const a=Math.PI*2*i/6-Math.PI/2;
      ctx.beginPath();ctx.moveTo(cx,cy);
      ctx.lineTo(cx+R*Math.cos(a),cy+R*Math.sin(a));
      ctx.strokeStyle='rgba(128,128,128,.1)';ctx.stroke();
      // Labels
      const lx=cx+(R+25)*Math.cos(a),ly=cy+(R+25)*Math.sin(a);
      ctx.fillStyle=getComputedStyle(document.body).getPropertyValue('--fg')||'#1a1a2e';
      ctx.font='600 11px Outfit,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(radarAxes[i],lx,ly);
    }

    // Data polygon
    ctx.beginPath();
    for(let i=0;i<6;i++){
      const a=Math.PI*2*i/6-Math.PI/2;
      const r=R*values[i]/10;
      const x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.closePath();
    ctx.fillStyle='rgba(249,124,43,.15)';ctx.fill();
    ctx.strokeStyle='#f97c2b';ctx.lineWidth=2.5;ctx.stroke();

    // Data points
    for(let i=0;i<6;i++){
      const a=Math.PI*2*i/6-Math.PI/2;
      const r=R*values[i]/10;
      ctx.beginPath();ctx.arc(cx+r*Math.cos(a),cy+r*Math.sin(a),4,0,Math.PI*2);
      ctx.fillStyle='#f97c2b';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
    }

    // Score
    const avg=values.reduce((a,b)=>a+b,0)/6;
    document.getElementById('radar-score').textContent=avg.toFixed(1);
    document.getElementById('radar-level').textContent=avg<4?'Iniciante':avg<6?'Em desenvolvimento':avg<8?'Avançado':'Líder digital';

    // Gaps
    const gapsEl=document.getElementById('radar-gaps');
    const sorted=radarAxes.map((a,i)=>({name:a,val:values[i]})).sort((a,b)=>a.val-b.val);
    gapsEl.innerHTML='<h4>Maiores gaps</h4>'+sorted.slice(0,3).map(g=>
      '<div class="radar-gap-item"><span class="gap-dot" style="background:'+(g.val<4?'#E8634A':g.val<7?'#f5a623':'#f97c2b')+'"></span><span>'+g.name+': '+g.val+'/10</span><span style="margin-left:auto;font-size:.72rem;color:var(--teal)">→ '+radarModuleSuggestions[g.name][0]+'</span></div>'
    ).join('');
  }

  document.querySelectorAll('.radar-slider').forEach((slider,i)=>{
    slider.addEventListener('input',()=>{
      values[i]=parseInt(slider.value);
      document.getElementById('rv-'+i).textContent=slider.value;
      draw();
    });
  });
  draw();
}
document.addEventListener('DOMContentLoaded',initRadar);

/* ═══════════════════════════════════════════════════════════════
   FEATURE 6: CALCULADORA TCO
   ═══════════════════════════════════════════════════════════════ */
function initTCO(){
  const form=document.getElementById('tco-form');
  if(!form)return;
  let year=1;

  function calc(){
    const users=parseInt(document.getElementById('tco-users').value)||10;
    const tools=parseInt(document.getElementById('tco-tools').value)||5;
    const hrs=parseInt(document.getElementById('tco-hours').value)||20;
    const salary=parseInt(document.getElementById('tco-salary').value)||5000;

    const hrlyCost=salary/176;
    const multipliers=[1,1,1]; // year 1,2,3

    const results=multipliers.map((_,yr)=>{
      const m=yr+1;
      // Current scenario (multiple tools)
      const toolsCost=tools*300*users*12*m; // avg R$300/tool/user/mo
      const implCost=yr===0?tools*5000:0;
      const trainCost=yr===0?tools*users*500:tools*users*100;
      const wasteCost=hrs*hrlyCost*users*52*m;
      const totalCurrent=toolsCost+implCost+trainCost+wasteCost;

      // Ruphus
      const ruphusCost=users*150*12*m; // R$150/user/mo
      const ruphusImpl=yr===0?8000:0;
      const ruphusTrain=yr===0?users*200:0;
      const ruphusWaste=hrs*0.3*hrlyCost*users*52*m; // 70% reduction
      const totalRuphus=ruphusCost+ruphusImpl+ruphusTrain+ruphusWaste;

      return{current:totalCurrent,ruphus:totalRuphus,saving:totalCurrent-totalRuphus};
    });

    const r=results[year-1];
    const maxVal=Math.max(r.current,r.ruphus);
    document.getElementById('tco-bar-current').style.width=(r.current/maxVal*100)+'%';
    document.getElementById('tco-bar-current').style.background='#E8634A';
    document.getElementById('tco-val-current').textContent='R$ '+(r.current/1000).toFixed(0)+'k';
    document.getElementById('tco-bar-ruphus').style.width=(r.ruphus/maxVal*100)+'%';
    document.getElementById('tco-bar-ruphus').style.background='#f97c2b';
    document.getElementById('tco-val-ruphus').textContent='R$ '+(r.ruphus/1000).toFixed(0)+'k';
    document.getElementById('tco-saving').textContent='R$ '+(r.saving/1000).toFixed(0)+'k';
    document.getElementById('tco-pct').textContent=((r.saving/r.current)*100).toFixed(0)+'% de economia em '+year+(year===1?' ano':' anos');
  }

  window.tcoYear=function(y){
    year=y;
    document.querySelectorAll('.tco-year-tabs button').forEach(b=>b.classList.toggle('active',parseInt(b.dataset.y)===y));
    calc();
  };

  form.querySelectorAll('input,select').forEach(el=>el.addEventListener('input',calc));
  calc();
}
document.addEventListener('DOMContentLoaded',initTCO);

/* ═══════════════════════════════════════════════════════════════
   FEATURE 7: SIMULADOR SEMANA COM vs SEM ERP
   ═══════════════════════════════════════════════════════════════ */
const weekData={
  sem:[
    {day:'Segunda',tasks:[
      {time:'8:00',icon:'📊',name:'Abrir 4 planilhas diferentes',dur:'45min',type:'pain'},
      {time:'9:00',icon:'📧',name:'Responder 23 emails de cobrança manualmente',dur:'1h30',type:'pain'},
      {time:'11:00',icon:'💬',name:'Cobrar equipe pelo WhatsApp',dur:'40min',type:'pain'},
      {time:'14:00',icon:'📝',name:'Conferir lançamentos em 3 sistemas',dur:'2h',type:'pain'}
    ]},
    {day:'Terça',tasks:[
      {time:'8:00',icon:'🏦',name:'Conciliar extrato bancário no Excel',dur:'2h',type:'pain'},
      {time:'10:30',icon:'📞',name:'Ligar para clientes inadimplentes',dur:'1h30',type:'pain'},
      {time:'14:00',icon:'📋',name:'Preencher relatório manualmente',dur:'1h45',type:'pain'}
    ]},
    {day:'Quarta',tasks:[
      {time:'8:00',icon:'📊',name:'Gerar DRE manualmente no Excel',dur:'3h',type:'pain'},
      {time:'11:30',icon:'🔍',name:'Procurar documento em pastas',dur:'45min',type:'pain'},
      {time:'14:00',icon:'📧',name:'Reenviar boletos manualmente',dur:'1h20',type:'pain'}
    ]},
    {day:'Quinta',tasks:[
      {time:'8:00',icon:'👥',name:'Reunião para alinhar informações',dur:'1h30',type:'pain'},
      {time:'10:00',icon:'📝',name:'Corrigir erros de digitação em planilhas',dur:'2h',type:'pain'},
      {time:'14:00',icon:'📊',name:'Consolidar dados de múltiplas fontes',dur:'2h30',type:'pain'}
    ]},
    {day:'Sexta',tasks:[
      {time:'8:00',icon:'📋',name:'Fechar mês: juntar planilhas',dur:'4h',type:'pain'},
      {time:'14:00',icon:'📧',name:'Enviar relatórios por email',dur:'1h',type:'pain'},
      {time:'16:00',icon:'😩',name:'Descobrir erro e refazer tudo',dur:'2h',type:'pain'}
    ]}
  ],
  com:[
    {day:'Segunda',tasks:[
      {time:'8:00',icon:'📊',name:'Dashboard atualizado automaticamente',dur:'5min',type:'gain'},
      {time:'8:10',icon:'🤖',name:'IA: 3 alertas de inadimplência',dur:'10min',type:'gain'},
      {time:'8:30',icon:'✅',name:'Aprovar 12 lançamentos em lote',dur:'15min',type:'gain'},
      {time:'9:00',icon:'💡',name:'Tempo livre: planejar estratégia',dur:'Livre',type:'gain'}
    ]},
    {day:'Terça',tasks:[
      {time:'8:00',icon:'🏦',name:'Conciliação automática (97% match)',dur:'10min',type:'gain'},
      {time:'8:15',icon:'📱',name:'Cobranças automáticas via WhatsApp',dur:'0min',type:'gain'},
      {time:'8:30',icon:'📈',name:'Relatório BI gerado por IA',dur:'2min',type:'gain'}
    ]},
    {day:'Quarta',tasks:[
      {time:'8:00',icon:'📊',name:'DRE gerado automaticamente',dur:'1min',type:'gain'},
      {time:'8:05',icon:'🔍',name:'Busca inteligente: documento em 3s',dur:'1min',type:'gain'},
      {time:'8:10',icon:'✅',name:'Boletos enviados por workflow',dur:'0min',type:'gain'}
    ]},
    {day:'Quinta',tasks:[
      {time:'8:00',icon:'💬',name:'Chat interno: alinhamento em 5min',dur:'5min',type:'gain'},
      {time:'8:10',icon:'🤖',name:'Zero erros: validação automática',dur:'0min',type:'gain'},
      {time:'8:15',icon:'📊',name:'Dados consolidados em 1 clique',dur:'2min',type:'gain'}
    ]},
    {day:'Sexta',tasks:[
      {time:'8:00',icon:'📋',name:'Fechamento automático do mês',dur:'15min',type:'gain'},
      {time:'8:20',icon:'📧',name:'Relatórios agendados enviados',dur:'0min',type:'gain'},
      {time:'8:30',icon:'🎯',name:'Sexta livre para crescer o negócio',dur:'Livre',type:'gain'}
    ]}
  ]
};

function initWeekSim(){
  const tl=document.getElementById('week-timeline');
  if(!tl)return;
  let mode='sem';

  function render(){
    const data=weekData[mode];
    let totalHrs=0;
    tl.innerHTML='';
    data.forEach((d,di)=>{
      let dayHtml='<div class="week-day" style="animation-delay:'+(di*.1)+'s"><div class="week-day-label">'+d.day+'<small>'+(20+di)+'/03</small></div><div class="week-tasks">';
      d.tasks.forEach((t,ti)=>{
        const mins=t.dur==='Livre'?0:parseInt(t.dur)||0;
        if(t.dur.includes('h')){
          const parts=t.dur.match(/(\d+)h\s*(\d*)/);
          if(parts)totalHrs+=(parseInt(parts[1])||0)+(parseInt(parts[2])||0)/60;
        }else{totalHrs+=mins/60;}
        dayHtml+='<div class="week-task '+(t.type)+'" style="animation-delay:'+((di*.1)+(ti*.06))+'s"><span class="task-time">'+t.time+'</span><span class="task-icon">'+t.icon+'</span><span class="task-name">'+t.name+'</span><span class="task-dur">'+t.dur+'</span></div>';
      });
      dayHtml+='</div></div>';
      tl.innerHTML+=dayHtml;
    });
    // Summary
    const sumEl=document.getElementById('week-summary');
    if(mode==='sem'){
      sumEl.innerHTML='<div class="week-summary-card"><div class="val" style="color:#E8634A">~'+totalHrs.toFixed(0)+'h</div><div class="lbl">Horas gastas na semana</div></div><div class="week-summary-card"><div class="val" style="color:#E8634A">5+</div><div class="lbl">Ferramentas diferentes</div></div><div class="week-summary-card"><div class="val" style="color:#E8634A">Alto</div><div class="lbl">Risco de erro humano</div></div>';
    }else{
      sumEl.innerHTML='<div class="week-summary-card"><div class="val" style="color:#f97c2b">~1h</div><div class="lbl">Horas gastas na semana</div></div><div class="week-summary-card"><div class="val" style="color:#f97c2b">1</div><div class="lbl">Plataforma integrada</div></div><div class="week-summary-card"><div class="val" style="color:#f97c2b">Zero</div><div class="lbl">Erros manuais</div></div>';
    }
  }

  window.weekMode=function(m){
    mode=m;
    document.querySelectorAll('.week-toggle-pill button').forEach(b=>b.classList.toggle('active',b.dataset.mode===m));
    render();
  };
  render();
}
document.addEventListener('DOMContentLoaded',initWeekSim);

/* ═══════════════════════════════════════════════════════════════
   FEATURE 8: STATUS DA PLATAFORMA
   ═══════════════════════════════════════════════════════════════ */
function initStatus(){
  const bars=document.getElementById('status-bars');
  if(!bars)return;
  // Simulate 30 days of uptime
  const days=[];
  for(let i=29;i>=0;i--){
    const d=new Date();d.setDate(d.getDate()-i);
    const uptime=Math.random()>0.03?100:(95+Math.random()*4.9);
    days.push({date:d,uptime:uptime});
  }
  bars.innerHTML='';
  days.forEach(d=>{
    const bar=document.createElement('div');
    bar.className='day-bar '+(d.uptime===100?'up':d.uptime>99?'partial':'down');
    bar.style.height=(d.uptime/100*100)+'%';
    bar.title=d.date.toLocaleDateString('pt-BR')+': '+d.uptime.toFixed(2)+'%';
    bars.appendChild(bar);
  });
  // Calculate metrics
  const avgUptime=days.reduce((s,d)=>s+d.uptime,0)/days.length;
  document.getElementById('status-uptime').textContent=avgUptime.toFixed(2)+'%';
  document.getElementById('status-response').textContent=(80+Math.random()*40).toFixed(0)+'ms';
  document.getElementById('status-deploys').textContent=(14+Math.floor(Math.random()*6))+'';
}
document.addEventListener('DOMContentLoaded',initStatus);

/* ═══════════════════════════════════════════════════════════════
   FLUXO FINANCEIRO — detalhe interativo
   ═══════════════════════════════════════════════════════════════ */
const ffDetails=[
  {title:'📥 Lançamento Financeiro',steps:['Criação manual ou automática via contrato','Categorização por plano de contas','Anexo de comprovantes e NFs','Agendamento de pagamento/recebimento']},
  {title:'🏦 Conciliação Bancária',steps:['Importação de extrato OFX/CSV','Match automático (97% de acurácia)','Alertas para divergências','Conciliação em lote']},
  {title:'✅ Fluxo de Aprovação',steps:['Regras por valor e departamento','Aprovador substituto automático','Notificação por email e chat','Histórico completo de decisões']},
  {title:'💸 Execução de Pagamento',steps:['Geração de Pix ou boleto','Agendamento em lote','Comprovante automático anexado','Baixa no financeiro em tempo real']},
  {title:'📊 Mapa Contábil',steps:['Regra configura débito/crédito','Lançamento contábil gerado automaticamente','Sem digitação dupla','Rastreabilidade total: financeiro ↔ contábil']},
  {title:'📋 Mapa de Rateio',steps:['Critérios: fração ideal, área, fixo','Distribuição automática por centro de custo','Demonstrativo para prestação de contas','Histórico comparativo mensal']},
  {title:'🧾 Gestão Fiscal',steps:['Emissão de NF-e via NFe.io','Cancelamento e carta de correção','Planejamento tributário básico','Relatórios fiscais por período']},
  {title:'📈 DRE e Balancete',steps:['Geração automática mensal','Comparativo com período anterior','Exportação PDF e Excel','Análise de tendências por IA']},
  {title:'🧠 BI com Inteligência Artificial',steps:['Detecção de anomalias em receita/despesa','Previsão de fluxo de caixa (30/60/90 dias)','Insights de inadimplência','Alertas proativos para gestores']},
  {title:'📱 Cobrança Automatizada',steps:['Régua via WhatsApp: lembrete → cobrança → segunda via','Escalonamento por dias de atraso','Personalização por perfil de cliente','Relatório de recuperação de crédito']}
];
window.showFFDetail=function(i){
  const el=document.getElementById('ff-detail');
  if(!el)return;
  const d=ffDetails[i];
  el.innerHTML='<h4>'+d.title+'</h4><div class="ff-steps">'+d.steps.map((s,j)=>'<div class="ff-st" style="animation:sandFadeIn .3s ease '+(j*.08)+'s backwards"><span style="font-weight:700;color:var(--teal)">'+(j+1)+'.</span> '+s+'</div>').join('')+'</div>';
  el.classList.add('show');
  document.querySelectorAll('.ff-node').forEach((n,j)=>n.classList.toggle('active',j===i));
  el.scrollIntoView({behavior:'smooth',block:'nearest'});
};

/* ═══════════════════════════════════════════════════════════════
   CENÁRIOS REAIS — tab switching
   ═══════════════════════════════════════════════════════════════ */
window.showCase=function(i,btn){
  document.querySelectorAll('.case-panel').forEach(p=>p.classList.remove('show'));
  document.querySelectorAll('.case-tabs button').forEach(b=>b.classList.remove('active'));
  const panel=document.getElementById('case-'+i);
  if(panel)panel.classList.add('show');
  if(btn)btn.classList.add('active');
};

/* ═══════════════════════════════════════════════════════════════
   NEWSLETTER SUBSCRIBE
   ═══════════════════════════════════════════════════════════════ */
function subNews(){
  const el=document.getElementById('news-email');
  if(!el)return;
  const v=el.value.trim();
  if(!v||!v.includes('@')||!v.includes('.')){
    el.style.borderColor='#E8634A';
    setTimeout(()=>el.style.borderColor='',1500);
    return;
  }
  const msg=encodeURIComponent('Olá! Quero receber a newsletter do Ruphus. Meu email: '+v);
  window.open('https://wa.me/5511948680554?text='+msg,'_blank');
  if(window.plausible)plausible('Newsletter-Subscribe');
  el.value='';
  el.placeholder='Inscrição enviada ✓';
}

/* ═══════════════════════════════════════════════════════════════
   EXIT-INTENT POPUP
   ═══════════════════════════════════════════════════════════════ */
(function(){
  if(sessionStorage.getItem('exit-shown'))return;
  
  var overlay=document.createElement('div');
  overlay.className='exit-overlay';
  overlay.innerHTML='<div class="exit-popup">'+
    '<button class="exit-close" onclick="this.parentElement.parentElement.classList.remove(\'show\')" aria-label="Fechar">✕</button>'+
    '<h3>Antes de ir...</h3>'+
    '<p>Faça um diagnóstico gratuito da sua operação em 2 minutos e descubra quanto está perdendo por mês.</p>'+
    '<div class="exit-benefits">'+
    '<div class="exit-ben"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>5 perguntas rápidas</div>'+
    '<div class="exit-ben"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>Módulos recomendados por IA</div>'+
    '<div class="exit-ben"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>Economia estimada em 12 meses</div>'+
    '</div>'+
    '<button class="btn btn-t btn-lg" style="width:100%" onclick="this.parentElement.parentElement.classList.remove(\'show\');document.getElementById(\'diagnostico\')&&document.getElementById(\'diagnostico\').scrollIntoView({behavior:\'smooth\'})">Fazer diagnóstico gratuito →</button>'+
    '<div style="text-align:center;margin-top:12px"><button style="background:none;border:none;color:var(--muted);font-size:.75rem;cursor:pointer" onclick="this.closest(\'.exit-overlay\').classList.remove(\'show\')">Não, obrigado</button></div>'+
    '</div>';
  document.body.appendChild(overlay);
  
  overlay.addEventListener('click',function(e){
    if(e.target===overlay)overlay.classList.remove('show');
  });
  
  document.addEventListener('mouseout',function(e){
    if(e.clientY<5 && !sessionStorage.getItem('exit-shown')){
      overlay.classList.add('show');
      sessionStorage.setItem('exit-shown','1');
    }
  });
})();

/* ═══════════════════════════════════════════════════════════════
   SIMULADOR MONTE SEU ERP
   ═══════════════════════════════════════════════════════════════ */
function toggleSim(el){
  el.classList.toggle('active');
  var mods=document.querySelectorAll('.sim-mod.active');
  var count=mods.length;
  var perms=0;var names=[];
  mods.forEach(function(m){perms+=parseInt(m.dataset.p)||0;names.push(m.dataset.m);});
  var days=count<=3?5:count<=8?10:count<=15?15:20;
  var apis=Math.round(count*3.2);
  var empty=document.getElementById('sim-empty');
  var content=document.getElementById('sim-content');
  if(count>0){
    if(empty)empty.style.display='none';
    if(content)content.style.display='block';
    document.getElementById('sim-count').textContent=count;
    document.getElementById('sim-perms').textContent=perms;
    document.getElementById('sim-time').textContent=days+'d';
    document.getElementById('sim-apis').textContent=apis+'+';
    var bar=document.getElementById('sim-bar');
    if(bar)bar.style.width=Math.round(count/22*100)+'%';
    var barLabel=document.getElementById('sim-bar-label');
    if(barLabel)barLabel.textContent=count+' de 22';
    var list=document.getElementById('sim-mods-list');
    if(list)list.innerHTML=names.map(function(n){return '<span>'+n+'</span>'}).join('');
  }else{
    if(empty)empty.style.display='flex';
    if(content)content.style.display='none';
  }
  // Update group toggle button text
  el.closest('.sim-group-mods')&&updateGroupBtn(el.closest('.sim-group-mods'));
  if(window.plausible&&count>0)plausible('Simulator-Config',{props:{modules:String(count)}});
}
function toggleGroup(btn,group){
  var mods=document.querySelector('[data-group="'+group+'"]').querySelectorAll('.sim-mod');
  var allActive=true;
  mods.forEach(function(m){if(!m.classList.contains('active'))allActive=false;});
  mods.forEach(function(m){
    if(allActive&&m.classList.contains('active'))m.click();
    if(!allActive&&!m.classList.contains('active'))m.click();
  });
}
function updateGroupBtn(groupEl){
  var mods=groupEl.querySelectorAll('.sim-mod');
  var active=groupEl.querySelectorAll('.sim-mod.active').length;
  var btn=groupEl.previousElementSibling.querySelector('.sim-group-toggle');
  if(btn)btn.textContent=active===mods.length?'Remover':'Selecionar';
}

/* ═══════════════════════════════════════════════════════════════
   CALCULADORA CUSTO DO RETRABALHO
   ═══════════════════════════════════════════════════════════════ */
function calcRetrabalho(){
  var funcEl=document.getElementById('ret-func');
  if(!funcEl)return;
  var func=parseInt(funcEl.value)||10;
  var sal=parseMoeda(document.getElementById('ret-sal'))||3500;
  var tools=parseInt(document.getElementById('ret-tools').value)||3;
  var hrs=parseInt(document.getElementById('ret-hrs').value)||10;
  
  var custoHora=sal/176;
  var custoMes=Math.round(func*hrs*4.33*custoHora*(1+(tools-1)*0.15));
  var custoAno=custoMes*12;
  var eco=Math.round(custoAno*0.75);
  
  var fmt=function(v){return'R$ '+v.toLocaleString('pt-BR')};
  document.getElementById('ret-custo-mes').textContent=fmt(custoMes);
  document.getElementById('ret-custo-ano').textContent=fmt(custoAno);
  document.getElementById('ret-eco').textContent=fmt(eco);
}
document.addEventListener('DOMContentLoaded',calcRetrabalho);



/* ═══════════════════════════════════════════════════════════════
   ROADMAP — voting + filtering
   ═══════════════════════════════════════════════════════════════ */
function voteFeature(btn){
  if(btn.classList.contains('voted')){
    btn.classList.remove('voted');
    var c=btn.querySelector('.vote-count');
    c.textContent=parseInt(c.textContent)-1;
  }else{
    btn.classList.add('voted');
    var c=btn.querySelector('.vote-count');
    c.textContent=parseInt(c.textContent)+1;
  }
}
function filterRoadmap(btn,status){
  btn.parentElement.querySelectorAll('.bc-cat').forEach(function(b){b.classList.remove('on')});
  btn.classList.add('on');
  document.querySelectorAll('.rm-vote-card').forEach(function(card){
    if(status==='all'||card.dataset.status===status){
      card.classList.remove('hidden');
    }else{
      card.classList.add('hidden');
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   BLOG ARTICLE READER
   ═══════════════════════════════════════════════════════════════ */
var blogArticles=[
{t:"Selic a 15% e IPCA em queda: o que muda para a gestão financeira das empresas em 2026",c:"Economia",body:"<p>Com a taxa básica de juros em 15% ao ano — a mais alta desde 2023 — o custo do crédito permanece elevado para empresas brasileiras. Mas a inflação acumulada em 12 meses caiu para 3,81%, sinalizando que o ciclo de aperto monetário pode estar próximo do fim.</p><h2>O que o Boletim Focus projeta</h2><p>O consenso do mercado aponta Selic em 12,50% até dezembro de 2026 e IPCA em 4,17%. Isso significa que o custo de capital deve começar a ceder no segundo semestre, abrindo janela para renegociação de dívidas e novos investimentos.</p><h2>Impacto direto na gestão</h2><p>Para empresas que dependem de crédito para capital de giro, cada ponto percentual a menos na Selic representa economia real. Um ERP com projeção de fluxo de caixa por IA — como o Ruphus — permite simular cenários de juros e antecipar o momento ideal para investir.</p><blockquote>Empresas que automatizam o financeiro tomam decisões 3x mais rápido quando o cenário muda.</blockquote><p>O módulo financeiro do Ruphus já integra dados de mercado para alertar quando o custo de oportunidade de manter caixa parado supera o custo de investir. Isso transforma o ERP de ferramenta operacional em instrumento estratégico.</p>"},
{t:"78% das empresas brasileiras já usam IA na gestão — e o ROI médio é de 3,7x",c:"Gestão",body:"<p>Pesquisas recentes mostram que a adoção de inteligência artificial na gestão empresarial brasileira saiu da fase de experimentação para implantações em escala. CRM inteligente, automação contábil e análise preditiva de inadimplência lideram os casos de uso.</p><h2>Onde a IA mais gera retorno</h2><p>Os três maiores ROIs estão em: previsão de inadimplência (redução de 40-60% em perdas), automação de lançamentos contábeis (economia de 70% do tempo) e qualificação automática de leads (aumento de 35% na taxa de conversão).</p><h2>O diferencial do Ruphus</h2><p>Enquanto a maioria dos ERPs oferece IA como add-on pago, o Ruphus é AI-first: cada módulo tem inteligência nativa. O Model Router seleciona automaticamente o modelo mais eficiente (Claude, GPT ou Gemini) para cada tarefa, gerando 30-40% de economia em custos de IA.</p><blockquote>IA não é funcionalidade extra — é a forma como o sistema pensa.</blockquote>"},
{t:"Agentes autônomos e MCPs: como a IA vai se conectar direto ao seu ERP em 2026",c:"Tecnologia",body:"<p>Os Model Context Protocols (MCPs) representam uma mudança fundamental na forma como IA interage com sistemas empresariais. Em vez de o usuário pedir para a IA fazer algo, agentes autônomos executam ações diretamente dentro de ERPs, CRMs e ferramentas de gestão.</p><h2>Como funciona na prática</h2><p>Um agente pode receber a instrução 'verifique todas as faturas vencidas e envie cobrança por WhatsApp', acessar o módulo financeiro via MCP, identificar os devedores, gerar as mensagens personalizadas e disparar — tudo sem intervenção humana.</p><h2>O Ruphus já implementa isso</h2><p>O AI Tool Framework do Ruphus permite que agentes executem ações reais no sistema: buscar leads, criar atividades, consultar saldo, gerar relatórios. Cada ferramenta tem validação Zod, verificação de permissão e cache configurável.</p><blockquote>O futuro não é usar IA — é deixar a IA usar o ERP.</blockquote>"},
{t:"Dólar estável a R$ 5,40 por 13 semanas: o que isso sinaliza para importações e custos",c:"Economia",body:"<p>A estabilidade cambial reflete o diferencial de juros entre Brasil e EUA e a disciplina fiscal recente. Para empresas que importam insumos ou têm custos dolarizados, é uma janela de previsibilidade rara no cenário brasileiro.</p><h2>Oportunidade para planejamento</h2><p>Com câmbio estável, o planejamento orçamentário ganha precisão. Empresas podem travar custos, negociar contratos de longo prazo e reduzir hedging. O módulo de orçamento do Ruphus permite criar cenários com câmbio fixo e variável para comparação.</p><h2>Risco no horizonte</h2><p>Movimentos do Fed podem alterar fluxos de capital para emergentes a qualquer momento. Ter um ERP com projeção financeira integrada permite reagir rapidamente se o cenário mudar.</p>"},
{t:"Mercado global de IA ultrapassa US$ 300 bilhões em 2026",c:"Internacional",body:"<p>Segundo a IDC, o mercado global de inteligência artificial ultrapassou US$ 300 bilhões em 2026, impulsionado por agentes autônomos e personalização de modelos. Empresas brasileiras correm para se posicionar na América Latina.</p><h2>Brasil no contexto global</h2><p>O mercado brasileiro de IA cresce 25% ao ano, com foco em fintechs, ERPs e automação de processos. A adoção de modelos multi-provider (como o Model Router do Ruphus) está se tornando padrão para otimizar custos e garantir disponibilidade.</p><blockquote>Empresas que adotam IA multi-provider economizam 30-40% em custos sem perda de qualidade.</blockquote>"},
{t:"O ERP invisível: como plataformas que se integram ao fluxo substituem sistemas legados",c:"Gestão",body:"<p>A tendência é clara: ERPs que exigem treinamento extenso perdem espaço para plataformas que se adaptam ao processo, não o contrário. Workflows de agentes e MCPs aceleram essa transição.</p><h2>O que define um ERP invisível</h2><p>Um ERP invisível é aquele que automatiza sem que o usuário perceba: cobrança dispara sozinha, lançamento contábil é gerado automaticamente, alertas chegam antes do problema. O usuário interage apenas quando precisa tomar uma decisão.</p><p>O Ruphus implementa isso com 9 Cloud Functions serverless que rodam automaticamente: reajuste de contratos, reconciliação de pipeline, sincronização de busca, sequências de e-mail e verificação de saúde do WhatsApp.</p>"},
{t:"BI com IA: por que dashboards estáticos morreram e o que os substitui em 2026",c:"Tecnologia",body:"<p>Dashboards que apenas mostram números estão sendo substituídos por sistemas que identificam anomalias, geram insights proativos e recomendam ações — sem que ninguém precise construir um relatório.</p><h2>Como o BI do Ruphus funciona</h2><p>O módulo de BI usa React Grid Layout para dashboards customizáveis com drag-and-drop. Widgets de linha, barra, área, pizza, KPI e tabela se atualizam em tempo real. A IA analisa os dados e sugere anomalias e tendências automaticamente.</p><blockquote>O melhor relatório é aquele que ninguém precisou pedir — ele chega antes da pergunta.</blockquote>"},
{t:"Fed, BCE e juros globais: como o cenário externo impacta o custo de capital no Brasil",c:"Internacional",body:"<p>O diferencial de juros entre Brasil e EUA sustenta o câmbio estável, mas movimentos do Fed podem alterar fluxos de capital para emergentes a qualquer momento.</p><h2>Impacto no financeiro das PMEs</h2><p>Quando o Fed sinaliza corte, capital flui para emergentes, o real se valoriza e importações ficam mais baratas. Quando sinaliza alta, o oposto acontece. Ter visibilidade do fluxo de caixa projetado permite antecipar essas mudanças.</p><p>O copilot financeiro do Ruphus detecta automaticamente faturas vencidas, pagamentos próximos e alertas de risco — contextualizando com o cenário macroeconômico.</p>"},
{t:"Conciliação bancária automática: como reduzir de 2 horas para 10 minutos",c:"Finanças",body:"<p>O match automático com extrato OFX/CSV alcança 97% de acurácia. O restante recebe alertas inteligentes para revisão manual, eliminando erros de digitação e horas de conferência.</p><h2>Como funciona a conciliação smart</h2><p>O Ruphus oferece dois níveis: conciliação básica (match por valor e data) e conciliação smart (ML com tolerâncias de data, variações de centavos e agrupamentos). O SLA de conciliação alerta quando itens ficam pendentes por mais de N dias.</p><h2>Integração com Open Banking</h2><p>Com a integração direta via API do Banco Central (BB, Bradesco, Caixa, Itaú, Santander), o extrato é sincronizado automaticamente — sem precisar importar arquivo manualmente.</p>"},
{t:"Checklists por contrato: como eliminar o retrabalho em vistorias e manutenções",c:"Operações",body:"<p>Rotinas digitalizadas com evidências fotográficas, progresso em tempo real e histórico por cliente. 7 permissões granulares garantem controle sem burocracia.</p><h2>IA sugere templates por segmento</h2><p>Ao criar um checklist para um nicho específico (contabilidade, e-commerce, saúde), a IA sugere automaticamente uma lista de tarefas baseada no segmento. Reduz de 30 minutos de configuração para 30 segundos.</p><p>Os checklists do Ruphus são vinculados a clientes e contratos, permitindo rastreamento completo da execução com atribuição em lote para múltiplos clientes.</p>"},
{t:"Firebase Security Rules na prática: como o Ruphus isola dados entre empresas",c:"Segurança",body:"<p>Cada tenant vê apenas seus dados — garantido no nível do banco de dados, não da aplicação. Firestore Security Rules + Custom Claims do Firebase Auth verificam membership em todas as operações de leitura e escrita.</p><h2>40+ permissões por módulo</h2><p>O sistema de permissões do Ruphus vai além de leitura/escrita. Cada módulo tem permissões granulares para criar, editar, deletar, aprovar, exportar e configurar. Um vendedor pode ver oportunidades mas não aprovar pagamentos.</p><blockquote>Segurança por design significa que mesmo um bug na aplicação não expõe dados de outro tenant.</blockquote>"},
{t:"Mapa Contábil e Rateio: como automatizar a escrituração sem ser contador",c:"Gestão",body:"<p>Configure regras uma vez — cada lançamento financeiro gera automaticamente o lançamento contábil correspondente. Sem digitação dupla, sem erro humano.</p><h2>Sugestão automática por IA</h2><p>A funcionalidade mais inovadora: ao lançar uma transação, a IA sugere a conta contábil correta usando embeddings semânticos (OpenAI + Pinecone) + histórico da empresa. Se a confiança for menor que 70%, escalona para refinamento com Claude.</p><p>Escritórios contábeis que processam centenas de lançamentos diários eliminam a digitação manual da conta contábil. O sistema aprende com o próprio histórico.</p>"},
{t:"Inadimplência no Brasil: por que a cobrança automatizada recupera 52% mais receita",c:"Economia",body:"<p>Dados reais de operações que migraram de cobrança manual para régua inteligente via WhatsApp mostram redução consistente na inadimplência. O timing e a personalização fazem toda a diferença.</p><h2>Como funciona a régua do Ruphus</h2><p>A régua de cobrança automatizada dispara mensagens via Z-API em momentos estratégicos: lembrete 3 dias antes, notificação no vencimento, cobrança 7 dias depois, escalação 15 dias depois. Cada mensagem é personalizada com nome, valor e link de pagamento Pix.</p><blockquote>A diferença entre 14% e 5,8% de inadimplência é uma régua bem configurada — não mais cobradores.</blockquote>"},
{t:"Workflows no-code: como automatizar aprovações, alertas e processos sem desenvolvedor",c:"Produto",body:"<p>Regras do tipo 'se valor > R$ 5.000, enviar para aprovação do diretor' são criadas em minutos. Integração nativa com todos os 22 módulos.</p><h2>Builder visual</h2><p>O Ruphus oferece um builder visual de automações com triggers (eventos de leads, oportunidades, contratos, tickets), condições compostas (E/OU) e ações múltiplas (notificar, criar tarefa, mudar status, enviar e-mail/WhatsApp).</p><p>A aprovação por link tokenizado permite que gestores aprovem pagamentos via e-mail sem acessar o sistema — algo que grandes ERPs cobram como módulo separado.</p>"},
{t:"ERPs multi-tenant na América Latina: por que o modelo SaaS supera o on-premise",c:"Internacional",body:"<p>O mercado latino-americano de ERPs cresce 18% ao ano. Empresas que migraram para cloud reportam 60% menos custo de TI e 3x mais velocidade de implantação.</p><h2>Vantagens do multi-tenant</h2><p>Infraestrutura compartilhada reduz custos, atualizações são automáticas e a escalabilidade é elástica. O isolamento de dados é garantido por Firestore Security Rules — cada empresa opera em universo separado.</p><p>O Ruphus é implantado em 1-10 dias úteis contra 1-3 meses de um ERP enterprise tradicional. A diferença está na arquitetura cloud-native.</p>"},
{t:"De 22 ferramentas para 1 plataforma: o caso real de uma administradora com 85 condomínios",c:"Gestão",body:"<p>Como a consolidação de sistemas reduziu o fechamento mensal de 12 para 2 dias e liberou 40 horas/mês da equipe financeira.</p><h2>O problema</h2><p>A administradora usava 5 sistemas diferentes: um para financeiro, outro para cobrança, planilhas para rateio, WhatsApp pessoal para comunicação e banco para conciliação manual. Cada sistema com seu login, formato e limitações.</p><h2>A solução</h2><p>Migração para o Ruphus com 8 módulos: Financeiro, Contabilidade, Contas Bancárias, Aprovações, Chat, Relatórios, CRM e Integrações. Cobrança automatizada via WhatsApp Z-API reduziu inadimplência de 14% para 5,8%.</p><blockquote>O fechamento que levava 12 dias agora leva 2. A equipe parou de digitar e começou a analisar.</blockquote>"},
{t:"Quanto custa um ERP para PME em 2026",c:"Economia",body:"<p>O verdadeiro custo de um ERP não é a mensalidade — é o retrabalho de não ter. Comparamos o investimento real incluindo licença, implantação, treinamento e manutenção.</p><h2>Composição do custo</h2><p>Um ERP enterprise típico custa R$ 3.000-15.000/mês + implantação de R$ 50.000-200.000. Um ERP simplificado custa R$ 200-500/mês mas não cobre contabilidade, aprovações ou BI. O Ruphus oferece preço por módulo sem pacote forçado.</p><h2>O custo de NÃO ter ERP</h2><p>Uma empresa com 10 funcionários que gasta 10h/semana em retrabalho perde R$ 8.000-15.000/mês em produtividade. Somado à inadimplência por cobrança manual e erros contábeis, o custo invisível supera qualquer mensalidade de ERP.</p>"},
{t:"ERP na nuvem vs ERP local: qual escolher em 2026",c:"Tecnologia",body:"<p>Cloud vence em custo, velocidade e segurança na maioria dos cenários. Mas há situações onde on-premise ainda faz sentido.</p><h2>Vantagens do cloud</h2><p>Zero investimento em infraestrutura, atualizações automáticas, acesso de qualquer lugar, escalabilidade elástica e backups gerenciados. O Ruphus roda em Vercel + Firebase com CDN global e 99.9% de uptime.</p><h2>Quando on-premise faz sentido</h2><p>Regulações específicas de setores (defesa, saúde com dados sensíveis), latência ultrabaixa para operações industriais, ou empresas com infraestrutura própria já amortizada. Para PMEs brasileiras, cloud é a escolha padrão.</p>"},
{t:"Como migrar de planilhas para um ERP sem dor",c:"Gestão",body:"<p>O passo a passo real: backup, mapeamento, importação, validação paralela e go-live. Com checklist de 12 etapas.</p><h2>Os 12 passos</h2><p>1. Backup de todas as planilhas. 2. Mapear processos atuais. 3. Definir módulos prioritários. 4. Configurar ambiente. 5. Importar cadastros (clientes, fornecedores). 6. Importar histórico financeiro. 7. Configurar permissões. 8. Treinar equipe. 9. Operação paralela (3 dias). 10. Validar dados. 11. Go-live. 12. Monitoramento 30 dias.</p><blockquote>A equipe Ruphus cuida da migração completa. Você continua operando enquanto preparamos tudo.</blockquote>"},
{t:"7 erros ao escolher um ERP para sua empresa",c:"Gestão",body:"<p>De escolher pelo preço a ignorar integrações — os erros que custam meses de retrabalho.</p><h2>Os 7 erros</h2><p>1. Escolher só pelo preço (o barato sai caro). 2. Ignorar integrações (WhatsApp, bancos, NF-e). 3. Não testar com dados reais antes de contratar. 4. Subestimar o treinamento da equipe. 5. Contratar todos os módulos de uma vez. 6. Não verificar a frequência de atualizações. 7. Ignorar segurança e isolamento de dados.</p><p>O Ruphus resolve cada um: demonstração com dados reais, 15+ integrações nativas, treinamento incluído, módulos sob demanda, atualizações semanais e Firestore Security Rules.</p>"},
{t:"Como a IA muda a gestão financeira: projeções, alertas e automação",c:"Produto",body:"<p>Fluxo de caixa preditivo, sugestão de pagamentos e cobrança inteligente. O financeiro que avisa antes de acontecer.</p><h2>3 mudanças concretas</h2><p>1. Projeção de fluxo de caixa com IA: combina histórico, recebíveis, pagáveis e sazonalidade para prever saldos futuros. 2. Sugestão de pagamentos: analisa vencimentos, saldo e descontos para recomendar a sequência ideal. 3. Alertas automáticos: saldo projetado negativo, saída incomum, padrão atípico.</p><blockquote>O financeiro deixa de ser reativo (o que aconteceu?) e passa a ser preditivo (o que vai acontecer?).</blockquote>"},
{t:"Open Banking para empresas: como funciona e por que importa",c:"Economia",body:"<p>Extrato automático de 5 bancos, conciliação em 10 minutos e fim dos scrapers. O que muda com a API do Banco Central.</p><h2>Bancos suportados</h2><p>O Ruphus integra diretamente com Banco do Brasil, Bradesco, Caixa, Itaú e Santander via API oficial do Open Banking regulatório brasileiro. Sincronização automática de extratos, atualização de saldo em tempo real e gestão de consentimento.</p><h2>Diferença para scrapers</h2><p>Scrapers de terceiros violam termos de uso e podem quebrar a qualquer momento. A API do Banco Central é regulada, segura e com webhooks para atualizações imediatas. Retry automático com backoff exponencial garante disponibilidade.</p>"}
];

function openArticle(idx){
  var a=blogArticles[idx];if(!a)return;
  var reader=document.getElementById('article-reader');
  if(!reader){
    reader=document.createElement('div');
    reader.id='article-reader';
    reader.className='article-reader';
    document.body.appendChild(reader);
  }
  reader.innerHTML='<button class="ar-close" onclick="closeArticle()">✕</button>'+
    '<div class="ar-body">'+
    '<a href="/blog" style="font-size:.78rem;color:var(--teal);display:inline-flex;align-items:center;gap:4px;margin-bottom:20px">← Voltar ao blog</a>'+
    '<span class="ar-tag">'+a.c+'</span>'+
    '<h1>'+a.t+'</h1>'+
    '<div class="ar-meta"><span>Mar 2026</span><span>·</span><span>8 min de leitura</span></div>'+
    a.body+
    '<div class="ar-cta"><p>Quer ver como isso funciona na prática?</p><button class="btn btn-t btn-lg" onclick="closeArticle();openModal()">Agendar demonstração gratuita →</button></div>'+
    '</div>';
  reader.classList.add('open');
  document.body.style.overflow='hidden';
  history.pushState({article:idx},'','/blog#artigo-'+idx);
}
function closeArticle(){
  var r=document.getElementById('article-reader');
  if(r)r.classList.remove('open');
  document.body.style.overflow='';
  history.pushState({},'','/blog');
}
window.addEventListener('popstate',function(){closeArticle()});

document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.ba-card2,.blog-feat').forEach(function(card,i){
    card.style.cursor='pointer';
    card.addEventListener('click',function(e){
      if(e.target.closest('a'))return;
      openArticle(i);
    });
  });
});

/* ═══════════════════════════════════════════════════════════════
   RECURSOS CARDS — click to follow CTA link
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.ec,.ef-card').forEach(function(card){
    var link=card.querySelector('.ec-arr[href],.ef-arrow[href]');
    if(link){
      card.style.cursor='pointer';
      card.addEventListener('click',function(e){
        if(e.target.closest('a'))return;
        link.click();
      });
    }
  });
});

/* ═══════════════════════════════════════════════════════════════
   UX: Reading progress bar
   ═══════════════════════════════════════════════════════════════ */
(function(){
  var bar=document.createElement('div');
  bar.className='progress-bar';
  document.body.prepend(bar);
  var ticking=false;
  window.addEventListener('scroll',function(){
    if(!ticking){
      requestAnimationFrame(function(){
        var scrollTop=window.scrollY;
        var docHeight=document.documentElement.scrollHeight-window.innerHeight;
        var progress=docHeight>0?(scrollTop/docHeight)*100:0;
        bar.style.width=progress+'%';
        bar.classList.toggle('visible',scrollTop>200);
        ticking=false;
      });
      ticking=true;
    }
  });
})();

/* ═══════════════════════════════════════════════════════════════
   UX: Animated counters (count up when visible)
   ═══════════════════════════════════════════════════════════════ */
(function(){
  function animateCounter(el){
    if(el.dataset.counted)return;
    el.dataset.counted='1';
    var text=el.textContent.trim();
    // Extract number and suffix
    var match=text.match(/^([R$\s]*)([0-9.,]+)(.*)$/);
    if(!match)return;
    var prefix=match[1];
    var numStr=match[2].replace(/\./g,'').replace(',','.');
    var suffix=match[3];
    var target=parseFloat(numStr);
    if(isNaN(target)||target===0)return;
    var isDecimal=numStr.indexOf('.')!==-1&&!match[2].includes('.');
    var duration=800;
    var start=performance.now();
    el.textContent=prefix+'0'+suffix;
    function step(now){
      var elapsed=now-start;
      var progress=Math.min(elapsed/duration,1);
      // Ease out cubic
      var eased=1-Math.pow(1-progress,3);
      var current=target*eased;
      if(target>=1000){
        el.textContent=prefix+Math.round(current).toLocaleString('pt-BR')+suffix;
      }else if(isDecimal||target<10){
        el.textContent=prefix+current.toFixed(1)+suffix;
      }else{
        el.textContent=prefix+Math.round(current)+suffix;
      }
      if(progress<1)requestAnimationFrame(step);
      else el.textContent=text; // restore exact original
    }
    requestAnimationFrame(step);
  }
  // Observe elements with count-up class
  if('IntersectionObserver' in window){
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting)animateCounter(e.target);
      });
    },{threshold:0.5});
    document.addEventListener('DOMContentLoaded',function(){
      document.querySelectorAll('.count-up').forEach(function(el){obs.observe(el)});
    });
  }
})();

/* ═══════════════════════════════════════════════════════════════
   UX: Smooth scroll for anchor links
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('click',function(e){
  var a=e.target.closest('a[href^="#"]');
  if(!a)return;
  var id=a.getAttribute('href').slice(1);
  var target=document.getElementById(id);
  if(target){
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth',block:'start'});
  }
});

/* ═══════════════════════════════════════════════════════════════
   UX: Stagger entrance for segment cards
   ═══════════════════════════════════════════════════════════════ */
(function(){
  if(!('IntersectionObserver' in window))return;
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('v');
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
  document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('.seg-scroll .sc').forEach(function(el){obs.observe(el)});
  });
})();
