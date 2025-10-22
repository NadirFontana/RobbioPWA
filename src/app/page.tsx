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

  useEffect(() => {
    // Check system preference or saved preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

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

      {/* Overlay */}
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
      />

      {/* Main */}
      <main className="flex-grow">
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="mt-auto text-center py-4 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        © 2025 Palio d'Urmon — Tutti i diritti riservati.
      </footer>
    </div>
  );
}