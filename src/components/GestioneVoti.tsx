"use client";

import { useState, useEffect, useCallback } from "react";

interface Vote {
  id: number;
  phone: string;
  rione: string;
  voter_type: "registered" | "guest";
  voted_at: string;
  user_name: string | null;
  user_email: string | null;
}

interface Props {
  onBack: () => void;
}

export default function GestioneVoti({ onBack }: Props) {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState<number | null>(null);

  const fetchVotes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/vote/list");
      const data = await res.json();
      setVotes(data.votes || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVotes();
  }, [fetchVotes]);

  const handleReset = async (id: number, phone: string) => {
    if (!confirm(`Resettare il voto del numero ${phone}? Potrà votare di nuovo.`)) return;
    setResetting(id);
    try {
      const res = await fetch(`/api/admin/vote/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Errore reset");
      await fetchVotes();
    } catch (e) {
      alert("Errore durante il reset");
      console.error(e);
    } finally {
      setResetting(null);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Conteggio per rione
  const counts = votes.reduce<Record<string, number>>((acc, v) => {
    acc[v.rione] = (acc[v.rione] || 0) + 1;
    return acc;
  }, {});
  const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
      <button
        onClick={onBack}
        className="mb-6 text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
      >
        ← Torna al profilo
      </button>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Gestione voti
      </h1>

      {/* Conteggi */}
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow p-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Classifica
        </h2>
        {sortedCounts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">Nessun voto.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {sortedCounts.map(([rione, count]) => (
              <div
                key={rione}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 flex justify-between items-center"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">{rione}</span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tabella */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">Caricamento...</div>
        ) : votes.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            Ancora nessun voto registrato.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Telefono</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Rione</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Tipo</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Nome</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Data</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {votes.map((v) => (
                  <tr
                    key={v.id}
                    className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-4 py-3 text-gray-900 dark:text-white font-mono text-xs">{v.phone}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">{v.rione}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          v.voter_type === "registered"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {v.voter_type === "registered" ? "Registrato" : "Ospite"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      {v.user_name || <span className="text-gray-400 italic">—</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">{formatDate(v.voted_at)}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleReset(v.id, v.phone)}
                        disabled={resetting === v.id}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition"
                      >
                        {resetting === v.id ? "..." : "Reset"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}