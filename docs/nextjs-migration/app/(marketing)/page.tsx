import { LandingPage } from '@/components/landing/LandingPage'

// JSON-LD structured data
const jsonLd = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ruphus',
    url: 'https://www.ruphus.app',
    logo: 'https://www.ruphus.app/logo.png',
    description:
      'Plataforma ERP com 22 módulos integrados para gestão empresarial completa.',
    address: { '@type': 'PostalAddress', addressCountry: 'BR' },
  },
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ruphus ERP',
    url: 'https://www.ruphus.app',
    description:
      'ERP completo com 22 módulos integrados para gestão empresarial.',
    inLanguage: 'pt-BR',
    publisher: {
      '@type': 'Organization',
      name: 'Ruphus',
      url: 'https://www.ruphus.app',
    },
  },
  software: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Ruphus ERP',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'ERP completo com 22 módulos integrados: CRM, Financeiro, Contábil, Fiscal, BI com IA, Chat, Workflows, Estoque e mais.',
    url: 'https://www.ruphus.app',
    author: { '@type': 'Organization', name: 'Ruphus' },
    applicationSubCategory: 'Enterprise Resource Planning',
    featureList:
      'CRM, Financeiro, Contabilidade, Fiscal, Aprovações, Funcionários, Departamentos, Tickets, Checklists, Contratos, Projetos, Gestão de Serviços, Workflows, Integrações, Business Intelligence, Relatórios, Chat, Estoque, Clientes, Fornecedores, Vendas, Contas Bancárias',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'BRL',
      description: 'Demonstração gratuita personalizada',
    },
    screenshot: 'https://www.ruphus.app/og-image.png',
    softwareHelp: {
      '@type': 'CreativeWork',
      url: 'https://www.ruphus.app/#faq',
    },
  },
  breadcrumb: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.ruphus.app' },
      { '@type': 'ListItem', position: 2, name: 'Módulos', item: 'https://www.ruphus.app/#modulos' },
      { '@type': 'ListItem', position: 3, name: 'Ecossistema', item: 'https://www.ruphus.app/#roadmap' },
      { '@type': 'ListItem', position: 4, name: 'FAQ', item: 'https://www.ruphus.app/#faq' },
      { '@type': 'ListItem', position: 5, name: 'Contato', item: 'https://www.ruphus.app/#contato' },
    ],
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'O Ruphus já está pronto para uso em produção?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. Todos os 22 módulos estão funcionais e implantados em clientes reais.' } },
      { '@type': 'Question', name: 'Preciso usar todos os 22 módulos?', acceptedAnswer: { '@type': 'Answer', text: 'Não. Cada empresa ativa apenas os módulos que precisa, com um clique no painel.' } },
      { '@type': 'Question', name: 'O que o módulo de BI com IA faz?', acceptedAnswer: { '@type': 'Answer', text: 'Dashboards customizáveis, relatórios avançados e análises assistidas por IA.' } },
      { '@type': 'Question', name: 'Com quais sistemas o Ruphus se integra?', acceptedAnswer: { '@type': 'Answer', text: 'Superlógica, WhatsApp via Z-API, boletos e Pix, NFe.io e Mercado Pago.' } },
      { '@type': 'Question', name: 'Quanto tempo leva para implantar?', acceptedAnswer: { '@type': 'Answer', text: 'Setup básico no mesmo dia. Implantação completa de 5 a 10 dias úteis.' } },
      { '@type': 'Question', name: 'Como funciona a migração de dados?', acceptedAnswer: { '@type': 'Answer', text: 'A equipe Ruphus cuida da migração completa incluindo Superlógica.' } },
      { '@type': 'Question', name: 'Existe treinamento para a equipe?', acceptedAnswer: { '@type': 'Answer', text: 'Sim, incluído na implantação com sessões ao vivo e suporte 30 dias.' } },
      { '@type': 'Question', name: 'Como meus dados estão protegidos?', acceptedAnswer: { '@type': 'Answer', text: 'Supabase RLS, SSL/TLS, HSTS, Vercel Edge, Sentry e LGPD.' } },
      { '@type': 'Question', name: 'Os dados ficam no Brasil?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. Backups automáticos diários com restauração em minutos.' } },
      { '@type': 'Question', name: 'Quanto custa o Ruphus?', acceptedAnswer: { '@type': 'Answer', text: 'Investimento personalizado. Agende demonstração para orçamento.' } },
      { '@type': 'Question', name: 'É possível ver o sistema antes de contratar?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. Demonstração gratuita e personalizada sem compromisso.' } },
      { '@type': 'Question', name: 'Como acompanho a evolução do produto?', acceptedAnswer: { '@type': 'Answer', text: 'Changelog semanal por email e canal direto para sugestões.' } },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      {/* Structured Data */}
      {Object.values(jsonLd).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Landing Page (Client Component) */}
      <LandingPage />
    </>
  )
}
