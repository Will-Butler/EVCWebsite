"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import {
  dbInsertVenture,
  dbInsertPerson,
  dbUpdateVenture,
  dbUpdatePerson,
  dbSetStatus,
  dbDelete,
  hasDb,
} from "./db";
import type { PersonSubmission, VentureSubmission } from "./types";

export type ActionResult = { ok: boolean; error?: string };

const NOT_CONFIGURED =
  "Submissions aren't connected yet. Please email us and we'll add your entry.";

// ---------- Public submissions (create as 'pending') -----------------------

export async function submitVenture(
  data: VentureSubmission,
): Promise<ActionResult> {
  if (!hasDb()) return { ok: false, error: NOT_CONFIGURED };
  const name = data.name?.trim();
  const description = data.description?.trim();
  const founder = data.founder?.trim();
  if (!name || !description || !founder) {
    return { ok: false, error: "Name, description, and founder are required." };
  }
  try {
    await dbInsertVenture({
      name,
      description,
      industries: (data.industries ?? []).map((s) => s.trim()).filter(Boolean),
      founder,
      year: data.year ?? null,
      contact_email: data.contact_email?.trim() || null,
      website: data.website?.trim() || null,
    });
    revalidatePath("/ventures");
    return { ok: true };
  } catch (e) {
    console.error("submitVenture:", e);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export async function submitPerson(
  data: PersonSubmission,
): Promise<ActionResult> {
  if (!hasDb()) return { ok: false, error: NOT_CONFIGURED };
  const name = data.name?.trim();
  if (!name) return { ok: false, error: "Name is required." };
  try {
    await dbInsertPerson({
      name,
      relation: data.relation?.trim() || "Current Student",
      title: data.title?.trim() || null,
      company: data.company?.trim() || null,
      grad_year: data.grad_year ?? null,
      email: data.email?.trim() || null,
      linkedin: data.linkedin?.trim() || null,
      bio: data.bio?.trim() || null,
    });
    revalidatePath("/network");
    return { ok: true };
  } catch (e) {
    console.error("submitPerson:", e);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

// ---------- Admin moderation (guarded by Cloudflare Access) -----------------

/**
 * Defense-in-depth: /admin is protected at the edge by Cloudflare Access, which
 * injects the authenticated user's email header. In production we require it;
 * in local dev (no Access) it's skipped so the dashboard is usable.
 */
async function assertAdmin(): Promise<void> {
  if (process.env.NODE_ENV !== "production") return;
  const email = (await headers()).get("cf-access-authenticated-user-email");
  if (!email) throw new Error("Unauthorized");
}

// ---------- Admin edits (guarded) ------------------------------------------

export async function updateVenture(
  id: string,
  data: VentureSubmission,
): Promise<ActionResult> {
  try {
    await assertAdmin();
    if (!hasDb()) return { ok: false, error: NOT_CONFIGURED };
    const name = data.name?.trim();
    const description = data.description?.trim();
    const founder = data.founder?.trim();
    if (!name || !description || !founder) {
      return {
        ok: false,
        error: "Name, description, and founder are required.",
      };
    }
    await dbUpdateVenture(id, {
      name,
      description,
      industries: (data.industries ?? []).map((s) => s.trim()).filter(Boolean),
      founder,
      year: data.year ?? null,
      contact_email: data.contact_email?.trim() || null,
      website: data.website?.trim() || null,
    });
    revalidatePath("/ventures");
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    console.error("updateVenture:", e);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export async function updatePerson(
  id: string,
  data: PersonSubmission,
): Promise<ActionResult> {
  try {
    await assertAdmin();
    if (!hasDb()) return { ok: false, error: NOT_CONFIGURED };
    const name = data.name?.trim();
    if (!name) return { ok: false, error: "Name is required." };
    await dbUpdatePerson(id, {
      name,
      relation: data.relation?.trim() || "Current Student",
      title: data.title?.trim() || null,
      company: data.company?.trim() || null,
      grad_year: data.grad_year ?? null,
      email: data.email?.trim() || null,
      linkedin: data.linkedin?.trim() || null,
      bio: data.bio?.trim() || null,
    });
    revalidatePath("/network");
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    console.error("updatePerson:", e);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

/** Form action used by the admin dashboard buttons. */
export async function moderate(formData: FormData): Promise<void> {
  await assertAdmin();
  const table = formData.get("table");
  const id = formData.get("id");
  const op = formData.get("op");
  if (
    (table !== "ventures" && table !== "people") ||
    typeof id !== "string" ||
    !id
  ) {
    return;
  }

  if (op === "delete") {
    await dbDelete(table, id);
  } else if (op === "approve") {
    await dbSetStatus(table, id, "approved");
  } else if (op === "unpublish") {
    await dbSetStatus(table, id, "pending");
  }

  revalidatePath("/admin");
  revalidatePath(table === "ventures" ? "/ventures" : "/network");
}
