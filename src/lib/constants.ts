// Central club + site configuration. Keep all public-facing constants here so
// copy, contact info, and SEO metadata stay consistent across every page.

export const SITE = {
  /** Full club name, used in headings and structured data. */
  name: "Entrepreneurship & Venture Capital Club",
  shortName: "KFBS EVC",
  school: "UNC Kenan-Flagler Business School",
  program: "UNC Kenan-Flagler MBA",
  tagline:
    "Connecting founders, investors, and innovators across the Tar Heel network.",
  description:
    "The Entrepreneurship & Venture Capital Club (EVC) at UNC Kenan-Flagler Business School connects MBA students, alumni, founders, and venture capital investors. We run E-Week, VCIC, career treks, and weekly career labs to launch careers in startups and VC.",
  // Canonical production URL. Update if the launch domain changes.
  url: "https://kfbsevc.com",
  email: "mbaevc@kenan-flagler.unc.edu",
  linkedin: "https://www.linkedin.com/company/kfbsevc",
  locality: "Chapel Hill",
  region: "NC",
  country: "US",
} as const;

// Primary keyword phrases we want the site to rank for. Woven into copy and
// metadata rather than stuffed — used as the metadata `keywords` and to guide
// page titles/descriptions.
export const SEO_KEYWORDS = [
  "UNC entrepreneurship club",
  "UNC venture capital club",
  "Kenan-Flagler entrepreneurship",
  "Kenan-Flagler venture capital",
  "UNC MBA entrepreneurship",
  "UNC MBA venture capital",
  "VCIC UNC",
  "startup club UNC Kenan-Flagler",
  "MBA venture capital club",
  "Tar Heel entrepreneurship",
];

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Network", href: "/network" },
  { label: "Ventures", href: "/ventures" },
];
