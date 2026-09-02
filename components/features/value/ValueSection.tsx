import { SavingsBlock } from '@/components/features/value/SavingsBlock';
import { IndustriesBlock } from '@/components/features/value/IndustriesBlock';

export function ValueSection() {
  return (
    <section
      id="valor"
      aria-labelledby="valor-heading"
      className="bg-white"
    >
      <h2 id="valor-heading" className="sr-only">
        Arquitectura de Ahorro Operativo
      </h2>
      <div className="container-custom space-y-24 py-20 lg:py-28">
        <SavingsBlock />
        <IndustriesBlock />
      </div>
    </section>
  );
}