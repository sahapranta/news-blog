import React from 'react';
import NewsSection from '@/components/NewsSection';
import Sidebar from '@/components/Sidebar';
import { newsData } from '@/data/newsData';
import HomeLayout from '@/layouts/home-layout';

const InternationalPage: React.FC = () => {
  const allInternationalNews = [
    ...newsData.international,
    {
      title: "ইউরোপে নবায়নযোগ্য শক্তির ব্যবহার বৃদ্ধি",
      excerpt: "পরিবেশ রক্ষায় ইউরোপীয় দেশগুলো সৌর ও বায়ু শক্তির ব্যবহার দ্রুত বাড়াচ্ছে।",
      imageUrl: "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "পরিবেশ",
      time: "২ ঘন্টা আগে",
      views: "১৩,৫৬৭"
    },
    {
      title: "এশিয়ায় নতুন বাণিজ্য চুক্তি স্বাক্ষর",
      excerpt: "আঞ্চলিক অর্থনৈতিক সহযোগিতা বৃদ্ধির লক্ষ্যে এশিয়ার কয়েকটি দেশের মধ্যে নতুন চুক্তি।",
      imageUrl: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "অর্থনীতি",
      time: "৪ ঘন্টা আগে",
      views: "১০,৮৯০"
    },
    {
      title: "আফ্রিকায় শিক্ষা উন্নয়ন প্রকল্প",
      excerpt: "আন্তর্জাতিক সংস্থাগুলোর সহায়তায় আফ্রিকার বিভিন্ন দেশে শিক্ষা ব্যবস্থার উন্নতি।",
      imageUrl: "https://images.pexels.com/photos/8926558/pexels-photo-8926558.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "শিক্ষা",
      time: "৬ ঘন্টা আগে",
      views: "৮,৪৫৬"
    }
  ];

  return (
    <HomeLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 border-b-4 border-red-600 pb-4 mb-6">
            আন্তর্জাতিক
          </h1>
          <p className="text-gray-600 text-lg">
            বিশ্বের সর্বশেষ সংবাদ, আন্তর্জাতিক রাজনীতি, অর্থনীতি ও গুরুত্বপূর্ণ ঘটনাবলী
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <NewsSection title="বিশ্ব সংবাদ" articles={allInternationalNews} />
          </div>

          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>
    </HomeLayout>
  );
};

export default InternationalPage;