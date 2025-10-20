import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/RobbioPWA',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
