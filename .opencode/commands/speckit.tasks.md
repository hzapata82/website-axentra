# /speckit.tasks - Checklist de Tareas Atómicas

## Propósito
Descomponer el plan técnico en tareas mínimas, verificables y ejecutables en orden de dependencias (TDD/SDD).

## Uso
```
/speckit.tasks <plan-file-path>
```

## Formato de Tarea
```markdown
- [ ] **T<XXX>**: <Acción concreta y medible>
    - **Archivo(s)**: `ruta/al/archivo.ts`
    - **Test**: `ruta/al/test.test.ts` (red → green → refactor)
    - **Done When**: <Criterio objetivo de finalización>
    - **Depende de**: T<YYY> (opcional)
```

## Categorías y Orden de Ejecución

### Fase 0: Setup & Types
- Types TypeScript / Zod schemas
- GraphQL queries + fragments + codegen
- Configuración de variables de entorno

### Fase 1: Data Layer (Server Components)
- Server Component con fetch GraphQL
- Error/Loading/Empty states
- Caché tags y revalidación

### Fase 2: UI Components (Client Components)
- Componentes presentacionales puros
- Hooks personalizados (useState, useEffect, etc.)
- Event handlers y validaciones

### Fase 3: Integración & Pages
- Page/Layout composition
- Metadata SEO (generateMetadata)
- Middleware si aplica

### Fase 4: Estilos & Accesibilidad
- Tailwind classes + design tokens
- ARIA attributes
- Focus management
- Reduced motion

### Fase 5: Testing
- Unit tests (cobertura > 80% en lógica)
- Integration tests (happy path + 1 edge case)
- A11y tests (axe-core pass)
- Visual regression (si aplica)

### Fase 6: Documentación & Deploy
- Storybook stories (si design system)
- README del feature
- Vercel deployment verification

## Reglas TDD/SDD
1. **RED**: Escribir test que falle ANTES del código
2. **GREEN**: Implementar mínimo para pasar test
3. **REFACTOR**: Limpiar sin cambiar comportamiento
4. **COMMIT**: Cada tarea = 1 commit atómico con mensaje convencional

## Plantilla de Commit
```
<type>(<scope>): <descripción corta>

<cuerpo explicativo si necesario>

Closes: #<task-id>
```

## Tipos: feat, fix, refactor, test, docs, chore, style, perf
## Scopes: graphql, components, pages, styles, a11y, tests, config