import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Workers Assets
  output: "export",
  // Avoid next/image optimization in export mode
  images: { unoptimized: true },
  // Remove trailing slash for Cloudflare Workers compatibility
  trailingSlash: false
};

export default nextConfig;
