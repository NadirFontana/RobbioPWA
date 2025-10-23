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
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        <link rel="apple-touch-icon" href="/icon-192.png" />

        {/* Splash screen per iOS - immagine trasparente senza ombre */}
        <link
          rel="apple-touch-startup-image"
          href="/icon-192-transparent.png"
          media="(orientation: portrait)"
        />
      </head>

      <body
        className="antialiased"
        style={{
          backgroundColor: "#0ea5e9",
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Splash screen visiva mentre React carica */}
        <div
          id="splash"
          style={{
            background: "url('/icon-192-transparent.png') no-repeat center center / 192px 192px",
            position: "absolute",
            inset: 0,
          }}
        />
        {children}
      </body>
    </html>
  );
}
