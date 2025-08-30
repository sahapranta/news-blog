import React from 'react';
import { Link } from '@inertiajs/react';
import { Clock, Eye } from 'lucide-react';
import { CategoryProps } from '@/types/model';
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

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  slug,
  excerpt,
  image_url,
  category,
  time,
  views,
  size = 'medium',
  className
}) => {
  const sizeClasses = {
    small: 'flex space-x-3',
    medium: 'block',
    large: 'block'
  };

  const imageClasses = {
    small: 'w-20 h-20 shrink-0',
    medium: 'w-full h-48',
    large: 'w-full h-64'
  };

  const hasTitleTop = category || views || time;

  return (
    <article className={`bg-white rounded-lg shadow-xs hover:shadow-md transition-shadow duration-200 overflow-hidden ${sizeClasses[size]} ${className}`}>
      <Link href={route('article.show', { slug })} className="block">
        <div className={`${imageClasses[size]} bg-gray-200 overflow-hidden`}>
          <Img
            src={image_url}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className={`${size === 'small' ? 'flex-1' : 'p-4'}`}>
        {hasTitleTop &&
          <div className={`flex items-center space-x-2 mb-2 ${size === 'medium' ? 'justify-between' : ''}`}>
            <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded">
              {category?.title}
            </span>
            {(size === 'medium' || size === 'large') && (
              <div className="flex items-center text-gray-500 text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {time}
              </div>
            )}
            {(views && size == 'large') && (
              <div className="flex items-center text-gray-500 text-xs">
                <Eye className="w-3 h-3 mr-1" />
                {views}
              </div>
            )}
          </div>
        }
        <Link href={route('article.show', { slug })}>
          <h3 className={`font-semibold text-left text-gray-900 mb-2 hover:text-red-500 cursor-pointer line-clamp-2 ${size === 'large' ? 'text-xl' : size === 'medium' ? 'text-lg' : 'text-sm'}`}>
            {title}
          </h3>
        </Link>

        {(size === 'medium' || size === 'large') && (
          <p className="text-gray-600 text-sm line-clamp-3">
            {excerpt}
            {size === 'large' && (
              <Link href={route('article.show', { slug })} className="text-red-500 hover:underline float-end">
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