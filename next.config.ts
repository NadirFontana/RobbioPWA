import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',  // Necessario per static export
  images: {
    unoptimized: true,  // Necessario per Netlify
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  assetPrefix: './', // Aiuta con i percorsi delle risorse statiche
  trailingSlash: true, // Aiuta con la navigazione
};

export default nextConfig;
