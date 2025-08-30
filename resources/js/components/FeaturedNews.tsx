import NewsCard from '@/components/NewsCard';
import { ArticleProps, FeaturedNewsProps } from '@/types/model';
import React from 'react';

const FeaturedNews: React.FC<{ featured: FeaturedNewsProps; sideArticles: ArticleProps[] }> = ({ featured, sideArticles }) => {
    const featuredArticle = {
        ...featured,
        views: '১৫,৩৪২',
    };

    return (
        <section className="mb-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="md:col-span-3 lg:col-span-2">
                    <NewsCard {...featuredArticle} size="large" className="ring-1 ring-black/5" />
                </div>
                <div className="space-y-6">
                    {sideArticles.map((article, index) => (
                        <NewsCard key={index} {...article} size="small" className="ring-1 ring-black/3" />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedNews;
