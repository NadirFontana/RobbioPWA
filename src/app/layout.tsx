import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Palio di Robbio",
  description: "Sito ufficiale del Palio di Robbio",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
};

// Next.js 15: themeColor va in generateViewport
export function generateViewport() {
  return {
    themeColor: "#0ea5e9",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        {/* Meta per PWA su iOS/Android */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        <link rel="apple-touch-icon" href="/icon-192.png" />

        {/* Splash screen iOS */}
        <link
          rel="apple-touch-startup-image"
          href="/splash-2048x2732.png"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/splash-1536x2048.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/splash-1125x2436.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
        />
        {/* Aggiungi altre risoluzioni iOS se necessario */}
      </head>

      <body className="antialiased">{children}</body>
    </html>
  );
}
