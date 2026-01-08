import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

console.log("NextConfig Loaded. Env Auth Secret Present:", !!process.env.AUTH_SECRET);

export default nextConfig;
