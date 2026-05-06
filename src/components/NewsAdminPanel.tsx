"use client";

import { useState } from "react";
import { News } from "@/types/news";

interface Props {
  editingNews?: News | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function NewsAdminPanel({ editingNews, onSave, onCancel }: Props) {
  const [titolo, setTitolo] = useState(editingNews?.titolo || "");
  const [descrizione, setDescrizione] = useState(editingNews?.descrizione || "");
  const [immagine, setImmagine] = useState(editingNews?.immagine || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/news/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setImmagine(data.url);
    } catch (err: any) {
      setError("Errore upload: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!titolo || !descrizione || !immagine) {
      setError("Tutti i campi sono obbligatori");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const url = editingNews ? `/api/news/${editingNews.id}` : "/api/news";
      const method = editingNews ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titolo, descrizione, immagine }),
      });
      if (!res.ok) throw new Error("Errore salvataggio");
      onSave();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {editingNews ? "Modifica notizia" : "Aggiungi notizia"}
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titolo</label>
          <input
            value={titolo}
            onChange={(e) => setTitolo(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrizione</label>
          <textarea
            value={descrizione}
            onChange={(e) => setDescrizione(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Immagine</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {uploading && <p className="text-sm text-blue-500 mt-1">Caricamento immagine...</p>}
          {immagine && !uploading && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={immagine} alt="preview" className="mt-2 h-32 w-full object-cover rounded-lg" />
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSubmit}
            disabled={saving || uploading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2 rounded-lg transition"
          >
            {saving ? "Salvataggio..." : "Salva"}
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