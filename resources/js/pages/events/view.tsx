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
                description: url
            });
        }
    }
    return (
        <HomeLayout>
            <Head>
                <meta name="title" content={festival.title} />
                <meta name="description" content={festival.short_description} />
                <title>{festival.title}</title>
            </Head>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6 flex md:items-center justify-between sm:flex-row flex-col border-red-600 border-b-4 pb-4">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {festival.title}
                    </h1>
                    <div className="flex items-center space-x-2 pt-3 sm:pt-0">
                        {/* share buttons */}
                        <button onClick={share} className="flex items-center space-x-2 bg-red-600 text-white px-2.5 py-1.5 rounded-lg hover:bg-red-700 transition-colors text-xs" aria-label="Share">
                            <Share2Icon className="w-4 h-4" />
                            <span>শেয়ার করুন</span>
                        </button>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${route('festival.view', { festival: festival.slug })}`}
                            className="flex items-center space-x-2 bg-[#3b5999] text-white px-2.5 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-xs" target="_blank">
                            <FacebookIcon className="w-4 h-4" />
                            <span>Facebook</span>
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${route('festival.view', { festival: festival.slug })}&text=${festival.title}`}
                            className="flex items-center space-x-2 bg-[#55acee] text-white px-2.5 py-1.5 rounded-lg hover:bg-sky-700 transition-colors text-xs" rel="noopener noreferrer">
                            <TwitterIcon className="w-4 h-4" />
                            <span>Twitter</span>
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                        <article className="mt-2">
                            <div className="rounded-lg shadow-sm overflow-hidden mb-6">
                                <Img
                                    src={festival.image}
                                    alt={`${festival.name} | হরেকৃষ্ণ সমাচার`}
                                    className="w-full h-64 md:h-100 object-cover"
                                    loading="eager"
                                />
                            </div>
                            <div className='prose max-w-none text-gray-600 leading-relaxed' dangerouslySetInnerHTML={{ __html: festival.description }} itemProp="articleBody" />
                        </article>
                    </div>

                    <div className="lg:col-span-1">
                        <Sidebar />
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
export default ViewPage;