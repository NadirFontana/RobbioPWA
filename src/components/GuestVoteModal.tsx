"use client";

import { useState } from "react";

interface Props {
  rione: string;
  onConfirm: (phone: string) => Promise<void>;
  onCancel: () => void;
}

export default function GuestVoteModal({ rione, onConfirm, onCancel }: Props) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    const trimmed = phone.trim();
    if (!/^[+\d\s]{6,20}$/.test(trimmed)) {
      setError("Inserisci un numero di telefono valido");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await onConfirm(trimmed);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Errore";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-sm p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Vota {rione}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Inserisci il tuo numero di telefono per confermare il voto. Ogni
          numero può votare una sola volta.
        </p>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+39 333 1234567"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2 rounded-lg transition"
          >
            {loading ? "Invio..." : "Conferma voto"}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-medium py-2 rounded-lg transition"
          >
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
}