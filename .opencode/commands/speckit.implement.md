# /speckit.implement - Implementación Iterativa TDD/SDD

## Propósito
Ejecutar tareas del plan de forma iterativa: test → código → refactor → commit, manteniendo trazabilidad spec → código.

## Uso
```
/speckit.implement <tasks-file-path> [--task=T<XXX>] [--watch]
```

## Modos de Ejecución

### 1. Task Único (`--task=T<XXX>`)
Ejecuta UNA tarea atómica completa:
```bash
# 1. Leer tarea y test asociado
# 2. Ejecutar test (debe fallar - RED)
# 3. Implementar código mínimo (GREEN)
# 4. Ejecutar test suite (pass)
# 5. Refactor si necesario
# 6. Lint + Typecheck
# 7. Commit atómico con mensaje convencional
```

### 2. Secuencial (default)
Ejecuta tareas en orden de dependencias:
```bash
for task in $(grep -E '^\- \[ \]' tasks.md | sort -k2); do
  /speckit.implement tasks.md --task=$task
done
```

### 3. Watch Mode (`--watch`)
- Detecta cambios en archivos de la tarea
- Re-ejecuta tests automáticamente
- Ideal para ciclo RED-GREEN-REFACTOR rápido

## Flujo por Tarea

### Paso 1: Preparación
```bash
# Leer spec.md, plan.md, tasks.md
# Identificar archivos a crear/modificar
# Verificar que tests existen (o crearlos primero)
```

### Paso 2: RED - Test First
```bash
# Ejecutar test específico: npm test -- <test-file> -t "<test-name>"
# Confirmar fallo esperado
# Si test pasa → revisar si ya implementado / test insuficiente
```

### Paso 3: GREEN - Implementación Mínima
```bash
# Escribir SOLO código necesario para pasar test
# No añadir features extra (YAGNI)
# Usar patterns del codebase existente
# TypeScript strict: no any, tipos inferidos
```

### Paso 4: REFACTOR - Limpieza
```bash
# Eliminar duplicación
# Mejorar nombres (self-documenting)
# Aplicar DRY / SOLID
# Verificar: npm run lint && npm run typecheck
# Tests siguen en verde
```

### Paso 5: Verificación Completa
```bash
# npm run test:unit (cobertura)
# npm run test:a11y
# npm run analyze:code
# npm run build (verificar build production)
```

### Paso 6: Commit & Documentación
```bash
git add -A
git commit -m "feat(<scope>): <descripción>

Implements T<XXX> from specs/<feature>/tasks.md

Closes: #T<XXX>"
# Actualizar checklist en tasks.md: [x] T<XXX>
```

## Reglas de Oro
- **Un test por comportamiento** (no por línea de código)
- **No commitear código roto** (tests must pass)
- **Commits atómicos** = 1 tarea = 1 commit
- **Push solo al final** del feature completo (PR ready)
- **Actualizar docs** (README, Storybook, ADRs) en misma tarea

## Integración CI/CD
```yaml
# .github/workflows/ci.yml
- name: Spec-kit Implementation Check
  run: |
    npx speckit-implement specs/<feature>/tasks.md --verify-only
    # Verifica: todos tests pass, lint pass, typecheck pass, build pass
```