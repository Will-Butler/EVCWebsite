"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./env";

/**
 * Browser Supabase client for client components (public add forms, admin
 * dashboard). Returns null when the backend isn't configured yet so callers
 * can show a graceful message instead of crashing.
 */
export function getBrowserSupabase() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
}
