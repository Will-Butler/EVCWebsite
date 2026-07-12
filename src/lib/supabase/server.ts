import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./env";

/**
 * Server Supabase client for Server Components / Route Handlers. Wired to the
 * Next.js cookie store so an authenticated admin session is respected during
 * SSR. Returns null when Supabase env vars are absent.
 */
export async function getServerSupabase() {
  if (!isSupabaseConfigured) return null;
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component render where cookies are read-only;
          // session refresh is handled elsewhere. Safe to ignore.
        }
      },
    },
  });
}
