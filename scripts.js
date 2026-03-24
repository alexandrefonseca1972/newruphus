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
  document.getElementById('t-ico').textContent=d.classList.contains('dark')?'☾':'☀';
}
(function(){
  if(localStorage.getItem('theme')==='dark'||(!localStorage.getItem('theme')&&matchMedia('(prefers-color-scheme:dark)').matches)){
    document.documentElement.classList.add('dark');
    document.getElementById('t-ico').textContent='☾';
  }
})();

// ── TYPING ──
(function(){const w=['gestão.','operação.','decisão.','cobrança.','contabilidade.'];const el=document.getElementById('typed');let wi=0,ci=0,del=false;
function t(){const word=w[wi];if(!del){ci++;el.textContent=word.slice(0,ci);if(ci===word.length){del=true;setTimeout(t,2200);return}setTimeout(t,90)}else{ci--;el.textContent=word.slice(0,ci);if(ci===0){del=false;wi=(wi+1)%w.length;setTimeout(t,400);return}setTimeout(t,50)}}setTimeout(t,2500)})();

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
  const col=parseInt(document.getElementById('inp-col').value)||0;
  const fat=parseInt(document.getElementById('inp-fat').value)||0;
  const hrs=parseInt(document.getElementById('inp-hrs').value)||0;
  const sys=parseInt(document.getElementById('inp-sys').value)||1;
  document.getElementById('hrs-val').textContent=hrs+'h';
  const custoHrs=hrs*4*55;
  const custoSys=(sys-1)*350;
  const custoRetrabalho=fat*0.012;
  const total=custoHrs+custoSys+custoRetrabalho;
  const eco=Math.max(0,total);
  const ecoYr=eco*12;
  const hrsRecup=Math.round(hrs*0.8);
  document.getElementById('r-custo').textContent='R$ '+Math.round(total).toLocaleString('pt-BR');
  document.getElementById('r-eco').textContent='R$ '+Math.round(eco).toLocaleString('pt-BR');
  document.getElementById('r-eco-yr').textContent='R$ '+Math.round(ecoYr).toLocaleString('pt-BR');
  document.getElementById('r-hrs').textContent=hrsRecup*4+'h';
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
  {id:'servicos',name:'Gestão Serviços',perms:7,cat:'pessoas',x:600,y:370},
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
const ecoCatColors={vendas:'#3B82F6',financeiro:'#0D7C66',pessoas:'#8B5CF6',plataforma:'#EC4899'};

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
  const wrap=document.getElementById('sandbox-body');
  if(!wrap)return;
  let currentFlow='financeiro';
  let currentStep=0;

  function render(){
    const flow=sandboxFlows[currentFlow];
    const sidebar=document.getElementById('sand-nav');
    sidebar.innerHTML=flow.sidebar.map((s,i)=>'<a class="'+(i===currentStep?'active':'')+'" onclick="sandboxStep('+i+')">'+['📊','📝','💰','📥','🔄','📈','🤖','📋'][i%8]+' '+s+'</a>').join('');
    const content=document.getElementById('sand-main');
    const step=flow.steps[currentStep];
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
    document.querySelector('.sand-url').textContent='app.ruphus.app/'+f;
    render();
  };
  render();
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
    const modSet=new Set([...(diagModuleMap[gargalo]||[]),...(diagModuleMap[area]||[])]);
    const score=Math.min(95,50+modSet.size*4+tools*2);
    const savings=tools>5?'R$ 180.000':'R$ 95.000';

    const result=document.getElementById('diag-result');
    result.style.display='block';
    result.innerHTML='<h3>📋 Seu Diagnóstico</h3>'+
      '<div style="text-align:center"><div class="radar-score-big">'+score+'/100</div><div class="radar-score-label">Potencial de otimização com Ruphus</div></div>'+
      '<div style="margin:16px 0"><strong style="font-size:.85rem">Módulos recomendados:</strong><div class="diag-modules-rec">'+
      Array.from(modSet).map(m=>'<span>'+m+'</span>').join('')+'</div></div>'+
      '<div style="font-size:.85rem;margin:12px 0;padding:12px;background:rgba(13,124,102,.05);border-radius:8px">💰 <strong>Economia estimada em 12 meses:</strong> '+savings+'<br><small style="color:var(--muted)">Baseado na redução de '+tools+' ferramentas para 1 plataforma</small></div>'+
      '<button class="diag-report-btn" onclick="openModal()">📄 Agendar demonstração personalizada →</button>';
  }

  window.diagAnswer=function(answer){
    // Remove option buttons from last message
    document.querySelectorAll('.diag-options').forEach(o=>o.remove());
    addMsg(answer,false);
    answers.push(answer);
    step++;

    if(step<diagQuestions.length){
      showTyping();
      setTimeout(()=>{removeTyping();addMsg(diagQuestions[step].q,true,diagQuestions[step].opts);},800);
    }else{
      showTyping();
      setTimeout(()=>{removeTyping();addMsg('Análise concluída! Aqui está seu diagnóstico personalizado:',true);showResult();},1200);
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
    ctx.fillStyle='rgba(13,124,102,.15)';ctx.fill();
    ctx.strokeStyle='#0D7C66';ctx.lineWidth=2.5;ctx.stroke();

    // Data points
    for(let i=0;i<6;i++){
      const a=Math.PI*2*i/6-Math.PI/2;
      const r=R*values[i]/10;
      ctx.beginPath();ctx.arc(cx+r*Math.cos(a),cy+r*Math.sin(a),4,0,Math.PI*2);
      ctx.fillStyle='#0D7C66';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
    }

    // Score
    const avg=values.reduce((a,b)=>a+b,0)/6;
    document.getElementById('radar-score').textContent=avg.toFixed(1);
    document.getElementById('radar-level').textContent=avg<4?'Iniciante':avg<6?'Em desenvolvimento':avg<8?'Avançado':'Líder digital';

    // Gaps
    const gapsEl=document.getElementById('radar-gaps');
    const sorted=radarAxes.map((a,i)=>({name:a,val:values[i]})).sort((a,b)=>a.val-b.val);
    gapsEl.innerHTML='<h4>Maiores gaps</h4>'+sorted.slice(0,3).map(g=>
      '<div class="radar-gap-item"><span class="gap-dot" style="background:'+(g.val<4?'#E8634A':g.val<7?'#f5a623':'#0D7C66')+'"></span><span>'+g.name+': '+g.val+'/10</span><span style="margin-left:auto;font-size:.72rem;color:var(--teal)">→ '+radarModuleSuggestions[g.name][0]+'</span></div>'
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
    document.getElementById('tco-bar-ruphus').style.background='#0D7C66';
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
      sumEl.innerHTML='<div class="week-summary-card"><div class="val" style="color:#0D7C66">~1h</div><div class="lbl">Horas gastas na semana</div></div><div class="week-summary-card"><div class="val" style="color:#0D7C66">1</div><div class="lbl">Plataforma integrada</div></div><div class="week-summary-card"><div class="val" style="color:#0D7C66">Zero</div><div class="lbl">Erros manuais</div></div>';
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
