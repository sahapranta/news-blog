import HomeLayout from '@/layouts/home-layout';
import { Head } from '@inertiajs/react';
import { FacebookIcon, Share2Icon, TwitterIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface PageProps {
    title: string;
    slug: string;
    content: string;
    options: any;
    meta_title?: string;
    meta_image?: string;
    meta_description?: string;
    meta_keywords?: string;
    is_published: boolean;
    user: {
        name: string;
        id: string;
    }
}

const Page: React.FC<{ page: PageProps }> = ({ page }) => {

    const share = () => {
        const url = window.location.href;
        if (window.navigator) {
            navigator.share?.({ title: page.title, url });
        } else {
            navigator.clipboard.writeText(url);
            toast.success('Link copied to clipboard', {
                description: url
            });
        }
    }

    return (
        <HomeLayout>
            <Head>
                <title>{page.meta_title ?? page.title}</title>
                <meta name="description" content={page.meta_description} />
                <meta name="keywords" content={page.meta_keywords} />
                <meta property="og:title" content={page.meta_title} />
                <meta property="og:description" content={page.meta_description} />
                <meta property="og:image" content={page.meta_image} />
                <meta property="og:url" content={route('page', { page: page.slug })} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={page.meta_title} />
                <meta name="twitter:description" content={page.meta_description} />
                <meta name="twitter:image" content={page.meta_image} />
                <meta name="twitter:url" content={route('page', { page: page.slug })} />                
            </Head>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:py-12 py-6">
                <div className="mb-6 flex md:items-center justify-between sm:flex-row flex-col border-red-600 border-b-4 pb-4">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {page.title}
                    </h1>
                    <div className="flex items-center space-x-2 pt-3 sm:pt-0">
                        {/* share buttons */}
                        <button onClick={share} className="flex items-center space-x-2 bg-red-600 text-white px-2.5 py-1.5 rounded-lg hover:bg-red-700 transition-colors text-xs" aria-label="Share">
                            <Share2Icon className="w-4 h-4" />
                            <span>শেয়ার করুন</span>
                        </button>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${route('page', { page: page.slug })}`}
                            className="flex items-center space-x-2 bg-[#3b5999] text-white px-2.5 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-xs" target="_blank">
                            <FacebookIcon className="w-4 h-4" />
                            <span>Facebook</span>
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${route('page', { page: page.slug })}&text=${page.title}`}
                            className="flex items-center space-x-2 bg-[#55acee] text-white px-2.5 py-1.5 rounded-lg hover:bg-sky-700 transition-colors text-xs" rel="noopener noreferrer">
                            <TwitterIcon className="w-4 h-4" />
                            <span>Twitter</span>
                        </a>
                    </div>
                </div>
                <div className='prose max-w-none text-gray-800 leading-relaxed' dangerouslySetInnerHTML={{ __html: page.content }} itemProp="articleBody" />
            </main>
        </HomeLayout>
    );
}
export default Page;