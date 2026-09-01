'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Button } from '@/components/ui/Button';

interface CtaButton {
  label: string;
  href: string;
}

interface HeroCTAsProps {
  ctaPrimary: CtaButton;
  ctaSecondary: CtaButton;
}

export function HeroCTAs({ ctaPrimary, ctaSecondary }: HeroCTAsProps) {
  const smoothScroll = useSmoothScroll();

  const handleClick = (href: string) => {
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      smoothScroll(targetElement);
      targetElement.focus();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        variant="primary"
        size="lg"
        onClick={() => handleClick(ctaPrimary.href)}
      >
        {ctaPrimary.label}
      </Button>
      <Button
        variant="secondary"
        size="lg"
        onClick={() => handleClick(ctaSecondary.href)}
      >
        {ctaSecondary.label}
      </Button>
    </div>
  );
}