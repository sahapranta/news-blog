import Img from '@/components/Img';
import SEOHead from '@/components/SEOHead';
import { ArticleStructuredData, BreadcrumbStructuredData } from '@/components/StructuredData';
import HomeLayout from '@/layouts/home-layout';
import { url } from '@/lib/helpers';
import { useTranslation } from '@/lib/useTranslation';
import { ArticleProps } from '@/types/model';
import { calculateReadingTime, generateMetaDescription, generateSocialShareUrls } from '@/utils/seo';
import { Link, WhenVisible } from '@inertiajs/react';
import { Clock, Eye, Facebook, Linkedin, Share2, Twitter } from 'lucide-react';
import React, { Suspense } from 'react';
import { route } from 'ziggy-js';
const CommentSection = React.lazy(() => import('@/components/CommentSection'));
const RelatedArticlesSection = React.lazy(() => import('@/components/RelatedArticle'));

const ArticlePage: React.FC<{ article: ArticleProps }> = ({ article }) => {
    const { t } = useTranslation();

    const articles = {
        subtitle: 'সরকার আগামী বছর থেকে একটি নতুন অর্থনৈতিক সংস্কার কর্মসূচি চালু করবে',
        publishTime: '২ ঘন্টা আগে',
        publishDate: '2024-12-15T10:00:00Z',
        modifiedDate: '2024-12-15T10:30:00Z',
        views: '১৫,৩৪২',
        readTime: '৫ মিনিট',
    };

    const articleUrl = route('article.show', { slug: article.slug });
    const description = generateMetaDescription(article.content);
    const readingTime = calculateReadingTime(article.content);
    const socialUrls = generateSocialShareUrls(articleUrl, article.title);

    const breadcrumbItems = [
        { name: 'প্রচ্ছদ', url: url('/') },
        { name: article.category.title, url: route('category.show', { slug: article.category.slug }) },
        { name: article.title, url: articleUrl },
    ];

    return (
        <HomeLayout hasSidebar>
            <SEOHead
                title={article.title}
                description={description}
                keywords={`${article.category.title}, ${article.tags?.join(', ')}`}
                image={article.image_url}
                url={articleUrl}
                type="article"
                publishedTime={article.time}
                modifiedTime={article.time}
                author={article?.author?.name ?? 'হরেকৃষ্ণ সমাচার'}
                section={article.category.title}
                tags={article.tags || []}
            />

            <BreadcrumbStructuredData items={breadcrumbItems} />

            <ArticleStructuredData
                headline={article.title}
                description={description}
                image={article.image_url}
                datePublished={articles.publishDate}
                dateModified={articles.modifiedDate}
                author={article.author?.name ?? 'হরেকৃষ্ণ সমাচার'}
                category={article.category.title}
                url={articleUrl}
                readingTime={readingTime}
            />

            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                {/* Article Header */}
                <div className="relative">
                    <Img
                        src={article.image_url}
                        alt={`${article.title} - ${article.category.title} | হরেকৃষ্ণ সমাচার`}
                        className="h-64 w-full object-cover md:h-100"
                        loading="eager"
                    />
                    <div className="absolute top-4 left-4">
                        <Link
                            href={route('category.show', { slug: article.category.slug })}
                            className="rounded-full bg-red-600 px-3 py-1 text-sm font-medium text-white"
                        >
                            {article.category.title}
                        </Link>
                    </div>
                </div>

                {/* Article Content */}
                <div className="p-6 md:p-8">
                    <header>
                        <h1 className="mb-4 text-2xl leading-tight font-bold text-gray-900 md:text-4xl">{article.title}</h1>

                        <p className="mb-6 text-lg leading-relaxed text-gray-600">{article.subtitle}</p>

                        {/* Article Meta */}
                        <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-6">
                            <div className="flex items-center text-sm text-gray-500">
                                <span className="mr-2 font-medium text-gray-700">লেখক:</span>
                                <span itemProp="author">{article.author?.name ?? 'হরেকৃষ্ণ সমাচার'}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                                <Clock className="mr-1 h-4 w-4" />
                                <time dateTime={article.created_at}>{article.time}</time>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                                <Eye className="mr-1 h-4 w-4" />
                                {articles.views}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                                <span>পড়ার সময়: {readingTime}</span>
                            </div>
                        </div>
                    </header>

                    {/* Article Body */}
                    <div
                        className="prose max-w-none leading-relaxed text-gray-800"
                        dangerouslySetInnerHTML={{ __html: article.content_html || '' }}
                        itemProp="articleBody"
                    />

                    {/* Article Tags */}
                    {article.tags && article.tags.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-md mb-2 font-semibold text-gray-900">{t('tags')}:</h3>
                            <div className="flex flex-wrap gap-2">
                                {article.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-sm font-medium text-gray-900 ring-1 ring-gray-200 !outline-0 transition-colors ring-inset hover:shadow focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-200"
                                    >
                                        <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 fill-red-600">
                                            <circle r={3} cx={3} cy={3} />
                                        </svg>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Social Share */}
                    <footer className="mt-8 border-t border-gray-200 pt-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">{t('share')}</h3>
                            <div className="flex space-x-3">
                                <a
                                    href={socialUrls.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700"
                                    aria-label="Facebook এ শেয়ার করুন"
                                >
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a
                                    href={socialUrls.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400 text-white transition-colors hover:bg-blue-500"
                                    aria-label="Twitter এ শেয়ার করুন"
                                >
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a
                                    href={socialUrls.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white transition-colors hover:bg-blue-800"
                                    aria-label="LinkedIn এ শেয়ার করুন"
                                >
                                    <Linkedin className="h-5 w-5" />
                                </a>
                                <button
                                    onClick={() => navigator.share?.({ title: article.title, url: articleUrl })}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600 text-white transition-colors hover:bg-gray-700"
                                    aria-label={t('share')}
                                >
                                    <Share2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>

            <WhenVisible data={article.slug} fallback={<div className="mt-8 animate-pulse">Loading Related Articles...</div>}>
                <Suspense fallback={<div className="mt-8 animate-pulse">Loading Related Articles....</div>}>
                    <RelatedArticlesSection id={article.slug} />
                </Suspense>
            </WhenVisible>

            <WhenVisible data={article.slug} fallback={<div className="mt-8 animate-pulse">Loading comments...</div>}>
                <Suspense fallback={<div className="mt-8 animate-pulse">Loading comments...</div>}>
                    <CommentSection id={article.slug} />
                </Suspense>
            </WhenVisible>
        </HomeLayout>
    );
};

export default ArticlePage;
