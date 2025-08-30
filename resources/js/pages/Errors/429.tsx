import HomeLayout from '@/layouts/home-layout';
import { Link, Head } from '@inertiajs/react';
import { ArrowLeft, Home, Clock } from 'lucide-react';
import React from 'react';

const TooManyRequests: React.FC<{ message: any }> = ({ message }) => {
    return (
        <HomeLayout>
            <Head>
                <title>অত্যধিক অনুরোধ | মাসিক হরেকৃষ্ণ সমাচার</title>
                <meta
                    name="description"
                    content="আপনি খুব দ্রুত অনেক অনুরোধ করেছেন। দয়া করে কিছুক্ষণ পরে আবার চেষ্টা করুন।"
                />
                <meta name="robots" content="noindex, nofollow" />
                <meta
                    property="og:title"
                    content="অত্যধিক অনুরোধ | মাসিক হরেকৃষ্ণ সমাচার"
                />
                <meta
                    property="og:description"
                    content="আপনি খুব দ্রুত অনেক অনুরোধ করেছেন। দয়া করে কিছুক্ষণ পরে আবার চেষ্টা করুন।"
                />
                {/* <meta
                    property="og:image"
                    content={url('/images/og-too-many-requests.webp')}
                /> */}
            </Head>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 border-b-4 border-red-500 pb-4 mb-6">
                        অত্যধিক অনুরোধ
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 pb-8">
                    <div className="lg:col-span-3 lg:col-start-3 text-center">
                        <div className="mb-8">
                            <img
                                src="/images/429.svg"
                                alt="Too Many Requests"
                                className="sm:w-100 w-80 mx-auto"
                            />
                            <a
                                href="https://storyset.com/time"
                                className="text-gray-400 text-sm"
                            >
                                Illustration Storyset
                            </a>
                            <p className="text-gray-600 mb-2 text-xl pt-4">
                                দয়া করে কিছুক্ষণ পরে আবার চেষ্টা করুন।
                            </p>
                            {message && <p className="text-red-600">{message}</p>}
                        </div>

                        <div className="space-y-4">
                            <Link
                                href="/"
                                className="flex items-center justify-center space-x-2 bg-red-600/90 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
                            >
                                <Home className="w-5 h-5" />
                                <span>হোমপেজে ফিরুন</span>
                            </Link>
                            <button
                                onClick={() => window.location.reload()}
                                className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
                            >
                                <ArrowLeft className="w-5 h-5" />
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
