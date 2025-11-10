"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

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
  user,
  onSectionChange,
  onLogout,
}: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Chiudi dropdown quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all ${isMenuOpen ? "z-10" : "z-50"
        }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Titolo */}
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
            {user ? (
              /* Menu Profilo Utente Loggato */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.name || 'Utente'}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          onSectionChange('profilo');
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        👤 Profilo
                      </button>
                      {user.role === 'admin' && (
                        <button
                          onClick={() => {
                            onSectionChange('admin');
                            setIsDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          ⚙️ Admin
                        </button>
                      )}
                      <hr className="my-1 border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={() => {
                          onLogout();
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Pulsanti Registrati e Accedi */
              <>
                <button
                  onClick={() => onSectionChange('registrati')}
                  className={`hidden sm:inline-block px-4 py-2 rounded-md text-sm font-medium transition
                    ${isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                >
                  Registrati
                </button>

                <button
                  onClick={() => onSectionChange('accedi')}
                  className={`hidden sm:inline-block px-4 py-2 rounded-md border text-sm font-medium transition
                    ${isDarkMode
                      ? "border-blue-600 text-white hover:bg-blue-600 hover:text-white"
                      : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    }`}
                >
                  Accedi
                </button>
              </>
            )}

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
              className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all relative ${isMenuOpen ? "z-10" : "z-50"
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
  )
};