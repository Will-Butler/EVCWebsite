// Single source of truth for Supabase env config. The site is designed to run
// (and build) even before Supabase is wired up: when the vars are missing,
// data reads return empty and writes report a friendly "not configured" error,
// so you can develop the UI locally and connect the backend later.

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured =
  typeof SUPABASE_URL === "string" &&
  SUPABASE_URL.length > 0 &&
  typeof SUPABASE_ANON_KEY === "string" &&
  SUPABASE_ANON_KEY.length > 0;
