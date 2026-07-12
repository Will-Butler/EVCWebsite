import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { SITE } from "@/lib/constants";
import { PROGRAMS } from "@/lib/programs";
import { pageMetadata, JsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Programs & Events",
  description:
    "EVC programs at UNC Kenan-Flagler: E-Week, VCIC (the world's largest student VC competition), the Career Trek to visit VCs and startups, weekly Career Labs, founder panels and fireside chats, and the Triangle Mixer.",
  path: "/programs",
});

// ItemList of educational events for rich results.
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
        url: `${SITE.url}/programs#${p.slug}`,
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

export default function ProgramsPage() {
  return (
    <>
      <JsonLd data={programsJsonLd()} />
      <PageHeader
        eyebrow="Programs & Events"
        title="Hands-on entrepreneurship and venture capital, all year long"
        intro="Our programming is built to give UNC Kenan-Flagler MBAs real access to founders and investors — through competitions, treks, weekly labs, and candid conversations with the people building and funding companies."
      />

      {/* Quick nav */}
      <section className="border-b border-[var(--color-line)] bg-white">
        <div className="container-page flex flex-wrap gap-2 py-5">
          {PROGRAMS.map((p) => (
            <a
              key={p.slug}
              href={`#${p.slug}`}
              className="rounded-full border border-[var(--color-line)] px-4 py-1.5 text-sm font-medium text-[var(--color-navy)] transition-colors hover:border-[var(--color-carolina)] hover:text-[var(--color-carolina-dark)]"
            >
              {p.icon} {p.name}
            </a>
          ))}
        </div>
      </section>

      {/* Program detail sections */}
      <section className="container-page py-8 md:py-12">
        <div className="divide-y divide-[var(--color-line)]">
          {PROGRAMS.map((p) => (
            <article
              key={p.slug}
              id={p.slug}
              className="grid scroll-mt-20 gap-8 py-12 md:grid-cols-[1fr_1.6fr] md:py-16"
            >
              <div>
                <div className="text-4xl" aria-hidden>
                  {p.icon}
                </div>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-navy)]">
                  {p.name}
                </h2>
                <p className="mt-1 text-sm font-semibold text-[var(--color-carolina-dark)]">
                  {p.cadence}
                </p>
                <p className="mt-3 text-[var(--color-slate-body)]">
                  {p.tagline}
                </p>
              </div>
              <div>
                <p className="text-lg leading-relaxed text-[var(--color-slate-body)]">
                  {p.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {p.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-[var(--color-navy)]"
                    >
                      <span
                        aria-hidden
                        className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-carolina)]"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-surface-muted)]">
        <div className="container-page flex flex-col items-start justify-between gap-4 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-navy)]">
              Want to attend or partner on an event?
            </h2>
            <p className="mt-1 text-[var(--color-slate-body)]">
              Reach out and we&apos;ll get you connected.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${SITE.email}`} className="btn btn-primary">
              Email the team
            </a>
            <Link href="/network" className="btn btn-outline">
              Browse the network
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
