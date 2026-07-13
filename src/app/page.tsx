import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${SITE.name} at ${SITE.school}`,
  description:
    "The home for entrepreneurship and venture capital at UNC Kenan-Flagler. Explore E-Week, VCIC, career treks, weekly career labs, our member network, and MBA student ventures.",
  path: "/",
});

const ecosystem = ["Founders", "Investors", "Builders", "Alumni", "Faculty"];

const features = [
  {
    n: "01",
    title: "Network Directory",
    body: "Members, alumni, faculty, founders, and investors — the people who open doors. Find a mentor, a co-founder, or your next intro.",
    href: "/network",
    cta: "Browse the network",
  },
  {
    n: "02",
    title: "Venture Repository",
    body: "Real companies being built right now by Kenan-Flagler MBAs. Explore what members are building and reach the founders directly.",
    href: "/ventures",
    cta: "View ventures",
  },
  {
    n: "03",
    title: "Programs & Events",
    body: "E-Week, VCIC, career treks, and weekly Career Labs — hands-on programming built to launch careers in startups and venture capital.",
    href: "/about#programs",
    cta: "See our programs",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-navy)] text-white">
        <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-70" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(48rem 26rem at 78% -8%, var(--color-carolina) 0%, transparent 62%), radial-gradient(38rem 22rem at 8% 118%, var(--color-signal) 0%, transparent 55%)",
            opacity: 0.28,
          }}
        />
        <div className="container-page relative py-20 md:py-28">
          <p className="eyebrow !text-[var(--color-carolina-light)]">
            {SITE.school}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Build the next great company.{" "}
            <span className="whitespace-nowrap">Or</span>{" "}
            <span className="relative inline-block">
              <span className="relative z-10">fund it.</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-1 z-0 h-3 -rotate-1 bg-[var(--color-signal)] opacity-90 md:bottom-2 md:h-4"
              />
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
            EVC is where entrepreneurship and venture capital meet at UNC
            Kenan-Flagler. We connect MBA students with the founders and
            investors doing the work — and give you the programs, network, and
            hands-on reps to go do it yourself.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about#programs" className="btn btn-primary">
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

          <div className="mt-12 flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              One community of
            </span>
            {ecosystem.map((role) => (
              <span key={role} className="chip">
                {role}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="container-page py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">What we do</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-navy)] md:text-4xl">
              Three ways to plug in
            </h2>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="group card relative flex flex-col overflow-hidden p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <span
                aria-hidden
                className="absolute right-5 top-5 text-2xl font-bold text-[var(--color-line)] transition-colors group-hover:text-[var(--color-signal-soft)]"
              >
                {f.n}
              </span>
              <span
                aria-hidden
                className="h-1.5 w-10 rounded-full bg-[var(--color-signal)]"
              />
              <h3 className="mt-5 text-lg font-bold text-[var(--color-navy)]">
                {f.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-slate-body)]">
                {f.body}
              </p>
              <span className="link-arrow mt-4">
                {f.cta} <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-16 md:pb-24">
        <div className="card relative flex flex-col items-start gap-4 overflow-hidden bg-[var(--color-navy)] p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
          <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative">
            <h2 className="text-2xl font-bold md:text-3xl">
              Ready to build, fund, or connect?
            </h2>
            <p className="mt-2 max-w-xl text-slate-200">
              Whether you&apos;re a founder, an aspiring investor, or just
              curious, there&apos;s a place for you in EVC.
            </p>
          </div>
          <div className="relative flex flex-wrap gap-3">
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
