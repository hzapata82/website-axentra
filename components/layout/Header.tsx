import Link from 'next/link';

const navLinks = [
  { href: '#valor', label: 'Capacidades' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#contacto', label: 'Contacto' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/90 backdrop-blur">
      <div className="container-custom flex h-16 items-center justify-between">
        <Link
          href="#hero"
          className="flex items-center gap-2 text-white font-extrabold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded bg-accent-blue text-white"
            aria-hidden="true"
          >
            A
          </span>
          <span className="text-base">AXENTRA</span>
        </Link>
        <nav aria-label="Navegación principal">
          <ul className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded px-3 py-2 text-sm font-medium text-slate-light transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#contacto"
                className="ml-1 rounded bg-accent-blue px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:ml-2"
              >
                Solicitar Evaluación
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}