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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {kpis.map((kpi, idx) => (
        <article
          key={idx}
          className="rounded-lg border border-slate-border bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {kpi.label}
          </p>
          <p className="mt-2 text-3xl font-extrabold text-foreground">
            {kpi.value}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {kpi.description}
          </p>
        </article>
      ))}
    </div>
  );
}