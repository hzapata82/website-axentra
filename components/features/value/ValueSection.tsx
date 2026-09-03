import { SavingsBlock } from '@/components/features/value/SavingsBlock';
import { IndustriesBlock } from '@/components/features/value/IndustriesBlock';

export function ValueSection() {
  return (
    <section
      id="valor"
      aria-labelledby="savings-heading"
      className="bg-white"
    >
      <div className="container-custom space-y-24 py-20 lg:py-28">
        <SavingsBlock />
        <IndustriesBlock />
      </div>
    </section>
  );
}