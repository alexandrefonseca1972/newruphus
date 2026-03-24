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
