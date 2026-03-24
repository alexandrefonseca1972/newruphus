import type { Metadata, Viewport } from 'next'
import { Fraunces, Outfit, JetBrains_Mono } from 'next/font/google'
import './landing.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  axes: ['opsz'],
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#0D7C66',
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ruphus.app'),
  title: {
    default: 'Ruphus — 22 módulos integrados para gestão empresarial completa',
    template: '%s | Ruphus ERP',
  },
  description:
    'ERP com 22 módulos: CRM, Financeiro, Contábil, Fiscal, BI com IA, Chat, Workflows, Estoque, Projetos e mais. Na nuvem, em evolução contínua.',
  authors: [{ name: 'Ruphus' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: { 'pt-BR': '/', 'x-default': '/' },
  },
  openGraph: {
    title: 'Ruphus — ERP completo com 22 módulos integrados',
    description:
      'CRM, Financeiro, Contábil, Fiscal, BI com IA, Chat, Workflows e mais — 22 módulos que funcionam juntos. Solicite demonstração gratuita.',
    type: 'website',
    url: '/',
    locale: 'pt_BR',
    siteName: 'Ruphus ERP',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ruphus ERP — 22 módulos integrados para gestão empresarial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ruphus — ERP completo com 22 módulos integrados',
    description:
      'CRM, Financeiro, Contábil, Fiscal, BI com IA, Chat e mais. 22 módulos que funcionam juntos.',
    images: ['/og-image.png'],
  },
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`${fraunces.variable} ${outfit.variable} ${jetbrains.variable}`}
    >
      {children}
    </div>
  )
}
