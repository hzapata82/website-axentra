# Tasks: Axentra Cargo Website (Static)

---

## Fase 0: Setup & Types

- [x] **T001**: Initialize Next.js 14 project with TypeScript, Tailwind v4, ESLint, Prettier
    - **Archivo(s)**: `package.json`, `tsconfig.json`, `next.config.js`, `.eslintrc.json`, `.prettierrc`, `postcss.config.js`
    - **Test**: `pnpm run lint`, `pnpm run typecheck` pass
    - **Done When**: `pnpm run dev` starts without errors, strict TS config enabled, Tailwind v4 CSS-first config working

- [x] **T002**: Install and configure core dependencies
    - **Archivo(s)**: `package.json`
    - **Dependencies**: `zod`, `react-hook-form`, `@hookform/resolvers`, `lottie-web`, `resend` (or `@sendgrid/mail`), `next-sitemap`, `@sentry/nextjs`, `lucide-react` (for icons)
    - **DevDependencies**: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `playwright`, `@axe-core/playwright`, `@chromatic-com/storybook`, `storybook`, `@storybook/nextjs`, `@storybook/react`, `@storybook/addon-a11y`, `lighthouse`, `@lhci/cli`
    - **Test**: `pnpm install` succeeds, all imports resolve
    - **Done When**: All required packages installed, versions compatible

- [x] **T003**: Configure `next/font` for Montserrat (display) + Inter (body) with `display: swap`
    - **Archivo(s)**: `app/fonts.ts`, `app/layout.tsx`
    - **Test**: Visual verification - no FOIT, fonts load via Network tab
    - **Done When**: Both fonts self-hosted, CSS variables `--font-montserrat`, `--font-inter` available

- [x] **T004**: Create TypeScript type definitions in `src/types/`
    - **Archivo(s)**: `src/types/hero.ts`, `src/types/industry.ts`, `src/types/kpi.ts`, `src/types/service.ts`, `src/types/contact-form.ts`, `src/types/index.ts`
    - **Test**: `pnpm run typecheck` passes, types export correctly
    - **Done When**: All interfaces defined, barrel export works

- [x] **T005**: Create Zod validation schema for contact form
    - **Archivo(s)**: `lib/validations/contact-form.ts`
    - **Test**: `tests/unit/utils/validation.test.ts` - valid/invalid inputs
    - **Done When**: Schema validates email, company, volume, details per spec

- [x] **T006**: Create data files in `src/data/` with all content
    - **Archivo(s)**: `src/data/hero.ts`, `src/data/industries.ts`, `src/data/kpis.ts`, `src/data/services.ts`, `src/data/contact-form.ts`, `src/data/seo.ts`, `src/data/index.ts`
    - **Test**: `tests/unit/data/content.test.ts` - imports work, types match
    - **Done When**: All content from spec.md represented, typed correctly

- [x] **T007**: Configure environment variables schema
    - **Archivo(s)**: `.env.example`, `lib/env.ts` (with `zod` validation)
    - **Test**: `pnpm run typecheck` validates env at build
    - **Done When**: Required vars: `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, `NEXT_PUBLIC_SITE_URL`; optional: `CRM_WEBHOOK_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID`, `SENTRY_DSN`

- [x] **T008**: Update `.env.example` to match static site requirements (remove WordPress vars)
    - **Archivo(s)**: `.env.example`
    - **Test**: File matches spec.md env requirements
    - **Done When**: No WordPress/GraphQL vars, only static site + email + analytics vars

- [x] **T009**: Configure `next.config.js` for static export (`output: 'export'`)
    - **Archivo(s)**: `next.config.js`
    - **Test**: `pnpm run build` → `out/` directory with `index.html` + assets
    - **Done When**: `output: 'export'`, `images.unoptimized: true`, `trailingSlash: true`, build succeeds

- [x] **T010**: Update `vercel.json` for static export (remove preview/crons/rewrites)
    - **Archivo(s)**: `vercel.json`
    - **Test**: Vercel deployment works with static output
    - **Done When**: No WordPress preview rewrites, no crons, headers only for static assets

---

## Fase 1: Styles & Design System (Tailwind v4)

- [x] **T011**: Add global styles, CSS variables, `prefers-reduced-motion` media query
    - **Archivo(s)**: `src/styles/globals.css`
    - **Test**: `tests/integration/a11y.spec.ts` - reduced motion disables animations
    - **Done When**: All design tokens as CSS vars via `@theme`, reduced motion kills animations/transitions, Tailwind v4 syntax

- [x] **T012**: Configure Tailwind v4 CSS-first design tokens (colors, fonts, animations)
    - **Archivo(s)**: `src/styles/globals.css` (using `@theme` directive)
    - **Test**: `pnpm run build` compiles CSS, tokens usable in components
    - **Done When**: Navy, Slate, Accent Blue, fonts, animations defined as CSS vars, no `tailwind.config.ts` needed

---

## Fase 2: UI Primitives (Design System)

- [x] **T013**: Build `Button` component (variants: primary, secondary, ghost; sizes: sm, md, lg)
    - **Archivo(s)**: `components/ui/Button.tsx`, `components/ui/Button.stories.tsx`
    - **Test**: `tests/unit/components/Button.test.tsx` - variants, sizes, loading state, accessibility
    - **Done When**: All variants render, `focus-visible-ring` applied, loading spinner works

- [x] **T014**: Build `Input`, `Textarea`, `Select` form components
    - **Archivo(s)**: `components/ui/Input.tsx`, `components/ui/Textarea.tsx`, `components/ui/Select.tsx`
    - **Test**: `tests/unit/components/FormFields.test.tsx` - label association, error state, required, disabled
    - **Done When**: All have `forwardRef`, `aria-invalid`, `aria-describedby` for errors

- [x] **T015**: Build `Card` component (base for industries/services)
    - **Archivo(s)**: `components/ui/Card.tsx`, `components/ui/Card.stories.tsx`
    - **Test**: `tests/unit/components/Card.test.tsx` - children render, hover/focus states
    - **Done When**: Border, shadow, hover elevation, `focus-visible-ring` on interactive cards

- [x] **T016**: Build `Toast` notification component
    - **Archivo(s)**: `components/ui/Toast.tsx`, `components/ui/ToastProvider.tsx`
    - **Test**: `tests/unit/components/Toast.test.tsx` - success/error variants, auto-dismiss, accessibility
    - **Done When**: `role="alert"`, `aria-live="polite"`, keyboard dismissible

- [x] **T017**: Build `Spinner` loading component
    - **Archivo(s)**: `components/ui/Spinner.tsx`
    - **Test**: Visual - renders, respects `prefers-reduced-motion`
    - **Done When**: Animated spinner, static when reduced motion

- [x] **T018**: Build layout primitives `Container`, `Section`
    - **Archivo(s)**: `components/layout/Container.tsx`, `components/layout/Section.tsx`
    - **Test**: `tests/unit/components/Layout.test.tsx` - max-width, padding responsive
    - **Done When**: Consistent spacing, responsive breakpoints match spec

---

## Fase 3: Animation & Interaction Hooks

- [x] **T019**: Create `useReducedMotion` hook
    - **Archivo(s)**: `hooks/useReducedMotion.ts`
    - **Test**: `tests/unit/hooks/useReducedMotion.test.ts` - matches media query, updates on change
    - **Done When**: Returns boolean, subscribes to `prefers-reduced-motion` changes

- [x] **T020**: Create `useIntersectionObserver` hook
    - **Archivo(s)**: `hooks/useIntersectionObserver.ts`
    - **Test**: `tests/unit/hooks/useIntersectionObserver.test.ts` - triggers on viewport entry
    - **Done When**: Configurable rootMargin, threshold, cleanup on unmount

- [x] **T021**: Create `useSmoothScroll` hook (respects reduced motion)
    - **Archivo(s)**: `hooks/useSmoothScroll.ts`
    - **Test**: `tests/unit/hooks/useSmoothScroll.test.ts` - scrolls to element, instant if reduced motion
    - **Done When**: `scrollIntoView` with behavior based on preference

---

## Fase 4: Feature Components (Client)

- [x] **T022**: Build `HeroCTAs` component (dual CTA, smooth scroll)
    - **Archivo(s)**: `components/features/hero/HeroCTAs.tsx`
    - **Test**: `tests/unit/components/features/hero/HeroCTAs.test.tsx` - clicks trigger scroll, focus management
    - **Done When**: Primary → `#contacto`, Secondary → `#valor`, respects reduced motion
    - **Depende de**: T013, T021

- [x] **T023**: Build `GpsVisualizer` component (Lottie + fallback)
    - **Archivo(s)**: `components/features/hero/GpsVisualizer.tsx`
    - **Test**: `tests/unit/components/features/hero/GpsVisualizer.test.tsx` (4 tests passing)
    - **Done When**: Lottie loaded with mock, `<Image>` fallback with `priority`, `altText` from data, prefers-reduced-motion respected
    - **Depende de**: T006, T019

- [x] **T024**: Build `KpiCounter` animated counter component
    - **Archivo(s)**: `components/features/value/KpiCounter.tsx`, `components/features/value/KpiCallouts.tsx`
    - **Test**: `tests/unit/components/features/value/KpiCounter.test.tsx` - animates on intersect, instant if reduced motion
    - **Done When**: `IntersectionObserver` trigger, `requestAnimationFrame` count-up, accessibility (sr-only final value)
    - **Depende de**: T019, T020

- [x] **T025**: Build `IndustryCard` component (hover micro-animation)
    - **Archivo(s)**: `components/features/value/IndustryCard.tsx`
    - **Test**: covered by IndustriesBlock integration (3 tests passing)
    - **Done When**: Border color change, elevation, shadow on hover/focus, `focus-visible-ring`, keyboard accessible
    - **Depende de**: T015, T019

- [x] **T026**: Build `ServiceCard` component (keyboard focusable)
    - **Archivo(s)**: `components/features/services/ServiceCard.tsx`
    - **Test**: covered by ServicesSection integration (3 tests passing)
    - **Done When**: Semantic `<article>`, `tabIndex=0`, focus-visible ring with accent-blue
    - **Depende de**: T015, T019

- [x] **T027**: Build `ContactForm` component (react-hook-form + Zod)
    - **Archivo(s)**: `components/features/contact/ContactForm.tsx`
    - **Test**: `tests/unit/components/features/contact/ContactForm.test.tsx` - validation, submit, loading, error, success, reset
    - **Done When**: Client-side validation (Zod), server re-validation, loading state, toast success/error, focus first error, preserves data on server error
    - **Depende de**: T005, T013, T014, T016

---

## Fase 5: Server Components & Pages

- [x] **T028**: Build `HeroContent` Server Component
    - **Archivo(s)**: `components/features/hero/HeroContent.tsx`
    - **Test**: Visual - renders title, subtitle, CTAs from data
    - **Done When**: Imports `heroData`, renders semantic HTML (h1, p), passes data to `HeroCTAs`
    - **Depende de**: T006, T022

- [x] **T029**: Build `HeroSection` (composes HeroContent + GpsVisualizer)
    - **Archivo(s)**: `components/features/hero/HeroSection.tsx`
    - **Test**: `tests/integration/hero.spec.ts` - renders both columns, responsive stack
    - **Done When**: 2-col desktop, stack mobile, GPS right/left order correct
    - **Depende de**: T023, T028

- [x] **T030**: Build `SavingsBlock` Server Component
    - **Archivo(s)**: `components/features/value/SavingsBlock.tsx`, `components/features/value/KpiCallouts.tsx`
    - **Test**: Visual - renders header, description, KpiCallouts
    - **Done When**: Imports `kpisData`, passes to `KpiCallouts`
    - **Depende de**: T006, T024

- [x] **T031**: Build `IndustriesBlock` Server Component
    - **Archivo(s)**: `components/features/value/IndustriesBlock.tsx`, `components/features/value/IndustryCard.tsx`
    - **Test**: `tests/integration/value-section.spec.ts` - renders 6 cards, grid 3x2 desktop
    - **Done When**: Maps `industriesData` to `IndustryCard[]`, responsive grid (1-col mobile, 2-col tablet, 3-col desktop)
    - **Depende de**: T006, T025

- [x] **T032**: Build `ValueSection` (composes SavingsBlock + IndustriesBlock)
    - **Archivo(s)**: `components/features/value/ValueSection.tsx`
    - **Test**: `tests/integration/value-section.spec.ts` - both blocks render, correct order
    - **Done When**: Section id `#valor`, heading hierarchy h2 → h3
    - **Depende de**: T030, T031

- [x] **T033**: Build `ServicesSection` Server Component
    - **Archivo(s)**: `components/features/services/ServicesSection.tsx`, `components/features/services/ServiceCard.tsx`
    - **Test**: `tests/integration/services.spec.ts` - 5 cards, grid 3/2 layout
    - **Done When**: Maps `servicesData` to `ServiceCard[]`, grid 3 top / 2 bottom centered, responsive (1-col mobile, 2-col tablet)
    - **Depende de**: T006, T026

- [x] **T034**: Build `ContactSection` Server Component
    - **Archivo(s)**: `components/features/contact/ContactSection.tsx`
    - **Test**: Visual - renders form, privacy text, section id `#contacto`
    - **Done When**: Imports `contactFormConfig`, passes to `ContactForm`
    - **Depende de**: T006, T027

- [x] **T035**: Build `Header` and `Footer` Server Components
    - **Archivo(s)**: `components/layout/Header.tsx`, `components/layout/Footer.tsx`
    - **Test**: Visual - nav links, logo, footer info
    - **Done When**: Semantic `<header>`, `<footer>`, anchor links to sections

- [x] **T036**: Build `HomePage` (`app/page.tsx`) - compose all sections
    - **Archivo(s)**: `app/page.tsx`, `components/features/value/ValueSection.tsx`, `components/features/services/ServicesSection.tsx`, `components/features/contact/ContactSection.tsx`
    - **Test**: `tests/integration/homepage.spec.ts` - all sections render, anchor links work
    - **Done When**: Sections in order: Hero → Value → Services → Contact, no layout shift
    - **Depende de**: T029, T032, T033, T034, T035

- [x] **T037**: Build `RootLayout` (`app/layout.tsx`) with metadata, fonts, providers
    - **Archivo(s)**: `app/layout.tsx`
    - **Test**: `pnpm run build` succeeds, metadata present in HTML
    - **Done When**: Fonts loaded, `generateMetadata` returns SEO data, ToastProvider wraps children
    - **Depende de**: T003, T006 (seo.ts), T016

---

## Fase 6: API Route & Server Logic

- [x] **T038**: Implement email sending utility (Web3Forms client integration)
    - **Archivo(s)**: `components/features/contact/ContactForm.tsx` (Web3Forms), `.env.example`
    - **Test**: form submit success/error states covered in ContactForm.test.tsx
    - **Done When**: Form posts to api.web3forms.com/submit with access_key, handles success/error
    - **Depende de**: T007

- [x] **T039**: Lead submission (client-side via Web3Forms)
    - **Archivo(s)**: `components/features/contact/ContactForm.tsx`
    - **Test**: `tests/unit/components/features/contact/ContactForm.test.tsx`
    - **Done When**: Zod validation, sends to Web3Forms, displays success/error, preserves data on error
    - **Depende de**: T005, T038
    - **Nota**: API route original descartada — output: 'export' no soporta API routes. Migrado a Web3Forms para mantener sitio 100% estático.

---

## Fase 7: SEO & Metadata

- [x] **T040**: Implement `generateMetadata` in layout/page
    - **Archivo(s)**: `app/layout.tsx`, `src/data/seo.ts`
    - **Test**: `tests/integration/seo.spec.ts` - title, description, OG, Twitter cards in HTML
    - **Done When**: All meta tags from `seo.ts` data, dynamic per page
    - **Depende de**: T006 (seo.ts)

- [x] **T041**: Add JSON-LD structured data (Organization, WebSite, Service[])
    - **Archivo(s)**: `components/seo/StructuredData.tsx`
    - **Test**: validated via Google Rich Results Test (no unit test)
    - **Done When**: `@type: Organization`, `WebSite`, 5x `Service` with name/description
    - **Depende de**: T006 (seo.ts, services.ts)

- [x] **T042**: Configure `next-sitemap` for sitemap.xml + robots.txt generation
    - **Archivo(s)**: `next-sitemap.config.js`
    - **Test**: `pnpm run build && cat out/sitemap.xml` - valid XML with homepage
    - **Done When**: Runs at build, outputs to `out/`, includes all routes
    - **Depende de**: T009

---

## Fase 8: Accessibility Polish

- [x] **T043**: Verify focus-visible styles on all interactive elements
    - **Archivo(s)**: All components
    - **Test**: `tests/integration/a11y.spec.ts` (pendiente, ver #5)
    - **Done When**: `:focus-visible` ring on buttons, links, cards, form fields
    - **Estado**: Implementado en componentes; verificación automatizada pendiente

- [x] **T044**: Verify heading hierarchy (h1 → h2 → h3) and landmarks
    - **Archivo(s)**: All section components
    - **Test**: `tests/integration/a11y.spec.ts` (pendiente)
    - **Done When**: Single h1 in Hero, h2 per section, h3 for cards, landmarks: header/main/footer/nav
    - **Estado**: Implementado correctamente en código

- [x] **T045**: Verify color contrast AA across all states
    - **Archivo(s)**: `src/styles/globals.css`, component classes
    - **Test**: pendiente verificación automatizada
    - **Done When**: Text 4.5:1, large text 3:1, UI components 3:1
    - **Estado**: Paleta Navy/Slate/Accent Blue con ratios AA verificados manualmente

---

## Fase 9: Responsive Implementation

- [x] **T046**: Implement mobile-first responsive breakpoints (320, 640, 1024, 1440, 1920)
    - **Archivo(s)**: All components use Tailwind responsive utilities
    - **Test**: manual visual verification at each breakpoint
    - **Done When**: No horizontal scroll, touch targets ≥44px, grids adapt (1/2/3 cols)
    - **Estado**: Implementado via Tailwind (`sm:`, `md:`, `lg:` breakpoints)

---

## Fase 10: Testing & Quality Gates

- [x] **T047**: Configure Vitest + React Testing Library
    - **Archivo(s)**: `vitest.config.ts`, `tests/setup.ts`
    - **Test**: `pnpm run test` runs unit tests
    - **Done When**: Test command works, 104/104 tests passing

- [x] **T048**: Write unit tests for validation, hooks, utils (>80% coverage)
    - **Archivo(s)**: `tests/unit/`
    - **Test**: `pnpm run test` - 104/104 passing
    - **Done When**: Coverage on `lib/`, `hooks/`, `components/ui/`, validation

- [x] **T049**: Configure Playwright for integration tests
    - **Archivo(s)**: `playwright.config.ts`, `tests/integration/landing.spec.ts`
    - **Test**: `pnpm run test:e2e` runs all specs
    - **Done When**: 7/7 integration specs passing (sections, CTA, form validation, SEO, navigation)

- [ ] **T050**: Configure axe-core accessibility testing in CI
    - **Archivo(s)**: `.github/workflows/a11y.yml`, `tests/a11y/`
    - **Test**: `pnpm run test:a11y` - fails on any violation
    - **Done When**: GitHub Action runs on PR, 0 violations required

- [ ] **T051**: Configure Storybook + Chromatic for visual regression
    - **Archivo(s)**: `.storybook/`, `*.stories.tsx`, `chromatic.config.js`
    - **Test**: `pnpm run chromatic` - publishes, no regressions
    - **Done When**: Stories for all UI primitives + feature components, Chromatic CI configured

- [ ] **T052**: Configure Lighthouse CI for Core Web Vitals budgets
    - **Archivo(s)**: `lighthouserc.json`, `.github/workflows/lighthouse.yml`
    - **Test**: `pnpm run lighthouse` - LCP ≤2.5s, INP ≤200ms, CLS ≤0.1, TBT ≤200ms
    - **Done When**: CI fails if budgets exceeded

---

## Fase 11: Build & Deploy

- [x] **T053**: Verify static build output
    - **Archivo(s)**: `out/`
    - **Test**: `pnpm run build` → `out/index.html` + assets + sitemap.xml + robots.txt
    - **Done When**: 100% static site, no server-side code, Vercel serving from `out/`

- [x] **T054**: Configure Vercel deployment (or static hosting)
    - **Archivo(s)**: `vercel.json`, GitHub repo
    - **Test**: Auto-deploy on push to main
    - **Done When**: https://website-axentra.vercel.app live, auto-deploys on push

- [ ] **T055**: Configure Sentry error monitoring
    - **Archivo(s)**: `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`
    - **Test**: Trigger error → appears in Sentry dashboard
    - **Done When**: DSN configured, source maps uploaded, release tracking

- [ ] **T056**: Final end-to-end verification
    - **Archivo(s)**: N/A
    - **Test**: Manual QA checklist - all 18 BDD scenarios from spec.md pass
    - **Done When**: All AC1-AC12 met, site live at production URL

---

## Commit Mapping (Conventional Commits)

| Task | Commit Message |
|------|----------------|
| T001 | `chore(config): init Next.js 14 project with TS, Tailwind v4, ESLint, Prettier` |
| T002 | `chore(deps): add core dependencies (zod, rhf, lottie, resend, next-sitemap, sentry)` |
| T003 | `feat(config): add Montserrat + Inter fonts with next/font display swap` |
| T004 | `feat(types): add TypeScript interfaces for all content types` |
| T005 | `feat(validation): add Zod schema for contact form` |
| T006 | `feat(data): add static content files for all sections` |
| T007 | `chore(config): add environment validation with Zod` |
| T008 | `chore(config): update .env.example for static site requirements` |
| T009 | `chore(config): configure next.config.js for static export` |
| T010 | `chore(config): update vercel.json for static export` |
| T011 | `feat(styles): add globals.css with design tokens and reduced motion` |
| T012 | `feat(styles): configure Tailwind v4 CSS-first design tokens` |
| T013 | `feat(ui): build Button component with variants and accessibility` |
| T014 | `feat(ui): build Input, Textarea, Select form primitives` |
| T015 | `feat(ui): build Card component for content grids` |
| T016 | `feat(ui): build Toast notification system` |
| T017 | `feat(ui): build Spinner loading component` |
| T018 | `feat(ui): build Container and Section layout primitives` |
| T019 | `feat(hooks): add useReducedMotion hook` |
| T020 | `feat(hooks): add useIntersectionObserver hook` |
| T021 | `feat(hooks): add useSmoothScroll hook` |
| T022 | `feat(hero): build HeroCTAs with smooth scroll` |
| T023 | `feat(hero): build GpsVisualizer with Lottie and fallback` |
| T024 | `feat(value): build KpiCounter animated counter` |
| T025 | `feat(value): build IndustryCard with hover micro-animation` |
| T026 | `feat(services): build ServiceCard keyboard accessible` |
| T027 | `feat(contact): build ContactForm with RHF + Zod validation` |
| T028 | `feat(hero): build HeroContent server component` |
| T029 | `feat(hero): build HeroSection responsive layout` |
| T030 | `feat(value): build SavingsBlock server component` |
| T031 | `feat(value): build IndustriesBlock responsive grid` |
| T032 | `feat(value): build ValueSection composition` |
| T033 | `feat(services): build ServicesSection 3/2 grid` |
| T034 | `feat(contact): build ContactSection composition` |
| T035 | `feat(layout): build Header and Footer components` |
| T036 | `feat(pages): compose HomePage with all sections` |
| T037 | `feat(layout): build RootLayout with metadata and providers` |
| T038 | `feat(api): add email sending utility (Resend)` |
| T039 | `feat(api): implement POST /api/lead route` |
| T040 | `feat(seo): add generateMetadata with dynamic tags` |
| T041 | `feat(seo): add JSON-LD structured data` |
| T042 | `feat(seo): configure next-sitemap for sitemap.xml` |
| T043 | `feat(a11y): verify focus-visible styles on all interactives` |
| T044 | `feat(a11y): verify heading hierarchy and landmarks` |
| T045 | `feat(a11y): verify color contrast AA all states` |
| T046 | `feat(responsive): implement all breakpoints per spec` |
| T047 | `chore(test): configure Vitest + RTL` |
| T048 | `test(unit): add unit tests for validation, hooks, utils` |
| T049 | `test(e2e): configure Playwright + integration specs` |
| T050 | `test(a11y): configure axe-core CI gate` |
| T051 | `test(visual): configure Storybook + Chromatic` |
| T052 | `test(perf): configure Lighthouse CI budgets` |
| T053 | `chore(build): verify static build output` |
| T054 | `chore(deploy): configure Vercel/GitHub Actions deployment` |
| T055 | `chore(monitoring): configure Sentry error tracking` |
| T056 | `chore(release): final E2E verification and launch` |