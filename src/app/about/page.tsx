import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { SITE } from "@/lib/constants";
import { PROGRAMS } from "@/lib/programs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About the EVC Club",
  description:
    "Learn about the Entrepreneurship & Venture Capital Club at UNC Kenan-Flagler Business School — our mission to connect MBA students, alumni, founders, and venture capital investors building and funding great companies.",
  path: "/about",
});

const values = [
  {
    title: "Access over theory",
    body: "We put students in the same room as the founders and investors doing the work — through treks, panels, and competitions, not just lectures.",
  },
  {
    title: "Built for both paths",
    body: "Whether you want to found a company or break into venture capital, our programming meets you where you are and helps you get where you're going.",
  },
  {
    title: "A network that lasts",
    body: "EVC connects current MBAs with alumni, faculty, and the wider Research Triangle ecosystem — relationships that outlast your time at Kenan-Flagler.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About EVC"
        title="Bridging ideas and execution at UNC Kenan-Flagler"
        intro="The Entrepreneurship & Venture Capital Club connects MBA students, alumni, and industry professionals who are passionate about building and funding the next generation of great companies."
      />

      {/* Mission */}
      <section className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow">Our mission</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-navy)]">
              Where founders, investors, and innovators meet
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--color-slate-body)]">
              <p>
                We exist to bridge the gap between ideas and execution. Through
                events, mentorship, and hands-on experiences, EVC helps students
                explore entrepreneurship and venture capital, sharpen their
                thinking, and build the relationships that turn ambition into
                real companies and careers.
              </p>
              <p>
                From hosting VCIC — the world&apos;s largest student VC
                competition — to weekly Career Labs and treks to visit VCs and
                startups, everything we do is designed to give members a genuine
                edge in the startup and investing world.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/programs" className="btn btn-primary">
                Explore our programs
              </Link>
              <Link href="/ventures" className="btn btn-outline">
                See member ventures
              </Link>
            </div>
          </div>

          <ul className="space-y-4">
            {values.map((v) => (
              <li key={v.title} className="card p-6">
                <h3 className="font-semibold text-[var(--color-navy)]">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-slate-body)]">
                  {v.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What we run */}
      <section className="bg-[var(--color-surface-muted)]">
        <div className="container-page py-16 md:py-20">
          <p className="eyebrow">What we run</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-navy)]">
            Programming across the year
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((p) => (
              <div key={p.slug} className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden>
                    {p.icon}
                  </span>
                  <h3 className="font-semibold text-[var(--color-navy)]">
                    {p.name}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-slate-body)]">
                  {p.tagline}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8">
            <Link
              href="/programs"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-carolina-dark)] transition-all hover:gap-2"
            >
              Full program details <span aria-hidden>→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* Exec board */}
      <section className="container-page py-16 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">Leadership</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-navy)]">
              The 2026–2027 Executive Board
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-slate-body)]">
              EVC is student-led. Our executive board plans and runs every
              program, panel, and trek throughout the year. Want to reach the
              team?{" "}
              <a
                className="font-semibold text-[var(--color-carolina-dark)] underline-offset-2 hover:underline"
                href={`mailto:${SITE.email}`}
              >
                Email us
              </a>{" "}
              or connect on{" "}
              <a
                className="font-semibold text-[var(--color-carolina-dark)] underline-offset-2 hover:underline"
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
          {/*
            Drop the board photo at public/exec-board.jpg to replace this
            placeholder (kept as a plain box so the page never depends on a
            missing image).
          */}
          <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-[var(--color-line)] bg-[var(--color-surface-muted)] text-center text-sm text-[var(--color-slate-body)]">
            <span className="max-w-xs px-6">
              Executive Board photo — add{" "}
              <code className="rounded bg-white px-1 py-0.5 text-xs">
                public/exec-board.jpg
              </code>{" "}
              to display it here.
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
