"use client";

import { useMemo, useState } from "react";
import type { Person } from "@/lib/types";

/**
 * Client-side filterable directory. All people are rendered in the initial SSR
 * HTML (good for SEO); filtering just toggles visibility client-side.
 */
export default function NetworkDirectory({ people }: { people: Person[] }) {
  const [relation, setRelation] = useState<string>("All");

  const relations = useMemo(() => {
    const set = new Set(people.map((p) => p.relation));
    return ["All", ...Array.from(set).sort()];
  }, [people]);

  const filtered =
    relation === "All"
      ? people
      : people.filter((p) => p.relation === relation);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by relationship">
        {relations.map((r) => {
          const active = r === relation;
          return (
            <button
              key={r}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setRelation(r)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "border-[var(--color-carolina)] bg-[var(--color-carolina)] text-white"
                  : "border-[var(--color-line)] text-[var(--color-navy)] hover:border-[var(--color-carolina)]"
              }`}
            >
              {r === "All" ? "All Relations" : r}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <PersonCard key={p.id} person={p} />
        ))}
      </div>
    </div>
  );
}

function PersonCard({ person }: { person: Person }) {
  const initials = person.name
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
          className="grid h-11 w-11 flex-none place-items-center rounded-full bg-[var(--color-carolina)] text-sm font-bold text-white"
        >
          {initials}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-[var(--color-navy)]">
            {person.name}
          </h3>
          <p className="text-xs font-medium text-[var(--color-carolina-dark)]">
            {person.relation}
            {person.grad_year ? ` · ${person.grad_year}` : ""}
          </p>
        </div>
      </div>

      {(person.title || person.company) && (
        <p className="mt-3 text-sm text-[var(--color-slate-body)]">
          {[person.title, person.company].filter(Boolean).join(" · ")}
        </p>
      )}

      {person.bio && (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-slate-body)]">
          {person.bio}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-3 border-t border-[var(--color-line)] pt-4 text-sm">
        {person.email && (
          <a
            href={`mailto:${person.email}`}
            className="font-semibold text-[var(--color-carolina-dark)] hover:underline"
          >
            Email
          </a>
        )}
        {person.linkedin && (
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--color-carolina-dark)] hover:underline"
          >
            LinkedIn ↗
          </a>
        )}
      </div>
    </article>
  );
}
