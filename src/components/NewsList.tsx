import { newsData } from '../data/news';
import NewsCard from './NewsCard';

export default function NewsList() {
  // Ordina le notizie dalla più recente alla meno recente
  const sortedNews = [...newsData].sort((a, b) => 
    new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {sortedNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
}