import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Axentra Cargo',
  description: 'Logística industrial de alto rendimiento: transporte multimodal, cruce fronterizo México-EE.UU., gestión de carga especializada.',
  url: 'https://axentracargo.com',
  ogImage: '/images/og-default.webp',
  twitterHandle: '@axentracargo',
  linkedinUrl: 'https://linkedin.com/company/axentracargo',
};

export const metadata: Metadata = {
  title: {
    default: 'Axentra Cargo | Logística Industrial de Alto Rendimiento',
    template: '%s | Axentra Cargo',
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Axentra Cargo | Logística Industrial de Alto Rendimiento',
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Axentra Cargo - Logística Industrial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: 'Axentra Cargo | Logística Industrial de Alto Rendimiento',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const structuredData = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Axentra Cargo',
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.webp`,
    sameAs: [
      siteConfig.linkedinUrl,
      `https://twitter.com/${siteConfig.twitterHandle.replace('@', '')}`,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+52-55-XXXX-XXXX',
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English'],
      areaServed: ['MX', 'US'],
    },
  },
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Axentra Cargo',
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
};