import { News } from '../types/news';
import Image from 'next/image';

interface NewsCardProps {
  news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="md:flex">
        {/* Immagine */}
        <div className="md:w-1/3 h-64 md:h-auto">
          <Image 
            src={news.immagine} 
            alt={news.titolo}
            className="w-full h-full object-cover"
            width={400}
            height={300}
          />
        </div>
        
        {/* Contenuto */}
        <div className="p-6 md:w-2/3">
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(news.data)}
          </time>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
            {news.titolo}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {news.descrizione}
          </p>
          <button className="mt-4 text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Leggi di più →
          </button>
        </div>
      </div>
    </article>
  );
}