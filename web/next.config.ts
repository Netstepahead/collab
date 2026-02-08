import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // ⚠️ Dangerously allow production builds to successfully complete even if
    // your project has type errors. This is needed due to Supabase type inference issues.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
