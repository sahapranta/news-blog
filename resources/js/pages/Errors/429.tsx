import HomeLayout from '@/layouts/home-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Home } from 'lucide-react';
import React from 'react';

const TooManyRequests: React.FC<{ message: string }> = ({ message }) => {
    return (
        <HomeLayout>
            <Head>
                <title>অত্যধিক অনুরোধ | মাসিক হরেকৃষ্ণ সমাচার</title>
                <meta name="description" content="আপনি খুব দ্রুত অনেক অনুরোধ করেছেন। দয়া করে কিছুক্ষণ পরে আবার চেষ্টা করুন।" />
                <meta name="robots" content="noindex, nofollow" />
                <meta property="og:title" content="অত্যধিক অনুরোধ | মাসিক হরেকৃষ্ণ সমাচার" />
                <meta property="og:description" content="আপনি খুব দ্রুত অনেক অনুরোধ করেছেন। দয়া করে কিছুক্ষণ পরে আবার চেষ্টা করুন।" />
                {/* <meta
                    property="og:image"
                    content={url('/images/og-too-many-requests.webp')}
                /> */}
            </Head>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="mb-6 border-b-4 border-red-500 pb-4 text-2xl font-bold text-gray-900">অত্যধিক অনুরোধ</h1>
                </div>

                <div className="grid grid-cols-1 gap-4 pb-8 lg:grid-cols-7">
                    <div className="text-center lg:col-span-3 lg:col-start-3">
                        <div className="mb-8">
                            <img src="/images/429.svg" alt="Too Many Requests" className="mx-auto w-80 sm:w-100" />
                            <a href="https://storyset.com/time" className="text-sm text-gray-400">
                                Illustration Storyset
                            </a>
                            <p className="mb-2 pt-4 text-xl text-gray-600">দয়া করে কিছুক্ষণ পরে আবার চেষ্টা করুন।</p>
                            {message && <p className="text-red-600">{message}</p>}
                        </div>

                        <div className="space-y-4">
                            <Link
                                href="/"
                                className="flex items-center justify-center space-x-2 rounded-lg bg-red-600/90 px-6 py-3 text-white transition-colors hover:bg-red-600"
                            >
                                <Home className="h-5 w-5" />
                                <span>হোমপেজে ফিরুন</span>
                            </Link>
                            <button
                                onClick={() => window.location.reload()}
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

export default TooManyRequests;
