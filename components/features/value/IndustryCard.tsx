interface IndustryCardProps {
  name: string;
  description: string;
  icon: string;
  order: number;
}

export function IndustryCard({ name, description, icon }: IndustryCardProps) {
  return (
    <article className="group relative flex flex-col gap-3 rounded-lg border border-slate-border bg-white p-6 transition-all duration-200 hover:border-accent-blue hover:shadow-lg focus-within:border-accent-blue focus-within:shadow-lg">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-md bg-navy text-white"
        aria-hidden="true"
      >
        <span className="text-xs font-bold uppercase">{icon.slice(0, 2)}</span>
      </div>
      <h3 className="text-lg font-bold text-navy">{name}</h3>
      <p className="text-sm leading-relaxed text-slate">{description}</p>
    </article>
  );
}