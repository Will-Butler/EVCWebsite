import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Person, Venture, ModerationStatus } from "./types";

/**
 * Returns the D1 binding, or null when it isn't available (e.g. running
 * `next dev`/`next build` without the Cloudflare context, or before the
 * database has been created). Callers fall back gracefully.
 */
export function getDb(): D1Database | null {
  try {
    const { env } = getCloudflareContext();
    return env.DB ?? null;
  } catch {
    return null;
  }
}

export function hasDb(): boolean {
  return getDb() !== null;
}

// ---------- Row → model mapping -------------------------------------------

type VentureRow = Omit<Venture, "industries"> & { industries: string };

function toVenture(row: VentureRow): Venture {
  let industries: string[] = [];
  try {
    const parsed = JSON.parse(row.industries || "[]");
    if (Array.isArray(parsed)) industries = parsed.map(String);
  } catch {
    industries = [];
  }
  return { ...row, industries };
}

// ---------- Ventures -------------------------------------------------------

export async function dbListVentures(
  onlyApproved: boolean,
): Promise<Venture[]> {
  const db = getDb();
  if (!db) return [];
  const sql = onlyApproved
    ? "SELECT * FROM ventures WHERE status = 'approved' ORDER BY year DESC, name ASC"
    : "SELECT * FROM ventures ORDER BY created_at DESC";
  const { results } = await db.prepare(sql).all<VentureRow>();
  return results.map(toVenture);
}

export async function dbInsertVenture(v: {
  name: string;
  description: string;
  industries: string[];
  founder: string;
  year: number | null;
  contact_email: string | null;
  website: string | null;
}): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not configured");
  await db
    .prepare(
      `INSERT INTO ventures
        (id, name, description, industries, founder, year, contact_email, website, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
    )
    .bind(
      crypto.randomUUID(),
      v.name,
      v.description,
      JSON.stringify(v.industries),
      v.founder,
      v.year,
      v.contact_email,
      v.website,
    )
    .run();
}

// ---------- People ---------------------------------------------------------

export async function dbListPeople(onlyApproved: boolean): Promise<Person[]> {
  const db = getDb();
  if (!db) return [];
  const sql = onlyApproved
    ? "SELECT * FROM people WHERE status = 'approved' ORDER BY name ASC"
    : "SELECT * FROM people ORDER BY created_at DESC";
  const { results } = await db.prepare(sql).all<Person>();
  return results;
}

export async function dbInsertPerson(p: {
  name: string;
  relation: string;
  title: string | null;
  company: string | null;
  grad_year: number | null;
  email: string | null;
  linkedin: string | null;
  bio: string | null;
}): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not configured");
  await db
    .prepare(
      `INSERT INTO people
        (id, name, relation, title, company, grad_year, email, linkedin, bio, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
    )
    .bind(
      crypto.randomUUID(),
      p.name,
      p.relation,
      p.title,
      p.company,
      p.grad_year,
      p.email,
      p.linkedin,
      p.bio,
    )
    .run();
}

// ---------- Moderation (admin) --------------------------------------------

type Table = "ventures" | "people";

export async function dbSetStatus(
  table: Table,
  id: string,
  status: ModerationStatus,
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not configured");
  await db
    .prepare(`UPDATE ${table} SET status = ? WHERE id = ?`)
    .bind(status, id)
    .run();
}

export async function dbDelete(table: Table, id: string): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not configured");
  await db.prepare(`DELETE FROM ${table} WHERE id = ?`).bind(id).run();
}

// ---------- Admin edits (update all fields, leaves status untouched) --------

export async function dbUpdateVenture(
  id: string,
  v: {
    name: string;
    description: string;
    industries: string[];
    founder: string;
    year: number | null;
    contact_email: string | null;
    website: string | null;
  },
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not configured");
  await db
    .prepare(
      `UPDATE ventures SET name = ?, description = ?, industries = ?,
        founder = ?, year = ?, contact_email = ?, website = ? WHERE id = ?`,
    )
    .bind(
      v.name,
      v.description,
      JSON.stringify(v.industries),
      v.founder,
      v.year,
      v.contact_email,
      v.website,
      id,
    )
    .run();
}

export async function dbUpdatePerson(
  id: string,
  p: {
    name: string;
    relation: string;
    title: string | null;
    company: string | null;
    grad_year: number | null;
    email: string | null;
    linkedin: string | null;
    bio: string | null;
  },
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not configured");
  await db
    .prepare(
      `UPDATE people SET name = ?, relation = ?, title = ?, company = ?,
        grad_year = ?, email = ?, linkedin = ?, bio = ? WHERE id = ?`,
    )
    .bind(
      p.name,
      p.relation,
      p.title,
      p.company,
      p.grad_year,
      p.email,
      p.linkedin,
      p.bio,
      id,
    )
    .run();
}
