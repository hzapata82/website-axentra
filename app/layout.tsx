import type { Metadata, Viewport } from 'next';
import { montserrat, inter } from './fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Axentra Cargo | Logística Industrial de Alto Rendimiento',
  description: 'Transporte multimodal, cruce fronterizo México-EE.UU., gestión de carga especializada. Arquitectura de ahorro operativo con visibilidad 100%.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://axentracargo.com'),
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: '/',
    siteName: 'Axentra Cargo',
    title: 'Axentra Cargo | Logística Industrial de Alto Rendimiento',
    description: 'Transporte multimodal, cruce fronterizo México-EE.UU., gestión de carga especializada.',
    images: [
      {
        url: '/images/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'Axentra Cargo - Logística Industrial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axentra Cargo | Logística Industrial de Alto Rendimiento',
    description: 'Transporte multimodal, cruce fronterizo México-EE.UU., gestión de carga especializada.',
    images: ['/images/og-default.svg'],
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

export const viewport: Viewport = {
  themeColor: '#0A192F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-navy">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent-blue focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido principal
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}