"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
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
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";

// Import dinamico per evitare SSR di R3F (Three.js richiede window/WebGL)
const MirosAdventure = dynamic(
  () => import("./mirosadventure/page"),
  { ssr: false }
);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<any>(null);

  // --- Rileva se è mobile ---
  useEffect(() => {
    const checkMobile = /android|iphone|ipad|ipod/i.test(
      navigator.userAgent.toLowerCase()
    );
    setIsMobile(checkMobile);
  }, []);

  // --- Verifica se l'utente è loggato ---
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Errore verifica autenticazione:', error);
      }
    };
    checkAuth();
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
    if (!isMobile) return;

    const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    const isInStandalone = (window.navigator as any).standalone === true;

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

    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setActiveSection('home');
    } catch (error) {
      console.error('Errore logout:', error);
    }
  };

  // Scroll in cima quando cambia sezione (non per la scena 3D — gestisce il proprio spazio)
  useEffect(() => {
    if (activeSection !== "mirosadventure") {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeSection]);

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
      case "registrati":
        return <RegisterForm onSuccess={() => setActiveSection('accedi')} />;
      case "accedi":
        return <LoginForm onSuccess={(userData) => { setUser(userData); setActiveSection('home'); }} />;
      case "profilo":
        return <div className="p-8 text-center">Pagina Profilo (in sviluppo)</div>;
      case "admin":
        return <div className="p-8 text-center">Dashboard Admin (in sviluppo)</div>;
      case "mirosadventure":
        return <MirosAdventure />;
      default:
        return <NewsList />;
    }
  };

  // Per la scena 3D togliamo navbar e footer e lasciamo solo il Canvas
  const isFullscreen = activeSection === "mirosadventure";

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      {!isFullscreen && (
        <Navbar
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
          onThemeToggle={toggleTheme}
          isDarkMode={isDarkMode}
          user={user}
          onSectionChange={setActiveSection}
          onLogout={handleLogout}
        />
      )}

      {!isFullscreen && isMenuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 z-30 transition-all"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {!isFullscreen && (
        <Sidebar
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onSectionChange={setActiveSection}
          onThemeToggle={toggleTheme}
          isDarkMode={isDarkMode}
          onInstall={isMobile ? handleInstall : undefined}
          user={user}
          onLogout={handleLogout}
        />
      )}

      {/* Bottone ESC per tornare indietro dalla scena 3D */}
      {isFullscreen && (
        <button
          onClick={() => setActiveSection("home")}
          className="fixed top-4 left-4 z-50 bg-black/50 hover:bg-black/70 text-white text-sm px-3 py-2 rounded-lg backdrop-blur-sm transition"
        >
          ← Esci
        </button>
      )}

      <main className={isFullscreen ? "w-full h-screen" : "flex-grow"}>
        {renderSection()}
      </main>

      {!isFullscreen && (
        <footer className="mt-auto text-center py-4 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          © 2025 Palio d'Urmon — Tutti i diritti riservati.
        </footer>
      )}
    </div>
  );
}