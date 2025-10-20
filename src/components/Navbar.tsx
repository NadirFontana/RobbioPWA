interface NavbarProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

export default function Navbar({ onMenuClick, isMenuOpen, onThemeToggle, isDarkMode }: NavbarProps) {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Placeholder */}
          <div className="flex items-center">
            <div className="w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-medium">
              Logo
            </div>
          </div>

          <div className="flex items-center">
            {/* Theme Toggle Button */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mr-2"
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

            {/* Burger Button */}
            <button 
              className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all z-50 relative ${
                isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
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
                {isMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}