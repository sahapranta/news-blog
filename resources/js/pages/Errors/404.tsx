import HomeLayout from '@/layouts/home-layout';
import { url } from '@/lib/helpers';
import { Link, Head } from '@inertiajs/react';
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
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 border-b-4 border-red-600 pb-4 mb-6">
                        পৃষ্ঠা পাওয়া যায়নি
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 pb-8">
                    <div className="lg:col-span-3 lg:col-start-3 text-center">
                        <div className="mb-8">
                            <img src='/images/404.svg' alt="404 Not Found" className="sm:w-100 w-80 mx-auto" />
                            <a href="https://storyset.com/internet" className='text-gray-400 text-sm'>Illustration Storyset</a>
                            {/* <AlertTriangle className="w-24 h-24 text-red-600 mx-auto mb-4" /> */}
                            <p className="text-gray-600 mb-8 text-xl pt-4">
                                দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা আমাদের কাছে নেই।
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Link
                                href="/"
                                className="flex items-center justify-center space-x-2 bg-red-600/90 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                <Home className="w-5 h-5" />
                                <span>হোমপেজে ফিরুন</span>
                            </Link>

                            <button
                                onClick={() => window.history.back()}
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

export default NotFound;