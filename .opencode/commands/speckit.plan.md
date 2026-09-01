# /speckit.plan - Plan Técnico de Arquitectura y Datos

## Propósito
Transformar especificaciones validadas en un plan técnico accionable: arquitectura de componentes, queries GraphQL, estructura de datos, y estrategia de despliegue.

## Uso
```
/speckit.plan <spec-file-path>
```

## Entradas Requeridas
- `specs/<feature>/spec.md` (aprobado)
- `specs/<feature>/clarifications.md` (resuelto)
- `.opencode/rules/project-context.md` (stack actual)

## Secciones del Plan

### 1. Arquitectura de Componentes (React/Next.js)
```markdown
## Component Tree
- <ParentComponent> (page/layout)
  - <DataFetchingComponent> (Server Component con GraphQL)
  - <UIComponent> (Client Component interactivo)
    - <SubComponent> (reutilizable del design system)

## Server vs Client Components
- **Server**: Fetching datos, SEO metadata, layout estático
- **Client**: Interactividad, formularios, animaciones, estado local
```

### 2. Queries GraphQL & Tipado
```markdown
## GraphQL Queries
- Query: <NombreQuery> - <Archivo: lib/graphql/queries/<feature>.graphql>
- Fragments: <Reutilizables en lib/graphql/fragments/>
- Variables: <Tipos TypeScript en lib/graphql/types/<feature>.ts>

## TypeScript Types
- Generar types con `graphql-codegen` desde schema WordPress
- Interfaces para props de componentes
- Zod schemas para validación runtime
```

### 3. Estrategia de Datos & Caché
```markdown
## Fetching Strategy
- **SSG/ISR**: `next revalidate = <segundos>` + `cache: 'force-cache'`
- **SSR**: `cache: 'no-store'` para datos personalizados
- **Edge**: Middleware para geo/AB testing si aplica

## Invalidation
- Webhook WordPress → Vercel Deploy Hook / `revalidateTag()`
- Tags: `<feature>-<id>`, `<feature>-list`
```

### 4. Estilos & Design System
```markdown
## Tailwind CSS
- Componentes usan `@apply` con tokens del design system
- Dark mode: `class` strategy en `tailwind.config.ts`
- Responsive: Mobile-first, breakpoints `sm` `md` `lg` `xl`

## Accesibilidad
- Semantic HTML obligatorio
- ARIA labels en elementos interactivos
- Focus visible states
- Contraste AA verificado
```

### 5. Testing Strategy
```markdown
## Unit: Vitest + React Testing Library
- Componentes puros, hooks, utils

## Integration: Playwright
- Flujos críticos E2E
- Visual regression (Chromium)

## A11y: axe-core
- CI gate en PRs
```

### 6. Despliegue & Env Vars
```markdown
## Vercel Config
- `vercel.json`: rewrites, headers, cron jobs
- Env vars: `WORDPRESS_API_URL`, `WORDPRESS_PREVIEW_SECRET`
- Preview deployments automáticos en PRs
```

## Salida
Guardar en `specs/<feature>/plan.md` con checklist de tareas atómicas para `/speckit.tasks`