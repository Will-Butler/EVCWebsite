"use client";

import { useState } from "react";
import { PROGRAMS } from "@/lib/programs";

/**
 * Expandable programs list. Each row shows the essentials; clicking reveals the
 * full description and highlights so the About page can hold everything the old
 * Programs page did without feeling dense.
 */
export default function ProgramsExplorer() {
  // First program open by default so the interaction is discoverable.
  const [openSlug, setOpenSlug] = useState<string | null>(PROGRAMS[0]?.slug ?? null);

  return (
    <ul className="mt-10 space-y-3">
      {PROGRAMS.map((p) => {
        const open = openSlug === p.slug;
        const panelId = `program-panel-${p.slug}`;
        return (
          <li
            key={p.slug}
            id={p.slug}
            className={`card scroll-mt-24 overflow-hidden transition-shadow ${
              open ? "shadow-[var(--shadow-lift)]" : ""
            }`}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenSlug(open ? null : p.slug)}
              className="group flex w-full items-center gap-4 p-5 text-left md:p-6"
            >
              <span
                aria-hidden
                className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-[var(--color-surface-muted)] text-2xl transition-transform group-hover:scale-105"
              >
                {p.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-lg font-bold tracking-tight text-[var(--color-navy)]">
                    {p.name}
                  </span>
                  <span className="badge">{p.cadence}</span>
                </span>
                <span className="mt-1 block text-sm text-[var(--color-slate-body)]">
                  {p.tagline}
                </span>
              </span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className={`flex-none text-[var(--color-carolina-dark)] transition-transform duration-300 ${
                  open ? "rotate-45" : ""
                }`}
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="reveal" data-open={open} id={panelId}>
              <div>
                <div className="border-t border-[var(--color-line)] px-5 pb-6 pt-5 md:px-6 md:pl-[5.5rem]">
                  <p className="text-[15px] leading-relaxed text-[var(--color-slate-body)]">
                    {p.description}
                  </p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {p.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-[var(--color-navy)]"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-signal)]"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
