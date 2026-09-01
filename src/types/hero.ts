export interface CtaButton {
  label: string;
  href: string;
}

export interface GpsVisualizer {
  animationUrl: string;
  fallbackImage: string;
  altText: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  ctaPrimary: CtaButton;
  ctaSecondary: CtaButton;
  gpsVisualizer: GpsVisualizer;
}