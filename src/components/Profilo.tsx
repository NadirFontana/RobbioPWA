"use client";

import { useState } from "react";
import GestioneVoti from "./GestioneVoti";

interface User {
  id: number;
  email: string;
  phone: string;
  name: string;
  role: string;
}

interface Props {
  user: User | null;
}

type View = "home" | "gestione-voti";

export default function Profilo({ user }: Props) {
  const [view, setView] = useState<View>("home");

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 text-center text-gray-600 dark:text-gray-300">
        Devi essere loggato per accedere al profilo.
      </div>
    );
  }

  if (view === "gestione-voti") {
    return <GestioneVoti onBack={() => setView("home")} />;
  }

  const isAdmin = user.role === "admin";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 space-y-8">
      {/* Intestazione profilo */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.phone}</p>
        {isAdmin && (
          <span className="inline-block mt-3 px-2.5 py-0.5 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 text-xs font-semibold rounded-full">
            Admin
          </span>
        )}
      </div>

      {/* Sezione opzioni utente */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 px-1">
          Le tue opzioni
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow divide-y divide-gray-100 dark:divide-gray-700">
          <div className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400 italic">
            Opzioni utente in arrivo.
          </div>
        </div>
      </section>

      {/* Sezione opzioni admin */}
      {isAdmin && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 px-1">
            Strumenti admin
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden">
            <button
              onClick={() => setView("gestione-voti")}
              className="w-full px-5 py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition text-left"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Gestione voti</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Visualizza chi ha votato e resetta singoli voti
                </p>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
}