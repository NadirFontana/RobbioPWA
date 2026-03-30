"use client";

import { useState } from "react";

interface Rione {
  id: number;
  nome: string;
  colori: string[];
  vittorie: number;
}

export default function Rioni() {
  const [expandedRione, setExpandedRione] = useState<number | null>(null);

  const rioni: Rione[] = [
    {
      id: 1,
      nome: "Campagnola",
      colori: ["#DC2626", "#16A34A"],
      vittorie: 2,
    },
    {
      id: 2,
      nome: "Ciot",
      colori: ["#FACC15", "#16A34A"],
      vittorie: 10,
    },
    {
      id: 3,
      nome: "Castello",
      colori: ["#DC2626", "#6366F1"],
      vittorie: 5,
    },
    {
      id: 4,
      nome: "Muron",
      colori: ["#F59E0B", "#1F2937"],
      vittorie: 3,
    },
    {
      id: 5,
      nome: "Torre",
      colori: ["#FFFFFF", "#3B82F6"],
      vittorie: 7,
    },
    {
      id: 6,
      nome: "Piana",
      colori: ["#FFFFFF", "#84CC16"],
      vittorie: 3,
    },
    {
      id: 7,
      nome: "Mulin",
      colori: ["#FACC15", "#6366F1"],
      vittorie: 9,
    },
    {
      id: 8,
      nome: "Canton Balin",
      colori: ["#1F2937", "#FFFFFF"],
      vittorie: 0,
    }
  ];

  const toggleRione = (id: number) => {
    setExpandedRione(expandedRione === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Rioni
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rioni.map((rione) => (
          <div
            key={rione.id}
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, ${rione.colori[0]} 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, ${rione.colori[1]} 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, ${rione.colori[0]} 0%, transparent 50%),
                radial-gradient(circle at 90% 70%, ${rione.colori[1]} 0%, transparent 50%),
                radial-gradient(circle at 10% 70%, ${rione.colori[0]} 0%, transparent 50%),
                radial-gradient(circle at 60% 50%, ${rione.colori[1]} 0%, transparent 50%),
                linear-gradient(135deg, ${rione.colori[0]} 0%, ${rione.colori[1]} 100%)
              `
            }}
          >
            {/* Contenuto con sfondo bianco interno */}
            <div className="m-[6px] bg-white dark:bg-gray-800 rounded-lg p-6">
              {/* Nome Rione */}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
                {rione.nome}
              </h2>

              {/* Logo/Stemma Rione */}
              <div className="flex justify-center mb-4">
                <div 
                  className="w-32 h-36 rounded-lg flex items-center justify-center shadow-md"
                  style={{
                    background: `linear-gradient(to bottom, ${rione.colori[0]}, ${rione.colori[1]})`
                  }}
                >
                  <svg className="w-16 h-16 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Vittorie */}
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Vittorie</p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white">
                  {rione.vittorie}
                </p>
              </div>

              {/* Pulsante Espandi */}
              <button 
                onClick={() => toggleRione(rione.id)}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label={expandedRione === rione.id ? "Chiudi" : "Espandi"}
              >
                <span>Scopri di più</span>
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${expandedRione === rione.id ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </button>

              {/* Contenuto espandibile */}
              {expandedRione === rione.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    Storia e informazioni del rione {rione.nome}. Qui puoi aggiungere la storia completa del rione, le tradizioni, i successi storici, i membri importanti e tutte le informazioni rilevanti che vuoi condividere con i visitatori del sito.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}