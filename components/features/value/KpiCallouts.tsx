import { KpiCounter } from '@/components/features/value/KpiCounter';

interface Kpi {
  label: string;
  value: string;
  description: string;
  icon: string;
}

interface KpiCalloutsProps {
  kpis: Kpi[];
}

export function KpiCallouts({ kpis }: KpiCalloutsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {kpis.map((kpi) => (
        <KpiCounter
          key={kpi.label}
          label={kpi.label}
          value={kpi.value}
          description={kpi.description}
          icon={kpi.icon}
        />
      ))}
    </div>
  );
}