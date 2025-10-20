interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ isOpen, onClose, onSectionChange }: SidebarProps) {
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
    { name: "Contatti", section: "contatti" }
  ];

  const handleClick = (section: string) => {
    onSectionChange(section);
    onClose();
  };

  return (
    <aside 
      className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-6 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Menu
          </h2>
          
          {/* Close Button */}
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
    </aside>
  );
}