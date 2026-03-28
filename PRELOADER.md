# Ruphus ERP — Preloader Personalizado

## Guia de Implementação para Next.js 16 + Firebase

---

## 1. Visão Geral

O preloader é uma tela de carregamento com a identidade visual do Ruphus que aparece enquanto a aplicação está sendo inicializada. Ele oferece feedback visual ao usuário durante o carregamento de assets, autenticação Firebase e hidratação dos componentes React.

### Anatomia Visual

```
┌─────────────────────────────────────────────┐
│                                             │
│              ·  (dot orbiting)              │
│          ╱‾‾‾‾‾‾╲                           │
│         ╱  ┌──┐   ╲   ← hexágono rotativo  │
│        │   │R │    │   ← letra R pulsante   │
│         ╲  └──┘   ╱                         │
│     ·    ╲______╱    ·  ← dots orbitando    │
│                                             │
│           Ruphus        ← nome (fadeUp)     │
│    CARREGANDO SUA EXPERIÊNCIA  ← tagline    │
│    ═══════════════════  ← progress bar      │
│    ████████████░░░░░░░   (gradient animado) │
│                                             │
└─────────────────────────────────────────────┘
```

### Cores e Gradients

| Elemento | Cor/Gradient |
|----------|-------------|
| Hexágono (borda) | `linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)` |
| Letra R | `linear-gradient(135deg, #f97c2b, #EC4899)` |
| Dots orbitando | `#f97c2b` (brand teal) |
| Nome "Ruphus" | `var(--fg)` (adapta ao tema) |
| Tagline | `var(--muted)` (adapta ao tema) |
| Progress bar track | `var(--brd)` (adapta ao tema) |
| Progress bar fill | `linear-gradient(90deg, #f97c2b, #3B82F6, #8B5CF6, #EC4899)` |
| Background | `var(--bg)` (adapta ao tema light/dark) |

---

## 2. Animações (5 keyframes)

### 2.1 `plSpin` — Rotação do hexágono
```
Duração: 2.5s
Easing: cubic-bezier(.4, 0, .2, 1) — smooth acceleration/deceleration
Loop: infinite
Direção: normal (sentido horário)
```

### 2.2 `plPulse` — Pulsação da letra R
```
Duração: 2.5s
Easing: ease-in-out
Ciclo: scale(1) → scale(1.08) → scale(1) com opacity 1 → 0.8 → 1
Loop: infinite
Efeito: "respiração" suave — dá sensação de vida ao logo
```

### 2.3 `plSpin reverse` — Órbita dos dots
```
Duração: 3s
Easing: linear
Loop: infinite
Direção: reverse (sentido anti-horário)
Efeito: parallax visual com o hexágono girando no sentido oposto
```

### 2.4 `plFadeUp` — Entrada dos textos
```
Duração: 0.6s
Easing: ease
Delays: nome=0.2s, tagline=0.4s, barra=0.5s
Efeito: translateY(8px) + opacity(0) → posição normal + opacity(1)
```

### 2.5 `plProgress` — Preenchimento da barra
```
Duração: 1.2s
Easing: cubic-bezier(.4, 0, .2, 1)
Delay: 0.3s
Ciclo: width 0% → 70% (rápido) → 100% (lento)
Fill-mode: forwards (mantém 100% ao final)
```

---

## 3. Comportamento e Ciclo de Vida

```
[Página inicia carregamento]
     │
     ├── Preloader visível imediatamente (HTML inline no <body>)
     │     ├── Hexágono começa a girar
     │     ├── R pulsa
     │     ├── Dots orbitam
     │     ├── Nome/tagline fazem fadeUp (0.2s, 0.4s)
     │     └── Progress bar preenche (0.3s delay → 1.2s fill)
     │
     ├── [window.load dispara] (todos os assets carregados)
     │     └── setTimeout(dismiss, 800ms) ← espera progress bar terminar
     │
     ├── [Safety timeout: 3000ms] ← caso load não dispare
     │     └── dismiss() forçado
     │
     └── dismiss():
           ├── Adiciona classe .done
           │     ├── opacity: 0 (transition 0.5s)
           │     └── visibility: hidden
           └── setTimeout(pl.remove(), 600ms) ← remove do DOM
```

### Tempo total visível: ~1.2s a 1.8s (típico)

---

## 4. Implementação Next.js 16 (App Router)

### 4.1 Componente React

```tsx
// src/components/Preloader.tsx
'use client';

import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    const dismiss = () => {
      setRemoving(true);
      setTimeout(() => setVisible(false), 600);
    };

    // Dismiss after window fully loaded + animation time
    const onLoad = () => setTimeout(dismiss, 800);
    
    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
    }

    // Safety: dismiss after 3s max
    const safety = setTimeout(dismiss, 3000);

    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(safety);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`${styles.preloader} ${removing ? styles.done : ''}`}>
      <div className={styles.logo}>
        {/* Hexágono rotativo */}
        <div className={styles.hex}>
          <svg viewBox="0 0 40 40" fill="none">
            <defs>
              <linearGradient id="plg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <path
              d="M20 2L36.66 11V29L20 38L3.34 29V11L20 2Z"
              stroke="url(#plg)"
              strokeWidth="1.5"
              fill="none"
              opacity=".3"
            />
          </svg>
        </div>

        {/* Letra R pulsante */}
        <div className={styles.r}>
          <svg viewBox="0 0 40 40" fill="none">
            <defs>
              <linearGradient id="plg2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97c2b" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <path
              d="M14 12H22C24.5 12 26.5 14 26.5 16.5C26.5 19 24.5 21 22 21H18L26 28"
              stroke="url(#plg2)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M14 12V28"
              stroke="url(#plg2)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Dots orbitando */}
        <div className={styles.dots}>
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>
      </div>

      <div className={styles.name}>Ruphus</div>
      <div className={styles.tag}>Carregando sua experiência</div>
      <div className={styles.bar}>
        <div className={styles.barFill} />
      </div>
    </div>
  );
}
```

### 4.2 CSS Module

```css
/* src/components/Preloader.module.css */

.preloader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  transition: opacity 0.5s, visibility 0.5s;
}

.done {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

/* Logo container */
.logo {
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 28px;
}

/* Hexágono rotativo */
.hex {
  position: absolute;
  inset: 0;
  animation: plSpin 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
.hex svg {
  width: 80px;
  height: 80px;
}

/* Letra R pulsante */
.r {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: plPulse 2.5s ease-in-out infinite;
}
.r svg {
  width: 32px;
  height: 32px;
}

/* Dots orbitando */
.dots {
  position: absolute;
  inset: -12px;
  animation: plSpin 3s linear infinite reverse;
}
.dot {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #f97c2b;
}
.dot:nth-child(1) {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.dot:nth-child(2) {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.5;
}
.dot:nth-child(3) {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  opacity: 0.3;
}

/* Textos */
.name {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--fg);
  margin-bottom: 6px;
  animation: plFadeUp 0.6s ease 0.2s both;
}
.tag {
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 500;
  animation: plFadeUp 0.6s ease 0.4s both;
}

/* Progress bar */
.bar {
  width: 120px;
  height: 2px;
  border-radius: 2px;
  background: var(--brd);
  margin-top: 20px;
  overflow: hidden;
  animation: plFadeUp 0.6s ease 0.5s both;
}
.barFill {
  height: 100%;
  width: 0;
  border-radius: 2px;
  background: linear-gradient(90deg, #f97c2b, #3B82F6, #8B5CF6, #EC4899);
  animation: plProgress 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
}

/* Keyframes */
@keyframes plSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes plPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.08); opacity: 0.8; }
}
@keyframes plFadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
@keyframes plProgress {
  0% { width: 0; }
  60% { width: 70%; }
  100% { width: 100%; }
}

/* Acessibilidade: respeita preferência de movimento reduzido */
@media (prefers-reduced-motion: reduce) {
  .hex, .dots, .r { animation: none; }
  .barFill { animation: plProgress 1s linear 0.1s forwards; }
}
```

### 4.3 Uso no Layout Root

```tsx
// src/app/layout.tsx
import { Preloader } from '@/components/Preloader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
```

---

## 5. Variação: Com Progresso de Autenticação Firebase

Para usar o preloader durante a verificação do Firebase Auth:

```tsx
// src/components/Preloader.tsx (variante com auth)
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import styles from './Preloader.module.css';

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [removing, setRemoving] = useState(false);
  const [status, setStatus] = useState('Carregando sua experiência');

  useEffect(() => {
    const dismiss = () => {
      setRemoving(true);
      setTimeout(() => setVisible(false), 600);
    };

    // Step 1: Wait for auth state
    setStatus('Verificando acesso');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setStatus('Preparando seu painel');
      } else {
        setStatus('Pronto');
      }
      // Dismiss after auth resolved + animation
      setTimeout(dismiss, 600);
    });

    // Safety timeout
    const safety = setTimeout(dismiss, 5000);

    return () => {
      unsubscribe();
      clearTimeout(safety);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`${styles.preloader} ${removing ? styles.done : ''}`}>
      {/* ... mesmo JSX do logo, nome, dots ... */}
      <div className={styles.tag}>{status}</div>
      <div className={styles.bar}>
        <div className={styles.barFill} />
      </div>
    </div>
  );
}
```

---

## 6. Especificações Técnicas

### Dimensões

| Elemento | Tamanho |
|----------|---------|
| Container logo | 80×80px |
| SVG hexágono | 80×80px (viewBox 40×40) |
| SVG letra R | 32×32px (viewBox 40×40) |
| Dots | 5×5px cada |
| Órbita dos dots | inset -12px (104×104px total) |
| Progress bar | 120×2px |
| Nome "Ruphus" | font-size 1.1rem |
| Tagline | font-size 0.68rem |

### Timing

| Evento | Tempo |
|--------|-------|
| Hexágono gira 360° | 2.5s |
| R pulsa 1 ciclo | 2.5s |
| Dots orbitam 360° | 3.0s |
| Nome aparece | delay 0.2s + 0.6s |
| Tagline aparece | delay 0.4s + 0.6s |
| Barra aparece | delay 0.5s + 0.6s |
| Barra preenche | delay 0.3s + 1.2s |
| Dismiss após load | +800ms |
| Safety timeout | 3000ms |
| Fade-out | 500ms |
| Remove do DOM | 600ms após fade |

### Z-index
- Preloader: `9999` (acima de tudo)

### Suporta
- Light mode e Dark mode (usa CSS variables)
- `prefers-reduced-motion: reduce` (desliga animações)
- iOS safe area (env())
- SSR/SSG (renderiza no server, anima no client)

---

## 7. SVG Paths de Referência

### Hexágono (logo shape)
```
M20 2 L36.66 11 V29 L20 38 L3.34 29 V11 L20 2 Z
```
- ViewBox: 0 0 40 40
- Stroke: gradient blue→purple→pink
- Fill: none
- Opacity: 0.3 (sutil)

### Letra R (logo mark)
```
Traço superior + curva:
M14 12 H22 C24.5 12 26.5 14 26.5 16.5 C26.5 19 24.5 21 22 21 H18 L26 28

Traço vertical:
M14 12 V28
```
- Stroke: gradient teal→pink
- StrokeWidth: 2.5
- StrokeLinecap: round
- StrokeLinejoin: round
- Fill: none
