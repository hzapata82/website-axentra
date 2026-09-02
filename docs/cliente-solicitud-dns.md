# Solicitud de Acceso DNS — Axentra Cargo

**Para:** Cliente (administrador de Google Workspace del dominio `axentracargo.com`)
**De:** Henry Zapata — Desarrollo Web Axentra
**Fecha:** 02 de septiembre de 2026
**Asunto:** Permiso para configurar registros DNS del dominio hacia Vercel

---

## ¿Qué necesito de ti?

Para activar el sitio web **https://axentracargo.com** (actualmente en preview en Vercel) necesito que me otorgues **una de estas dos opciones**:

### Opción A (RECOMENDADA) — Usuario administrador delegado

Crear un usuario administrador delegado en Google Workspace con acceso **únicamente al módulo DNS** (no a Gmail, Drive, ni otros servicios).

**Qué necesito que hagas:**

1. Accede a **Google Admin Console** ([admin.google.com](https://admin.google.com)) con tu cuenta de super-administrador.
2. Ve a **Menú → Directorio → Usuarios → Agregar usuario**.
3. Completa los campos:
   - **Nombre:** `Henry Zapata`
   - **Apellido:** `Desarrollo Web`
   - **Email principal:** `dns@axentracargo.com` (o el que prefieras)
   - **Contraseña:** [generar una temporal; yo la cambiaré al primer login]
4. En **Funciones y permisos del usuario**, asigna el rol:
   - **"Administrador de DNS"** (si está disponible en tu edición de Workspace)
   - O bien, **"Superadministrador"** (con la advertencia de que tendré acceso total, opción menos segura)
5. Comparte conmigo las credenciales por un canal seguro (te recomiendo llamada telefónica o password manager compartido como 1Password/Bitwarden, **nunca por email**).

**Tiempo estimado para ti:** 5 minutos.

---

### Opción B (alternativa segura) — Tú agregas los registros DNS

Si prefieres no compartir acceso a tu consola de Google, tú mismo puedes agregar **3 registros DNS** en **5 minutos**. Te paso los valores exactos al final de este documento.

**Pasos que harías:**

1. Accede a [admin.google.com](https://admin.google.com/ac/domains/manage) → **Dominios → Administrar dominios → axentracargo.com → Configurar DNS**.
2. Selecciona la pestaña **"Registros de recursos"** (o "Custom resource records").
3. Agrega los 3 registros de la **Tabla 1** al final de este documento.
4. Confírmame por email cuando estén agregados.
5. Yo configuro Vercel para verificarlos y emitir el certificado SSL.

---

## ¿Por qué necesito esto?

Vercel (donde está desplegado el sitio) necesita que el dominio apunte a sus servidores mediante registros DNS. El proceso estándar es:

```
Usuario escribe:  axentracargo.com
        ↓
DNS resuelve a:  76.76.21.21 (Vercel)
        ↓
Vercel sirve:    sitio web con SSL automático
```

Una vez configurado, **Vercel renueva el certificado SSL cada 60 días automáticamente** y se encarga de toda la infraestructura.

## ¿Qué pasa después?

| Paso | Responsable | Tiempo |
|------|-------------|--------|
| 1. Agregar acceso o registros DNS | **Tú (cliente)** | 5 min |
| 2. Yo configuro Vercel (dominio + SSL) | Henry Zapata | 10 min |
| 3. Propagación DNS global | Automático | 5 min – 48 h |
| 4. Sitio activo en https://axentracargo.com | — | < 1 h típicamente |

## ¿Es seguro?

**Sí.** Los registros DNS son públicos y no afectan la seguridad de tu email, Google Drive, ni otros servicios. Es el mismo procedimiento que usan todas las páginas web del mundo (Mercado Libre, bancos, gobierno).

**Lo que NO cambia:**
- Tu email en Google Workspace sigue funcionando igual
- Google Drive, Calendar, Meet, todo sigue igual
- Los registros DNS son visibles públicamente (`dig axentracargo.com`)

**Lo que SÍ cambia:**
- Cuando alguien escribe `axentracargo.com` en el navegador, ahora llega al sitio nuevo en Vercel (antes podía llegar a un parking page del registrador).

---

## Tabla 1 — Registros DNS a agregar (Opción B)

Agrega estos **3 registros exactos** en tu consola DNS de Google Workspace:

| Tipo | Nombre / Host | Valor / Destino | TTL |
|------|---------------|-----------------|-----|
| **A** | `@` (o dejar vacío) | `76.76.21.21` | 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com.` | 3600 |
| **TXT** (opcional) | `@` | `vc-domain-verify=axentracargo.com,` | 300 |

> **Nota importante:** En la consola de Google Workspace, el campo "Nombre" del registro `A` debe quedar **vacío** o con `@` (representa el dominio raíz). No pongas `axentracargo.com` literal.

> Si ya existen registros `A` o `CNAME` para `@` o `www`, **debes eliminarlos primero** (suelen ser los parking pages del registrador o registros antiguos de Google Sites).

---

## ¿Dudas?

Responde este email o escríbeme directamente. Si prefieres, puedo agendar una llamada de 15 minutos para hacerlo juntos por videollamada.

**Henry Zapata**
Desarrollo Web — Axentra Cargo
henry.zapata82@gmail.com

---

*Este documento es una solicitud formal de acceso. Si tu política de seguridad interna requiere autorización escrita para crear usuarios administradores delegados, puedo proporcionarte una carta de autorización firmada.*
