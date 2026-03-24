# Ruphus Landing Page — Guia de Migração para Next.js 15

## Arquitetura

```
app/
├── (marketing)/           # Route group — sem auth, sem dashboard layout
│   ├── layout.tsx         # ✅ Criado — fonts, metadata, viewport
│   ├── page.tsx           # ✅ Criado — JSON-LD schemas, importa LandingPage
│   └── landing.css        # ✅ Criado — 32KB de CSS extraído e adaptado
│
components/
└── landing/
    └── LandingPage.tsx    # ✅ Criado — Client component com hooks React
    
public/
├── og-image.png           # ✅ Criado — 1200×630
├── robots.txt             # ✅ Criado
└── sitemap.xml            # ✅ Criado
```

## Como instalar no projeto existente

### 1. Copiar arquivos

```bash
# Na raiz do projeto Ruphus (Next.js 15)
cp -r app/\(marketing\)/ seu-projeto/app/\(marketing\)/
cp -r components/landing/ seu-projeto/components/landing/
cp public/og-image.png seu-projeto/public/
cp public/robots.txt seu-projeto/public/
cp public/sitemap.xml seu-projeto/public/
```

### 2. Verificar conflito de rotas

O arquivo `app/(marketing)/page.tsx` será a rota `/` (homepage).
Se já existe um `app/page.tsx`, renomeie-o ou mova para `app/(dashboard)/page.tsx`.

O route group `(marketing)` NÃO afeta a URL — é apenas organizacional.

### 3. Ajustar o layout

O `app/(marketing)/layout.tsx` importa as fonts via `next/font/google`.
Se o `app/layout.tsx` raiz já carrega essas fonts, remova a duplicação.

### 4. Roteamento — proteger dashboard

A landing page pública usa o route group `(marketing)`.
As rotas protegidas (`/dashboard/*`, `/login`, `/register`) devem estar em outro route group ou no `app/` raiz com middleware de auth.

### 5. Variáveis de font

O CSS usa `var(--font-serif)`, `var(--font-sans)`, `var(--font-mono)`.
Essas variáveis são injetadas automaticamente pelo `next/font` via classes no layout.

### 6. Dark mode

O componente usa `localStorage` + classe `dark` no `<html>`.
No Next.js, o toggle precisa ser aplicado no `documentElement` (funciona igual).
Se usar `next-themes`, adapte o `toggleTheme()` no `LandingPage.tsx`.

## Componentes que podem ser extraídos futuramente

Se quiser modularizar mais, os candidatos são:
- `NavBar` — nav + mobile menu + theme toggle
- `HeroSection` — hero + typing effect
- `BentoGrid` — bento cards + tab switching
- `ModulesSection` — tabs com 4 categorias
- `RoadmapGrid` — 22 module cards
- `ROICalculator` — inputs + cálculo
- `ResourceHub` — edu section + filters
- `FAQSection` — accordion + category filters
- `DemoForm` — formulário com validação/máscara (reusável modal + inline)
- `Toast` — toast notification system

Cada um desses pode virar um componente independente com seu próprio estado.
