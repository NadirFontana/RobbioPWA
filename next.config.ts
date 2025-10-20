import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disabilita completamente ESLint durante il build
    // Oppure per disabilitare regole specifiche:
    // rules: {
    //   'react/no-unescaped-entities': 'off',
    //   '@next/next/no-img-element': 'off'
    // }
  }
};

export default nextConfig;
