# /speckit.clarify - Bucle de Aclaración de Dudas

## Propósito
Resolver ambigüedades en especificaciones antes de planificar la implementación, mediante preguntas estructuradas a stakeholders.

## Uso
```
/speckit.clarify <spec-file-path>
```

## Flujo de Trabajo
1. **Analizar Spec**: Leer la especificación en `specs/<feature>/spec.md`
2. **Identificar Ambigüedades**: Detectar términos vagos, decisiones pendientes, trade-offs
3. **Generar Preguntas**: Crear preguntas cerradas con opciones concretas
4. **Documentar Decisiones**: Registrar respuestas en `specs/<feature>/clarifications.md`

## Categorías de Preguntas

### Datos & GraphQL
- ¿Qué campos exactos del schema GraphQL de WordPress se necesitan?
- ¿Hay endpoints existentes o se requieren nuevos custom fields/ACF?
- ¿Cómo manejar datos faltantes o nulos en la respuesta?

### UI/UX & Accesibilidad
- ¿Qué breakpoints específicos (mobile/tablet/desktop)?
- ¿Requisitos de motion/reduced-motion?
- ¿Estados de loading/error/empty predefinidos en el design system?

### Performance & Caché
- ¿TTL de caché en Vercel Edge/ISR para este feature?
- ¿Invalidación de caché al publicar en WordPress?
- ¿Prioridad de carga (critical vs deferred)?

### SEO & Metadata
- ¿Open Graph / Twitter cards personalizados?
- ¿Schema.org structured data requerido?
- ¿Canonical URLs y hreflangs?

## Formato de Preguntas
```markdown
## Pregunta: <Tema específico>
**Opciones:**
- A) <Opción concreta con pros/contras>
- B) <Opción alternativa>
- C) <Otro: __________>

**Recomendación**: <Basada en best practices WCAG/Performance>
**Decisión Final**: <Pendiente / A / B / C>
```

## Reglas
- NO implementar hasta resolver TODAS las preguntas marcadas como "bloqueantes"
- PREFIRIR opciones que minimicen deuda técnica
- DOCUMENTAR rationale de cada decisión
- ACTUALIZAR spec.md si la decisión cambia el alcance