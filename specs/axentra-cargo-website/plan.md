# Plan Técnico: Axentra Cargo Website (Arquitectura 100% Estática)

---

## 1. Arquitectura de Componentes (React/Next.js)

### Component Tree
```
app/
├── layout.tsx (RootLayout - Server Component)
│   ├── Header (Server Component - nav, logo)
│   ├── Main (Server Component)
│   │   └── HomePage (/)
│   │       ├── HeroSection (Server Component + Client for GPS)
│   │       │   ├── HeroContent (Server)
│   │       │   │   ├── HeroTitle (styled H1)
│   │       │   │   ├── HeroSubtitle
│   │       │   │   └── HeroCTAs (Client - smooth scroll)
│   │       │   └── GpsVisualizer (Client Component)
│   │       │       ├── GpsAnimation (Lottie - dynamic import)
│   │       │       └── GpsFallback (static Image)
│   │       ├── ValueSection (Server Component)
│   │       │   ├── SavingsBlock (Server)
│   │       │   │   ├── SectionHeader
│   │       │   │   ├── SavingsDescription
│   │       │   │   └── KpiCallouts (Client - animated counters)
│   │       │   └── IndustriesBlock (Server)
│   │       │       └── IndustryCard[] (Client - hover micro-animations)
│   │       ├── ServicesSection (Server Component)
│   │       │   └── ServiceCard[] (Client - keyboard focusable)
│   │       └── ContactSection (Server Component)
│   │           └── ContactForm (Client Component)
│   │               ├── FormField[] (Input, Select, Textarea)
│   │               ├── SubmitButton (loading state)
│   │               └── FormMessages (toast/alert)
│   └── Footer (Server Component)
└── api/
    └── lead/route.ts (POST lead submission → email/CRM)
```

### Server vs Client Components

| Componente | Tipo | Justificación |
|------------|------|---------------|
| `layout.tsx`, `page.tsx` | **Server** | SEO metadata, static layout, data imports |
| `HeroContent`, `SavingsBlock`, `IndustriesBlock`, `ServicesSection` | **Server** | Local data imports, no interactivity |
| `HeroCTAs`, `GpsVisualizer`, `KpiCallouts`, `IndustryCard`, `ServiceCard`, `ContactForm` | **Client** | Interactividad, animaciones, estado local, form handling |
| `Header`, `Footer` | **Server** | Static content, navigation links |

---

## 2. Estructura de Datos & Tipado (Local Files)

### Data Files Structure
```
src/data/
├── hero.ts           # Hero content
├── industries.ts     # 6 industrias
├── kpis.ts           # 2 KPIs
├── services.ts       # 5 servicios
├── contact-form.ts   # Form config + volume options
├── seo.ts            # Metadata, structured data config
└── index.ts          # Barrel export
```

### TypeScript Types (src/types/)
```typescript
// src/types/hero.ts
export interface HeroData {
  title: string;
  subtitle: string;
  ctaPrimary: CtaButton;
  ctaSecondary: CtaButton;
  gpsVisualizer: GpsVisualizer;
}

export interface CtaButton {
  label: string;
  href: string;
}

export interface GpsVisualizer {
  animationUrl: string;      // .lottie.json or .gif
  fallbackImage: string;     // .webp
  altText: string;
}

// src/types/industry.ts
export interface Industry {
  name: string;
  description: string;
  icon: string;              // SVG component name or path
  order: number;
}

// src/types/kpi.ts
export interface Kpi {
  label: string;
  value: string;
  description: string;
  icon: string;
}

// src/types/service.ts
export interface Service {
  number: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

// src/types/contact-form.ts
export interface ContactFormConfig {
  volumeOptions: VolumeOption[];
  privacyText: string;
  successMessage: string;
  errorMessage: string;
}

export interface VolumeOption {
  value: string;
  label: string;
}

export interface LeadInput {
  email: string;
  company: string;
  volume: string;
  details: string;
}

export interface LeadResponse {
  success: boolean;
  message: string;
  leadId?: string;
}
```

### Data Content (src/data/*.ts)
```typescript
// src/data/hero.ts
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

// src/data/industries.ts
import type { Industry } from '@/types/industry';

export const industriesData: Industry[] = [
  { name: 'Automotriz', description: 'Cadenas de suministro Just-in-Time y líneas de ensamble', icon: 'automotive', order: 1 },
  { name: 'Comercio / Retail', description: 'Transporte masivo y surtido continuo', icon: 'retail', order: 2 },
  { name: 'Farmacéutico', description: 'Control riguroso de temperatura y protocolos de seguridad', icon: 'pharma', order: 3 },
  { name: 'Construcción', description: 'Manejo de materiales pesados y entregas en obra', icon: 'construction', order: 4 },
  { name: 'Tecnología & Alto Valor', description: 'Esquemas de seguridad reforzada y GPS espejo', icon: 'tech', order: 5 },
  { name: 'Acero & Sobredimensionados', description: 'Equipos especializados y arrastres de alto tonelaje', icon: 'steel', order: 6 },
];

// src/data/kpis.ts
import type { Kpi } from '@/types/kpi';

export const kpisData: Kpi[] = [
  { label: 'Ahorro Potencial', value: '6 a 7 Cifras $', description: 'En optimización aduanal y de ruta', icon: 'savings' },
  { label: 'Visibilidad', value: '100%', description: 'Monitoreo constante con reportes cada 2-3 horas', icon: 'visibility' },
];

// src/data/services.ts
import type { Service } from '@/types/service';

export const servicesData: Service[] = [
  { number: '01', title: 'Gestión de Transporte', description: 'Optimized routing, carrier selection, and real-time tracking for end-to-end supply chain visibility.', icon: 'truck', order: 1 },
  { number: '02', title: 'Coordinación de Cruce', description: 'Seamless border crossing management, customs compliance, and expedited processing protocols.', icon: 'border', order: 2 },
  { number: '03', title: 'Carga Especial', description: 'Handling of oversized, hazardous, or temperature-controlled freight with specialized equipment.', icon: 'special', order: 3 },
  { number: '04', title: 'Gestión de Proyectos', description: 'Comprehensive planning and execution for complex, multi-modal logistics operations.', icon: 'projects', order: 4 },
  { number: '05', title: 'Servicios de Almacenaje', description: 'Secure, strategically located warehousing with inventory management and distribution capabilities.', icon: 'warehouse', order: 5 },
];

// src/data/contact-form.ts
import type { ContactFormConfig } from '@/types/contact-form';

export const contactFormConfig: ContactFormConfig = {
  volumeOptions: [
    { value: '1-5', label: '1 - 5 TEUs/FEUs' },
    { value: '6-20', label: '6 - 20 TEUs/FEUs' },
    { value: '21-50', label: '21 - 50 TEUs/FEUs' },
    { value: '50+', label: '+50 TEUs/FEUs' },
  ],
  privacyText: 'Tus datos están protegidos bajo estricto acuerdo de confidencialidad industrial.',
  successMessage: 'Solicitud recibida. Nuestro equipo le contactará en <24h',
  errorMessage: 'Error temporal. Intente nuevamente o escríbanos a ventas@axentracargo.com',
};
```

### Zod Schemas (lib/validations/contact-form.ts)
```typescript
import { z } from 'zod';

export const contactFormSchema = z.object({
  email: z.string().email('Formato de email inválido'),
  company: z.string().min(2, 'Nombre de empresa requerido'),
  volume: z.enum(['1-5', '6-20', '21-50', '50+'], { required_error: 'Seleccione un rango de volumen' }),
  details: z.string().min(10, 'Describa su operación (mínimo 10 caracteres)'),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
```

---

## 3. Estrategia de Datos & Build (Static Generation)

### Build Strategy
- **Next.js Config**: `output: 'export'` para HTML estático puro, o `'standalone'` para Vercel
- **Single Route**: `/` → genera `out/index.html` + assets
- **Zero Runtime Fetching**: Todos los datos via `import` en build time
- **Images**: `/public/images/` → hashed filenames via `next build`

### Cache Headers (Static Export / Vercel)
| Asset Type | Cache-Control |
|------------|---------------|
| HTML (`index.html`) | `public, max-age=0, must-revalidate` |
| JS/CSS chunks | `public, max-age=31536000, immutable` |
| Images (hero, icons) | `public, max-age=31536000, immutable` |
| Fonts (woff2) | `public, max-age=31536000, immutable` |
| Lottie JSON | `public, max-age=31536000, immutable` |

### API Route: Lead Submission
```
POST /api/lead
Content-Type: application/json
Body: { email, company, volume, details }

Response 200: { success: true, message: "...", leadId: "uuid" }
Response 400: { success: false, message: "Validation error", errors: [...] }
Response 500: { success: false, message: "Server error" }
```

**Implementation (app/api/lead/route.ts):**
```typescript
import { contactFormSchema } from '@/lib/validations/contact-form';
import { sendLeadEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = contactFormSchema.parse(body);
    
    const leadId = crypto.randomUUID();
    
    // Send email via Resend/SendGrid
    await sendLeadEmail({ ...validated, leadId });
    
    // Optional: CRM webhook
    if (process.env.CRM_WEBHOOK_URL) {
      await fetch(process.env.CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...validated, leadId, source: 'website' }),
      });
    }
    
    return Response.json({ success: true, message: 'Solicitud recibida...', leadId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ 
        success: false, 
        message: 'Datos inválidos', 
        errors: error.flatten().fieldErrors 
      }, { status: 400 });
    }
    
    console.error('Lead submission error:', error);
    return Response.json({ 
      success: false, 
      message: 'Error temporal. Intente nuevamente...' 
    }, { status: 500 });
  }
}
```

---

## 4. Estilos & Design System

### Tailwind Config (tailwind.config.ts)
```typescript
const colors = {
  navy: {
    DEFAULT: '#0A192F',
    dark: '#0F2537',
  },
  slate: {
    DEFAULT: '#6C7A89',
    light: '#8C9BA5',
    border: '#CBD5E1',
  },
  accent: {
    blue: '#1E40AF',
  },
  white: '#FFFFFF',
  offWhite: '#F8FAFC',
};

const fontFamily = {
  display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
  body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
};

const animation = {
  'fade-in': 'fadeIn 0.5s ease-out forwards',
  'slide-up': 'slideUp 0.5s ease-out forwards',
  'stagger': 'staggerIn 0.5s ease-out forwards',
};
```

### CSS Variables (src/styles/globals.css)
```css
@theme inline {
  --color-navy: #0A192F;
  --color-navy-dark: #0F2537;
  --color-slate: #6C7A89;
  --color-slate-light: #8C9BA5;
  --color-slate-border: #CBD5E1;
  --color-accent-blue: #1E40AF;
  --color-white: #FFFFFF;
  --color-off-white: #F8FAFC;
}

@layer base {
  :root {
    --font-montserrat: 'Montserrat', system-ui, sans-serif;
    --font-inter: 'Inter', system-ui, sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .focus-visible-ring {
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-navy;
  }
}
```

### Fonts (next/font in layout.tsx)
```typescript
import { Montserrat, Inter } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
  preload: true,
});
```

---

## 5. Testing Strategy

### Unit Tests (Vitest + React Testing Library)
```
tests/unit/
├── components/
│   ├── ContactForm.test.tsx (validation, submit, error states)
│   ├── KpiCounter.test.tsx (animation, reduced motion)
│   ├── IndustryCard.test.tsx (hover, keyboard focus)
│   └── ServiceCard.test.tsx (keyboard nav)
├── hooks/
│   ├── useIntersectionObserver.test.ts
│   ├── useReducedMotion.test.ts
│   └── useFormValidation.test.ts
├── utils/
│   ├── validation.test.ts (zod schemas)
│   └── scroll.test.ts (smooth scroll)
└── data/
    └── content.test.ts (data imports, types)
```

### Integration Tests (Playwright)
```
tests/integration/
├── hero.spec.ts (render, CTAs, GPS fallback)
├── value-section.spec.ts (KPIs animation, industries grid)
├── services.spec.ts (grid layout, keyboard nav)
├── contact-form.spec.ts (happy path, validation, server error)
├── responsive.spec.ts (mobile, tablet, desktop)
└── a11y.spec.ts (axe-core, keyboard, screen reader)
```

### A11y CI Gate
```yaml
# .github/workflows/a11y.yml
- name: Run axe-core
  run: pnpm test:a11y
```

### Visual Regression (Storybook + Chromatic)
```
.stories/
├── Button.stories.tsx
├── Card.stories.tsx
├── Input.stories.tsx
├── HeroSection.stories.tsx
├── IndustryCard.stories.tsx
├── ServiceCard.stories.tsx
└── ContactForm.stories.tsx
```

---

## 6. Despliegue & Env Vars

### Next.js Config (next.config.js)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // o 'standalone' para Vercel
  images: {
    unoptimized: true,  // requerido para 'export'
    formats: ['image/webp', 'image/avif'],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
```

### Vercel Config (vercel.json) - si no usa export
```json
{
  "buildCommand": "pnpm run build",
  "devCommand": "pnpm run dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/api/**/*.ts": { "maxDuration": 30 }
  },
  "headers": [
    { "source": "/(.*)", "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "X-Frame-Options", "value": "DENY" },
      { "key": "X-XSS-Protection", "value": "1; mode=block" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
    ]},
    { "source": "/images/(.*)", "headers": [
      { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
    ]},
    { "source": "/fonts/(.*)", "headers": [
      { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
    ]}
  ]
}
```

### Environment Variables

| Variable | Descripción | Requerida | Ambiente |
|----------|-------------|-----------|----------|
| `RESEND_API_KEY` / `SENDGRID_API_KEY` | Email service API key | ✅ | All |
| `LEAD_NOTIFICATION_EMAIL` | Destino emails leads | ✅ | All |
| `CRM_WEBHOOK_URL` | Webhook CRM (HubSpot, Pipedrive, etc.) | ⚠️ | Production |
| `NEXT_PUBLIC_SITE_URL` | URL canonical | ✅ | All |
| `NEXT_PUBLIC_GA_ID` | GA4 Measurement ID | ⚠️ | Production |
| `NEXT_PUBLIC_GTM_ID` | GTM Container ID | ⚠️ | Production |
| `SENTRY_DSN` | Sentry error tracking | ⚠️ | Production |

### Preview Deployments
- Automáticos en cada PR via GitHub Actions + Vercel
- Preview URLs: `axentra-cargo-git-<branch>-<org>.vercel.app`
- No preview mode needed (no CMS)

---

## Checklist para /speckit.tasks

- [ ] **T1**: Setup project (Next.js 14, TypeScript, Tailwind, ESLint, Prettier, `output: 'export'`)
- [ ] **T2**: Create type definitions in `src/types/` (hero, industry, kpi, service, contact-form)
- [ ] **T3**: Create data files in `src/data/` with all content
- [ ] **T4**: Configure fonts (Montserrat + Inter via `next/font`, `display: swap`)
- [ ] **T5**: Add global styles, CSS variables, `prefers-reduced-motion` media query
- [ ] **T6**: Build UI primitives (Button, Input, Textarea, Select, Card, Toast, Spinner)
- [ ] **T7**: Implement Hero Section (HeroContent Server, HeroCTAs Client, GpsVisualizer Client)
- [ ] **T8**: Implement GPS Visualizer (dynamic Lottie import, static fallback, reduced-motion)
- [ ] **T9**: Implement Value Section (SavingsBlock Server, KpiCallouts Client with IntersectionObserver)
- [ ] **T10**: Implement Industries Block (IndustriesBlock Server, IndustryCard Client with hover)
- [ ] **T11**: Implement Services Section (ServicesSection Server, ServiceCard Client keyboard nav)
- [ ] **T12**: Implement Contact Section (ContactForm Client with react-hook-form + Zod)
- [ ] **T13**: Implement API route `/api/lead` (validation, email send via Resend/SendGrid, CRM webhook)
- [ ] **T14**: SEO metadata (generateMetadata, JSON-LD Organization/WebSite/Service, sitemap.xml via next-sitemap)
- [ ] **T15**: Responsive testing (320px, 640px, 1024px, 1440px, 1920px)
- [ ] **T16**: Unit tests (Vitest) - target >80% coverage on validation, hooks, utils
- [ ] **T17**: Integration tests (Playwright) - lead submit, keyboard nav, responsive
- [ ] **T18**: A11y tests (axe-core) - CI gate
- [ ] **T19**: Visual regression (Storybook + Chromatic)
- [ ] **T20**: Performance audit (Lighthouse CI) - verify CWV budgets
- [ ] **T21**: Vercel deployment + env vars configuration
- [ ] **T22**: Build verification (`pnpm run build` → `out/` valid static site)

---

## Notas de Implementación Críticas

1. **Hero GPS Visualizer**: `next/image` con `priority` + `placeholder="blur"` para fallback. Lottie via `dynamic(() => import('lottie-web'), { ssr: false })` solo si `!prefersReducedMotion`.

2. **KPI Counters**: `IntersectionObserver` trigger + `requestAnimationFrame` para animación numérica. `useReducedMotion` hook detecta preferencia.

3. **Form Validation**: Zod schema shared client/server. `react-hook-form` + `@hookform/resolvers/zod`. Server-side re-validation en API route.

4. **Smooth Scroll**: `scrollIntoView({ behavior: 'smooth', block: 'start' })` en CTAs. Wrapper hook respeta `prefers-reduced-motion`.

5. **Static Export**: `output: 'export'` genera `out/` listo para cualquier hosting estático (Vercel, Cloudflare Pages, Netlify, S3+CloudFront).

6. **Error Boundaries**: En GPS, Form, KPIs para graceful degradation sin romper página.

7. **Analytics**: `lead_submitted` event con `leadId`, `volume`, `company` (no PII email).

8. **Images**: Todas en `/public/images/` con nombres descriptivos. `next/image` para optimización automática en build.