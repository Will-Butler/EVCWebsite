import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { PROGRAMS } from "@/lib/programs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${SITE.name} at ${SITE.school}`,
  description:
    "The home for entrepreneurship and venture capital at UNC Kenan-Flagler. Explore E-Week, VCIC, career treks, weekly career labs, our member network, and MBA student ventures.",
  path: "/",
});

const features = [
  {
    title: "Network Directory",
    body: "Discover members, alumni, faculty, founders, and investors across the EVC community. Find mentors, co-founders, and the people who can open doors.",
    href: "/network",
    cta: "Browse the network",
  },
  {
    title: "Venture Repository",
    body: "Browse active ventures being built by UNC Kenan-Flagler MBA students, and connect directly with the founders behind them.",
    href: "/ventures",
    cta: "View ventures",
  },
  {
    title: "Programs & Events",
    body: "From E-Week and VCIC to career treks and weekly career labs, our programming is built to launch careers in startups and venture capital.",
    href: "/programs",
    cta: "See our programs",
  },
];

const stats = [
  { value: "#1", label: "Host of VCIC — the world's largest student VC competition" },
  { value: "52+", label: "Career Labs and sessions across the year" },
  { value: "3", label: "Research Triangle schools connected via the Triangle Mixer" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-navy)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(60rem 30rem at 70% -10%, var(--color-carolina) 0%, transparent 60%)",
          }}
        />
        <div className="container-page relative py-20 md:py-28">
          <p className="eyebrow text-[var(--color-carolina-light)]">
            {SITE.school}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            Entrepreneurship &amp; Venture Capital at UNC Kenan-Flagler
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
            {SITE.tagline} We connect MBA students, alumni, founders, and VCs —
            and give you the programs, network, and hands-on experience to build
            or fund the next great company.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/programs" className="btn btn-primary">
              Explore our programs
            </Link>
            <Link
              href="/network"
              className="btn btn-outline !border-white/25 !bg-white/10 !text-white hover:!border-white"
            >
              Browse the network
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              className="btn btn-outline !border-white/25 !bg-transparent !text-white hover:!border-white"
            >
              Get involved
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[var(--color-line)] bg-white">
        <div className="container-page grid gap-6 py-10 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="text-3xl font-bold text-[var(--color-carolina-dark)]">
                {s.value}
              </span>
              <span className="mt-1 text-sm text-[var(--color-slate-body)]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature cards */}
      <section className="container-page py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">What we do</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-navy)]">
            Three ways to plug in
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card flex flex-col p-6">
              <h3 className="text-lg font-semibold text-[var(--color-navy)]">
                {f.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-slate-body)]">
                {f.body}
              </p>
              <Link
                href={f.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-carolina-dark)] transition-all hover:gap-2"
              >
                {f.cta} <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Programs preview */}
      <section className="bg-[var(--color-surface-muted)]">
        <div className="container-page py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow">Signature programs</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-navy)]">
                Built to launch careers in startups and VC
              </h2>
            </div>
            <Link href="/programs" className="btn btn-outline">
              All programs
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((p) => (
              <li key={p.slug} className="card p-6">
                <div className="text-2xl" aria-hidden>
                  {p.icon}
                </div>
                <h3 className="mt-3 text-base font-semibold text-[var(--color-navy)]">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-slate-body)]">
                  {p.tagline}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-16 md:py-24">
        <div className="card flex flex-col items-start gap-4 bg-[var(--color-navy)] p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">
              Ready to build, fund, or connect?
            </h2>
            <p className="mt-2 max-w-xl text-slate-200">
              Whether you&apos;re a founder, an aspiring investor, or just
              curious, there&apos;s a place for you in EVC.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${SITE.email}`} className="btn btn-primary">
              Email us
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline !border-white/25 !bg-white/10 !text-white hover:!border-white"
            >
              Follow on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
