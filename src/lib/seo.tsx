import type { Metadata } from "next";
import { SITE, SEO_KEYWORDS } from "./constants";

/**
 * Build per-page metadata with sensible, keyword-aware defaults. Every page
 * gets a canonical URL, Open Graph, and Twitter card so links render richly
 * and search engines index the right title/description.
 */
export function pageMetadata({
  title,
  description,
  path = "/",
  keywords,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = new URL(path, SITE.url).toString();
  const fullTitle =
    path === "/" ? title : `${title} | ${SITE.shortName}`;
  return {
    title: fullTitle,
    description,
    keywords: keywords ?? SEO_KEYWORDS,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.shortName,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** Organization structured data — rendered once in the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: `${SITE.name} — ${SITE.school}`,
    alternateName: SITE.shortName,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    sameAs: [SITE.linkedin],
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: SITE.school,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "300 Kenan Center Drive",
      addressLocality: SITE.locality,
      addressRegion: SITE.region,
      postalCode: "27599",
      addressCountry: SITE.country,
    },
  };
}

/** Small helper to embed a JSON-LD script tag safely. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
