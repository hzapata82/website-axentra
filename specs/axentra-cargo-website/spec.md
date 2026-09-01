# Feature: Axentra Cargo Website - Sitio Web Corporativo Estático

## Contexto de Negocio
- **Problema**: Axentra Cargo necesita una presencia digital profesional que refleje su identidad de marca industrial (Azul Marino, Gris Acero, flecha direccional) y comunique sus capacidades logísticas de alto rendimiento a clientes B2B en México y EE.UU.
- **Usuario Objetivo**: Directores de logística, gerentes de cadena de suministro, propietarios de empresas manufactureras/automotrices/farmacéuticas que requieren transporte multimodal, cruce fronterizo y gestión de carga especializada.
- **Valor Esperado**: Generar leads calificados (RFQs) mediante formulario de evaluación estratégica, demostrar autoridad técnica con KPIs medibles y mostrar cobertura sectorial especializada.

---

## Escenarios BDD

### Escenario 1: Hero Section - Visualización Inicial y Navegación
**Dado** (Given) un usuario aterriza en la página principal (/) desde cualquier dispositivo
**Cuando** (When) la página carga completamente
**Entonces** (Then) se muestra:
- Fondo Navy Axentra (#0A192F) a pantalla completa
- Título H1 "COMANDA TU CARGA" en tipografía ExtraBold blanca, letra 'A' estilizada
- Subtítulo descriptivo de capacidades logísticas
- Dos CTAs: Primary "SOLICITAR EVALUACIÓN ESTRATÉGICA" (fondo azul #1E40AF) y Secondary "EXPLORAR CAPACIDADES" (borde gris acero translúcido)
- Columna derecha: Visualizador GPS animado (GIF/Lottie) mapa oscuro con rutas México-EE.UU., marcadores parpadeantes, notificaciones "Ruta Parametrizada"/"Unidad en Regla"
- Scroll suave al hacer clic en "EXPLORAR CAPACIDADES" hacia sección de valor

### Escenario 2: Hero Section - Interacción CTA Primario
**Dado** (Given) el usuario está en la Hero Section
**Cuando** (When) hace clic en "SOLICITAR EVALUACIÓN ESTRATÉGICA"
**Entonces** (Then) hace scroll suave a la Sección de Contacto (Conversion Hub) y enfoca el campo Email

### Escenario 3: Sección de Valor - Bloque A (Arquitectura de Ahorro)
**Dado** (Given) el usuario hace scroll a la Sección de Valor
**Cuando** (When) la sección entra en viewport (IntersectionObserver)
**Entonces** (Then) se muestra:
- Fondo blanco #FFFFFF con acentos gris claro
- Encabezado "ARQUITECTURA DE AHORRO OPERATIVO"
- Texto descriptivo de arquitectura logística
- Dos KPI Callouts animados (contador numérico): "6 a 7 Cifras $" y "100% Visibilidad" con descripciones
- Animación de entrada escalonada (staggered) respetando `prefers-reduced-motion`

### Escenario 4: Sección de Valor - Bloque B (Grid de Industrias)
**Dado** (Given) el usuario visualiza el Bloque B
**Cuando** (When) pasa el cursor sobre cada tarjeta de industria (6 tarjetas en grid 3x2)
**Entonces** (Then) cada tarjeta muestra micro-animación (elevación + sombra + cambio de borde a Accent Blue #1E40AF) y muestra:
1. Automotriz: "Cadenas de suministro Just-in-Time y líneas de ensamble"
2. Comercio/Retail: "Transporte masivo y surtido continuo"
3. Farmacéutico: "Control riguroso de temperatura y protocolos de seguridad"
4. Construcción: "Manejo de materiales pesados y entregas en obra"
5. Tecnología & Alto Valor: "Esquemas de seguridad reforzada y GPS espejo"
6. Acero & Sobredimensionados: "Equipos especializados y arrastres de alto tonelaje"

### Escenario 5: Grilla de Servicios (Service Grid)
**Dado** (Given) el usuario llega a la Grilla de Servicios
**Cuando** (When) la sección carga
**Entonces** (Then) se renderiza grid modular 5 tarjetas (3 arriba / 2 centradas abajo) sobre fondo #F8FAFC:
- Cada tarjeta: borde 1px #CBD5E1, sombra sutil hover, iconografía SVG
- Tarjeta 01: "Gestión de Transporte" - routing optimizado, selección carrier, tracking real-time
- Tarjeta 02: "Coordinación de Cruce" - cruce fronterizo, compliance aduanal, procesamiento expedito
- Tarjeta 03: "Carga Especial" - sobredimensionada, peligrosa, temperatura controlada
- Tarjeta 04: "Gestión de Proyectos" - planificación multi-modal, movimientos industriales escala
- Tarjeta 05: "Servicios de Almacenaje" - bodegaje seguro, inventario, distribución

### Escenario 6: Grilla de Servicios - Navegación por Teclado
**Dado** (Given) un usuario navega solo con teclado
**Cuando** (When) usa Tab para recorrer las tarjetas de servicios
**Entonces** (Then) cada tarjeta recibe foco visible (focus-visible:ring-2 Accent Blue), es operable con Enter/Espacio, y el orden de tabulación sigue el layout visual (izq-der, arr-abajo)

### Escenario 7: Conversion Hub - Envío Exitoso de Formulario
**Dado** (Given) el usuario está en la Sección de Contacto (fondo #0A192F)
**Cuando** (When) completa todos los campos válidos:
- Email (formato válido, acepta correos corporativos y gratuitos: Gmail, Hotmail, Yahoo, etc.)
- Nombre de empresa (texto, min 2 chars)
- Volumen semanal (selección dropdown: 1-5, 6-20, 21-50, +50 TEUs/FEUs)
- Detalles operación (textarea, min 10 chars)
**Y hace clic** en "SOLICITAR CONSULTA GRATUITA Y EVALUACIÓN"
**Entonces** (Then):
- Botón muestra estado loading (spinner + texto "ENVIANDO...")
- Se envía POST a API route Next.js `/api/lead` → servicio de email (Resend/SendGrid) o webhook CRM
- Respuesta exitosa: toast/alert "Solicitud recibida. Nuestro equipo le contactará en <24h"
- Formulario se resetea
- Evento `lead_submitted` enviado a analytics (GA4/GTM)

### Escenario 8: Conversion Hub - Validación de Errores
**Dado** (Given) el usuario está en el formulario de contacto
**Cuando** (When) envía formulario con campos inválidos/vacíos
**Entonces** (Then):
- Cada campo inválido muestra mensaje de error accesible (aria-describedby + role="alert")
- Email: "Formato de email inválido"
- Empresa: "Nombre de empresa requerido"
- Volumen: "Seleccione un rango de volumen"
- Detalles: "Describa su operación (mínimo 10 caracteres)"
- Focus se mueve al primer campo con error
- Botón no envía hasta corregir todos

### Escenario 9: Conversion Hub - Error de Red/Servidor
**Dado** (Given) el usuario envía formulario válido
**Cuando** (When) la API retorna error 5xx o timeout
**Entonces** (Then):
- Toast de error: "Error temporal. Intente nuevamente o escríbanos a ventas@axentracargo.com"
- Botón vuelve a estado habilitado
- Datos del formulario se preservan
- Error loggeado en servicio de monitoreo (Sentry/LogRocket)

### Escenario 10: Responsive - Mobile First Breakpoints
**Dado** (Given) el usuario accede desde móvil (< 640px)
**Cuando** (When) visualiza cualquier sección
**Entonces** (Then):
- Hero: Stack vertical (contenido arriba, visualizador GPS abajo), título H1 responsive clamp()
- Valor: Grid 1 columna para industrias, KPIs apilados
- Servicios: Grid 1 columna, tarjetas ancho completo
- Contacto: Formulario campos apilados, dropdown nativo móvil
- Touch targets mínimo 44x44px
- No scroll horizontal

### Escenario 11: Responsive - Tablet (640px - 1024px)
**Dado** (Given) viewport tablet
**Cuando** (When) visualiza secciones
**Entonces** (Then):
- Hero: 2 columnas flexibles, visualizador GPS mantiene aspect-ratio
- Industrias: Grid 2 columnas
- Servicios: Grid 2-1-2 o 3-2 según ancho
- Contacto: 2 columnas (inputs arriba, textarea abajo)

### Escenario 12: Accesibilidad - Contraste y Semántica
**Dado** (Given) cualquier página del sitio
**Cuando** (When) se audita con axe-core / Lighthouse
**Entonces** (Then):
- Ratio contraste AA: Texto ≥ 4.5:1, Texto grande ≥ 3:1, UI components ≥ 3:1
- Heading hierarchy: h1 → h2 → h3 sin saltos
- Landmarks: header, main, section, footer, nav presentes
- Imágenes: alt descriptivo o alt="" si decorativas
- Formularios: label asociado a cada input, aria-required, aria-invalid

### Escenario 13: Accesibilidad - Reducción de Movimiento
**Dado** (Given) usuario tiene `prefers-reduced-motion: reduce`
**Cuando** (When) navega el sitio
**Entonces** (Then):
- Animaciones de entrada (fade, slide, stagger) desactivadas o instantáneas
- Visualizador GPS: muestra frame estático en lugar de loop animado
- Micro-interacciones hover: transiciones 0ms
- Contadores KPI: valor final inmediato sin animación numérica

### Escenario 14: Performance - Core Web Vitals
**Dado** (Given) carga inicial de página principal
**Cuando** (When) se mide con Lighthouse / Web Vitals
**Entonces** (Then):
- LCP ≤ 2.5s (Hero image/video optimizado, priority, preload)
- INP ≤ 200ms (event handlers ligeros, no blocking JS)
- CLS ≤ 0.1 (dimensiones explícitas en imágenes, font-display: swap)
- TBT ≤ 200ms (code splitting, dynamic imports para heavy components)

### Escenario 15: SEO - Meta Tags y Structured Data
**Dado** (Given) cualquier página pública
**Cuando** (When) bot de Google/rastreadores acceden
**Entonces** (Then):
- `<title>` único por página, ≤ 60 chars, incluye "Axentra Cargo"
- `<meta name="description">` ≤ 160 chars, persuasivo
- Open Graph + Twitter Cards completos
- JSON-LD `Organization` + `WebSite` + `Service` schema en cada página
- Sitemap.xml generado en build time
- Robots.txt permite crawlers

### Escenario 16: Visualizador GPS - Fallback Estático
**Dado** (Given) el visualizador GPS en Hero
**Cuando** (When) falla la carga del GIF/Lottie (red lenta, error 404, bloqueo CSP)
**Entonces** (Then):
- Imagen estática fallback (PNG/WebP) mapa oscuro con rutas México-EE.UU.
- `alt="Mapa de rutas logísticas Axentra Cargo México-Estados Unidos"`
- No layout shift (aspect-ratio reservado)

### Escenario 17: Tipografía - Carga de Fuentes
**Dado** (Given) primera carga de página
**Cuando** (When) se cargan fuentes Montserrat/Inter
**Entonces** (Then):
- `next/font` variable, self-hosted, `display: swap`
- Fallback system-ui sans-serif durante carga
- Preload de font files críticos (woff2)
- No FOIT (Flash of Invisible Text)

---

## Criterios de Aceptación
- [ ] AC1: Hero Section renderiza en < 2.5s LCP con visualizador GPS funcional
- [ ] AC2: Formulario de contacto envía lead a API route Next.js → email/CRM y muestra confirmación accesible
- [ ] AC3: Grid de industrias (6 tarjetas) y servicios (5 tarjetas) navegan por teclado completo
- [ ] AC4: Accesibilidad WCAG 2.1 AA: 0 violaciones axe-core en CI/CD
- [ ] AC5: Core Web Vitals: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 en producción
- [ ] AC6: Responsive: 0 scroll horizontal en 320px-1920px, touch targets ≥ 44px
- [ ] AC7: `prefers-reduced-motion` desactiva todas las animaciones no esenciales
- [ ] AC8: SEO: Meta tags completos, JSON-LD válido, sitemap.xml generado en build
- [ ] AC9: Sitio 100% estático: `next build` genera HTML puro sin dependencias runtime externas
- [ ] AC10: Visualizador GPS tiene fallback estático sin layout shift
- [ ] AC11: Fuentes self-hosted con `display: swap`, sin FOIT
- [ ] AC12: Contraste AA verificado en todos los estados (default, hover, focus, disabled)

---

## Dependencias Técnicas

### Estructura de Datos Local (src/data/)
```
src/data/
├── hero.ts           # Hero content: title, subtitle, CTAs, GPS visualizer config
├── industries.ts     # 6 industrias: name, description, icon, order
├── kpis.ts           # 2 KPIs: label, value, description, icon
├── services.ts       # 5 servicios: number, title, description, icon, order
├── contact-form.ts   # volumeOptions, privacyText, successMessage, errorMessage
└── seo.ts            # metadata, structured data config
```

**Ejemplo hero.ts:**
```typescript
export const heroData = {
  title: 'COMANDA TU CARGA',
  subtitle: 'Capacidades logísticas de alto rendimiento diseñadas para mover volumen con precisión industrial: transporte multimodal, cruce fronterizo, ingeniería de carga.',
  ctaPrimary: { label: 'SOLICITAR EVALUACIÓN ESTRATÉGICA', href: '#contacto' },
  ctaSecondary: { label: 'EXPLORAR CAPACIDADES', href: '#valor' },
  gpsVisualizer: {
    animationUrl: '/images/hero-gps-animation.lottie.json',
    fallbackImage: '/images/hero-gps-fallback.webp',
    altText: 'Mapa de rutas logísticas Axentra Cargo México-Estados Unidos',
  },
};
```

### Componentes UI a Implementar
- `components/ui/Button` (variants: primary, secondary, ghost, sizes)
- `components/ui/Input`, `components/ui/Textarea`, `components/ui/Select`
- `components/ui/Card` (base para industrias y servicios)
- `components/ui/Toast` (notificaciones)
- `components/ui/Spinner` (loading states)
- `components/layout/Container`, `components/layout/Section`
- `components/features/animations/FadeIn`, `StaggeredReveal`, `KpiCounter`

### Variables de Entorno Necesarias
```env
# Email/CRM Integration (API Route)
RESEND_API_KEY=re_xxxxxxxxxxxxx  # o SENDGRID_API_KEY
LEAD_NOTIFICATION_EMAIL=ventas@axentracargo.com
CRM_WEBHOOK_URL=https://hooks.crm.com/lead  # opcional

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Monitoring
SENTRY_DSN=<dsn>
SENTRY_ORG=<org>
SENTRY_PROJECT=<project>

# Site
NEXT_PUBLIC_SITE_URL=https://axentracargo.com
```

---

## Notas de Implementación

### Consideraciones de SEO
- Página única con secciones ancladas: `#hero`, `#valor`, `#servicios`, `#contacto`
- Cada sección con `id` correspondiente para deep linking
- Structured Data `Service` por cada servicio en Service Grid
- `Organization` schema con `sameAs` (LinkedIn, Twitter/X)
- `BreadcrumbList` en páginas internas futuras
- `next-sitemap` para generar `sitemap.xml` y `robots.txt` en build time

### Generación Estática (SSG)
- `output: 'export'` en `next.config.js` para HTML puro
- O `output: 'standalone'` para Vercel/Node.js runtime sin ISR
- `generateStaticParams` no necesario (una sola ruta `/`)
- Zero external data fetching at runtime

### Fallbacks para Datos Faltantes
- Hero: Título por defecto "COMANDA TU CARGA", subtitle genérico, CTAs con hrefs a #contacto
- GPS Visualizer: Imagen estática en `/public/images/hero-gps-fallback.webp`
- Industrias: Si < 6, grid se adapta (auto-fit minmax(280px, 1fr))
- Servicios: Si < 5, grid 2-2-1 o 3-2 según cantidad
- Formulario: Opciones de volumen hardcodeadas en `contact-form.ts`

### Animaciones y Motion
- **CSS Animations** preferidas sobre Framer Motion (performance)
- `prefers-reduced-motion` media query en `globals.css`
- Staggered reveal: `--stagger-delay: calc(var(--index) * 100ms)`
- GPS Visualizer: `<Image>` con `loading="lazy"` + Lottie `lottie-web` cargado dinámicamente solo si `!prefersReducedMotion`
- KPI Counters: `IntersectionObserver` + `requestAnimationFrame` para contador numérico

### Iconografía
- SVG inline como componentes React (`components/icons/`)
- Sprite SVG opcional para iconos repetidos
- Tamaño base 24x24, escalable via `w-6 h-6` / `w-8 h-8`

### API Route: Lead Submission
```
POST /api/lead
Body: { email, company, volume, details }
Response: { success: boolean, message: string, leadId?: string }
```
- Validación Zod server-side
- Rate limiting (basic)
- Envía email via Resend/SendGrid + opcional webhook CRM
- Log en Sentry

### Testing Strategy
- **Unit (Vitest + RTL)**: Form validation, KPI counter, scroll utils, data imports
- **Integration (Playwright)**: Happy path lead submit, keyboard nav, responsive snapshots, a11y
- **A11y**: axe-core en CI gate
- **Visual Regression**: Storybook + Chromatic para componentes UI
- **Performance**: Lighthouse CI en PRs (budgets: LCP ≤ 2.5s, CLS ≤ 0.1)