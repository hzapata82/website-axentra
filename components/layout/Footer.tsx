export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-navy text-slate-light">
      <div className="container-custom grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="text-base font-extrabold text-white">AXENTRA CARGO</p>
          <p className="mt-2 text-sm leading-relaxed">
            Logística industrial de alto rendimiento. Transporte multimodal,
            cruce fronterizo y gestión de carga especializada.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Cobertura</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>México</li>
            <li>Estados Unidos</li>
            <li>Canadá</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Contacto</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <a
                href="mailto:ventas@axentracargo.com"
                className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded"
              >
                ventas@axentracargo.com
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded"
              >
                Solicitar Evaluación Estratégica
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-custom flex flex-col items-center justify-between gap-2 py-4 text-xs text-slate sm:flex-row">
          <p>© {year} Axentra Cargo. Todos los derechos reservados.</p>
          <p>Sitio construido con Next.js · Desplegado en Vercel</p>
        </div>
      </div>
    </footer>
  );
}