import { kpisData } from '@/data/kpis';
import { KpiCallouts } from '@/components/features/value/KpiCallouts';

export function SavingsBlock() {
  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-blue">
        Value Block A
      </p>
      <h2
        id="savings-heading"
        className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy text-balance"
      >
        Arquitectura de Ahorro Operativo
      </h2>
      <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate text-pretty">
        Arquitectura logística diseñada para reducir costos estructurales,
        eliminar tiempos muertos y maximizar el margen de tu operación con
        visibilidad total sobre cada unidad en ruta.
      </p>
      <div className="mt-10">
        <KpiCallouts kpis={kpisData} />
      </div>
    </div>
  );
}