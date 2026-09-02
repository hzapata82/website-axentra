interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export function ServiceCard({ number, title, description, icon }: ServiceCardProps) {
  return (
    <article
      tabIndex={0}
      className="group relative flex flex-col gap-3 rounded-lg border border-slate-border bg-white p-6 transition-all duration-200 hover:border-accent-blue hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2"
    >
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-bold uppercase tracking-wider text-accent-blue"
          aria-hidden="true"
        >
          {number}
        </span>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-md bg-navy text-white"
          aria-hidden="true"
        >
          <span className="text-xs font-bold uppercase">{icon.slice(0, 2)}</span>
        </div>
      </div>
      <h3 className="text-lg font-bold text-navy">{title}</h3>
      <p className="text-sm leading-relaxed text-slate">{description}</p>
    </article>
  );
}