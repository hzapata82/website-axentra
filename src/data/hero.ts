import type { HeroData } from '@/types/hero';

export const heroData: HeroData = {
  title: 'COMANDA TU CARGA',
  subtitle: 'Capacidades logísticas de alto rendimiento diseñadas para mover volumen con precisión industrial: transporte multimodal, cruce fronterizo, ingeniería de carga.',
  ctaPrimary: { label: 'SOLICITAR EVALUACIÓN ESTRATÉGICA', href: '#contacto' },
  ctaSecondary: { label: 'EXPLORAR CAPACIDADES', href: '#valor' },
  gpsVisualizer: {
    animationUrl: '/images/hero-gps-animation.lottie.json',
    fallbackImage: '/images/hero-gps-fallback.webp',
    altText: 'Mapa de rutas logísticas Axentra Cargo México-Estados Unidos',
  },
};