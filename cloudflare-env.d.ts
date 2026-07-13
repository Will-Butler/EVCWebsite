/// <reference types="@cloudflare/workers-types" />

// Bindings available on the Cloudflare Worker at runtime (see wrangler.jsonc).
// Augments the global CloudflareEnv used by `getCloudflareContext()`.
interface CloudflareEnv {
  DB: D1Database;
}
