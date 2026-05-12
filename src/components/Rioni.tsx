"use client";

import { useState } from "react";

interface Rione {
  id: number;
  nome: string;
  colori: string[];
  vittorie: number;
  gradientFrom: string;
  gradientTo: string;
}

export default function Rioni() {
  const [expandedRione, setExpandedRione] = useState<number | null>(null);

  const rioni: Rione[] = [
    {
      id: 1,
      nome: "Campagnola",
      colori: ["#DC2626", "#16A34A"],
      vittorie: 2,
      gradientFrom: "from-red-600",
      gradientTo: "to-green-600",
    },
    {
      id: 2,
      nome: "Ciot",
      colori: ["#FACC15", "#16A34A"],
      vittorie: 10,
      gradientFrom: "from-yellow-400",
      gradientTo: "to-green-600",
    },
    {
      id: 3,
      nome: "Castello",
      colori: ["#DC2626", "#6366F1"],
      vittorie: 5,
      gradientFrom: "from-red-600",
      gradientTo: "to-indigo-600",
    },
    {
      id: 4,
      nome: "Muron",
      colori: ["#F59E0B", "#1F2937"],
      vittorie: 3,
      gradientFrom: "from-amber-500",
      gradientTo: "to-gray-800",
    },
    {
      id: 5,
      nome: "Torre",
      colori: ["#FFFFFF", "#3B82F6"],
      vittorie: 7,
      gradientFrom: "from-white",
      gradientTo: "to-blue-500",
    },
    {
      id: 6,
      nome: "Piana",
      colori: ["#FFFFFF", "#84CC16"],
      vittorie: 3,
      gradientFrom: "from-white",
      gradientTo: "to-lime-500",
    },
    {
      id: 7,
      nome: "Mulin",
      colori: ["#FACC15", "#6366F1"],
      vittorie: 9,
      gradientFrom: "from-yellow-400",
      gradientTo: "to-indigo-600",
    },
    {
      id: 8,
      nome: "Canton Balin",
      colori: ["#1F2937", "#FFFFFF"],
      vittorie: 0,
      gradientFrom: "from-gray-800",
      gradientTo: "to-white",
    },
  ];

  const toggleRione = (id: number) => {
    setExpandedRione(expandedRione === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Rioni
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rioni.map((rione) => (
          <div
            key={rione.id}
            className={`relative rounded-2xl p-[5px] bg-gradient-to-br ${rione.gradientFrom} ${rione.gradientTo} shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-[13px] overflow-hidden h-full flex flex-col">
              {/* Header cliccabile */}
              <button
                onClick={() => toggleRione(rione.id)}
                className="w-full px-4 py-3 flex justify-between items-center border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex-1 text-center">
                  {rione.nome}
                </h2>
                <svg
                  className={`w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform duration-300 flex-shrink-0 ${
                    expandedRione === rione.id ? "rotate-180" : ""
                  }`}
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

              <div className="p-6 flex-1 flex flex-col">
                {/* Stemma placeholder */}
                <div className="flex justify-center mb-5">
                  <div
                    className={`w-24 h-28 bg-gradient-to-b ${rione.gradientFrom} ${rione.gradientTo} rounded-lg flex items-center justify-center shadow-md`}
                  >
                    <svg
                      className="w-12 h-12 text-white/40"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Vittorie */}
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
                    Vittorie
                  </p>
                  <p className="text-4xl font-extrabold text-gray-900 dark:text-white mt-1">
                    {rione.vittorie}
                  </p>
                </div>

                {/* Espandibile */}
                {expandedRione === rione.id && (
                  <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      Storia e informazioni del rione {rione.nome}. Qui puoi
                      aggiungere la storia completa, le tradizioni, i successi
                      storici e i membri importanti.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}