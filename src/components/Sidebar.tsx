interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSectionChange: (section: string) => void;
  onThemeToggle: () => void;
  isDarkMode: boolean;
  onInstall: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  onSectionChange,
  onThemeToggle,
  isDarkMode,
  onInstall,
}: SidebarProps) {
  const menuItems = [
    { name: "Home", section: "home" },
    { name: "Rioni", section: "rioni" },
    { name: "Albo d'oro", section: "albodoro" },
    { name: "Statistiche", section: "statistiche" },
    { name: "Programma 2025", section: "programma2025" },
    { name: "Risultati 2025", section: "risultati2025" },
    { name: "Gastronomia", section: "gastronomia" },
    { name: "Robbio", section: "robbio" },
    { name: "Media & Social", section: "mediasocial" },
    { name: "Contatti", section: "contatti" },
  ];

  const handleClick = (section: string) => {
    onSectionChange(section);
    onClose();
  };

  return (
    <aside
      className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 h-full flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Menu
            </h2>

            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Chiudi menu"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.section}>
                  <button
                    onClick={() => handleClick(item.section)}
                    className="w-full text-left px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
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

          <button
            onClick={onInstall}
            className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
          >
            Installa
          </button>
        </div>
      </div>
    </aside>
  );
}
