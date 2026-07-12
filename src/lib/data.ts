import { getServerSupabase } from "./supabase/server";
import { isSupabaseConfigured } from "./supabase/env";
import { SEED_VENTURES } from "./seed";
import type { Person, Venture } from "./types";

// Server-side reads used by the public (SSR) Network and Ventures pages. These
// return only APPROVED rows so unmoderated submissions never surface publicly.

export async function getApprovedVentures(): Promise<Venture[]> {
  if (!isSupabaseConfigured) return SEED_VENTURES;
  const supabase = await getServerSupabase();
  if (!supabase) return SEED_VENTURES;

  const { data, error } = await supabase
    .from("ventures")
    .select("*")
    .eq("status", "approved")
    .order("year", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    console.error("getApprovedVentures:", error.message);
    return SEED_VENTURES;
  }
  return (data as Venture[]) ?? [];
}

export async function getApprovedPeople(): Promise<Person[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await getServerSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("people")
    .select("*")
    .eq("status", "approved")
    .order("name", { ascending: true });

  if (error) {
    console.error("getApprovedPeople:", error.message);
    return [];
  }
  return (data as Person[]) ?? [];
}
