import { industriesData } from '@/data/industries';
import { IndustryCard } from '@/components/features/value/IndustryCard';

export function IndustriesBlock() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-blue">
        Value Block B
      </p>
      <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy text-balance">
        Industrias que Movemos
      </h2>
      <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate text-pretty">
        Capacidades especializadas adaptadas a los requerimientos únicos de
        cada sector industrial crítico.
      </p>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {industriesData.map((industry) => (
          <IndustryCard
            key={industry.order}
            name={industry.name}
            description={industry.description}
            icon={industry.icon}
            order={industry.order}
          />
        ))}
      </div>
    </div>
  );
}