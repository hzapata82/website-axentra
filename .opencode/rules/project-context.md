# Project Context: Axentra Website

## Stack Tecnológico

### Frontend
- **Framework**: Next.js 14+ (App Router, React 18+)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4+ (design tokens, dark mode class strategy)
- **UI Components**: Headless UI / Radix UI + custom design system
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion (respecting `prefers-reduced-motion`)

### Data Layer (Headless CMS)
- **CMS**: WordPress 6.5+ (Headless mode)
- **API**: WPGraphQL 1.15+ (GraphQL endpoint)
- **Auth**: JWT / Application Passwords para preview
- **Content Modeling**: ACF Pro (flexible content, repeaters, options pages)
- **Image Optimization**: WPGraphQL Media Library + Next.js Image

### Deployment & Infrastructure
- **Platform**: Vercel (Edge Network, ISR, Edge Functions)
- **CI/CD**: GitHub Actions → Vercel Preview/Production
- **Domain**: Custom domain en Vercel + DNS
- **Analytics**: Vercel Analytics + Web Vitals (opt-in)
- **Monitoring**: Sentry (error tracking) + Vercel Logs

### Development Tools
- **Package Manager**: pnpm 9+
- **Linting**: ESLint 9 (next/core-web-vitals, @typescript-eslint, jsx-a11y)
- **Formatting**: Prettier 3 (single quote, trailing comma es5, printWidth 100)
- **Type Checking**: TypeScript 5+ (strict, noUncheckedIndexedAccess)
- **Testing**: Vitest + React Testing Library (unit), Playwright (E2E), axe-core (a11y)
- **GraphQL Codegen**: @graphql-codegen/cli (types + hooks)

## Estructura de Carpetas (Convención)
```
src/
├── app/                    # Next.js App Router (pages, layouts, loading, error)
│   ├── (marketing)/        # Route groups
│   ├── (auth)/
│   └── api/                # Route handlers (webhooks, revalidation)
├── components/
│   ├── ui/                 # Base components (Button, Input, Card, etc.)
│   ├── features/           # Feature-specific components
│   └── layout/             # Header, Footer, Navigation
├── lib/
│   ├── graphql/            # Queries, fragments, mutations, client
│   │   ├── queries/        # *.graphql files
│   │   ├── fragments/      # Reusable fragments
│   │   ├── client.ts       # GraphQL client config
│   │   └── types/          # Generated types (codegen)
│   ├── utils/              # Helpers, formatters, validators
│   ├── hooks/              # Custom React hooks
│   └── constants/          # Enums, config, site metadata
├── styles/
│   └── globals.css         # Tailwind @import + custom properties
├── types/                  # Global TypeScript types
└── middleware.ts           # Edge middleware (auth, geo, ab testing)
```

## Variables de Entorno Requeridas
```env
# WordPress GraphQL
WORDPRESS_API_URL=https://cms.axentra.com/graphql
WORDPRESS_PREVIEW_SECRET=<secret-para-preview-mode>
WORDPRESS_GRAPHQL_AUTH_REFRESH_TOKEN=<para-auth-servidor>

# Vercel
VERCEL_DEPLOY_HOOK_URL=<hook-para-revalidación>
NEXT_PUBLIC_SITE_URL=https://axentra.com

# Analytics / Monitoring (opcional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=<id>
SENTRY_DSN=<dsn>
```

## Convenciones Críticas

### GraphQL & Data Fetching
- Queries en `lib/graphql/queries/<feature>.graphql`
- Fragments reutilizables en `lib/graphql/fragments/`
- `graphql-codegen` genera types en `lib/graphql/types/`
- Server Components: `fetch(..., { next: { tags: ['<tag>'], revalidate: 3600 } })`
- Client Components: SWR / TanStack Query para mutaciones
- Preview mode: `x-wp-preview` header + `WORDPRESS_PREVIEW_SECRET`

### Componentes
- **Server Components por defecto** (no `'use client'` salvo interactividad)
- `'use client'` solo en: event handlers, hooks, browser APIs, state
- Props tipadas con interfaces (no `type` para props)
- Compound components pattern para UI compleja
- Forward refs en componentes base UI

### Estilos & Accesibilidad
- Tailwind tokens: colors, spacing, typography en `tailwind.config.ts`
- Dark mode: `class` strategy (`html.dark`)
- Mobile-first: `sm:` `md:` `lg:` `xl:` `2xl:`
- **WCAG 2.1 AA obligatorio**: contraste, focus visible, ARIA, landmarks
- `prefers-reduced-motion`: desactivar animaciones no esenciales

### Performance
- Next.js Image para TODAS las imágenes (WebP/AVIF, lazy, blur placeholder)
- Fonts: `next/font` (self-hosted, variable fonts, preload)
- Scripts: `next/script` (lazyOnload, strategy)
- Bundle: `next/bundle-analyzer` en CI
- ISR: `revalidate = 3600` + `revalidateTag()` on webhook

### Testing
- Unit: `*.test.tsx` co-located, coverage > 80% en lógica
- Integration: `tests/integration/<feature>.spec.ts` (Playwright)
- A11y: `npm run test:a11y` (axe-core) en CI gate
- Visual: Chromatic / Playwright visual regression (opcional)

## Workflow Spec-kit (SDD)
1. `/speckit.specify` → `specs/<feature>/spec.md` (BDD Given-When-Then)
2. `/speckit.clarify` → `specs/<feature>/clarifications.md` (resolver dudas)
3. `/speckit.plan` → `specs/<feature>/plan.md` (arquitectura, queries, components)
4. `/speckit.tasks` → `specs/<feature>/tasks.md` (checklist TDD atómico)
5. `/speckit.implement` → implementa tarea a tarea (RED-GREEN-REFACTOR)
6. `/speckit.analyze` → verifica arch, deps, a11y, perf, code quality

## Reglas de Gobernanza (AGENTS.md)
- NO implementar sin spec aprobada en `specs/`
- NO modificar código fuera del scope de la tarea actual
- SIEMPRE pasar lint + typecheck + tests antes de commit
- CADA commit = 1 tarea atómica (Conventional Commits)
- PRs requieren: spec link, tests passing, a11y pass, build success