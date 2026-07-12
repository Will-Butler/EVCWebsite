export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="border-b border-[var(--color-line)] bg-[var(--color-surface-muted)]">
      <div className="container-page py-14 md:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight text-[var(--color-navy)] md:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-slate-body)]">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
