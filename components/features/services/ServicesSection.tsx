import { servicesData } from '@/data/services';
import { ServiceCard } from '@/components/features/services/ServiceCard';

export function ServicesSection() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-heading"
      className="bg-off-white"
    >
      <div className="container-custom py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-blue">
            Capacidades
          </p>
          <h2
            id="servicios-heading"
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy text-balance"
          >
            Grid de Servicios
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate text-pretty">
            Cinco pilares operativos que cubren el ciclo completo de tu cadena
            logística, desde el routing inicial hasta la entrega final.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.order}
              number={service.number}
              title={service.title}
              description={service.description}
              icon={service.icon}
              order={service.order}
            />
          ))}
        </div>
      </div>
    </section>
  );
}