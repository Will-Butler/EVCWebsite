import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProgramsExplorer from "@/components/ProgramsExplorer";
import { SITE } from "@/lib/constants";
import { PROGRAMS } from "@/lib/programs";
import { pageMetadata, JsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About & Programs",
  description:
    "The Entrepreneurship & Venture Capital Club at UNC Kenan-Flagler connects MBA students, alumni, founders, and VCs — and runs E-Week, VCIC (the world's largest student VC competition), the Career Trek, weekly Career Labs, founder panels, and the Triangle Mixer.",
  path: "/about",
});

// ItemList of educational events for rich results — carried over from the old
// standalone Programs page now that programming lives on About.
function programsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "EVC Programs & Events",
    itemListElement: PROGRAMS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "EducationEvent",
        name: p.name,
        description: p.description,
        url: `${SITE.url}/about#${p.slug}`,
        organizer: {
          "@type": "Organization",
          name: SITE.shortName,
          url: SITE.url,
        },
        location: {
          "@type": "Place",
          name: SITE.school,
          address: {
            "@type": "PostalAddress",
            addressLocality: SITE.locality,
            addressRegion: SITE.region,
            addressCountry: SITE.country,
          },
        },
      },
    })),
  };
}

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
      <JsonLd data={programsJsonLd()} />
      <PageHeader
        eyebrow="About EVC"
        title={
          <>
            Where ideas meet <span className="mark">execution</span>
          </>
        }
        intro="The Entrepreneurship & Venture Capital Club connects MBA students, alumni, and industry professionals building and funding the next generation of great companies — and gives them the programs, access, and relationships to do it."
      />

      {/* Mission + values */}
      <section className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow">Our mission</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-navy)]">
              Founders, investors, and innovators — in one room
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
          </div>

          <ul className="space-y-4">
            {values.map((v, i) => (
              <li key={v.title} className="card p-6">
                <div className="flex items-baseline gap-3">
                  <span
                    aria-hidden
                    className="text-sm font-bold text-[var(--color-signal)]"
                  >
                    0{i + 1}
                  </span>
                  <h3 className="font-semibold text-[var(--color-navy)]">
                    {v.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-slate-body)]">
                  {v.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Programs — merged in, expandable */}
      <section id="programs" className="scroll-mt-20 bg-[var(--color-surface-muted)]">
        <div className="container-page py-16 md:py-20">
          <p className="eyebrow">What we run</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-[var(--color-navy)] md:text-4xl">
            Programming that runs all year long
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-slate-body)]">
            Competitions, treks, weekly labs, and candid conversations with the
            people building and funding companies. Tap any program to dig in.
          </p>
          <ProgramsExplorer />
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
