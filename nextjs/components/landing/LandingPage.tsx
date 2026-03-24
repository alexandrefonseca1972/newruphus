'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export function LandingPage() {
  // ── STATE ──
  const [isDark, setIsDark] = useState(false)
  const [mobOpen, setMobOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [typed, setTyped] = useState('decisão')
  const [bentoTab, setBentoTab] = useState('fin')
  const [activeMod, setActiveMod] = useState(0)
  const [activeEdu, setActiveEdu] = useState('all')
  const [activeFaqCat, setActiveFaqCat] = useState('all')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Calculator
  const [hrsVal, setHrsVal] = useState('10')
  const [rCusto, setRCusto] = useState('R$ 0')
  const [rEco, setREco] = useState('R$ 0')
  const [rEcoYr, setREcoYr] = useState('R$ 0')
  const [rHrs, setRHrs] = useState('0h')

  // Form validation
  const [modalValid, setModalValid] = useState(false)
  const [inlineValid, setInlineValid] = useState(false)

  const counterRef = useRef<HTMLDivElement>(null)

  // ── THEME ──
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme:dark)').matches)) {
      document.documentElement.classList.add('dark')
      setIsDark(true)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const d = document.documentElement
    d.classList.toggle('dark')
    const dark = d.classList.contains('dark')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    setIsDark(dark)
  }, [])

  // ── NAV SCROLL ──
  useEffect(() => {
    const handler = () => {
      document.getElementById('nav')?.classList.toggle('scrolled', scrollY > 40)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // ── REVEAL ──
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('v')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    )
    document.querySelectorAll('[data-r]').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // ── TYPING EFFECT ──
  useEffect(() => {
    const words = ['decisão', 'controle', 'clareza', 'resultado', 'evolução']
    let wi = 0, ci = 0, del = false
    let timer: ReturnType<typeof setTimeout>

    function tick() {
      const word = words[wi]
      if (!del) {
        ci++
        setTyped(word.slice(0, ci))
        if (ci === word.length) { del = true; timer = setTimeout(tick, 2200); return }
        timer = setTimeout(tick, 90)
      } else {
        ci--
        setTyped(word.slice(0, ci))
        if (ci === 0) { del = false; wi = (wi + 1) % words.length; timer = setTimeout(tick, 400); return }
        timer = setTimeout(tick, 50)
      }
    }
    timer = setTimeout(tick, 2500)
    return () => clearTimeout(timer)
  }, [])

  // ── COUNTER ──
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement
            const target = parseInt(el.dataset.count || '0')
            if (!target) return
            let current = 0
            const step = Math.max(1, Math.floor(target / 35))
            const iv = setInterval(() => {
              current += step
              if (current >= target) { current = target; clearInterval(iv) }
              el.textContent = String(current)
            }, 30)
            obs.unobserve(el)
          }
        })
      },
      { threshold: 0.5 }
    )
    document.querySelectorAll('[data-count]').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // ── ROI CALCULATOR ──
  const calcROI = useCallback(() => {
    const col = parseInt((document.getElementById('inp-col') as HTMLInputElement)?.value) || 0
    const fat = parseInt((document.getElementById('inp-fat') as HTMLInputElement)?.value) || 0
    const hrs = parseInt((document.getElementById('inp-hrs') as HTMLInputElement)?.value) || 0
    const sys = parseInt((document.getElementById('inp-sys') as HTMLSelectElement)?.value) || 1

    setHrsVal(String(hrs))
    const custoHrs = hrs * 4 * 55
    const custoSys = (sys - 1) * 350
    const custoRetrabalho = fat * 0.012
    const total = custoHrs + custoSys + custoRetrabalho
    const eco = Math.max(0, total)
    const hrsRecup = Math.round(hrs * 0.8)

    setRCusto('R$ ' + Math.round(total).toLocaleString('pt-BR'))
    setREco('R$ ' + Math.round(eco).toLocaleString('pt-BR'))
    setREcoYr('R$ ' + Math.round(eco * 12).toLocaleString('pt-BR'))
    setRHrs(hrsRecup * 4 + 'h')
  }, [])

  useEffect(() => { calcROI() }, [calcROI])

  // ── TOAST ──
  const showToast = useCallback((msg: string) => {
    setToastMsg(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 4000)
  }, [])

  // ── MODAL ──
  const openModal = useCallback(() => {
    setModalOpen(true)
    document.body.style.overflow = 'hidden'
    setModalValid(false)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    document.body.style.overflow = ''
  }, [])

  // ── MASKS & VALIDATION ──
  const maskFone = useCallback((el: HTMLInputElement) => {
    let v = el.value.replace(/\D/g, '')
    if (v.length > 11) v = v.slice(0, 11)
    if (v.length > 6) v = v.replace(/^(\d{2})(\d{5})(\d)/, '($1) $2-$3')
    else if (v.length > 2) v = v.replace(/^(\d{2})(\d)/, '($1) $2')
    else if (v.length > 0) v = v.replace(/^(\d)/, '($1')
    el.value = v
  }, [])

  const setFgState = useCallback((el: HTMLInputElement, state: string, msg: string) => {
    const fg = el.closest('.fg')
    if (!fg) return
    const icon = fg.querySelector('.vicon') as HTMLElement
    const hint = fg.querySelector('.hint') as HTMLElement
    fg.classList.remove('valid', 'invalid')
    if (state === 'valid') { fg.classList.add('valid'); if (icon) icon.textContent = '✓'; if (hint) hint.textContent = msg || '' }
    else if (state === 'invalid') { fg.classList.add('invalid'); if (icon) icon.textContent = '✕'; if (hint) hint.textContent = msg || '' }
    else { if (icon) icon.textContent = ''; if (hint) hint.textContent = msg || '' }
    checkSubmitState()
  }, [])

  const vNome = useCallback((el: HTMLInputElement): boolean => {
    const v = el.value.trim()
    if (v.length === 0) { setFgState(el, '', 'Mínimo 3 caracteres'); return false }
    if (v.length < 3) { setFgState(el, 'invalid', 'Mínimo 3 caracteres'); return false }
    if (!/^[A-Za-zÀ-ÿ\s'.-]+$/.test(v)) { setFgState(el, 'invalid', 'Use apenas letras'); return false }
    setFgState(el, 'valid', ''); return true
  }, [setFgState])

  const vEmail = useCallback((el: HTMLInputElement): boolean => {
    const v = el.value.trim()
    if (v.length === 0) { setFgState(el, '', 'Use seu email profissional'); return false }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!re.test(v)) { setFgState(el, 'invalid', 'Email inválido'); return false }
    setFgState(el, 'valid', ''); return true
  }, [setFgState])

  const vFone = useCallback((el: HTMLInputElement): boolean => {
    const raw = el.value.replace(/\D/g, '')
    if (raw.length === 0) { setFgState(el, '', 'Formato: (00) 00000-0000'); return true }
    if (raw.length < 10 || raw.length > 11) { setFgState(el, 'invalid', 'Número incompleto'); return false }
    setFgState(el, 'valid', ''); return true
  }, [setFgState])

  const checkSubmitState = useCallback(() => {
    const nameRe = /^[A-Za-zÀ-ÿ\s'.-]+$/
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

    const mn = document.getElementById('m-nome') as HTMLInputElement
    const me = document.getElementById('m-email') as HTMLInputElement
    if (mn && me) {
      setModalValid(mn.value.trim().length >= 3 && nameRe.test(mn.value.trim()) && emailRe.test(me.value.trim()))
    }

    const dn = document.getElementById('di-nome') as HTMLInputElement
    const de = document.getElementById('di-email') as HTMLInputElement
    if (dn && de) {
      setInlineValid(dn.value.trim().length >= 3 && nameRe.test(dn.value.trim()) && emailRe.test(de.value.trim()))
    }
  }, [])

  const submitModal = useCallback(() => {
    const n = document.getElementById('m-nome') as HTMLInputElement
    const e = document.getElementById('m-email') as HTMLInputElement
    const f = document.getElementById('m-fone') as HTMLInputElement
    if (!vNome(n) || !vEmail(e) || !vFone(f)) return
    closeModal()
    showToast('Demonstração solicitada! Retornamos em até 2h.')
  }, [vNome, vEmail, vFone, closeModal, showToast])

  const submitInline = useCallback(() => {
    const n = document.getElementById('di-nome') as HTMLInputElement
    const e = document.getElementById('di-email') as HTMLInputElement
    const f = document.getElementById('di-fone') as HTMLInputElement
    if (!vNome(n) || !vEmail(e) || !vFone(f)) return
    showToast('Demonstração solicitada! Retornamos em até 2h.')
  }, [vNome, vEmail, vFone, showToast])

  // ── RENDER ──
  return (
    <>

{/* NAV */}
<nav className="nav" id="nav" role="navigation" aria-label="Navegação principal">
<div className="w nav-in">
  <a href="/" className="logo">
    <svg viewBox="0 0 40 40" fill="none" role="img" aria-label="Logo Ruphus"><defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3B82F6"/><stop offset="50%" stopColor="#8B5CF6"/><stop offset="100%" stopColor="#EC4899"/></linearGradient></defs><path d="M20 2L36.66 11V29L20 38L3.34 29V11L20 2Z" stroke="url(#lg)" strokeWidth="2" fill="none"/><path d="M14 12H22C24.5 12 26.5 14 26.5 16.5C26.5 19 24.5 21 22 21H18L26 28" stroke="url(#lg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M14 12V28" stroke="url(#lg)" strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg>
    Ruphus
  </a>
  <div className="nlinks">
    <a href="#modulos">Módulos</a>
    <a href="#roadmap">Ecossistema</a>
    <a href="#calculadora">ROI</a>
    <a href="#educacao">Recursos</a>
    <a href="#faq">FAQ</a>
  </div>
  <div className="ncta">
    <button type="button" className="theme-btn" onClick={toggleTheme} aria-label="Alternar tema"><span id="t-ico">{isDark ? "☾" : "☀"}</span></button>
    <a href="/login" className="btn btn-g">Entrar</a>
    <button type="button" className="btn btn-t" onClick={openModal}>Agendar demonstração</button>
  </div>
  <button type="button" className="hambg" onClick={() => setMobOpen(true)} aria-label="Menu"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" role="img" aria-label="Menu" strokeWidth="2.2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
</div>
</nav>
<div className={`mob ${mobOpen ? 'open' : ''}`} id="mob">
  <button type="button" className="mob-x" onClick={() => setMobOpen(false)}>✕</button>
  <a href="#modulos" onClick={() => setMobOpen(false)}>Módulos</a>
  <a href="#roadmap" onClick={() => setMobOpen(false)}>Ecossistema</a>
  <a href="#calculadora" onClick={() => setMobOpen(false)}>ROI</a>
  <a href="#educacao" onClick={() => setMobOpen(false)}>Recursos</a>
  <a href="#faq" onClick={() => setMobOpen(false)}>FAQ</a>
  <button type="button" className="btn btn-t" style={{ marginTop: "12px" }} onClick={() => { setMobOpen(false); openModal() }}>Agendar demonstração →</button>
</div>

<main id="conteudo">
{/* HERO */}
<section className="hero" aria-label="Apresentação do Ruphus ERP">
<div className="w">
  <div data-r><div className="hero-ey"><span className="p"></span> Plataforma em evolução contínua — novas funcionalidades toda semana</div></div>
  <h1 data-r="1">Menos planilha,<br />mais <em><span className="typed-wrap" id="typed">{typed}</span><span className="cursor"></span></em></h1>
  <div className="hero-sub">
    <p className="hero-desc" data-r="2">22 módulos integrados — de Vendas e CRM a Contabilidade, Fiscal, BI com IA e Chat — em um ERP na nuvem que evolui toda semana.</p>
    <div className="hero-right" data-r="3">
      <button className="btn btn-t btn-lg" onClick={openModal}>Agendar demonstração gratuita →</button>
      <button type="button" className="btn btn-ol btn-lg" onClick={() => document.getElementById('calculadora')?.scrollIntoView({behavior:'smooth'})}>Calcular minha economia →</button>
      <div className="sp">
        <div className="avatars"><div className="av" style={{ background: "#0D7C66" }}>A</div><div className="av" style={{ background: "#D4A017" }}>M</div><div className="av" style={{ background: "#E8634A" }}>R</div><div className="av" style={{ background: "#6C5CE7" }}>S</div></div>
        <div className="sp-t"><strong>Demonstração sem compromisso.</strong><br />Orçamento personalizado.</div>
      </div>
    </div>
  </div>
</div>
</section>

{/* TRUST BADGES */}
<section className="trust" aria-label="Certificações de segurança" data-r>
<div className="w">
<div className="trust-inner">
  <div className="trust-badge"><div className="ico" style={{ background: "var(--tl)", color: "var(--teal)" }}>🔒</div>SSL/TLS + HSTS Preload</div>
  <div className="trust-badge"><div className="ico" style={{ background: "var(--vl)", color: "var(--violet)" }}>🛡</div>Supabase RLS</div>
  <div className="trust-badge"><div className="ico" style={{ background: "var(--al)", color: "var(--amber)" }}>📋</div>LGPD Ready</div>
  <div className="trust-badge"><div className="ico" style={{ background: "var(--cl)", color: "var(--coral)" }}>⚡</div>Vercel Edge Network</div>
  <div className="trust-badge"><div className="ico" style={{ background: "var(--tl)", color: "var(--teal)" }}>📡</div>Sentry Monitoring</div>
</div>
</div>
</section>

{/* MARQUEE */}
<section className="marquee" aria-label="Integrações disponíveis">
<div className="marquee-label">Integrações nativas e em expansão</div>
<div className="marquee-track">
  <span className="marquee-item"><span className="dot"></span>Supabase</span>
  <span className="marquee-item"><span className="dot"></span>Superlógica</span>
  <span className="marquee-item"><span className="dot"></span>Pix Automático</span>
  <span className="marquee-item"><span className="dot"></span>WhatsApp (Z-API)</span>
  <span className="marquee-item"><span className="dot"></span>Boleto Bancário</span>
  <span className="marquee-item"><span className="dot"></span>NFe.io</span>
  <span className="marquee-item"><span className="dot"></span>Mercado Pago</span>
  <span className="marquee-item"><span className="dot"></span>Google Sheets</span>
  <span className="marquee-item"><span className="dot"></span>Vercel Edge</span>
  <span className="marquee-item"><span className="dot"></span>Sentry</span>
  <span className="marquee-item"><span className="dot"></span>Supabase</span>
  <span className="marquee-item"><span className="dot"></span>Superlógica</span>
  <span className="marquee-item"><span className="dot"></span>Pix Automático</span>
  <span className="marquee-item"><span className="dot"></span>WhatsApp (Z-API)</span>
  <span className="marquee-item"><span className="dot"></span>Boleto Bancário</span>
  <span className="marquee-item"><span className="dot"></span>NFe.io</span>
  <span className="marquee-item"><span className="dot"></span>Mercado Pago</span>
  <span className="marquee-item"><span className="dot"></span>Google Sheets</span>
  <span className="marquee-item"><span className="dot"></span>Vercel Edge</span>
  <span className="marquee-item"><span className="dot"></span>Sentry</span>
</div>
</section>

{/* BENTO */}
<section className="bento-s" aria-label="Visão geral da plataforma">
<div className="w">
<div className="bento">
  <div className="bc c-h" data-r>
    <div className="ui">
      <div className="ui-bar"><span className="nm">Ruphus</span><div style={{ flex: "1" }}></div>
        <button type="button" className={`tb ${bentoTab === 'fin' ? 'on' : ''}`} onClick={() => setBentoTab('fin')}>Financeiro</button>
        <button className={`tb ${bentoTab === 'crm' ? 'on' : ''}`} onClick={() => setBentoTab('crm')}>CRM</button>
        <button className={`tb ${bentoTab === 'cont' ? 'on' : ''}`} onClick={() => setBentoTab('cont')}>Contábil</button>
      </div>
      <div className="ui-bd">
        <div className="ui-sb">
          <div className="si on"><div className="si-ic" style={{ background: "var(--tl)", color: "var(--teal)" }}>$</div>Contas a Pagar</div>
          <div className="si"><div className="si-ic" style={{ background: "var(--cl)", color: "var(--coral)" }}>↓</div>Contas a Receber</div>
          <div className="si"><div className="si-ic" style={{ background: "var(--al)", color: "var(--amber)" }}>≡</div>Fluxo de Caixa</div>
          <div className="si"><div className="si-ic" style={{ background: "var(--vl)", color: "var(--violet)" }}>◈</div>Conciliação</div>
          <div className="si"><div className="si-ic" style={{ background: "var(--sand)" }}>⊞</div>Centro de Custo</div>
        </div>
        <div className="ui-c">
          <div className={`pn ${bentoTab === 'fin' ? 'show' : ''}`} id="p-fin"><h4>Contas a Pagar — Mar/2026</h4>
            <table className="tbl"><thead><tr><th>Descrição</th><th>Fornecedor</th><th>Valor</th><th>Venc.</th><th>Status</th></tr></thead>
            <tbody><tr><td>Manutenção elevador</td><td>TecLift</td><td style={{ fontFamily: "var(--mono)" }}>R$2.400</td><td>28/03</td><td><span className="bg bg-a">Pendente</span></td></tr><tr><td>Limpeza mensal</td><td>CleanPro</td><td style={{ fontFamily: "var(--mono)" }}>R$3.150</td><td>25/03</td><td><span className="bg bg-g">Pago</span></td></tr><tr><td>Energia elétrica</td><td>Equatorial</td><td style={{ fontFamily: "var(--mono)" }}>R$8.720</td><td>30/03</td><td><span className="bg bg-a">Pendente</span></td></tr><tr><td>Seguro obrigatório</td><td>Porto Seguros</td><td style={{ fontFamily: "var(--mono)" }}>R$1.890</td><td>15/03</td><td><span className="bg bg-g">Pago</span></td></tr></tbody></table></div>
          <div className={`pn ${bentoTab === 'crm' ? 'show' : ''}`} id="p-crm"><h4>Pipeline Comercial</h4>
            <table className="tbl"><thead><tr><th>Empresa</th><th>Contato</th><th>Valor</th><th>Fase</th></tr></thead>
            <tbody><tr><td>Res. Solar</td><td>João Silva</td><td style={{ fontFamily: "var(--mono)" }}>R$4.200</td><td><span className="bg bg-g">Contrato</span></td></tr><tr><td>Ed. Aurora</td><td>Maria Lima</td><td style={{ fontFamily: "var(--mono)" }}>R$6.800</td><td><span className="bg bg-a">Proposta</span></td></tr><tr><td>Torre Norte</td><td>Carlos Reis</td><td style={{ fontFamily: "var(--mono)" }}>R$9.100</td><td><span className="bg bg-v">Prospecção</span></td></tr></tbody></table></div>
          <div className={`pn ${bentoTab === 'cont' ? 'show' : ''}`} id="p-cont"><h4>Mapa Contábil — Regras</h4>
            <table className="tbl"><thead><tr><th>Conta</th><th>Débito</th><th>Crédito</th><th>C.Custo</th><th>Status</th></tr></thead>
            <tbody><tr><td>Energia Elétrica</td><td>3.1.01</td><td>1.1.02</td><td>Geral</td><td><span className="bg bg-g">Ativa</span></td></tr><tr><td>Folha Pagamento</td><td>3.2.01</td><td>2.1.01</td><td>Pessoal</td><td><span className="bg bg-g">Ativa</span></td></tr><tr><td>Manutenção</td><td>3.3.01</td><td>1.1.02</td><td>Predial</td><td><span className="bg bg-a">Rascunho</span></td></tr></tbody></table></div>
        </div>
      </div>
    </div>
  </div>
  <div className="bc c-s" data-r="1"><div><div className="c-lbl">Receita mensal</div><div className="c-num" style={{ color: "var(--teal)" }} ref={counterRef} data-count="287">0</div><div className="c-det">mil reais · ↑ 12% vs anterior</div></div><div className="spark"><i style={{ height: "40%", background: "var(--tl)" }}></i><i style={{ height: "55%", background: "var(--tl)" }}></i><i style={{ height: "48%", background: "var(--tl)" }}></i><i style={{ height: "62%", background: "var(--tl)" }}></i><i style={{ height: "72%", background: "var(--tl)" }}></i><i style={{ height: "85%", background: "var(--teal)" }}></i></div></div>
  <div className="bc c-s" data-r="2"><div><div className="c-lbl">Inadimplência</div><div className="c-num" style={{ color: "var(--coral)" }}>3.2<span style={{ fontSize: "1rem" }}>%</span></div><div className="c-det">Meta: abaixo de 5%</div></div><div className="spark"><i style={{ height: "80%", background: "var(--cl)" }}></i><i style={{ height: "65%", background: "var(--cl)" }}></i><i style={{ height: "48%", background: "var(--cl)" }}></i><i style={{ height: "35%", background: "var(--cl)" }}></i><i style={{ height: "28%", background: "var(--coral)" }}></i></div></div>
  <div className="bc c-w" data-r="3"><div className="c-lbl">Mapa Contábil</div><div className="c-ttl">Automatize a escrituração</div><div className="c-txt">Configure regras uma vez — cada lançamento financeiro gera a contrapartida contábil, sem digitação manual.</div></div>
  <div className="bc c-w" data-r="4"><div className="c-lbl">Mapa de Rateio</div><div className="c-ttl">Distribua custos com precisão</div><div className="c-txt">Rateie despesas por centro de custo, fração ideal ou critério customizado. Demonstrativos prontos para prestação de contas.</div></div>
</div></div>
</section>

{/* BEFORE/AFTER */}
<section className="ba" aria-label="Comparativo antes e depois">
<div className="w">
  <div style={{ textAlign: "center", marginBottom: "36px" }} data-r>
    <div className="s-ey">Transformação</div>
    <h2 className="s-hd" style={{ maxWidth: "100%", textAlign: "center" }}>O cenário atual <span style={{ color: "var(--tx3)" }}>vs.</span> a realidade Ruphus</h2>
  </div>
  <div className="ba-g" data-r="1">
    <div className="ba-card">
      <div className="ba-tag" style={{ background: "var(--cl)", color: "var(--coral)" }}>Cenário Atual</div>
      <div className="ba-items">
        <div className="ba-it"><div className="ba-ic" style={{ background: "var(--cl)", color: "var(--coral)" }}>✕</div><div><h4>Sistemas desconectados</h4><p>Dados dispersos entre planilhas, sistemas legados e ferramentas que não conversam.</p></div></div>
        <div className="ba-it"><div className="ba-ic" style={{ background: "var(--cl)", color: "var(--coral)" }}>✕</div><div><h4>Fechamento demorado</h4><p>Consolidação manual, reconciliação lenta e retrabalho constante todo mês.</p></div></div>
        <div className="ba-it"><div className="ba-ic" style={{ background: "var(--cl)", color: "var(--coral)" }}>✕</div><div><h4>Decisões sem visibilidade</h4><p>Relatórios desatualizados, informações fragmentadas e sem previsibilidade.</p></div></div>
      </div>
    </div>
    <div className="ba-card after">
      <div className="ba-tag" style={{ background: "var(--tl)", color: "var(--teal)" }}>Com Ruphus</div>
      <div className="ba-items">
        <div className="ba-it"><div className="ba-ic" style={{ background: "var(--tl)", color: "var(--teal)" }}>✓</div><div><h4>22 módulos integrados</h4><p>De Vendas e CRM a Contabilidade, Fiscal, Projetos, BI com IA, Chat e Workflows — tudo conectado nativamente.</p></div></div>
        <div className="ba-it"><div className="ba-ic" style={{ background: "var(--tl)", color: "var(--teal)" }}>✓</div><div><h4>Fechamento em minutos</h4><p>Conciliação automática, rateio calculado e balancete gerado sem intervenção manual.</p></div></div>
        <div className="ba-it"><div className="ba-ic" style={{ background: "var(--tl)", color: "var(--teal)" }}>✓</div><div><h4>Dashboards em tempo real</h4><p>KPIs atualizados, alertas de anomalia e relatórios sob demanda com dados reais.</p></div></div>
      </div>
    </div>
  </div>
</div>
</section>

{/* MODULES — 22 módulos em 4 categorias */}
<section className="mods" id="modulos" aria-label="22 módulos do Ruphus">
<div className="w">
  <div className="s-ey" data-r>22 Módulos</div>
  <h2 className="s-hd" data-r="1">Um ecossistema completo, não um punhado de telas</h2>
  <p className="s-desc" data-r="2">4 categorias, 22 módulos, 257 permissões granulares. Cada empresa ativa apenas o que precisa — e pode expandir a qualquer momento.</p>
  <div className="mod-tabs" data-r="3">
    <button type="button" className={`mt ${activeMod === 0 ? "on" : ""}`} onClick={() => setActiveMod(0)}>Vendas & CRM</button>
    <button className={`mt ${activeMod === 1 ? "on" : ""}`} onClick={() => setActiveMod(1)}>Financeiro</button>
    <button className={`mt ${activeMod === 2 ? "on" : ""}`} onClick={() => setActiveMod(2)}>Pessoas & Operações</button>
    <button className={`mt ${activeMod === 3 ? "on" : ""}`} onClick={() => setActiveMod(3)}>Plataforma</button>
  </div>
  <div className="mod-c">
    {/* VENDAS & CRM */}
    <div className={`mc ${activeMod === 0 ? "show" : ""}`} id="mod-0"><div className="mc-info"><h3>Vendas & CRM</h3><p>Do cadastro de clientes ao pipeline de vendas. 4 módulos que cobrem todo o ciclo comercial — com 82 permissões configuráveis.</p><div className="mc-feats">
      <div className="mc-f"><div className="ck" style={{ background: "var(--tl)", color: "var(--teal)" }}>✓</div><strong>Clientes</strong> — Cadastro PF e PJ completo</div>
      <div className="mc-f"><div className="ck" style={{ background: "var(--tl)", color: "var(--teal)" }}>✓</div><strong>Fornecedores</strong> — Cadastro e histórico de fornecedores</div>
      <div className="mc-f"><div className="ck" style={{ background: "var(--tl)", color: "var(--teal)" }}>✓</div><strong>CRM</strong> — Leads, oportunidades e pipeline (70 perm.)</div>
      <div className="mc-f"><div className="ck" style={{ background: "var(--tl)", color: "var(--teal)" }}>✓</div><strong>Vendas</strong> — Pedidos, orçamentos e gestão de vendas</div>
    </div></div><div className="mc-vis"><div className="mv-pipe"><div className="mv-row"><div className="mv-dot" style={{ background: "var(--teal)" }}></div><div className="mv-name">Prospecção</div><div className="mv-bar"><div className="mv-bf" style={{ width: "100%", background: "var(--teal)" }}></div></div><div className="mv-val">12</div></div><div className="mv-row"><div className="mv-dot" style={{ background: "var(--amber)" }}></div><div className="mv-name">Qualificação</div><div className="mv-bar"><div className="mv-bf" style={{ width: "67%", background: "var(--amber)" }}></div></div><div className="mv-val">8</div></div><div className="mv-row"><div className="mv-dot" style={{ background: "var(--violet)" }}></div><div className="mv-name">Proposta</div><div className="mv-bar"><div className="mv-bf" style={{ width: "42%", background: "var(--violet)" }}></div></div><div className="mv-val">5</div></div><div className="mv-row"><div className="mv-dot" style={{ background: "var(--coral)" }}></div><div className="mv-name">Negociação</div><div className="mv-bar"><div className="mv-bf" style={{ width: "25%", background: "var(--coral)" }}></div></div><div className="mv-val">3</div></div><div className="mv-row" style={{ background: "rgba(13,124,102,.04)", borderRadius: "7px" }}><div className="mv-dot" style={{ background: "#166534" }}></div><div className="mv-name" style={{ fontWeight: "600" }}>Fechado ✓</div><div className="mv-bar"><div className="mv-bf" style={{ width: "17%", background: "#166534" }}></div></div><div className="mv-val" style={{ color: "var(--teal)" }}>2</div></div></div></div></div>
    {/* FINANCEIRO */}
    <div className={`mc ${activeMod === 1 ? "show" : ""}`} id="mod-1"><div className="mc-info"><h3>Financeiro</h3><p>Fluxo completo do dinheiro — do contas a pagar à conciliação bancária, passando por fiscal e aprovações. 5 módulos com 73 permissões.</p><div className="mc-feats">
      <div className="mc-f"><div className="ck" style={{ background: "var(--cl)", color: "var(--coral)" }}>✓</div><strong>Financeiro</strong> — Contas a pagar, receber e fluxo de caixa</div>
      <div className="mc-f"><div className="ck" style={{ background: "var(--cl)", color: "var(--coral)" }}>✓</div><strong>Contas Bancárias</strong> — Saldos, extratos e conciliação</div>
      <div className="mc-f"><div className="ck" style={{ background: "var(--cl)", color: "var(--coral)" }}>✓</div><strong>Contabilidade</strong> — Plano de contas, centros de custo e lançamentos</div>
      <div className="mc-f"><div className="ck" style={{ background: "var(--cl)", color: "var(--coral)" }}>✓</div><strong>Fiscal</strong> — Notas fiscais, cancelamentos e planejamento tributário</div>
      <div className="mc-f"><div className="ck" style={{ background: "var(--cl)", color: "var(--coral)" }}>✓</div><strong>Aprovações</strong> — Níveis de aprovação, delegações e histórico</div>
    </div></div><div className="mc-vis"><div className="mv-kpis"><div className="mv-kpi"><div className="mv-kpi-l">Receita</div><div className="mv-kpi-v" style={{ color: "var(--teal)" }}>R$287k</div></div><div className="mv-kpi"><div className="mv-kpi-l">Despesas</div><div className="mv-kpi-v" style={{ color: "var(--coral)" }}>R$142k</div></div><div className="mv-kpi"><div className="mv-kpi-l">Saldo</div><div className="mv-kpi-v">R$145k</div></div><div className="mv-kpi"><div className="mv-kpi-l">A vencer</div><div className="mv-kpi-v" style={{ color: "var(--amber)" }}>R$38k</div></div></div></div></div>
    {/* PESSOAS & OPERAÇÕES */}
    <div className={`mc ${activeMod === 2 ? "show" : ""}`} id="mod-2"><div className="mc-info"><h3>Pessoas & Operações</h3><p>Gestão de equipes, tarefas, contratos, projetos e serviços. 7 módulos com 41 permissões para controle operacional completo.</p><div className="mc-feats">
      <div className="mc-f"><div className="ck" style={{ background: "var(--vl)", color: "var(--violet)" }}>✓</div><strong>Funcionários</strong> — Cadastro, dependentes e benefícios</div>
      <div className="mc-f"><div className="ck" style={{ background: "var(--vl)", color: "var(--violet)" }}>✓</div><strong>Departamentos</strong> — Gestão de departamentos e equipes</div>
      <div className="mc-f"><div className="ck" style={{ background: "var(--vl)", color: "var(--violet)" }}>✓</div><strong>Tickets</strong> — Tarefas e acompanhamento de atividades</div>
      <div className="mc-f"><div className="ck" style={{ background: "var(--vl)", color: "var(--violet)" }}>✓</div><strong>Checklists</strong> — Rotinas por cliente com controle de progresso</div>
      <div className="mc-f"><div className="ck" style={{ background: "var(--vl)", color: "var(--violet)" }}>✓</div><strong>Contratos</strong> — Gestão com fornecedores e clientes</div>
      <div className="mc-f"><div className="ck" style={{ background: "var(--vl)", color: "var(--violet)" }}>✓</div><strong>Projetos</strong> — Gestão de projetos e análise de rentabilidade</div>
      <div className="mc-f"><div className="ck" style={{ background: "var(--vl)", color: "var(--violet)" }}>✓</div><strong>Gestão de Serviços</strong> — Agendamentos, reservas e fila de espera</div>
    </div></div><div className="mc-vis"><div className="mv-flow"><div className="mv-nd">Ticket</div><span className="mv-arr">→</span><div className="mv-nd" style={{ borderColor: "var(--violet)" }}>Checklist</div><span className="mv-arr">→</span><div className="mv-nd" style={{ borderColor: "var(--teal)" }}>Projeto</div><span className="mv-arr">→</span><div className="mv-nd done">Entregue ✓</div></div></div></div>
    {/* PLATAFORMA */}
    <div className={`mc ${activeMod === 3 ? "show" : ""}`} id="mod-3"><div className="mc-info"><h3>Plataforma</h3><p>A infraestrutura que conecta tudo — workflows, integrações externas, BI com IA, relatórios, chat interno e estoque. 6 módulos, 63 permissões.</p><div className="mc-feats">
      <div className="mc-f"><div className="ck" style={{ background: "var(--al)", color: "var(--amber)" }}>✓</div><strong>Workflows</strong> — Automação de processos e regras de negócio</div>
      <div className="mc-f"><div className="ck" style={{ background: "var(--al)", color: "var(--amber)" }}>✓</div><strong>Integrações</strong> — Superlógica, ERPs externos e APIs</div>
      <div className="mc-f"><div className="ck" style={{ background: "var(--al)", color: "var(--amber)" }}>✓</div><strong>Business Intelligence</strong> — Dashboards e análises com IA</div>
      <div className="mc-f"><div className="ck" style={{ background: "var(--al)", color: "var(--amber)" }}>✓</div><strong>Relatórios</strong> — Relatórios gerenciais e exportação (36 perm.)</div>
      <div className="mc-f"><div className="ck" style={{ background: "var(--al)", color: "var(--amber)" }}>✓</div><strong>Chat</strong> — Comunicação em tempo real entre membros</div>
      <div className="mc-f"><div className="ck" style={{ background: "var(--al)", color: "var(--amber)" }}>✓</div><strong>Estoque</strong> — Gestão de produtos e controle de estoque</div>
    </div></div><div className="mc-vis"><div className="mv-bars"><div className="mv-bv" style={{ height: "35%", background: "var(--sand)" }}><span className="tip">Jan: 82k</span></div><div className="mv-bv" style={{ height: "48%", background: "var(--sand)" }}><span className="tip">Fev: 110k</span></div><div className="mv-bv" style={{ height: "42%", background: "var(--tl)" }}><span className="tip">Mar: 96k</span></div><div className="mv-bv" style={{ height: "58%", background: "var(--tl)" }}><span className="tip">Abr: 134k</span></div><div className="mv-bv" style={{ height: "52%", background: "var(--tl)" }}><span className="tip">Mai: 120k</span></div><div className="mv-bv" style={{ height: "72%", background: "var(--teal)" }}><span className="tip">Jun: 167k</span></div><div className="mv-bv" style={{ height: "88%", background: "var(--teal)" }}><span className="tip">Ago: 205k</span></div></div></div></div>
  </div>
</div>
</section>

{/* ROADMAP — 22 módulos reais */}
<section className="roadmap" id="roadmap" aria-label="Ecossistema de módulos">
<div className="w">
  <div style={{ textAlign: "center" }} data-r>
    <div className="s-ey">Ecossistema Completo</div>
    <h2 className="s-hd" style={{ maxWidth: "100%", textAlign: "center" }}>22 módulos. Todos funcionais. Já em produção.</h2>
    <p className="s-desc" style={{ maxWidth: "100%", textAlign: "center", margin: "8px auto 0" }}>Cada empresa ativa os módulos que precisa. Novos recursos chegam toda semana via atualizações contínuas.</p>
  </div>
  <div className="roadmap-grid" data-r="1">
    <div className="rm-card"><div className="rm-icon">👥</div><h4>Clientes</h4><p>Cadastro completo PF e PJ</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">🚚</div><h4>Fornecedores</h4><p>Cadastro e histórico de fornecedores</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">🎯</div><h4>CRM</h4><p>Leads, oportunidades e pipeline (70 perm.)</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">🛒</div><h4>Vendas</h4><p>Pedidos, orçamentos e gestão de vendas</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">💰</div><h4>Financeiro</h4><p>Contas a pagar, receber e fluxo de caixa</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">🏦</div><h4>Contas Bancárias</h4><p>Saldos, extratos e conciliação</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">📊</div><h4>Contabilidade</h4><p>Plano de contas, centros de custo e lançamentos</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">🧾</div><h4>Fiscal</h4><p>Notas fiscais e planejamento tributário</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">✅</div><h4>Aprovações</h4><p>Níveis de aprovação, delegações e histórico</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">🧑‍💼</div><h4>Funcionários</h4><p>Cadastro, dependentes e benefícios</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">🏢</div><h4>Departamentos</h4><p>Gestão de departamentos e equipes</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">🎫</div><h4>Tickets</h4><p>Tarefas e acompanhamento de atividades</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">☑️</div><h4>Checklists</h4><p>Rotinas por cliente com controle de progresso</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">📝</div><h4>Contratos</h4><p>Gestão com fornecedores e clientes</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">📐</div><h4>Projetos</h4><p>Gestão de projetos e rentabilidade</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">🗓</div><h4>Gestão de Serviços</h4><p>Agendamentos, reservas e fila de espera</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">⚙️</div><h4>Workflows</h4><p>Automação de processos e regras de negócio</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">🔗</div><h4>Integrações</h4><p>Superlógica, ERPs externos e APIs</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">📈</div><h4>Business Intelligence</h4><p>Dashboards customizáveis e análises com IA</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">📋</div><h4>Relatórios</h4><p>Relatórios gerenciais e exportação (36 perm.)</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">💬</div><h4>Chat</h4><p>Comunicação em tempo real entre membros</p><div className="rm-status rm-live">● Disponível</div></div>
    <div className="rm-card"><div className="rm-icon">📦</div><h4>Estoque</h4><p>Gestão de produtos e controle de estoque</p><div className="rm-status rm-live">● Disponível</div></div>
  </div>
</div>
</section>

{/* ROI CALCULATOR */}
<section className="calc" id="calculadora" aria-label="Calculadora de ROI">
<div className="w">
  <div style={{ textAlign: "center", marginBottom: "36px" }} data-r>
    <div className="s-ey">Calculadora</div>
    <h2 className="s-hd" style={{ maxWidth: "100%", textAlign: "center" }}>Quanto você economiza com o Ruphus?</h2>
    <p className="s-desc" style={{ maxWidth: "100%", textAlign: "center", margin: "8px auto 0" }}>Preencha os dados e leve os números para a demonstração</p>
  </div>
  <div className="calc-box" data-r="1">
    <div className="calc-grid">
      <div className="calc-left">
        <div><label>Nº de colaboradores</label><input type="number" id="inp-col" placeholder="Ex: 15" onInput={calcROI}/></div>
        <div><label>Faturamento mensal (R$)</label><input type="number" id="inp-fat" placeholder="Ex: 200000" onInput={calcROI}/></div>
        <div><label>Horas/semana em tarefas manuais</label>
          <div className="range-wrap"><input type="range" id="inp-hrs" min="0" max="40" value="10" onInput={calcROI}/><div className="range-info"><span>0h</span><span className="val" id="hrs-val">{hrsVal}h</span><span>40h</span></div></div>
        </div>
        <div><label>Quantos sistemas usa hoje?</label>
          <select id="inp-sys" onChange={calcROI}><option value="1">1 sistema</option><option value="2" selected>2 sistemas</option><option value="3">3+ sistemas</option></select>
        </div>
      </div>
      <div className="calc-right">
        <div><div className="calc-label">Custo estimado de ineficiência/mês</div><div className="calc-big" style={{ color: "var(--coral)" }} id="r-custo">{rCusto}</div></div>
        <div style={{ width: "100%" }}>
          <div className="calc-row"><span>Economia estimada/mês</span><span style={{ color: "var(--teal)" }} id="r-eco">{rEco}</span></div>
          <div className="calc-row"><span>Economia estimada/ano</span><span style={{ color: "var(--teal)", fontSize: "1.05rem" }} id="r-eco-yr">{rEcoYr}</span></div>
        </div>
        <div className="calc-roi"><div className="lab">Horas recuperadas por mês</div><div className="big" id="r-hrs">{rHrs}</div></div>
        <button className="btn btn-t" style={{ width: "100%", padding: "13px 20px" }} onClick={openModal}>Agendar demonstração com esses dados →</button>
      </div>
    </div>
  </div>
</div>
</section>

{/* EDUCATION — Resource Hub */}
<section className="edu" id="educacao" aria-label="Recursos e insights">
<div className="w">
  <div className="edu-top">
    <div data-r>
      <div className="s-ey">Recursos & Insights</div>
      <h2 className="s-hd">Não é blog genérico. É inteligência aplicada.</h2>
    </div>
    <div className="edu-cats" data-r="1">
      <button type="button" className={`ecat ${activeEdu === 'all' ? 'on' : ''}`} onClick={() => setActiveEdu('all')}>Todos</button>
      <button className={`ecat ${activeEdu === 'deep' ? 'on' : ''}`} onClick={() => setActiveEdu('deep')}>Deep Dive</button>
      <button className={`ecat ${activeEdu === 'playbook' ? 'on' : ''}`} onClick={() => setActiveEdu('playbook')}>Playbooks</button>
      <button className={`ecat ${activeEdu === 'lab' ? 'on' : ''}`} onClick={() => setActiveEdu('lab')}>Lab</button>
    </div>
  </div>

  {/* Featured 2-col */}
  <div className="edu-featured" data-r>
    <article className="ef-card" data-cat="deep" style={ display: activeEdu === "all" || activeEdu === "deep" ? undefined : "none" }>
      <div className="ef-visual" style={{ background: "linear-gradient(135deg,#0a3d2e 0%,#0D7C66 40%,#14b89c 100%)" }}>
        <div className="ev-pattern">
          <div className="grid-lines"></div>
          <div className="circle" style={{ width: "200px", height: "200px", top: "-40px", right: "-40px", borderColor: "rgba(255,255,255,.08)" }}></div>
          <div className="circle" style={{ width: "120px", height: "120px", bottom: "20px", left: "30px", borderColor: "rgba(255,255,255,.06)" }}></div>
          <div className="glow" style={{ width: "160px", height: "160px", top: "20%", right: "20%", background: "rgba(255,255,255,.06)" }}></div>
        </div>
        <div className="ef-overlay"></div>
        <div className="ef-badge" style={{ background: "rgba(255,255,255,.15)" }}>Deep Dive</div>
        <svg className="ev-icon-center" aria-hidden="true" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="1.5"><path d="M18 20V10M12 20V4M6 20v-6"/><circle cx="18" cy="7" r="2" fill="rgba(255,255,255,.3)" stroke="none"/></svg>
        <div className="ef-title">
          <h3>Por que BI sem IA é só um painel bonito — e como o Ruphus resolve isso</h3>
          <p>Como análises com IA integrada transformam dados passivos em recomendações acionáveis.</p>
        </div>
      </div>
    </article>
    <article className="ef-card" data-cat="playbook" style={ display: activeEdu === "all" || activeEdu === "playbook" ? undefined : "none" }>
      <div className="ef-body" style={{ flex: "1" }}>
        <div className="ef-meta"><div className="tag-dot" style={{ background: "var(--coral)" }}></div> Playbook · 18 min</div>
        <h4>O fim do fechamento mensal: como empresas operam em tempo contínuo</h4>
        <p>O conceito de "fechar o mês" é resquício de quando dados viviam em planilhas. Com lançamentos integrados a regras contábeis automáticas, o balancete é só um snapshot de algo que já está pronto. Mostramos como 3 operações migraram do ciclo mensal para o modelo contínuo usando Mapa Contábil + Workflows do Ruphus.</p>
      </div>
      <div className="ef-foot"><span>Financeiro + Contábil</span><span className="ef-arrow">Ler playbook →</span></div>
    </article>
  </div>

  {/* Grid 3-col */}
  <div className="edu-g">
    <article className="ec" data-cat="lab" style={ display: activeEdu === "all" || activeEdu === "lab" ? undefined : "none" } data-r>
      <div className="ec-visual" style={{ background: "linear-gradient(135deg,#3b1f6e 0%,#6C5CE7 60%,#a78bfa 100%)" }}>
        <div className="ev-pattern"><div className="grid-lines"></div><div className="circle" style={{ width: "100px", height: "100px", top: "-20px", right: "-20px", borderColor: "rgba(255,255,255,.08)" }}></div><div className="glow" style={{ width: "100px", height: "100px", bottom: "10%", left: "20%", background: "rgba(255,255,255,.05)" }}></div></div>
        <svg className="ev-icon" aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="1.5" strokeLinecap="round"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4"/><path d="M14 9l-2 2 2 2" opacity=".5"/></svg>
      </div>
      <div className="ec-body">
        <div className="ec-tag" style={{ color: "var(--violet)" }}>Lab</div>
        <h4>Workflows que substituem pessoas (e liberam pessoas)</h4>
        <p>Automação de aprovações, cobranças escalonadas e checklists recorrentes — sem código, direto no ERP.</p>
      </div>
      <div className="ec-ft"><span>6 min · Plataforma</span><span className="ec-arr">Explorar →</span></div>
    </article>

    <article className="ec" data-cat="deep" style={ display: activeEdu === "all" || activeEdu === "deep" ? undefined : "none" } data-r="1">
      <div className="ec-visual" style={{ background: "linear-gradient(135deg,#064e3b 0%,#0D7C66 50%,#34d399 100%)" }}>
        <div className="ev-pattern"><div className="grid-lines"></div><div className="circle" style={{ width: "80px", height: "80px", bottom: "-10px", right: "20px", borderColor: "rgba(255,255,255,.08)" }}></div><div className="glow" style={{ width: "120px", height: "120px", top: "10%", right: "10%", background: "rgba(255,255,255,.04)" }}></div></div>
        <svg className="ev-icon" aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" opacity=".4"/></svg>
      </div>
      <div className="ec-body">
        <div className="ec-tag" style={{ color: "var(--teal)" }}>Deep Dive</div>
        <h4>Multi-tenant na prática: 50 empresas, dados 100% isolados</h4>
        <p>RLS do Supabase, schemas compartilhados e 257 permissões granulares explicados para quem opera.</p>
      </div>
      <div className="ec-ft"><span>12 min · Arquitetura</span><span className="ec-arr">Ler →</span></div>
    </article>

    <article className="ec" data-cat="playbook" style={ display: activeEdu === "all" || activeEdu === "playbook" ? undefined : "none" } data-r="2">
      <div className="ec-visual" style={{ background: "linear-gradient(135deg,#7f1d1d 0%,#E8634A 50%,#fca5a5 100%)" }}>
        <div className="ev-pattern"><div className="grid-lines"></div><div className="circle" style={{ width: "90px", height: "90px", top: "10px", left: "-20px", borderColor: "rgba(255,255,255,.07)" }}></div></div>
        <svg className="ev-icon" aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><path d="M8 9h8M8 13h4" opacity=".5"/></svg>
      </div>
      <div className="ec-body">
        <div className="ec-tag" style={{ color: "var(--coral)" }}>Playbook</div>
        <h4>Cobrança automatizada via WhatsApp: recuperação em 7 dias</h4>
        <p>Régua de cobrança com Z-API, gatilhos no Financeiro e templates que realmente funcionam.</p>
      </div>
      <div className="ec-ft"><span>10 min · Financeiro</span><span className="ec-arr">Ler →</span></div>
    </article>

    <article className="ec" data-cat="lab" style={ display: activeEdu === "all" || activeEdu === "lab" ? undefined : "none" } data-r="3">
      <div className="ec-visual" style={{ background: "linear-gradient(135deg,#78350f 0%,#D4A017 50%,#fde68a 100%)" }}>
        <div className="ev-pattern"><div className="grid-lines"></div><div className="circle" style={{ width: "70px", height: "70px", bottom: "0", right: "10px", borderColor: "rgba(255,255,255,.08)" }}></div></div>
        <svg className="ev-icon" aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><circle cx="9" cy="10" r="1" fill="rgba(255,255,255,.6)" stroke="none"/><circle cx="12" cy="10" r="1" fill="rgba(255,255,255,.6)" stroke="none"/><circle cx="15" cy="10" r="1" fill="rgba(255,255,255,.6)" stroke="none"/></svg>
      </div>
      <div className="ec-body">
        <div className="ec-tag" style={{ color: "var(--amber)" }}>Lab</div>
        <h4>Chat + Tickets: como eliminar o WhatsApp corporativo desordenado</h4>
        <p>Comunicação contextualizada por projeto, cliente ou departamento — com histórico e rastreabilidade total.</p>
      </div>
      <div className="ec-ft"><span>5 min · Operações</span><span className="ec-arr">Explorar →</span></div>
    </article>

    <article className="ec" data-cat="deep" style={ display: activeEdu === "all" || activeEdu === "deep" ? undefined : "none" } data-r="4">
      <div className="ec-visual" style={{ background: "linear-gradient(135deg,#1e293b 0%,#334155 50%,#64748b 100%)" }}>
        <div className="ev-pattern"><div className="grid-lines"></div><div className="circle" style={{ width: "110px", height: "110px", top: "-30px", right: "-30px", borderColor: "rgba(255,255,255,.06)" }}></div><div className="glow" style={{ width: "80px", height: "80px", bottom: "20%", left: "15%", background: "rgba(59,130,246,.08)" }}></div></div>
        <svg className="ev-icon" aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5" opacity=".5"/><path d="M2 12l10 5 10-5" opacity=".3"/></svg>
      </div>
      <div className="ec-body">
        <div className="ec-tag" style={{ color: "var(--tx2)" }}>Deep Dive</div>
        <h4>22 módulos, 1 decisão: como mapear sua operação antes de ativar o ERP</h4>
        <p>Framework prático para diagnosticar quais módulos ativar primeiro e a sequência ideal de implantação.</p>
      </div>
      <div className="ec-ft"><span>15 min · Estratégia</span><span className="ec-arr">Ler →</span></div>
    </article>

    <article className="ec" data-cat="playbook" style={ display: activeEdu === "all" || activeEdu === "playbook" ? undefined : "none" } data-r="5">
      <div className="ec-visual" style={{ background: "linear-gradient(135deg,#1e1b4b 0%,#3730a3 50%,#818cf8 100%)" }}>
        <div className="ev-pattern"><div className="grid-lines"></div><div className="circle" style={{ width: "90px", height: "90px", top: "10px", left: "10px", borderColor: "rgba(255,255,255,.06)" }}></div></div>
        <svg className="ev-icon" aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="1.5" strokeLinecap="round"><path d="M4 14.899A7 7 0 1115.71 8h1.79a4.5 4.5 0 012.5 8.242"/><path d="M12 12v9"/><path d="M8 17l4-4 4 4" opacity=".6"/></svg>
      </div>
      <div className="ec-body">
        <div className="ec-tag" style={{ color: "var(--violet)" }}>Playbook</div>
        <h4>De Superlógica ao Ruphus: migração sem downtime</h4>
        <p>Passo a passo real de integração e migração entre sistemas, com cronograma e checklist completo.</p>
      </div>
      <div className="ec-ft"><span>20 min · Migração</span><span className="ec-arr">Ler →</span></div>
    </article>
  </div>

  {/* Newsletter */}
  <div className="edu-nl" data-r>
    <div className="edu-nl-text">
      <h4>Changelog semanal + insights exclusivos</h4>
      <p>Receba as novidades do Ruphus e conteúdo que nenhum blog genérico publica.</p>
    </div>
    <div className="edu-nl-form">
      <input type="email" placeholder="seu@email.com.br" aria-label="Email para newsletter"/>
      <button className="btn btn-t" onClick={() => showToast('Inscrito com sucesso! Bem-vindo ao changelog.')}>Inscrever →</button>
    </div>
  </div>
</div>
</section>

{/* FAQ */}
<section className="faq" id="faq" aria-label="Perguntas frequentes">
<div className="w">
  <div className="faq-head" data-r>
    <div className="s-ey">Perguntas & Respostas</div>
    <h2 className="s-hd" style={{ maxWidth: "100%", textAlign: "center" }}>Tudo que você precisa saber antes de agendar</h2>
  </div>
  <div className="faq-cats" data-r="1">
    <button type="button" className={`fq-cat ${activeFaqCat === 'all' ? 'on' : ''}`} onClick={() => { setActiveFaqCat('all'); setOpenFaq(null) }}>Todas</button>
    <button type="button" className={`fq-cat ${activeFaqCat === 'produto' ? 'on' : ''}`} onClick={() => { setActiveFaqCat('produto'); setOpenFaq(null) }}>Produto</button>
    <button type="button" className={`fq-cat ${activeFaqCat === 'implantacao' ? 'on' : ''}`} onClick={() => { setActiveFaqCat('implantacao'); setOpenFaq(null) }}>Implantação</button>
    <button type="button" className={`fq-cat ${activeFaqCat === 'seguranca' ? 'on' : ''}`} onClick={() => { setActiveFaqCat('seguranca'); setOpenFaq(null) }}>Segurança</button>
    <button type="button" className={`fq-cat ${activeFaqCat === 'comercial' ? 'on' : ''}`} onClick={() => { setActiveFaqCat('comercial'); setOpenFaq(null) }}>Comercial</button>
  </div>
  <div className="faq-grid" data-r="2">

    {/* PRODUTO */}
    <div className="faq-it" data-fcat="produto" style={ display: activeFaqCat === "all" || activeFaqCat === "produto" ? undefined : "none" }>
      <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}>
        <span className="q-icon" style={{ background: "var(--tl)", color: "var(--teal)" }}>📦</span>
        <span style={{ flex: "1" }}>O Ruphus já está pronto para uso em produção?</span>
        <span className="arr">▼</span>
      </button>
      <div className="faq-a">
        <strong>Sim — todos os 22 módulos estão funcionais e implantados em clientes reais.</strong> O ecossistema cobre Vendas & CRM, Financeiro (incluindo Fiscal e Aprovações), Pessoas & Operações (Tickets, Checklists, Projetos, Contratos) e Plataforma (Workflows, BI com IA, Chat, Estoque, Relatórios e Integrações). A plataforma evolui semanalmente com novas funcionalidades entregues de forma contínua.
      </div>
    </div>

    <div className="faq-it" data-fcat="produto" style={ display: activeFaqCat === "all" || activeFaqCat === "produto" ? undefined : "none" }>
      <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}>
        <span className="q-icon" style={{ background: "var(--tl)", color: "var(--teal)" }}>🧩</span>
        <span style={{ flex: "1" }}>Preciso usar todos os 22 módulos ou posso começar parcialmente?</span>
        <span className="arr">▼</span>
      </button>
      <div className="faq-a">
        <strong>Cada empresa ativa apenas os módulos que precisa.</strong> No painel de administração, você habilita ou desabilita módulos com um clique — sem reinstalação, sem custo extra por módulo. A sugestão para quem está começando:
        <ul>
          <li>Comece por <strong>CRM + Financeiro</strong> para controlar vendas e fluxo de caixa</li>
          <li>Ative <strong>Contabilidade + Fiscal</strong> quando precisar de escrituração automática</li>
          <li>Adicione <strong>Tickets, Checklists e Projetos</strong> conforme a operação escalar</li>
          <li>Habilite <strong>BI, Workflows e Chat</strong> para automação e inteligência avançada</li>
        </ul>
      </div>
    </div>

    <div className="faq-it" data-fcat="produto" style={ display: activeFaqCat === "all" || activeFaqCat === "produto" ? undefined : "none" }>
      <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}>
        <span className="q-icon" style={{ background: "var(--tl)", color: "var(--teal)" }}>🤖</span>
        <span style={{ flex: "1" }}>O que exatamente o módulo de BI com IA faz?</span>
        <span className="arr">▼</span>
      </button>
      <div className="faq-a">
        O módulo de <strong>Business Intelligence</strong> oferece dashboards customizáveis, relatórios avançados e análises assistidas por inteligência artificial. Na prática:
        <ul>
          <li>Gera insights sobre padrões de receita, despesa e inadimplência</li>
          <li>Identifica anomalias automaticamente e dispara alertas</li>
          <li>Permite criar relatórios gerenciais sob demanda com exportação em PDF e Excel</li>
          <li>São <strong>6 permissões granulares</strong> que controlam quem vê o quê</li>
        </ul>
      </div>
    </div>

    <div className="faq-it" data-fcat="produto" style={ display: activeFaqCat === "all" || activeFaqCat === "produto" ? undefined : "none" }>
      <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}>
        <span className="q-icon" style={{ background: "var(--tl)", color: "var(--teal)" }}>🔗</span>
        <span style={{ flex: "1" }}>Com quais sistemas o Ruphus se integra?</span>
        <span className="arr">▼</span>
      </button>
      <div className="faq-a">
        O módulo de <strong>Integrações</strong> conecta o Ruphus a sistemas externos nativamente. Hoje os conectores ativos incluem:
        <ul>
          <li><strong>Superlógica</strong> — sincronização de dados entre plataformas</li>
          <li><strong>WhatsApp via Z-API</strong> — régua de cobrança e comunicação automatizada</li>
          <li><strong>Boletos e Pix</strong> — emissão e conciliação bancária</li>
          <li><strong>NFe.io</strong> — emissão de notas fiscais eletrônicas</li>
          <li><strong>Mercado Pago</strong> — processamento de pagamentos</li>
        </ul>
        Novos conectores são adicionados sob demanda. Solicite durante a demonstração.
      </div>
    </div>

    {/* IMPLANTAÇÃO */}
    <div className="faq-it" data-fcat="implantacao" style={ display: activeFaqCat === "all" || activeFaqCat === "implantacao" ? undefined : "none" }>
      <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}>
        <span className="q-icon" style={{ background: "var(--al)", color: "var(--amber)" }}>⏱</span>
        <span style={{ flex: "1" }}>Quanto tempo leva para implantar o Ruphus?</span>
        <span className="arr">▼</span>
      </button>
      <div className="faq-a">
        Depende da complexidade da operação, mas o processo é desenhado para ser rápido:
        <ul>
          <li><strong>Setup básico (CRM + Financeiro):</strong> mesmo dia</li>
          <li><strong>Com Contabilidade e regras de rateio:</strong> 1-3 dias úteis</li>
          <li><strong>Implantação completa (22 módulos + migração):</strong> 5-10 dias úteis</li>
        </ul>
        Cada implantação inclui acompanhamento dedicado da equipe Ruphus para configuração, treinamento e validação dos dados.
      </div>
    </div>

    <div className="faq-it" data-fcat="implantacao" style={ display: activeFaqCat === "all" || activeFaqCat === "implantacao" ? undefined : "none" }>
      <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}>
        <span className="q-icon" style={{ background: "var(--al)", color: "var(--amber)" }}>📂</span>
        <span style={{ flex: "1" }}>Como funciona a migração de dados do sistema atual?</span>
        <span className="arr">▼</span>
      </button>
      <div className="faq-a">
        <strong>Nossa equipe cuida da migração completa.</strong> Importamos dados de planilhas, sistemas legados e ERPs anteriores (incluindo Superlógica). O processo:
        <ul>
          <li>Mapeamento dos dados atuais e definição do plano de migração</li>
          <li>Importação e validação em ambiente de homologação</li>
          <li>Conferência com sua equipe antes de ativar em produção</li>
          <li>Período de operação paralela, se necessário</li>
        </ul>
        O prazo varia de 1 a 5 dias úteis dependendo do volume e complexidade.
      </div>
    </div>

    <div className="faq-it" data-fcat="implantacao" style={ display: activeFaqCat === "all" || activeFaqCat === "implantacao" ? undefined : "none" }>
      <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 6 ? null : 6)}>
        <span className="q-icon" style={{ background: "var(--al)", color: "var(--amber)" }}>🎓</span>
        <span style={{ flex: "1" }}>Existe treinamento para a equipe?</span>
        <span className="arr">▼</span>
      </button>
      <div className="faq-a">
        <strong>Sim, e está incluído no processo de implantação.</strong> O treinamento é prático e contextualizado ao seu cenário:
        <ul>
          <li>Sessões ao vivo por módulo com exemplos reais da sua operação</li>
          <li>Documentação interna com passo a passo e vídeos curtos</li>
          <li>Canal de suporte direto durante os primeiros 30 dias</li>
          <li>Retreinamentos sob demanda quando novos módulos são ativados</li>
        </ul>
      </div>
    </div>

    {/* SEGURANÇA */}
    <div className="faq-it" data-fcat="seguranca" style={ display: activeFaqCat === "all" || activeFaqCat === "seguranca" ? undefined : "none" }>
      <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 7 ? null : 7)}>
        <span className="q-icon" style={{ background: "var(--vl)", color: "var(--violet)" }}>🔒</span>
        <span style={{ flex: "1" }}>Como meus dados estão protegidos?</span>
        <span className="arr">▼</span>
      </button>
      <div className="faq-a">
        A segurança é implementada em múltiplas camadas — não é apenas marketing:
        <ul>
          <li><strong>Supabase com Row Level Security (RLS):</strong> isolamento total entre empresas no nível do banco de dados</li>
          <li><strong>SSL/TLS + HSTS Preload:</strong> toda comunicação é criptografada com certificação preload</li>
          <li><strong>Vercel Edge Network:</strong> infraestrutura distribuída globalmente com cache inteligente</li>
          <li><strong>Sentry Monitoring:</strong> monitoramento contínuo de erros e performance</li>
          <li><strong>257 permissões granulares:</strong> controle fino de quem acessa o quê em cada módulo</li>
          <li><strong>LGPD:</strong> conformidade total com a Lei Geral de Proteção de Dados</li>
        </ul>
      </div>
    </div>

    <div className="faq-it" data-fcat="seguranca" style={ display: activeFaqCat === "all" || activeFaqCat === "seguranca" ? undefined : "none" }>
      <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 8 ? null : 8)}>
        <span className="q-icon" style={{ background: "var(--vl)", color: "var(--violet)" }}>💾</span>
        <span style={{ flex: "1" }}>Os dados ficam no Brasil? Existem backups?</span>
        <span className="arr">▼</span>
      </button>
      <div className="faq-a">
        <strong>Sim.</strong> A infraestrutura é hospedada em provedores com presença no Brasil. Backups automáticos diários são realizados com retenção configurável. Em caso de necessidade, a restauração é feita em minutos — com suporte da equipe Ruphus.
      </div>
    </div>

    {/* COMERCIAL */}
    <div className="faq-it" data-fcat="comercial" style={ display: activeFaqCat === "all" || activeFaqCat === "comercial" ? undefined : "none" }>
      <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 9 ? null : 9)}>
        <span className="q-icon" style={{ background: "var(--cl)", color: "var(--coral)" }}>💰</span>
        <span style={{ flex: "1" }}>Quanto custa o Ruphus?</span>
        <span className="arr">▼</span>
      </button>
      <div className="faq-a">
        <strong>O investimento é personalizado</strong> — depende do porte da operação, número de empresas gerenciadas e módulos necessários. Não trabalhamos com tabela fixa porque cada operação tem necessidades diferentes. <strong>Agende uma demonstração</strong> e receba um orçamento sob medida, sem compromisso e sem surpresas.
      </div>
    </div>

    <div className="faq-it" data-fcat="comercial" style={ display: activeFaqCat === "all" || activeFaqCat === "comercial" ? undefined : "none" }>
      <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 10 ? null : 10)}>
        <span className="q-icon" style={{ background: "var(--cl)", color: "var(--coral)" }}>🔍</span>
        <span style={{ flex: "1" }}>É possível ver o sistema funcionando antes de contratar?</span>
        <span className="arr">▼</span>
      </button>
      <div className="faq-a">
        <strong>Com certeza.</strong> A demonstração é gratuita, personalizada e sem compromisso. Durante a sessão:
        <ul>
          <li>Mostramos o sistema rodando com dados reais do seu cenário</li>
          <li>Navegamos pelos módulos que fazem sentido para sua operação</li>
          <li>Respondemos dúvidas técnicas e operacionais ao vivo</li>
          <li>Montamos um orçamento e um plano de implantação personalizados</li>
        </ul>
        Nenhum cartão de crédito. Nenhuma pegadinha.
      </div>
    </div>

    <div className="faq-it" data-fcat="comercial" style={ display: activeFaqCat === "all" || activeFaqCat === "comercial" ? undefined : "none" }>
      <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 11 ? null : 11)}>
        <span className="q-icon" style={{ background: "var(--cl)", color: "var(--coral)" }}>📡</span>
        <span style={{ flex: "1" }}>Como acompanho a evolução do produto?</span>
        <span className="arr">▼</span>
      </button>
      <div className="faq-a">
        O Ruphus evolui toda semana — e você acompanha de perto:
        <ul>
          <li><strong>Ecossistema público:</strong> todos os 22 módulos e seus status estão visíveis neste site</li>
          <li><strong>Changelog semanal:</strong> clientes recebem por email as novas funcionalidades entregues</li>
          <li><strong>Canal direto:</strong> sugestões e feedbacks entram no backlog de desenvolvimento com prioridade</li>
        </ul>
        Você não compra um software congelado — entra em uma plataforma que melhora continuamente.
      </div>
    </div>

  </div>

  {/* FAQ CTA */}
  <div className="faq-cta" data-r>
    <p><strong>Não encontrou sua pergunta?</strong> Fale direto com a equipe — sem robô, sem fila.</p>
    <button type="button" className="btn btn-t" onClick={openModal}>Agendar conversa →</button>
  </div>
</div>
</section>

{/* DEMO CTA (replaces pricing) */}
<section className="demo-cta" id="contato" aria-label="Solicitar demonstração">
<div className="w">
<div className="demo-box" data-r>
  <div className="demo-left">
    <h2>Veja o Ruphus em ação — sem compromisso</h2>
    <p>Agende uma demonstração personalizada. Mostramos o sistema funcionando com dados do seu cenário e preparamos um orçamento sob medida.</p>
    <div className="demo-form" id="demo-inline">
      <div className="fg" id="fg-di-nome">
        <label>Nome *</label>
        <input type="text" placeholder="Seu nome completo" id="di-nome" autoComplete="name" onInput={(e) => vNome(e.currentTarget)} onBlur={(e) => vNome(e.currentTarget)}/>
        <span className="vicon"></span>
        <div className="hint">Mínimo 3 caracteres</div>
      </div>
      <div className="fg" id="fg-di-email">
        <label>Email *</label>
        <input type="email" placeholder="nome@empresa.com.br" id="di-email" autoComplete="email" onInput={(e) => vEmail(e.currentTarget)} onBlur={(e) => vEmail(e.currentTarget)}/>
        <span className="vicon"></span>
        <div className="hint">Use seu email profissional</div>
      </div>
      <div className="fg" id="fg-di-fone">
        <label>WhatsApp</label>
        <input type="tel" placeholder="(00) 00000-0000" id="di-fone" autoComplete="tel" maxLength="15" onInput={(e) => { maskFone(e.currentTarget); vFone(e.currentTarget) }} onBlur={(e) => vFone(e.currentTarget)}/>
        <span className="vicon"></span>
        <div className="hint">Formato: (00) 00000-0000</div>
      </div>
      <div><label>Porte da operação</label>
        <select id="di-porte"><option>1-10 colaboradores</option><option>11-50 colaboradores</option><option>51-200 colaboradores</option><option>200+</option></select>
      </div>
      <button type="button" className="btn btn-t btn-submit" id="btn-inline" disabled={!inlineValid} style={{ width: "100%", padding: "13px" }} disabled onClick={submitInline}>Agendar demonstração gratuita →</button>
      <div className="note">Respondemos em até 2h · Sem cartão · Sem compromisso</div>
    </div>
  </div>
  <div className="demo-right">
    <h3>O que você ganha na demonstração</h3>
    <div className="demo-sts">
      <div className="demo-st"><div className="demo-st-v">22</div><div className="demo-st-l">Módulos integrados</div></div>
      <div className="demo-st"><div className="demo-st-v">257</div><div className="demo-st-l">Permissões granulares</div></div>
    </div>
    <div className="demo-features">
      <div className="demo-feat">✓ Sistema funcionando com dados reais</div>
      <div className="demo-feat">✓ Orçamento personalizado sem surpresas</div>
      <div className="demo-feat">✓ Plano de implantação e migração</div>
      <div className="demo-feat">✓ BI com IA e Chat integrados</div>
      <div className="demo-feat">✓ Integração com Superlógica e ERPs</div>
    </div>
  </div>
</div>
</div>
</section>

{/* FOOTER */}
</main>
<footer role="contentinfo">
<div className="w">
  <div className="ft-top">
    <div className="ft-brand"><a href="/" className="logo" style={{ fontSize: "1.1rem" }}><svg viewBox="0 0 40 40" fill="none" width="26" height="26" role="img" aria-label="Logo Ruphus"><defs><linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3B82F6"/><stop offset="50%" stopColor="#8B5CF6"/><stop offset="100%" stopColor="#EC4899"/></linearGradient></defs><path d="M20 2L36.66 11V29L20 38L3.34 29V11L20 2Z" stroke="url(#lg2)" strokeWidth="2" fill="none"/><path d="M14 12H22C24.5 12 26.5 14 26.5 16.5C26.5 19 24.5 21 22 21H18L26 28" stroke="url(#lg2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M14 12V28" stroke="url(#lg2)" strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg>Ruphus</a><p>ERP completo com 22 módulos integrados — Vendas, CRM, Financeiro, Contábil, Fiscal, BI com IA, Chat, Workflows e mais. Em evolução contínua.</p></div>
    <div className="ft-col"><h5>Produto</h5><a href="#modulos">Módulos</a><a href="#roadmap">Ecossistema</a><a href="#calculadora">Calculadora ROI</a><a href="#contato">Demonstração</a></div>
    <div className="ft-col"><h5>Recursos</h5><a href="#educacao">Deep Dives</a><a href="#educacao">Playbooks</a><a href="#educacao">Lab</a><a href="#educacao">Newsletter</a></div>
    <div className="ft-col"><h5>Legal</h5><a href="#">Termos</a><a href="#">Privacidade</a><a href="#">LGPD</a><a href="#">Segurança</a></div>
  </div>
  <div className="ft-bot"><span>© 2026 Ruphus. Todos os direitos reservados. Plataforma em evolução contínua.</span><span>Feito no Brasil 🇧🇷</span></div>
</div>
</footer>

{/* MODAL */}
<div className={`modal-bg ${modalOpen ? 'open' : ''}`} id="modal" onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}>
  <div className="modal">
    <button type="button" className="modal-x" onClick={closeModal} aria-label="Fechar modal">✕</button>
    <h3>Agendar demonstração</h3>
    <div className="sub">Preencha e nossa equipe entra em contato em até 2h.</div>
    <div className="fg" id="fg-m-nome">
      <label>Nome *</label>
      <input type="text" placeholder="Seu nome completo" id="m-nome" autoComplete="name" onInput={(e) => vNome(e.currentTarget)} onBlur={(e) => vNome(e.currentTarget)}/>
      <span className="vicon"></span>
      <div className="hint">Mínimo 3 caracteres</div>
    </div>
    <div className="fg" id="fg-m-email">
      <label>Email corporativo *</label>
      <input type="email" placeholder="nome@empresa.com.br" id="m-email" autoComplete="email" onInput={(e) => vEmail(e.currentTarget)} onBlur={(e) => vEmail(e.currentTarget)}/>
      <span className="vicon"></span>
      <div className="hint">Use seu email profissional</div>
    </div>
    <div className="fg" id="fg-m-fone">
      <label>WhatsApp</label>
      <input type="tel" placeholder="(00) 00000-0000" id="m-fone" autoComplete="tel" maxLength="15" onInput={(e) => { maskFone(e.currentTarget); vFone(e.currentTarget) }} onBlur={(e) => vFone(e.currentTarget)}/>
      <span className="vicon"></span>
      <div className="hint">Formato: (00) 00000-0000</div>
    </div>
    <label>Porte da operação</label>
    <select id="m-porte"><option>1-10 colaboradores</option><option>11-50 colaboradores</option><option>51-200 colaboradores</option><option>200+</option></select>
    <label>O que mais interessa?</label>
    <select id="m-interesse"><option>CRM + Financeiro</option><option>Módulo Contábil</option><option>BI & Analytics</option><option>Todos os módulos</option></select>
    <button type="button" className="btn btn-t btn-submit" id="btn-modal" disabled={!modalValid} style={{ width: "100%", padding: "13px", marginTop: "4px" }} disabled onClick={submitModal}>Agendar agora →</button>
  </div>
</div>

{/* TOAST */}
<div className={`toast ${toastVisible ? 'show' : ''}`} id="toast-el">✓ <span id="toast-msg">{toastMsg}</span></div>

{/* WHATSAPP FAB */}
<a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className="wa-fab" aria-label="WhatsApp">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Ícone WhatsApp"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>    </>
  )
}
