import "server-only";
import { getDb, dbListVentures, dbListPeople } from "./db";
import { SEED_VENTURES } from "./seed";
import type { Person, Venture } from "./types";

// Server-side reads for the public (SSR) Ventures and Network pages. Only
// APPROVED rows are returned so unmoderated submissions never surface. When D1
// isn't wired up yet, Ventures falls back to seed data and Network is empty.

export async function getApprovedVentures(): Promise<Venture[]> {
  if (!getDb()) return SEED_VENTURES;
  try {
    return await dbListVentures(true);
  } catch (e) {
    console.error("getApprovedVentures:", e);
    return SEED_VENTURES;
  }
}

export async function getApprovedPeople(): Promise<Person[]> {
  if (!getDb()) return [];
  try {
    return await dbListPeople(true);
  } catch (e) {
    console.error("getApprovedPeople:", e);
    return [];
  }
}
