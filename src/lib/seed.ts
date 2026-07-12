import type { Venture } from "./types";

/**
 * The four active MBA ventures carried over from the current site. Used two
 * ways: (1) as a static fallback so the Ventures page looks populated before
 * Supabase is connected, and (2) as the seed rows in supabase/schema.sql.
 * Once Supabase is configured, the live table is the source of truth.
 */
export const SEED_VENTURES: Venture[] = [
  {
    id: "seed-aimpoint",
    name: "Aim Point Media",
    description:
      "A golf industry revenue platform connecting courses with advertising opportunities.",
    industries: ["Media", "Consulting"],
    founder: "Seamus O'Connell",
    year: 2026,
    contact_email: "general@aimpoint-media.com",
    website: "https://aimpointmedia.io",
    logo_url: null,
    status: "approved",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "seed-allsquare",
    name: "All Square",
    description:
      "Golf outing planning platform with registration, payments, scoring, and management tools.",
    industries: ["Event Management"],
    founder: "Ramya Meenakshisundaram",
    year: 2026,
    contact_email: "ramya_meenakshisundaram@kenan-flagler.unc.edu",
    website: null,
    logo_url: null,
    status: "approved",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "seed-smithequine",
    name: "Smith Equine",
    description:
      "Equine sports medicine focused on diagnostics, treatment, and performance optimization.",
    industries: ["Equine Health"],
    founder: "Justin Smith",
    year: 2026,
    contact_email: null,
    website: null,
    logo_url: null,
    status: "approved",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "seed-unifounders",
    name: "UniFounders",
    description:
      "An AI-powered matchmaking tool for university innovators and their supporting network.",
    industries: ["EdTech", "Research Commercialization"],
    founder: "Will Butler",
    year: 2023,
    contact_email: "unifounders@gmail.com",
    website: "https://uni-founders.com",
    logo_url: null,
    status: "approved",
    created_at: "2023-01-01T00:00:00Z",
  },
];
