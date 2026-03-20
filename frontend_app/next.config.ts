import type { NextConfig } from "next";

/**
 * Next.js configuration for the GymPro frontend application.
 *
 * Note: `output: "export"` was intentionally removed because this app uses
 * client-side dynamic features (useRouter, localStorage, context providers)
 * that require a live Next.js server rather than static HTML export.
 * Static export would produce stale pre-rendered HTML that doesn't reflect
 * runtime UI changes.
 */
const nextConfig: NextConfig = {
  /* Add future configuration options here as needed */
};

export default nextConfig;
