"use client";

import { useState, useEffect, useCallback } from "react";
import NewsCard from "./NewsCard";
import NewsAdminPanel from "./NewsAdminPanel";
import NewsDetail from "./NewsDetail";
import { News } from "@/types/news";

export default function NewsList() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      setNews(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.user?.role === "admin") setIsAdmin(true); })
      .catch(() => {});
  }, [fetchNews]);

  const handleDelete = async (id: number) => {
    if (!confirm("Eliminare questa notizia?")) return;
    await fetch(`/api/news/${id}`, { method: "DELETE" });
    fetchNews();
  };

  const handleEdit = (item: News) => {
    setEditingNews(item);
    setShowPanel(true);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {isAdmin && (
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => { setEditingNews(null); setShowPanel(true); }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <span className="text-lg leading-none">+</span> Aggiungi notizia
          </button>
        </div>
      )}

      <div className="space-y-8">
        {news.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            Nessuna notizia disponibile.
          </p>
        )}
        {news.map((item) => (
          <NewsCard
            key={item.id}
            news={item}
            isAdmin={isAdmin}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
            onClick={() => setSelectedNews(item)}
          />
        ))}
      </div>

      {selectedNews && (
        <NewsDetail
          news={selectedNews}
          onClose={() => setSelectedNews(null)}
        />
      )}

      {showPanel && (
        <NewsAdminPanel
          editingNews={editingNews}
          onSave={() => { setShowPanel(false); setEditingNews(null); fetchNews(); }}
          onCancel={() => { setShowPanel(false); setEditingNews(null); }}
        />
      )}
    </div>
  );
}