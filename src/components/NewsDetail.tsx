"use client";

import Image from "next/image";
import { News } from "@/types/news";

interface Props {
  news: News;
  onClose: () => void;
}

export default function NewsDetail({ news, onClose }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("it-IT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <article
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-64 sm:h-80">
          <Image
            src={news.immagine}
            alt={news.titolo}
            fill
            className="object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg transition backdrop-blur-sm"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(news.data)}
          </time>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
            {news.titolo}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
            {news.descrizione}
          </p>
        </div>
      </article>
    </div>
  );
}