# /speckit.analyze - Análisis de Dependencias y Consistencia

## Propósito
Verificar coherencia técnica, detectar duplicación, validar patrones de arquitectura y asegurar cumplimiento de estándares antes/durante/después de implementar.

## Uso
```
/speckit.analyze <target-path> [--type=arch|deps|a11y|perf|all]
```

## Tipos de Análisis

### 1. Arquitectura (`--type=arch`)
```bash
# Verificar:
- Separación Server/Client Components correcta
- No imports de client-only en server components
- GraphQL queries colocadas en lib/graphql/
- Tipos TypeScript consistentes (codegen actualizado)
- Barrel exports en index.ts de cada feature
```

### 2. Dependencias (`--type=deps`)
```bash
# Detectar:
- Circular dependencies (madge)
- Unused dependencies (depcheck)
- Duplicate packages (npm ls)
- Version conflicts (peer deps)
- Bundle size impact (webpack-bundle-analyzer / next-bundle-analyzer)
```

### 3. Accesibilidad (`--type=a11y`)
```bash
# Validar (axe-core + eslint-plugin-jsx-a11y):
- Semantic HTML landmarks
- Heading hierarchy (h1-h6)
- Color contrast ratios (WCAG AA)
- Focus indicators visibles
- ARIA labels/roles correctos
- Alt text en imágenes
- Form labels asociados
- Reduced motion support
```

### 4. Performance (`--type=perf`)
```bash
# Métricas Core Web Vitals:
- LCP < 2.5s (imagen hero, fonts)
- INP < 200ms (interacciones)
- CLS < 0.1 (layout shifts)
- TTFB < 800ms (Edge/ISR)
- Bundle JS < 170KB gzipped
- Image optimization (next/image, WebP/AVIF)
```

### 5. Consistencia de Código (`--type=code`)
```bash
# Linting & Formatting:
- ESLint (next/core-web-vitals, @typescript-eslint)
- Prettier (single quote, trailing comma, printWidth 100)
- TypeScript strict mode (no any, strict null checks)
- Import order (eslint-plugin-import)
- Naming conventions (components PascalCase, hooks camelCase)
```

## Herramientas Integradas
```json
{
  "scripts": {
    "analyze:arch": "madge --circular --extensions ts,tsx src",
    "analyze:deps": "depcheck --ignores=@types/*",
    "analyze:a11y": "npm run test:a11y",
    "analyze:perf": "next build && npx @next/bundle-analyzer",
    "analyze:code": "npm run lint && npm run typecheck",
    "analyze:all": "npm run analyze:arch && npm run analyze:deps && npm run analyze:a11y && npm run analyze:perf && npm run analyze:code"
  }
}
```

## Salida
Reporte en `specs/<feature>/analysis-<timestamp>.md` con:
- ✅ Pass / ❌ Fail / ⚠️ Warning por categoría
- Acciones correctivas priorizadas
- Referencias a archivos y líneas exactas