import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// Enables Cloudflare bindings (e.g. env vars) during `next dev` when using the
// OpenNext Cloudflare adapter. Safe no-op outside the Cloudflare toolchain.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
