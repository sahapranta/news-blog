import { CategoryProps } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Clock, Eye } from 'lucide-react';
import React from 'react';
import { route } from 'ziggy-js';
import Img from './Img';

interface NewsCardProps {
    title: string;
    slug?: string;
    excerpt?: string;
    image_url: string;
    category: CategoryProps;
    time?: string;
    views?: string;
    size?: 'small' | 'medium' | 'large';
    articleId?: string;
    className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, slug, excerpt, image_url, category, time, views, size = 'medium', className }) => {
    const sizeClasses = {
        small: 'flex space-x-3',
        medium: 'block',
        large: 'block',
    };

    const imageClasses = {
        small: 'w-20 h-20 shrink-0',
        medium: 'w-full h-48',
        large: 'w-full h-64',
    };

    const hasTitleTop = category || views || time;

    return (
        <article
            className={`overflow-hidden rounded-lg bg-white shadow-xs transition-shadow duration-200 hover:shadow-md ${sizeClasses[size]} ${className}`}
        >
            <Link href={route('article.show', { slug })} className="block">
                <div className={`${imageClasses[size]} overflow-hidden bg-gray-200`}>
                    <Img src={image_url} alt={title} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                </div>
            </Link>

            <div className={`${size === 'small' ? 'flex-1' : 'p-4'}`}>
                {hasTitleTop && (
                    <div className={`mb-2 flex items-center space-x-2 ${size === 'medium' ? 'justify-between' : ''}`}>
                        <span className="rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-500">{category?.title}</span>
                        {(size === 'medium' || size === 'large') && (
                            <div className="flex items-center text-xs text-gray-500">
                                <Clock className="mr-1 h-3 w-3" />
                                {time}
                            </div>
                        )}
                        {views && size == 'large' && (
                            <div className="flex items-center text-xs text-gray-500">
                                <Eye className="mr-1 h-3 w-3" />
                                {views}
                            </div>
                        )}
                    </div>
                )}
                <Link href={route('article.show', { slug })}>
                    <h3
                        className={`mb-2 line-clamp-2 cursor-pointer text-left font-semibold text-gray-900 hover:text-red-500 ${size === 'large' ? 'text-xl' : size === 'medium' ? 'text-lg' : 'text-sm'}`}
                    >
                        {title}
                    </h3>
                </Link>

                {(size === 'medium' || size === 'large') && (
                    <p className="line-clamp-3 text-sm text-gray-600">
                        {excerpt}
                        {size === 'large' && (
                            <Link href={route('article.show', { slug })} className="float-end text-red-500 hover:underline">
                                → আরো পড়ু্ন
                            </Link>
                        )}
                    </p>
                )}
            </div>
        </article>
    );
};

export default NewsCard;
