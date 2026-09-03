# PENDIENTES — Axentra Cargo Website

> **Fuente de verdad para pendientes manuales**: [GitHub Issues](https://github.com/hzapata82/website-axentra/issues?q=is%3Aissue+is%3Aopen+label%3Amanual)
> Este archivo es un **resumen ejecutable** local. Cuando completes un pendiente, ciérralo en GitHub y márcalo aquí.

---

## 🔴 Bloqueantes para producción (requieren tu acción)

### 1. Configurar Web3Forms en Vercel — Issue [#1](https://github.com/hzapata82/website-axentra/issues/1)

**Por qué**: El form de contacto no envía emails hasta tener la API key.

**Pasos**:
1. https://web3forms.com → registrar con `ventas@axentracargo.com`
2. Vercel → Project → Settings → Environment Variables:
   - `NEXT_PUBLIC_WEB3FORMS_KEY` = `<access_key>`
   - Environment: Production + Preview
3. Redeploy automático. Test submit → verificar email.

**Tiempo**: 5 min.

---

### 2. Recibir respuesta del cliente sobre DNS — Issue [#2](https://github.com/hzapata82/website-axentra/issues/2)

**Por qué**: El dominio `axentracargo.com` no apunta a Vercel todavía.

**Estado**: ⏳ `docs/cliente-solicitud-dns.pdf` enviado. Esperando respuesta.

**Cuando responda**:
- Opción A (usuario admin delegado): recibir credenciales → configurar Vercel Domains en 10 min
- Opción B (cliente mete DNS): confirmar → verificar con `dig axentracargo.com` → configurar Vercel

**Tiempo**: 10 min (post-respuesta).

---

## 🟡 Nice-to-have (no bloquean)

### ~~3. Reemplazar GPS placeholder por asset real — Issue [#3]~~ ✅ Resuelto

SVG profesional con hub glow, doble ruta, tarjeta ETA, badges. Commit 6c8ccc2.

### ~~4. Mejorar Open Graph image — Issue [#4]~~ ✅ Resuelto

OG rediseñado con grid bg, gradiente accent, gráfico de ruta. Commit 6c8ccc2.

---

## 🟢 Deuda técnica (no bloquea, baja prioridad)

### ~~5. Arreglar test GpsVisualizer.test.tsx — Issue [#5]~~ ✅ Resuelto

`lottie-web` ahora se mockea en el test (commit b819da4). 104/104 tests passing, 0 type errors.

---

## ✅ Estado del proyecto

| Categoría | Estado |
|-----------|--------|
| Build | ✅ `pnpm run build` exit 0, output: 'export' |
| Tests | ✅ 100/100 passing (1 pre-existente falla: #5) |
| Lint | ✅ `pnpm run lint` 0 errors |
| Typecheck | ✅ `pnpm run typecheck` 0 errores reales (2 pre-existentes en #5) |
| Despliegue | ✅ Vercel auto-deploy en cada push a main |
| Dominio custom | ⏳ #2 esperando cliente |
| Email form | ⏳ #1 pendiente key |
| SEO | ✅ JSON-LD, sitemap.xml, robots.txt, OG image |

**Última actualización**: $(date +%Y-%m-%d)
