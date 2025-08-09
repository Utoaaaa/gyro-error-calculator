import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Host under subpath
  basePath: "/gyro-error-calculator",
  assetPrefix: "/gyro-error-calculator/",
  // Static export for Cloudflare Workers Assets
  output: "export",
  // Avoid next/image optimization in export mode
  images: { unoptimized: true },
  // Remove trailing slash for Cloudflare Workers compatibility
  trailingSlash: false
};

export default nextConfig;
