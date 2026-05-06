import { News } from '../types/news';
import Image from 'next/image';

interface NewsCardProps {
  news: News;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

export default function NewsCard({ news, isAdmin, onEdit, onDelete, onClick }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {isAdmin && (
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow transition"
          >
            ✏️ Modifica
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow transition"
          >
            🗑️ Elimina
          </button>
        </div>
      )}

      <div className="md:flex cursor-pointer" onClick={onClick}>
        <div className="md:w-1/3 h-64 md:h-auto relative">
          <Image
            src={news.immagine}
            alt={news.titolo}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3">
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(news.data)}
          </time>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
            {news.titolo}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
            {news.descrizione}
          </p>
          <span className="mt-4 inline-block text-blue-600 dark:text-blue-400 font-medium">
            Leggi di più →
          </span>
        </div>
      </div>
    </article>
  );
}