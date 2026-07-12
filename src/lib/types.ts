// Shared data models. These mirror the `ventures` and `people` tables defined
// in supabase/schema.sql.

export type ModerationStatus = "pending" | "approved";

export interface Venture {
  id: string;
  name: string;
  description: string | null;
  /** Comma-free industry tags, e.g. ["Media", "Consulting"]. */
  industries: string[];
  founder: string | null;
  year: number | null;
  contact_email: string | null;
  website: string | null;
  logo_url: string | null;
  status: ModerationStatus;
  created_at: string;
}

/** Relationship of a person to the EVC community — drives the Network filter. */
export const RELATION_TYPES = [
  "Current Student",
  "Alumni",
  "Faculty",
  "Founder",
  "Investor",
  "Mentor",
  "Partner",
] as const;

export type RelationType = (typeof RELATION_TYPES)[number];

export interface Person {
  id: string;
  name: string;
  relation: RelationType | string;
  title: string | null;
  company: string | null;
  grad_year: number | null;
  email: string | null;
  linkedin: string | null;
  bio: string | null;
  status: ModerationStatus;
  created_at: string;
}

/** Shape accepted by the public "Add Venture" form. */
export type VentureSubmission = {
  name: string;
  description: string;
  industries: string[];
  founder: string;
  year: number | null;
  contact_email: string;
  website: string;
};

/** Shape accepted by the public "Add Person" form. */
export type PersonSubmission = {
  name: string;
  relation: string;
  title: string;
  company: string;
  grad_year: number | null;
  email: string;
  linkedin: string;
  bio: string;
};
