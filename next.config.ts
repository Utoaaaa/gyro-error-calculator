import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  // Only use basePath and assetPrefix in production for Cloudflare Workers
  ...(isDev ? {} : {
    basePath: "/gyro-error-calculator",
    assetPrefix: "/gyro-error-calculator/",
  }),
  // Static export for Cloudflare Workers Assets
  output: "export",
  // Avoid next/image optimization in export mode
  images: { unoptimized: true },
  // Remove trailing slash for Cloudflare Workers compatibility
  trailingSlash: false,
  // Skip build ID generation for static export
  generateBuildId: () => 'build',
  // Ensure proper static export
  distDir: 'out'
};

export default nextConfig;
