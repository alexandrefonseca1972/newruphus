# Ruphus ERP — Especificação das Páginas de Autenticação

> Para recriação no projeto Next.js 16 + Firebase Auth
> Referência visual ao vivo: https://newruphus.vercel.app/login

---

## Sumário

1. Design System Compartilhado (tokens, fontes, cores)
2. Componente Compartilhado: Brand Panel (lado esquerdo)
3. Página /login
4. Página /forgot-password
5. Página /logout
6. SVG Assets (logo, ícones)
7. Animações
8. Integração com Firebase Auth
9. Responsividade

---

## 1. Design System Compartilhado

### Fontes (Google Fonts)

```
Fraunces — variável opsz 9-144, pesos 500/700/900 (serif, para títulos e marca)
Outfit — pesos 400/500/600/700 (sans-serif, para corpo e UI)
JetBrains Mono — pesos 400/600 (monospace, para números e métricas)
```

### CSS Variables (Light Mode)

```css
--cream: #FAF7F2    /* background principal */
--white: #FFF       /* background cards/inputs */
--sand: #F0EBE3     /* background secundário */
--stone: #E5DFD5    /* bordas */
--ink: #1A1A1A      /* texto principal */
--ink3: #6B6B6B     /* texto muted */
--teal: #f97c2b     /* cor da marca (laranja) — ATENÇÃO: chama "teal" mas é laranja */
--tl: #FEF0E5       /* background claro da marca */
--td: #D46620       /* hover da marca (laranja escuro) */
--red: #E8634A      /* erros */
```

### CSS Variables (Dark Mode — classe `html.dark`)

```css
--bg: #0D0F14
--fg: #F0F0F8
--muted: #8888A0
--brd: #252536
--card: #1A1C24
--tl: rgba(249,124,43,.1)
```

### Aliases semânticos

```css
--bg: var(--cream)     /* adapta ao tema */
--fg: var(--ink)
--muted: var(--ink3)
--brd: var(--stone)
--card: var(--white)
--serif: 'Fraunces', Georgia, serif
--sans: 'Outfit', system-ui, sans-serif
--mono: 'JetBrains Mono', monospace
```

---

## 2. Componente Compartilhado: Brand Panel (lado esquerdo)

As 3 páginas (/login, /forgot-password, /logout) compartilham o mesmo layout split-screen. O lado esquerdo é idêntico em todas.

### Layout

```
┌──────────────────────────────┬───────────────┐
│                              │               │
│   BRAND PANEL (flex:1)       │  FORM PANEL   │
│                              │  (460px)      │
│   Background: foto Unsplash  │               │
│   + gradient overlay         │  Formulário   │
│   + partículas flutuantes    │  específico   │
│                              │  de cada      │
│   Conteúdo posicionado       │  página       │
│   na parte inferior          │               │
│   (justify-content:flex-end) │               │
│                              │               │
│   ┌─────────────────────┐    │               │
│   │ Logo + "Ruphus"     │    │               │
│   │ Headline             │    │               │
│   │ Descrição            │    │               │
│   │ [22] [5.470+] [5] [99.5%]│               │
│   └─────────────────────┘    │               │
│                              │               │
└──────────────────────────────┴───────────────┘
```

### Background Image

```
URL: https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80
Descrição: Terra vista do espaço com linhas de rede/dados (NASA-style)
CSS: position:absolute; inset:0; background: url(...) center/cover no-repeat
```

### Gradient Overlay (sobre a imagem)

```css
background: linear-gradient(
  180deg,
  rgba(0,0,0,.15) 0%,      /* topo: quase transparente */
  rgba(0,0,0,.1) 40%,       /* meio: muito leve */
  rgba(13,15,20,.75) 70%,   /* 3/4: escurece forte */
  rgba(13,15,20,.95) 100%   /* base: quase opaco (onde fica o texto) */
);
```

### Partículas Flutuantes

8 pontos de 2px subindo do fundo ao topo. Cor: `rgba(249,124,43,.6)` (laranja translúcido).

```
Partícula 1: left:10%, duração:14s, delay:0s
Partícula 2: left:25%, duração:11s, delay:3s
Partícula 3: left:40%, duração:16s, delay:1s
Partícula 4: left:55%, duração:13s, delay:5s
Partícula 5: left:70%, duração:10s, delay:2s
Partícula 6: left:85%, duração:15s, delay:4s
Partícula 7: left:35%, duração:18s, delay:7s
Partícula 8: left:65%, duração:12s, delay:6s
```

Animação `floatUp`:
```
0%:   translateY(100vh) scale(0), opacity:0
10%:  opacity:1
90%:  opacity:.6
100%: translateY(-20px) scale(1.5), opacity:0
```

### Conteúdo do Brand Panel

De cima para baixo:

1. **Logo SVG** (36×36px) + texto "Ruphus" (Fraunces 700, 1.2rem, branco 85%)
2. **Headline**: "Sua empresa. Seus dados. Sob *controle.*" (Fraunces 900, clamp 2-3.2rem, branco)
   - Palavra "controle" em `<em>`: italic, peso 500, cor `#f97c2b`
3. **Descrição**: "22 módulos integrados com IA nativa para PMEs brasileiras. Do CRM ao BI preditivo, tudo em uma plataforma que evolui toda semana." (Outfit 400, .88rem, branco 55%)
4. **Barra de métricas (glass effect)**:

```
┌──────────┬──────────┬──────────┬──────────┐
│  [grid]  │ [check]  │  [brain] │  [bolt]  │
│    22    │  5.470+  │    5     │  99.5%   │
│ MÓDULOS  │  TESTES  │ IAS NAT. │  UPTIME  │
└──────────┴──────────┴──────────┴──────────┘
```

Cada métrica tem:
- Ícone SVG 20×20px na cor `#f97c2b`
- Valor: JetBrains Mono 700, 1.15rem, branco
- Label: Outfit 500, .58rem, branco 40%, uppercase, letter-spacing .03em

Efeito glass:
```css
background: rgba(255,255,255,.04);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border-right: 1px solid rgba(255,255,255,.06);
```

Container: `border-radius:14px; overflow:hidden; background:rgba(255,255,255,.06)`

### Animação do Brand Content

Cada filho direto de `.brand-content` faz fadeIn com stagger:
```
filho 1: delay 0s
filho 2: delay 0.1s
filho 3: delay 0.2s
filho 4: delay 0.3s
```

---

## 3. Página /login

### Rota: `/login`
### Título: "Entrar — Ruphus ERP"

### Form Panel (lado direito, 460px)

Background: `var(--bg)` (creme em light, #0D0F14 em dark).
Border-left: `1px solid var(--brd)`.
Padding: 48px. Conteúdo centralizado (max-width 340px).

### Elementos do form (de cima para baixo)

#### A. Top bar
- Esquerda: link "← Voltar ao site" → `/` (Outfit 500, .75rem, muted, com SVG arrow 16×16)
- Direita: botão circular dark/light toggle (34×34px, borda, ícone ☀/☾)

#### B. Header
- H1: "Bem-vindo de volta" (Fraunces 800, 1.7rem)
- Subtítulo: "Acesse o painel do seu ERP." (Outfit 400, .84rem, muted)

#### C. Campo Email
- Label: "Email corporativo" (Outfit 600, .72rem, letter-spacing .02em)
- Input: type=email, placeholder "nome@empresa.com.br", autocomplete="email", autofocus
- Validação: regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`
- Erro: "Informe seu email corporativo" ou "Email inválido"
- Estilo input: padding 11px 14px, border-radius 10px, border 1.5px solid var(--brd), font-size **16px** (obrigatório para evitar zoom no iOS)
- Focus: borda muda para var(--teal), box-shadow 0 0 0 3px rgba(249,124,43,.08)
- Erro: borda muda para var(--red), box-shadow rgba(232,99,74,.08)

#### D. Campo Senha
- Label: "Senha"
- Input: type=password, placeholder "••••••••", autocomplete="current-password"
- Padding-right: 46px (espaço para o botão toggle)
- **Botão toggle**: posição absoluta à direita, min-height/width 44px (touch target)
  - Ícone SVG eye (visível) / eye-off (oculto)
  - Toggle alterna `input.type` entre "password" e "text"
- Validação: apenas vazio (não valida complexidade — é login, não cadastro)

#### E. Linha checkbox + esqueceu senha
- Esquerda: checkbox customizado "Manter conectado" (checked por padrão)
  - Checkbox: 16×16px, border-radius 4px, quando checked: background teal + check ✓ branco
- Direita: link "Esqueceu a senha?" → `/forgot-password` (cor teal, .78rem, peso 500)

#### F. Botão Submit
- Texto: "Entrar"
- Estilo: width 100%, padding 13px, border-radius 10px, background var(--teal), branco, Outfit 600 .88rem
- min-height: 46px
- Hover: background var(--td), translateY(-1px), box-shadow 0 8px 24px rgba(249,124,43,.25)
- Efeito shine: `::after` com gradiente linear que desliza left→right no hover
- Loading state: classe `.loading` esconde `.btn-text`, mostra `.spinner`
- Spinner: 16×16px circle border animation (borda branca parcial girando)
- Disabled: opacity .7, cursor not-allowed

#### G. Divider "protegido por"
- Linha horizontal com texto centralizado: `────── protegido por ──────`
- Texto: .62rem, muted, uppercase, letter-spacing .08em, peso 600

#### H. Trust Row (3 items inline)
```
[shield] Firestore Rules    [lock] AES-256    [document] LGPD
```
- Cada item: ícone SVG 13×13px cor teal + texto .65rem muted peso 500
- Flex row, gap 14px, centralizado

#### I. Footer
- Texto: "© 2026 Ruphus · Privacidade · Termos · Segurança"
- Links para: /privacidade, /termos, /seguranca
- Estilo: .62rem, muted, opacity .5, margin-top auto (empurra para o fundo)

### Toast Notification
- Elemento fixo no bottom center
- Estilo: padding 12px 24px, border-radius 12px, .82rem peso 500
- Background: var(--fg), cor: var(--bg) (inverte o tema)
- Animação: translateY(20px→0) + opacity(0→1)
- Duração: 3 segundos

### Comportamento de Login (JS)

```
1. Usuário clica "Entrar" ou pressiona Enter
2. Limpa todos os erros anteriores
3. Valida email (vazio + formato regex)
4. Valida senha (vazio)
5. Se erro:
   - Adiciona classe .error ao campo
   - Mostra mensagem de erro (.field-error)
   - Shake animation no input (translateX ±5px, 0.4s)
6. Se válido:
   - Adiciona classe .loading ao botão (mostra spinner)
   - Desabilita botão
   - ** INTEGRAR: chamar signInWithEmailAndPassword(auth, email, pw) **
   - Sucesso: redirecionar para /dashboard
   - Erro: mostrar toast com mensagem traduzida
   - Remover .loading e re-habilitar botão
```

### Integração Firebase Auth sugerida

```typescript
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { auth } from '@/lib/firebase';

async function handleLogin(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    // Redirecionar para /dashboard
    router.push('/dashboard');
  } catch (error) {
    const authError = error as AuthError;
    const messages: Record<string, string> = {
      'auth/invalid-credential': 'Email ou senha incorretos',
      'auth/user-not-found': 'Nenhuma conta encontrada com este email',
      'auth/wrong-password': 'Senha incorreta',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente em alguns minutos',
      'auth/user-disabled': 'Esta conta foi desativada',
    };
    showToast(messages[authError.code] || 'Erro ao fazer login. Tente novamente.');
  }
}
```

---

## 4. Página /forgot-password

### Rota: `/forgot-password`
### Título: "Recuperar Senha — Ruphus ERP"

### Diferenças do /login no Form Panel

#### Top bar
- Link esquerdo: "← Voltar ao login" → `/login` (em vez de "Voltar ao site")

#### Fluxo em 2 estados

**Estado 1: Formulário (visível inicialmente)**

A. **Step Indicator** (3 passos visuais)
```
  (1)───────(2)───────(3)
  ativo    inativo   inativo
```
- Cada step: circle 28×28px, borda 1.5px
- Ativo: background teal, borda teal, texto branco
- Inativo: borda stone, texto muted
- Linhas entre: 1.5px de altura, cor brd (ou teal quando ativo)

B. **Header**
- H1: "Recuperar senha" (Fraunces 800)
- Subtítulo: "Informe o email associado à sua conta para receber o link de redefinição."

C. **Info Box** (informativo azul)
```
┌─────────────────────────────────────────────┐
│ (i)  O link de redefinição expira em 30     │
│      minutos. Verifique também a pasta      │
│      de spam.                               │
└─────────────────────────────────────────────┘
```
- Background: rgba(59,130,246,.06), border: 1px solid rgba(59,130,246,.1)
- Ícone info circle: SVG 16×16, cor #3B82F6
- Texto: .72rem, muted, line-height 1.5

D. **Campo Email**
- Mesmo estilo do /login
- Label: "Email corporativo"

E. **Botão**
- Texto: "Enviar link de redefinição"
- Mesmo estilo do /login (spinner loading)

**Estado 2: Confirmação de envio (aparece após submit)**

A. **Step Indicator atualizado**
```
  (✓)═══════(2)───────(3)
  done      ativo    inativo
```

B. **Ícone de sucesso**
- Circle 64×64px, background rgba(15,110,86,.08)
- SVG paper plane 28×28px, cor #0F6E56

C. **Texto**
- Título: "Email enviado!" (Fraunces 800, 1.3rem)
- Descrição: "Enviamos um link de redefinição para **[email@digitado]**. Clique no link do email para criar uma nova senha. O link expira em 30 minutos."

D. **Botão**
- "Voltar ao login" → `/login` (estilo primary, como link `<a>`)

E. **Timer de reenvio**
- "Não recebeu? Reenviar email (aguarde 60s)"
- Countdown de 60→0 segundos
- Link "Reenviar email" fica `.disabled` (opacity .4, pointer-events none) até countdown = 0
- Ao clicar reenviar: reseta countdown para 60s, mostra toast "Email reenviado com sucesso"

### Integração Firebase Auth sugerida

```typescript
import { sendPasswordResetEmail } from 'firebase/auth';

async function handleReset(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    // Mostrar estado de sucesso
    setStep('success');
    setSentEmail(email);
    startCountdown();
  } catch (error) {
    // IMPORTANTE: não revelar se o email existe ou não (segurança)
    // Mostrar sucesso mesmo se email não existir
    setStep('success');
    setSentEmail(email);
    startCountdown();
  }
}
```

---

## 5. Página /logout

### Rota: `/logout`
### Título: "Sessão Encerrada — Ruphus ERP"

### Diferenças do Form Panel

Não tem formulário. O form-wrapper usa `display:flex; align-items:center; justify-content:center; min-height:100%` para centralizar o conteúdo verticalmente.

### Conteúdo (centralizado)

A. **Ícone checkmark animado**
- Circle 72×72px, background var(--tl)
- SVG circle + check path com animação `checkDraw`
- Animação: `stroke-dasharray:24; stroke-dashoffset:24→0` em 0.5s com delay 0.3s
- Efeito: o ✓ se "desenha" de uma vez

B. **Texto**
- Título: "Você saiu com segurança" (Fraunces 800, 1.5rem)
- Descrição: "Sua sessão foi encerrada e seus dados estão protegidos. Até a próxima!" (.84rem, muted)

C. **2 Botões (coluna)**
1. "Entrar novamente" → `/login` (estilo primary, background teal)
2. "Voltar ao site" → `/` (estilo outline: borda stone, background card, hover borda teal)

D. **Timer de redirect**
- "Redirecionando para o login em 15s"
- Countdown 15→0, ao chegar a 0: `window.location.href = '/login'`
- Texto: .68rem, muted, opacity .6

### Integração Firebase Auth sugerida

```typescript
// Esta página deve ser acessada APÓS o signOut
// O signOut deve ser chamado antes do redirect para /logout

// Em qualquer componente/página do app:
import { signOut } from 'firebase/auth';

async function handleLogout() {
  await signOut(auth);
  router.push('/logout');
}

// Na página /logout, verificar se realmente está deslogado:
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // Ainda logado — fazer signOut
      signOut(auth);
    }
  });
  return () => unsubscribe();
}, []);
```

---

## 6. SVG Assets

### Logo Ruphus (hexágono + letra R)

viewBox: `0 0 40 40`

**Hexágono (borda):**
```svg
<path d="M20 2L36.66 11V29L20 38L3.34 29V11L20 2Z" 
      stroke="url(#gradient)" stroke-width="2" fill="none"/>
```

**Letra R (2 paths):**
```svg
<!-- Traço curvo superior + perna diagonal -->
<path d="M14 12H22C24.5 12 26.5 14 26.5 16.5C26.5 19 24.5 21 22 21H18L26 28" 
      stroke="url(#gradient)" stroke-width="2.5" 
      stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<!-- Traço vertical esquerdo -->
<path d="M14 12V28" 
      stroke="url(#gradient)" stroke-width="2.5" 
      stroke-linecap="round" fill="none"/>
```

**Gradient do logo:**
```svg
<linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="#3B82F6"/>   <!-- azul -->
  <stop offset="50%" stop-color="#8B5CF6"/>  <!-- roxo -->
  <stop offset="100%" stop-color="#EC4899"/> <!-- rosa -->
</linearGradient>
```

### Ícones utilizados (todos SVGs inline, stroke-based)

Todos com: `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"`

| Ícone | Usado em | Path(s) |
|-------|----------|---------|
| Arrow back | Top bar | `M19 12H5M12 19l-7-7 7-7` |
| Eye (show) | Password toggle | `M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z` + `circle cx=12 cy=12 r=3` |
| Eye off | Password toggle | `M17.94 17.94A10.07... (slash eye)` + `line x1=1 y1=1 x2=23 y2=23` |
| Shield check | Trust/Badge | `M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z` + `M9 12l2 2 4-4` |
| Lock | Trust/Badge | `rect x=3 y=11 width=18 height=11 rx=2` + `M7 11V7a5 5 0 0110 0v4` |
| Document | Trust/Badge | `M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z` + `M14 2v6h6` |
| Info circle | Info box | `circle cx=12 cy=12 r=10` + `M12 16v-4M12 8h.01` |
| Paper plane | Success | `M22 2L11 13` + `M22 2L15 22l-4-9-9-4z` |
| Check circle | Logout | `circle cx=12 cy=12 r=10` + `M9 12l2 2 4-4` |
| Grid 2×2 | Metric | `rect x=3 y=3 w=7 h=7 rx=1.5` ×4 |
| Check circle | Metric | `M9 12l2 2 4-4` + `M21 12a9 9 0 11-18 0 9 9 0 0118 0z` |
| Brain/pin | Metric | `M12 2a4 4 0 014 4c0 1.95-2 4-4 6...` |
| Lightning | Metric | `M13 2L3 14h9l-1 8 10-12h-9l1-8z` |

---

## 7. Animações (CSS keyframes)

### `fadeIn` — Entrada com fade + slide up
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: none; }
}
/* Uso: .form-wrapper > * com stagger delay de 40ms */
```

### `shake` — Erro de validação
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}
/* Duração: 0.4s ease, aplicada programaticamente */
```

### `floatUp` — Partículas subindo
```css
@keyframes floatUp {
  0%   { transform: translateY(100vh) scale(0); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: .6; }
  100% { transform: translateY(-20px) scale(1.5); opacity: 0; }
}
/* Duração: 10-18s, linear, infinite */
```

### `spin` — Spinner do botão loading
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
/* Duração: 0.6s linear infinite */
```

### `checkDraw` — Checkmark no logout
```css
@keyframes checkDraw {
  0%   { stroke-dashoffset: 24; }
  100% { stroke-dashoffset: 0; }
}
/* Duração: 0.5s ease, delay 0.3s, forwards */
/* Requer: stroke-dasharray: 24 no path */
```

---

## 8. Responsividade

### Breakpoint 960px (tablet/mobile)
- Brand panel (`login-brand`): `display:none` — desaparece completamente
- Form panel: `width:100%; min-height:100vh` — ocupa tela toda
- Form wrapper: `max-width:400px` (um pouco mais largo)

### Breakpoint 480px (mobile pequeno)
- Form panel padding: 28px 20px (reduzido)
- H1: `font-size:1.4rem` (menor)
- Security badges: gap 8px, 38×38px, border-radius 10px

### iOS
- Input font-size: **16px obrigatório** (Safari faz zoom automático em inputs <16px)
- Safe area: `padding-bottom: env(safe-area-inset-bottom)` no footer

---

## 9. Dark Mode

O toggle alterna a classe `dark` no `<html>`. A preferência é salva em `localStorage.theme` e respeitada no carregamento com fallback para `prefers-color-scheme`.

```javascript
// Inicialização (IIFE no carregamento)
if (localStorage.theme === 'dark' || 
    (!localStorage.theme && matchMedia('(prefers-color-scheme:dark)').matches)) {
  document.documentElement.classList.add('dark');
}

// Toggle
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
```

O brand panel NÃO muda (sempre escuro — a imagem de fundo é dark). Apenas o form panel muda de cor.

---

## 10. Mapa de Rotas e Navegação

```
/login ──→ "Esqueceu a senha?" ──→ /forgot-password
  │                                      │
  │                                      ↓
  │                              "← Voltar ao login" ──→ /login
  │                              "Voltar ao login" (após envio) ──→ /login
  │
  ├──→ "← Voltar ao site" ──→ /
  │
  └──→ Login bem-sucedido ──→ /dashboard
  
/logout ──→ "Entrar novamente" ──→ /login
   │
   ├──→ "Voltar ao site" ──→ /
   │
   └──→ Auto-redirect (15s) ──→ /login

/dashboard (qualquer página) ──→ botão Sair ──→ signOut() ──→ /logout
```

---

## 11. Notas para Implementação Next.js

1. Estas 3 páginas **não usam o layout principal** (sem nav, sem footer padrão, sem sidebar). Use um layout dedicado ou `layout=false`.

2. O CSS é **self-contained** — cada página tem seu próprio `<style>` inline. No Next.js, use CSS Modules ou um arquivo compartilhado `auth.module.css`.

3. O brand panel é idêntico nas 3 páginas — extraia como componente `<AuthBrandPanel />`.

4. O form panel muda em cada página — cada página tem seu próprio componente de conteúdo.

5. **Todas as 3 páginas são noindex** (`<meta name="robots" content="noindex,nofollow"/>`).

6. Firebase Auth deve ser integrado no `handleLogin()` e `handleReset()` substituindo os `setTimeout` simulados.

7. O botão de theme toggle deve persistir a preferência via `localStorage` e respeitar `prefers-color-scheme` como fallback.

8. Inputs usam `font-size: 16px` para evitar zoom automático no iOS Safari.
