interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSectionChange: (section: string) => void;
  onThemeToggle: () => void;
  isDarkMode: boolean;
  onInstall?: () => void;
  user?: any;
  onLogout: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  onSectionChange,
  onThemeToggle,
  isDarkMode,
  onInstall,
  user,
  onLogout,
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

        {/* Sezione bottom con pulsanti */}
        <div className="space-y-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Pulsante Tema e Download affiancati */}
          <div className="flex items-center gap-3">
            <button
              onClick={onThemeToggle}
              className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
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

            {onInstall && (
              <button
                onClick={() => {
                  if (navigator.userAgent.includes("iPhone") || navigator.userAgent.includes("iPad")) {
                    alert(
                      "Per installare l'app su iOS, premi il pulsante Condividi in Safari e seleziona 'Aggiungi a Home'."
                    );
                  } else {
                    onInstall();
                  }
                }}
                className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                aria-label="Scarica app"
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Pulsanti Autenticazione */}
          {user ? (
            /* Utente loggato */
            <div className="space-y-2">
              <button
                onClick={() => {
                  onSectionChange('profilo');
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {user.name || 'Il mio account'}
              </button>

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          ) : (
            /* Utente non loggato */
            <div className="space-y-2">
              <button
                onClick={() => {
                  onSectionChange('registrati');
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Registrati
              </button>

              <button
                onClick={() => {
                  onSectionChange('accedi');
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Accedi
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}