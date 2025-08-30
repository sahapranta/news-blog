import Img from '@/components/Img';
import Sidebar from '@/components/Sidebar';
import HomeLayout from '@/layouts/home-layout';
import { Head } from '@inertiajs/react';
import { FacebookIcon, Share2Icon, TwitterIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface FestivalProps {
    id: string;
    title: string;
    name: string;
    short_description: string;
    category: string;
    slug: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    time: string;
    image?: string;
    is_active?: boolean;
}

const ViewPage: React.FC<{ festival: FestivalProps }> = ({ festival }) => {
    const share = () => {
        const url = window.location.href;
        if (window.navigator) {
            navigator.share?.({ title: festival.title, url });
        } else {
            navigator.clipboard.writeText(url);
            toast.success('Link copied to clipboard', {
                description: url,
            });
        }
    };
    return (
        <HomeLayout>
            <Head>
                <meta name="title" content={festival.title} />
                <meta name="description" content={festival.short_description} />
                <title>{festival.title}</title>
            </Head>
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-col justify-between border-b-4 border-red-600 pb-4 sm:flex-row md:items-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{festival.title}</h1>
                    <div className="flex items-center space-x-2 pt-3 sm:pt-0">
                        {/* share buttons */}
                        <button
                            onClick={share}
                            className="flex items-center space-x-2 rounded-lg bg-red-600 px-2.5 py-1.5 text-xs text-white transition-colors hover:bg-red-700"
                            aria-label="Share"
                        >
                            <Share2Icon className="h-4 w-4" />
                            <span>শেয়ার করুন</span>
                        </button>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${route('festival.view', { festival: festival.slug })}`}
                            className="flex items-center space-x-2 rounded-lg bg-[#3b5999] px-2.5 py-1.5 text-xs text-white transition-colors hover:bg-blue-700"
                            target="_blank"
                        >
                            <FacebookIcon className="h-4 w-4" />
                            <span>Facebook</span>
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${route('festival.view', { festival: festival.slug })}&text=${festival.title}`}
                            className="flex items-center space-x-2 rounded-lg bg-[#55acee] px-2.5 py-1.5 text-xs text-white transition-colors hover:bg-sky-700"
                            rel="noopener noreferrer"
                        >
                            <TwitterIcon className="h-4 w-4" />
                            <span>Twitter</span>
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <div className="lg:col-span-3">
                        <article className="mt-2">
                            <div className="mb-6 overflow-hidden rounded-lg shadow-sm">
                                <Img
                                    src={festival.image}
                                    alt={`${festival.name} | হরেকৃষ্ণ সমাচার`}
                                    className="h-64 w-full object-cover md:h-100"
                                    loading="eager"
                                />
                            </div>
                            <div
                                className="prose max-w-none leading-relaxed text-gray-600"
                                dangerouslySetInnerHTML={{ __html: festival.description }}
                                itemProp="articleBody"
                            />
                        </article>
                    </div>

                    <div className="lg:col-span-1">
                        <Sidebar />
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
};
export default ViewPage;
