import { api } from '@/hooks/use-api';
import { ArticleProps } from '@/types/model';
import React, { useEffect } from 'react';
import { route } from 'ziggy-js';
import NewsCard from './NewsCard';

const RelatedArticle: React.FC<{ id?: string }> = ({ id }) => {
    const [articles, setArticles] = React.useState<ArticleProps[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const { data } = await api.get(route('api.news.related', { article: id }));
                setArticles(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchArticles();
    }, [id]);

    if (articles.length === 0) return null;

    return (
        <div className="relative my-4 rounded-lg border-2 bg-gradient-to-br from-neutral-200 from-0% via-gray-50 via-50% to-stone-200 to-100% p-6 shadow-sm">
            <div className="mb-3 flex items-start justify-between">
                <h2 className="text-lg font-bold text-gray-700">Read More</h2>
            </div>
            <div className="space-y-3">
                {/* Related Articles */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {articles.map((article) => (
                        <NewsCard
                            key={article.id}
                            title={article.title}
                            slug={article.slug}
                            image_url={article.image_url}
                            category={article.category}
                            time={article.time}
                            className="ring-6 ring-gray-300/40"
                            size="medium"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RelatedArticle;
