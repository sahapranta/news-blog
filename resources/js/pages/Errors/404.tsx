import HomeLayout from '@/layouts/home-layout';
import { url } from '@/lib/helpers';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Home } from 'lucide-react';
import React from 'react';

const NotFound: React.FC = () => {
    return (
        <HomeLayout>
            <Head>
                <title>পৃষ্ঠা পাওয়া যায়নি | মাসিক হরেকৃষ্ণ সমাচার</title>
                <meta name="description" content="দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা আমাদের কাছে নেই।" />
                <meta name="robots" content="noindex, nofollow" />
                <meta property="og:title" content="পৃষ্ঠা পাওয়া যায়নি | মাসিক হরেকৃষ্ণ সমাচার" />
                <meta property="og:description" content="দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা আমাদের কাছে নেই।" />
                <meta property="og:image" content={url('/images/og-not-found.webp')} />
            </Head>
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="mb-6 border-b-4 border-red-600 pb-4 text-2xl font-bold text-gray-900">পৃষ্ঠা পাওয়া যায়নি</h1>
                </div>

                <div className="grid grid-cols-1 gap-4 pb-8 lg:grid-cols-7">
                    <div className="text-center lg:col-span-3 lg:col-start-3">
                        <div className="mb-8">
                            <img src="/images/404.svg" alt="404 Not Found" className="mx-auto w-80 sm:w-100" />
                            <a href="https://storyset.com/internet" className="text-sm text-gray-400">
                                Illustration Storyset
                            </a>
                            {/* <AlertTriangle className="w-24 h-24 text-red-600 mx-auto mb-4" /> */}
                            <p className="mb-8 pt-4 text-xl text-gray-600">দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা আমাদের কাছে নেই।</p>
                        </div>

                        <div className="space-y-4">
                            <Link
                                href="/"
                                className="flex items-center justify-center space-x-2 rounded-lg bg-red-600/90 px-6 py-3 text-white transition-colors hover:bg-red-700"
                            >
                                <Home className="h-5 w-5" />
                                <span>হোমপেজে ফিরুন</span>
                            </Link>

                            <button
                                onClick={() => window.history.back()}
                                className="flex w-full items-center justify-center space-x-2 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                <ArrowLeft className="h-5 w-5" />
                                <span>পূর্ববর্তী পৃষ্ঠায় ফিরুন</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
};

export default NotFound;
