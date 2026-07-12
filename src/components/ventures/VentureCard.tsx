import type { Venture } from "@/lib/types";

/** Presentational card for a single venture. Used on the public Ventures page. */
export default function VentureCard({ venture }: { venture: Venture }) {
  const initials = venture.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <article className="card flex flex-col p-6">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-[var(--color-navy)] text-sm font-bold text-white"
        >
          {initials}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-[var(--color-navy)]">
            {venture.name}
          </h3>
          {venture.year && (
            <p className="text-xs text-[var(--color-slate-body)]">
              Founded {venture.year}
            </p>
          )}
        </div>
      </div>

      {venture.industries.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {venture.industries.map((tag) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>
      )}

      {venture.description && (
        <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--color-slate-body)]">
          {venture.description}
        </p>
      )}

      <dl className="mt-5 space-y-1.5 border-t border-[var(--color-line)] pt-4 text-sm">
        {venture.founder && (
          <div className="flex gap-2">
            <dt className="font-semibold text-[var(--color-navy)]">Founder</dt>
            <dd className="text-[var(--color-slate-body)]">{venture.founder}</dd>
          </div>
        )}
        {venture.contact_email && (
          <div className="flex gap-2">
            <dt className="font-semibold text-[var(--color-navy)]">Contact</dt>
            <dd className="min-w-0 truncate">
              <a
                href={`mailto:${venture.contact_email}`}
                className="text-[var(--color-carolina-dark)] hover:underline"
              >
                {venture.contact_email}
              </a>
            </dd>
          </div>
        )}
      </dl>

      {venture.website && (
        <a
          href={venture.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-carolina-dark)] transition-all hover:gap-2"
        >
          Visit website <span aria-hidden>↗</span>
        </a>
      )}
    </article>
  );
}
