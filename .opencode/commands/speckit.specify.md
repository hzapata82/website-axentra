# /speckit.specify - Definición de Requisitos Funcionales

## Propósito
Crear especificaciones funcionales detalladas usando el formato Given-When-Then (BDD) para features del sitio web WordPress Headless + Vercel.

## Uso
```
/speckit.specify <nombre-del-feature>
```

## Flujo de Trabajo
1. **Recopilar Contexto**: Entender el objetivo del negocio y usuarios objetivo
2. **Definir Escenarios**: Escribir casos Given-When-Then cubriendo happy path, edge cases, errores
3. **Criterios de Aceptación**: Listar criterios medibles y verificables
4. **Validar con Stakeholders**: Confirmar que la spec refleja necesidades reales

## Plantilla de Salida
```markdown
# Feature: <Nombre del Feature>

## Contexto de Negocio
- **Problema**: <Qué problema resuelve>
- **Usuario Objetivo**: <Quién se beneficia>
- **Valor Esperado**: <Mérito de éxito>

## Escenarios BDD

### Escenario 1: <Nombre descriptivo>
**Dado** (Given) <estado inicial/precondiciones>
**Cuando** (When) <acción del usuario/sistema>
**Entonces** (Then) <resultado esperado observable>

### Escenario 2: <Caso edge/error>
**Dado** <condición límite>
**Cuando** <acción problemática>
**Entonces** <manejo graceful esperado>

## Criterios de Aceptación
- [ ] AC1: <Criterio medible 1>
- [ ] AC2: <Criterio medible 2>
- [ ] AC3: <Criterio de accesibilidad WCAG 2.1 AA>
- [ ] AC4: <Criterio de performance Core Web Vitals>

## Dependencias Técnicas
- WordPress GraphQL endpoints requeridos
- Componentes UI existentes a reutilizar
- Variables de entorno necesarias

## Notas de Implementación
- Consideraciones de SEO
- Estrategia de caché en Vercel
- Fallbacks para datos faltantes
```

## Reglas
- SIEMPRE usar formato Given-When-Then
- INCLUIR criterios de accesibilidad y performance
- REFERENCIAR endpoints GraphQL específicos de WordPress
- GUARDAR en `specs/<feature-name>/spec.md`