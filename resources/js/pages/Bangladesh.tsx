import NewsSection from '@/components/NewsSection';
import Sidebar from '@/components/Sidebar';
import { newsData } from '@/data/newsData';
import HomeLayout from '@/layouts/home-layout';
import React from 'react';

const BangladeshPage: React.FC = () => {
    const allBangladeshNews = [
        ...newsData.bangladesh,
        {
            title: 'রাজধানীতে নতুন হাসপাতাল উদ্বোধন',
            excerpt: 'আধুনিক চিকিৎসা সেবা প্রদানের লক্ষ্যে ঢাকায় নতুন বিশেষায়িত হাসপাতাল চালু।',
            image_url: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600',
            category: 'স্বাস্থ্য',
            time: '১ ঘন্টা আগে',
            views: '৯,৮৭৬',
        },
        {
            title: 'গ্রামীণ এলাকায় ইন্টারনেট সংযোগ বিস্তার',
            excerpt: 'ডিজিটাল বাংলাদেশ গড়ার লক্ষ্যে প্রত্যন্ত অঞ্চলে ব্রডব্যান্ড ইন্টারনেট পৌঁছানো হচ্ছে।',
            image_url: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=600',
            category: 'প্রযুক্তি',
            time: '৩ ঘন্টা আগে',
            views: '৭,৫৪৩',
        },
        {
            title: 'নতুন রেলপথ নির্মাণ প্রকল্প অনুমোদন',
            excerpt: 'দেশের দক্ষিণাঞ্চলের সাথে যোগাযোগ উন্নতির জন্য নতুন রেলপথ নির্মাণের কাজ শুরু।',
            image_url: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=600',
            category: 'পরিবহন',
            time: '৫ ঘন্টা আগে',
            views: '১১,২৩৪',
        },
    ];

    return (
        <HomeLayout>
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="mb-6 border-b-4 border-red-600 pb-4 text-3xl font-bold text-gray-900">বাংলাদেশ</h1>
                    <p className="text-lg text-gray-600">বাংলাদেশের সর্বশেষ সংবাদ, রাজনীতি, অর্থনীতি, সমাজ ও সংস্কৃতির খবর</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <div className="lg:col-span-3">
                        <NewsSection title="সর্বশেষ সংবাদ" articles={allBangladeshNews} />
                    </div>

                    <div className="lg:col-span-1">
                        <Sidebar />
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
};

export default BangladeshPage;
