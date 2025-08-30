import React from 'react';
import NewsCard from './NewsCard';
import { Link } from '@inertiajs/react';
import { ArticleProps } from '@/types/model';
import { useTranslation } from '@/lib/useTranslation';
import { route } from 'ziggy-js';

interface NewsSectionProps {
  title?: string;
  slug?: string;
  articles: Array<ArticleProps>;
}

const NewsSection: React.FC<NewsSectionProps> = ({ title, articles, slug }) => {
  const { t } = useTranslation();
  return (
    <section className="mb-8">
      {title || slug ? (<div className="flex items-center justify-between mb-6">
        {title && (<h2 className="text-2xl font-bold text-gray-900 border-b-2 border-red-500 pb-2">
          {title}
        </h2>)}
        {slug && (
          <Link href={route('category.show', { slug })} className="text-red-500 hover:text-red-700 text-sm font-medium">
            {t('see_all')} →
          </Link>
        )}
      </div>) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <NewsCard
            key={index}
            {...article}
            size="medium"
          />
        ))}
      </div>
    </section>
  );
};

export default NewsSection;