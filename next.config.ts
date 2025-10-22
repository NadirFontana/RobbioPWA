import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public", // dove salvare il service worker
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // disattiva in sviluppo
});

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "viewport-fit",
          value: "cover",
        },
      ],
    },
  ],
  output: "export", // ✅ necessario per static export
  images: {
    unoptimized: true, // ✅ necessario per Netlify static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  assetPrefix: "./", // ✅ percorsi statici relativi
  trailingSlash: true, // ✅ migliora la navigazione su static export
};

export default withPWA(nextConfig);
