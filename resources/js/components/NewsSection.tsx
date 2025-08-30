import { useTranslation } from '@/lib/useTranslation';
import { ArticleProps } from '@/types/model';
import { Link } from '@inertiajs/react';
import React from 'react';
import { route } from 'ziggy-js';
import NewsCard from './NewsCard';

interface NewsSectionProps {
    title?: string;
    slug?: string;
    articles: Array<ArticleProps>;
}

const NewsSection: React.FC<NewsSectionProps> = ({ title, articles, slug }) => {
    const { t } = useTranslation();
    return (
        <section className="mb-8">
            {title || slug ? (
                <div className="mb-6 flex items-center justify-between">
                    {title && <h2 className="border-b-2 border-red-500 pb-2 text-2xl font-bold text-gray-900">{title}</h2>}
                    {slug && (
                        <Link href={route('category.show', { slug })} className="text-sm font-medium text-red-500 hover:text-red-700">
                            {t('see_all')} →
                        </Link>
                    )}
                </div>
            ) : null}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, index) => (
                    <NewsCard key={index} {...article} size="medium" />
                ))}
            </div>
        </section>
    );
};

export default NewsSection;
