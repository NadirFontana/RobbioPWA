"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import NewsList from "@/components/NewsList";
import Rioni from "@/components/Rioni";
import AlboDoro from "@/components/AlboDoro";
import Statistiche from "@/components/Statistiche";
import Programma2025 from "@/components/Programma2025";
import Risultati2025 from "@/components/Risultati2025";
import Gastronomia from "@/components/Gastronomia";
import Robbio from "@/components/Robbio";
import MediaSocial from "@/components/SocialMedia";
import Contatti from "@/components/Contatti";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  // --- Rileva se è mobile ---
  useEffect(() => {
    const checkMobile = /android|iphone|ipad|ipod/i.test(
      navigator.userAgent.toLowerCase()
    );
    setIsMobile(checkMobile);
  }, []);

  // --- Tema scuro ---
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // --- Gestione evento installazione PWA ---
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // --- Installazione SOLO MOBILE ---
  const handleInstall = async () => {
    if (!isMobile) return; // desktop → non fa nulla

    const isIos =
      /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    const isInStandalone = (window.navigator as any).standalone === true;

    // Safari (iOS)
    if (isIos && !isInStandalone) {
      const tip = document.createElement("div");
      tip.textContent = "👉 Tocca Condividi → Aggiungi alla schermata Home";
      tip.style.position = "fixed";
      tip.style.bottom = "80px";
      tip.style.left = "50%";
      tip.style.transform = "translateX(-50%)";
      tip.style.background = "#2563eb";
      tip.style.color = "white";
      tip.style.padding = "10px 16px";
      tip.style.borderRadius = "12px";
      tip.style.fontSize = "14px";
      tip.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
      tip.style.zIndex = "9999";
      document.body.appendChild(tip);
      setTimeout(() => tip.remove(), 4000);
      return;
    }

    // Android / Chrome
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
  };

  // --- Sezioni ---
  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <NewsList />;
      case "rioni":
        return <Rioni />;
      case "albodoro":
        return <AlboDoro />;
      case "statistiche":
        return <Statistiche />;
      case "programma2025":
        return <Programma2025 />;
      case "risultati2025":
        return <Risultati2025 />;
      case "gastronomia":
        return <Gastronomia />;
      case "robbio":
        return <Robbio />;
      case "mediasocial":
        return <MediaSocial />;
      case "contatti":
        return <Contatti />;
      default:
        return <NewsList />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Navbar
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        onThemeToggle={toggleTheme}
        isDarkMode={isDarkMode}
      />

      {isMenuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 z-30 transition-all"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <Sidebar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSectionChange={setActiveSection}
        onThemeToggle={toggleTheme}
        isDarkMode={isDarkMode}
        onInstall={isMobile ? handleInstall : undefined} // 👈 solo mobile
      />

      <main className="flex-grow">{renderSection()}</main>

      <footer className="mt-auto text-center py-4 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        © 2025 Palio d'Urmon — Tutti i diritti riservati.
      </footer>
    </div>
  );
}
