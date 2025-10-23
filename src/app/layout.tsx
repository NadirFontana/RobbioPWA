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
    themeColor: "#1d4ed8",
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
        <meta name="theme-color" content="#1d4ed8" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>

      <body className="antialiased">{children}</body>
    </html>
  );
}
