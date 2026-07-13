import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import ProgramsExplorer from "@/components/ProgramsExplorer";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/constants";
import { PROGRAMS } from "@/lib/programs";
import { pageMetadata, JsonLd } from "@/lib/seo";

// Show the real board graphic when it's present, otherwise fall back to the
// placeholder — checked at build time so the page never depends on a missing
// file. Drop the image at public/exec-board.png to enable it.
const hasBoardPhoto = existsSync(
  join(process.cwd(), "public", "exec-board.png"),
);

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
      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="eyebrow">Our mission</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-navy)] md:text-4xl">
              Founders, investors, and innovators —{" "}
              <span className="italic text-[var(--color-carolina-dark)]">
                in one room
              </span>
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-[var(--color-slate-body)]">
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
          </Reveal>

          <ul className="space-y-4">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 110} className="card p-6">
                <div className="flex items-baseline gap-3">
                  <span
                    aria-hidden
                    className="text-sm font-bold text-[var(--color-signal)]"
                    style={{ fontFamily: "var(--font-display)" }}
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
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Programs — merged in, expandable */}
      <section
        id="programs"
        className="scroll-mt-20 border-y border-[var(--color-line)] bg-[var(--color-surface-muted)]"
      >
        <div className="container-page py-16 md:py-24">
          <Reveal>
            <p className="eyebrow">What we run</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-[var(--color-navy)] md:text-5xl">
              Programming that runs{" "}
              <span className="italic text-[var(--color-carolina-dark)]">
                all year long
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-slate-body)]">
              Competitions, treks, weekly labs, and candid conversations with the
              people building and funding companies. Tap any program to dig in.
            </p>
          </Reveal>
          <ProgramsExplorer />
        </div>
      </section>

      {/* Exec board */}
      <section className="container-page py-16 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Leadership</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-navy)] md:text-4xl">
            Meet the team behind EVC
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-slate-body)]">
            EVC is student-led — our executive board plans and runs every
            program, panel, and trek throughout the year. Want to reach us?{" "}
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
        </Reveal>

        {hasBoardPhoto ? (
          <Reveal className="mt-12">
            <Image
              src="/exec-board.png"
              alt="The 2026–2027 EVC Executive Board: William Butler (President), Satbir Bhatti (EVP of VC), Addie Masterson (EVP of Entrepreneurship), Ramya Meenakshisundaram (VP of Outreach), Daniella Kapural (VP of L&D), Sahitya Yarlagadda (VP of Comms), and Declan Pene (VP of Finance)."
              width={1920}
              height={1080}
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="h-auto w-full rounded-2xl border border-[var(--color-line)] shadow-[var(--shadow-lift)]"
            />
          </Reveal>
        ) : (
          /* Drop the board graphic at public/exec-board.png to replace this
             placeholder (kept as a plain box so the page never depends on a
             missing image). */
          <div className="mt-12 flex aspect-video items-center justify-center rounded-2xl border border-dashed border-[var(--color-line)] bg-[var(--color-surface-muted)] text-center text-sm text-[var(--color-slate-body)]">
            <span className="max-w-xs px-6">
              Executive Board graphic — add{" "}
              <code className="rounded bg-white px-1 py-0.5 text-xs">
                public/exec-board.png
              </code>{" "}
              to display it here.
            </span>
          </div>
        )}
      </section>
    </>
  );
}
