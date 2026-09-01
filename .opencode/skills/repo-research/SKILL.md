# repo-research Skill

## Descripción
Habilidad para búsqueda y análisis inteligente de código existente en el repositorio. Permite al agente entender la arquitectura, patrones, convenciones y dependencias del proyecto WordPress Headless + Vercel antes de implementar nuevas features.

## Capacidades

### 1. Exploración de Estructura
- Mapear árbol de directorios (`src/`, `lib/`, `components/`, `app/`)
- Identificar entry points (Next.js App Router: `app/`, `middleware.ts`)
- Detectar configuración de build (next.config.js, tsconfig.json, tailwind.config.ts)

### 2. Análisis de Patrones
- **Component Patterns**: Server vs Client Components, composición, props drilling vs context
- **Data Fetching**: GraphQL queries location, fragments, codegen setup, caching strategies
- **Styling**: Tailwind usage, design tokens, dark mode strategy, responsive patterns
- **State Management**: React Context, Zustand, URL search params, server state
- **Testing**: Vitest/RTL patterns, Playwright E2E, a11y testing setup

### 3. Búsqueda Semántica
- Encontrar componentes por funcionalidad (ej. "Hero", "Card", "Form")
- Localizar hooks personalizados (useQuery, useMutation, useMediaQuery)
- Identificar utilidades compartidas (formatters, validators, constants)
- Rastrear tipos TypeScript desde GraphQL schema

### 4. Detección de Convenciones
- Naming: PascalCase components, camelCase hooks/utils, kebab-case files
- Imports: absolute paths (@/), barrel exports (index.ts), path aliases
- GraphQL: co-located queries, fragment naming, variable typing
- Commits: Conventional Commits, scope mapping

### 5. Análisis de Dependencias
- GraphQL schema introspection (WordPress endpoint)
- Package.json: deps, peerDeps, scripts, engines
- Vercel config: rewrites, headers, cron, env vars
- WordPress integration: ACF fields, custom post types, REST/GraphQL endpoints

## Herramientas Internas
- `glob`: patrones de archivos (`**/*.tsx`, `**/*.graphql`)
- `grep`: búsqueda de contenido (regex, function/class/component patterns)
- `read`: análisis de archivos clave (config, entry points, shared libs)
- `task`: sub-agentes para análisis profundo multi-archivo

## Triggers de Activación
- Inicio de nueva feature (`/speckit.plan`, `/speckit.tasks`)
- Refactoring o debugging
- Code review automatizado
- Onboarding a codebase existente

## Outputs Estándar
```markdown
## Repo Research Report: <feature/tarea>

### Arquitectura Actual
- App Router: Sí/No (rutas en `app/`)
- Server Components por defecto: Sí/No
- GraphQL Client: urql / Apollo / fetch nativo

### Patrones Encontrados
- Data fetching: `lib/graphql/queries/*.graphql` + `lib/graphql/fragments/`
- Components: `components/ui/` (base), `components/features/<feature>/`
- Styles: `tailwind.config.ts` tokens, `@/styles/globals.css`
- Types: `lib/graphql/types/` (codegen), `lib/types/` (manual)

### Convenciones Críticas
- Import alias: `@/` → `src/`
- Server Component fetch: `cache: 'force-cache'` + `next: { tags }`
- Client Component marker: `'use client'` en primera línea
- Testing: `*.test.tsx` co-located, `test/` para integration

### Gaps / Riesgos
- <Lista de inconsistencias, deudas técnicas, dependencias obsoletas>

### Recomendaciones
- <Sugerencias para alinear nueva feature con patterns existentes>
```

## Uso en Prompts
```
"Usa repo-research para analizar cómo se implementan los componentes de data fetching en este proyecto antes de crear el plan para la feature X"
```