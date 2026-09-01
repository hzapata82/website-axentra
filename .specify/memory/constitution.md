# Constitución del Proyecto Axentra Website

**Versión**: 1.0.0
**Fecha**: 2026-08-31
**Estado**: Inmutable - Requiere consenso de stakeholders para modificaciones

---

## Principios Fundamentales

### 1. Accesibilidad Primero (WCAG 2.1 AA)
**Regla**: Cada feature DEBE cumplir WCAG 2.1 Level AA antes de merge.
- Contraste mínimo 4.5:1 (texto normal), 3:1 (texto grande)
- Navegación 100% por teclado con focus visible
- Semantic HTML landmarks (header, nav, main, aside, footer)
- ARIA labels/roles solo cuando HTML nativo no basta
- `prefers-reduced-motion` respetado en todas las animaciones
- Textos alternativos en TODAS las imágenes informativas
- Formularios con labels asociados, validación accesible, mensajes de error claros

**Gate CI**: `npm run test:a11y` debe pasar (0 violations axe-core)

---

### 2. Performance Obsesiva (Core Web Vitals)
**Regla**: Métricas objetivo en producción (p75):
- **LCP** < 2.5s (Largest Contentful Paint)
- **INP** < 200ms (Interaction to Next Paint)
- **CLS** < 0.1 (Cumulative Layout Shift)
- **TTFB** < 800ms (Time to First Byte)
- **JS Bundle** < 170KB gzipped (total)

**Estrategias Obligatorias**:
- Next.js Image con `priority` en above-the-fold, `blur` placeholder
- Fonts: `next/font` variable, self-hosted, `preload`, `display: swap`
- ISR con `revalidate = 3600` + `revalidateTag()` on webhook
- Edge caching para GraphQL queries estáticas
- Code splitting automático (App Router) + dynamic imports para heavy components
- Third-party scripts: `next/script` con `lazyOnload` o `afterInteractive`

**Gate CI**: `npm run analyze:perf` en PRs (bundle size, LCP simulation)

---

### 3. Separación Estricta: Datos (CMS) ↔ Presentación (Frontend)
**Regla**: WordPress SOLO provee datos. Frontend SOLO presenta.
- **WordPress Responsabilidad**: Content modeling, editorial workflow, media management, preview
- **Frontend Responsabilidad**: UI logic, styling, interactivity, SEO metadata, performance
- **Contrato**: GraphQL Schema (versionado, backward compatible)
- **Prohibido**: Lógica de presentación en ACF/WP (no page builders, no CSS en WP)
- **Prohibido**: Business logic en componentes (extraer a hooks/libs compartidas)

**Versionado**: Schema changes = minor version. Breaking changes = major + migration plan.

---

### 4. Specification-Driven Development (SDD)
**Regla**: CERO código sin especificación aprobada en `specs/`.
- Flujo obligatorio: `/speckit.specify` → `/speckit.clarify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`
- Cada feature tiene carpeta en `specs/<feature>/` con: `spec.md`, `clarifications.md`, `plan.md`, `tasks.md`
- Tests se escriben ANTES que implementación (TDD)
- Commits atómicos = 1 tarea = 1 commit (Conventional Commits)

---

### 5. Type Safety Total
**Regla**: TypeScript `strict: true` + `noUncheckedIndexedAccess: true`
- `any` PROHIBIDO (usar `unknown` + type guards)
- GraphQL types generados via `graphql-codegen` (source of truth)
- Zod schemas para validación runtime (forms, API responses)
- Props de componentes: interfaces explícitas, no inline types

---

### 6. Testing Pirámide
**Regla**: Cobertura mínima por capa:
- **Unit (70%)**: Lógica pura, hooks, utils, formatters (Vitest + RTL)
- **Integration (20%)**: Flujos críticos, data fetching, forms (Playwright)
- **E2E (10%)**: Happy paths completos, auth, checkout (Playwright)
- **A11y (Gate)**: axe-core en CI (0 violations)

---

### 7. Observabilidad & Debuggabilidad
**Regla**: Logs estructurados, errors trackeados, métricas expuestas.
- Sentry para error tracking (frontend + edge functions)
- Vercel Analytics + Web Vitals (opt-in consent)
- Console logs solo en development (`process.env.NODE_ENV !== 'production'`)
- Correlation IDs en requests (middleware → API → GraphQL)

---

### 8. Seguridad por Defecto
**Regla**: Principio de menor privilegio, validación en bordes.
- CSP headers estrictos (ver `vercel.json`)
- Sanitización de datos GraphQL (DOMPurify si HTML rico)
- Rate limiting en API routes (Vercel Edge)
- Secrets solo en Vercel Env Vars (nunca en repo)
- Dependabot + `npm audit` en CI

---

### 9. Developer Experience
**Regla**: Feedback loops < 30s.
- `pnpm dev` hot reload < 2s
- `pnpm test --watch` instantáneo
- `pnpm lint` + `pnpm typecheck` en pre-commit (husky)
- Storybook para design system components
- Docs vivas en `specs/` + README por feature

---

### 10. Sostenibilidad & Mantenibilidad
**Regla**: Código legible > código clever.
- Nombres descriptivos (self-documenting)
- Funciones < 30 líneas, componentes < 150 líneas
- DRY aplicado con juicio (no abstracción prematura)
- ADRs (Architecture Decision Records) en `docs/adr/` para decisiones mayores
- Dependency updates mensuales (Dependabot PRs)

---

## Proceso de Enmienda
Cualquier cambio a esta constitución requiere:
1. Issue/RFC documentado con rationale
2. Discusión en equipo (mínimo 48h)
3. Aprobación por mayoría (incluyendo Tech Lead + Product)
4. Version bump (semver) + changelog en `CHANGELOG.md`
5. Comunicación a todo el equipo

---

**Firmado**: Equipo Axentra
**Próxima Revisión**: 2027-02-28 (6 meses)