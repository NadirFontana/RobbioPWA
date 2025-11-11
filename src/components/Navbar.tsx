"use client";

import Image from "next/image";

interface NavbarProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
  onThemeToggle: () => void;
  isDarkMode: boolean;
  user?: any;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

export default function Navbar({
  onMenuClick,
  isMenuOpen,
  onThemeToggle,
  isDarkMode,
  onSectionChange,
}: NavbarProps) {
  return (
    <nav
      className={`fixed top-0 left-0 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all ${
        isMenuOpen ? "z-10" : "z-50"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Titolo */}
          <button 
            onClick={() => onSectionChange('home')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/icon-192.png"
              alt="Logo Palio d'Urmon"
              width={40}
              height={40}
              priority
              className="rounded-full"
            />
            <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
              Palio d&apos;Urmon
            </span>
          </button>

          {/* Pulsanti lato destro */}
          <div className="flex items-center space-x-3">
            {/* Pulsante tema */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Cambia tema"
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isDarkMode ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            </button>

            {/* Pulsante menu hamburger */}
            <button
              className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all relative ${
                isMenuOpen ? "z-10" : "z-50"
              }`}
              aria-label="Menu"
              onClick={onMenuClick}
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}