import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import { SITE } from "@/lib/constants";
import { PROGRAMS } from "@/lib/programs";
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

/** Words that rise into place on load, staggered by index. */
function KineticWord({ children, i }: { children: React.ReactNode; i: number }) {
  return (
    <span style={{ animationDelay: `${0.15 + i * 0.08}s` }}>{children}</span>
  );
}

export default function HomePage() {
  const line1 = ["Build", "the", "next"];
  const line2 = ["great", "company."];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-[var(--color-navy)] text-white">
        {/* Animated aurora + texture */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="aurora float-soft"
            style={{
              top: "-12%",
              right: "-6%",
              width: "42rem",
              height: "42rem",
              background: "var(--color-carolina)",
            }}
          />
          <div
            className="aurora"
            style={{
              bottom: "-20%",
              left: "-8%",
              width: "34rem",
              height: "34rem",
              background: "var(--color-signal)",
              animationDelay: "-6s",
              opacity: 0.4,
            }}
          />
          <div className="dot-grid absolute inset-0 opacity-70" />
        </div>

        <div className="container-page relative py-24">
          <p className="eyebrow !text-[var(--color-carolina-light)]">
            {SITE.school}
          </p>
          <h1 className="word-rise mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl lg:text-8xl">
            {line1.map((w, i) => (
              <KineticWord key={w} i={i}>
                {w}{" "}
              </KineticWord>
            ))}
            <br />
            {line2.map((w, i) => (
              <KineticWord key={w} i={line1.length + i}>
                {w}{" "}
              </KineticWord>
            ))}
            <br />
            <span
              className="italic text-[var(--color-carolina-light)]"
              style={{ animationDelay: `${0.15 + 5 * 0.08}s` }}
            >
              Or{" "}
            </span>
            <span
              className="relative italic"
              style={{ animationDelay: `${0.15 + 6 * 0.08}s` }}
            >
              <span className="relative z-10">fund&nbsp;it.</span>
              <span
                aria-hidden
                className="stroke-grow absolute inset-x-0 bottom-1.5 z-0 h-3 -rotate-1 bg-[var(--color-signal)] md:bottom-3 md:h-5"
              />
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            EVC is where entrepreneurship and venture capital meet at UNC
            Kenan-Flagler. We connect MBA students with the founders and
            investors doing the work — and give you the programs, network, and
            hands-on reps to go do it yourself.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
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

          <div className="mt-14 flex flex-wrap items-center gap-2.5">
            <span
              className="text-xs uppercase tracking-[0.18em] text-slate-400"
              style={{ fontFamily: "var(--font-ui)" }}
            >
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

      {/* Kinetic marquee of programs */}
      <div className="border-y border-[var(--color-line)] bg-white py-5">
        <Marquee items={PROGRAMS.map((p) => p.name)} />
      </div>

      {/* Feature cards */}
      <section className="container-page py-20 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">What we do</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--color-navy)] md:text-5xl">
              Three ways to <span className="italic text-[var(--color-carolina-dark)]">plug in</span>
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} as="div" delay={i * 110}>
              <Link
                href={f.href}
                className="group card relative flex h-full flex-col overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
              >
                <span
                  aria-hidden
                  className="absolute right-6 top-6 text-3xl text-[var(--color-line)] transition-colors duration-300 group-hover:text-[var(--color-signal)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {f.n}
                </span>
                <span
                  aria-hidden
                  className="h-1.5 w-10 rounded-full bg-[var(--color-signal)] transition-all duration-300 group-hover:w-16"
                />
                <h3 className="mt-6 text-xl font-bold text-[var(--color-navy)]">
                  {f.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[var(--color-slate-body)]">
                  {f.body}
                </p>
                <span className="link-arrow mt-5">
                  {f.cta}{" "}
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20 md:pb-28">
        <Reveal>
          <div className="card relative flex flex-col items-start gap-5 overflow-hidden bg-[var(--color-navy)] p-8 text-white md:flex-row md:items-center md:justify-between md:p-14">
            <div
              aria-hidden
              className="aurora"
              style={{
                top: "-40%",
                right: "6%",
                width: "20rem",
                height: "20rem",
                background: "var(--color-carolina)",
                opacity: 0.3,
              }}
            />
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative">
              <h2 className="text-3xl font-semibold md:text-4xl">
                Ready to build, fund, or connect?
              </h2>
              <p className="mt-3 max-w-xl text-slate-300">
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
        </Reveal>
      </section>
    </>
  );
}
