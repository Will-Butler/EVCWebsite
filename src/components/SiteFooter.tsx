import Link from "next/link";
import Image from "next/image";
import { NAV, SITE } from "@/lib/constants";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-[var(--color-line)] bg-[var(--color-surface-muted)]">
      <div className="container-page grid gap-8 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="grid h-10 w-10 place-items-center overflow-hidden rounded-lg bg-[var(--color-navy)] ring-1 ring-black/10"
            >
              <Image
                src="/EVCLogo.png"
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="text-sm font-semibold text-[var(--color-navy)]">
              {SITE.shortName}
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-[var(--color-slate-body)]">
            {SITE.tagline}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold text-[var(--color-navy)]">
            Explore
          </h2>
          <ul className="mt-3 space-y-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-[var(--color-slate-body)] hover:text-[var(--color-carolina-dark)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-[var(--color-navy)]">
            Connect
          </h2>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="text-sm text-[var(--color-slate-body)] hover:text-[var(--color-carolina-dark)]"
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-[var(--color-slate-body)] hover:text-[var(--color-carolina-dark)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM9 9h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.59 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21V21H9z" />
                </svg>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-line)]">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-[var(--color-slate-body)] sm:flex-row">
          <p>
            © {year} {SITE.name}, {SITE.school}.
          </p>
          <div className="flex items-center gap-3">
            <p>Chapel Hill, North Carolina</p>
            <Link
              href="/admin"
              className="rounded border border-[var(--color-line)] px-2 py-1 text-[11px] text-[var(--color-slate-body)] opacity-70 transition hover:border-[var(--color-slate-body)] hover:opacity-100"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
