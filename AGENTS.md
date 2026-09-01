# AGENTS.md - Reglas de Gobernanza para Agentes IA

## Propósito
Alinear el comportamiento de agentes de IA (OpenCode, Copilot, Cursor, etc.) en este repositorio. Este archivo es LEY para cualquier sesión asistida por IA.

---

## Reglas Inmutables

### 1. Spec-First Development (OBLIGATORIO)
- **NUNCA** escribir código de implementación sin una spec aprobada en `specs/<feature>/spec.md`
- **NUNCA** crear archivos fuera de `specs/` sin pasar por el flujo Spec-kit
- **SIEMPRE** verificar que existe `spec.md` + `plan.md` + `tasks.md` antes de implementar
- **USAR** comandos `/speckit.*` para cada fase (specify, clarify, plan, tasks, implement, analyze)

### 2. Scope Estricto por Tarea
- **UNA** tarea atómica a la vez (ver `tasks.md`)
- **NO** refactorizar código no relacionado ("boy scout rule" solo dentro del scope de la tarea)
- **NO** añadir "mejoras" no especificadas (YAGNI)
- **SI** surge deuda técnica → crear nueva task en `tasks.md` o issue separado

### 3. Quality Gates (NO NEGOCIABLES)
Antes de CADA commit, el agente DEBE verificar:
```bash
pnpm run lint        # ESLint passing
pnpm run typecheck   # TypeScript strict passing
pnpm run test        # Unit tests passing
pnpm run test:a11y   # A11y (axe-core) 0 violations
pnpm run build       # Production build success
```
**Si alguno falla → NO COMMIT. Fix first.**

### 4. Conventional Commits (OBLIGATORIO)
Formato: `<type>(<scope>): <description>`
```
feat(graphql): add HeroQuery with fragments
fix(components): Button focus-visible style
refactor(hooks): extract useMediaQuery
test(a11y): add axe-core integration test
docs(spec): clarify INP requirements for carousel
chore(deps): update next.js to 14.2
```
- **Scope** debe mapear a: `graphql`, `components`, `pages`, `styles`, `a11y`, `tests`, `config`, `hooks`, `utils`, `types`
- **Body** opcional pero recomendado para `feat`/`fix`/`refactor`
- **Footer**: `Closes: #T<XXX>` referenciando task ID

### 5. File Ownership & Patterns
- **GraphQL**: Solo en `lib/graphql/` (queries, fragments, client, types)
- **Components**: `components/ui/` (base), `components/features/<feature>/` (feature), `components/layout/` (shell)
- **Server Components**: Default. `'use client'` SOLO cuando necesario (interactividad, hooks, browser APIs)
- **Styles**: Tailwind tokens en `tailwind.config.ts`, globals en `src/styles/globals.css`
- **Types**: Generados en `lib/graphql/types/`, manuales en `src/types/`
- **Tests**: Co-located `*.test.tsx` (unit), `tests/integration/` (Playwright)

### 6. WordPress/GraphQL Contract
- **NUNCA** hardcodear campos GraphQL en componentes → usar fragments + codegen types
- **SIEMPRE** `next: { tags: ['<feature>-<id>'], revalidate: 3600 }` en Server Components
- **PREVIEW MODE**: Respetar `x-wp-preview` header + `WORDPRESS_PREVIEW_SECRET`
- **IMÁGENES**: `next/image` con `sizes` + `priority` (above fold) / `loading="lazy"` (below)

### 7. Accessibility Checklist (AUTO-APPLY)
En CADA componente interactivo nuevo/modificado:
- [ ] Semantic HTML (button, a, form, label, heading hierarchy)
- [ ] `focus-visible` styles (Tailwind `focus-visible:ring-2`)
- [ ] ARIA labels/roles solo si HTML nativo insuficiente
- [ ] Contraste AA verificado (texto, bordes, focus)
- [ ] `prefers-reduced-motion` respetado (transiciones, animaciones)
- [ ] Keyboard navigation completa (Tab, Enter, Escape, Arrow keys)

### 8. Performance Budget (AUTO-ENFORCE)
- Imágenes: `next/image` + WebP/AVIF + blur placeholder
- Fuentes: `next/font` variable, self-hosted, `display: swap`
- Scripts third-party: `next/script` strategy `lazyOnload`
- Bundle: `import()` dinámico para heavy components (charts, editors, maps)
- Caché: ISR + `revalidateTag()` en webhook WordPress

### 9. Testing Discipline (TDD)
- **RED**: Test escrito ANTES que código (fallando)
- **GREEN**: Mínimo código para pasar test
- **REFACTOR**: Limpieza con tests en verde
- Cobertura: >80% en lógica de negocio, hooks, utils
- 1 test por comportamiento (no por línea)
- Edge cases: al menos 1 por feature (empty, error, boundary)

### 10. Documentation as Code
- `README.md` en raíz + por feature en `specs/<feature>/README.md`
- JSDoc en funciones públicas / hooks / componentes complejos
- Storybook stories para `components/ui/*`
- ADRs en `docs/adr/` para decisiones arquitectónicas

---

## Comandos Permitidos / Prohibidos

### ✅ PERMITIDOS (usar libremente)
- `/speckit.specify`, `/speckit.clarify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement`, `/speckit.analyze`
- `repo-research` skill para análisis de codebase
- `pnpm run lint`, `typecheck`, `test`, `test:a11y`, `build`, `analyze:*`
- `git add`, `git commit`, `git push` (tras verificar gates)
- Leer/escribir en `specs/`, `src/`, `.opencode/`, `.specify/`

### ❌ PROHIBIDOS (nunca hacer)
- `git commit --no-verify` / `git push --force`
- Editar `package.json` dependencies sin issue/PR
- Modificar `vercel.json`, `next.config.js`, `tsconfig.json` sin ADR
- Crear archivos en raíz del repo (salvo `.env.local` personal)
- Hardcodear URLs, secrets, config en código
- Usar `any` type, `@ts-ignore`, `eslint-disable` sin justification comment
- Implementar features completas en un solo commit/PR

---

## Escalation Protocol
Si el agente detecta:
- **Ambigüedad en spec** → `/speckit.clarify` ANTES de continuar
- **Conflicto con constitución** → STOP, crear issue, esperar resolución humana
- **Deuda técnica crítica** → Documentar en `tasks.md` como task separado, no fixear inline
- **Falta de contexto** → Usar `repo-research` skill, luego preguntar al humano

---

## Versionamento de AGENTS.md
- Cambios requieren: Issue + Discusión + Aprobación (mismo proceso que Constitución)
- Version en header: `v1.0.0 - 2026-08-31`
- Changelog en `CHANGELOG.md`

---

**Nota para Humanos**: Este archivo entrena al agente. Si el agente lo viola, es bug del setup, no del agente. Reportar en issue para ajustar prompts/reglas.