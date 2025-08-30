import React from 'react';
import NewsSection from '@/components/NewsSection';
import HomeLayout from '@/layouts/home-layout';
import { PaginatedResponse } from '@/types';
import { PaginationNav } from '@/components/PaginationNav';
import { CategoryProps, ArticleProps } from '@/types/model';
import { Folder } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';

const CategoryPage: React.FC<{ category: CategoryProps; articles: PaginatedResponse<ArticleProps> }> = ({ category, articles }) => {

  const Heading = (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900 border-b-4 border-red-600 pb-4 mb-6">
        {category.title}
      </h1>
      <p className="text-gray-600 text-lg">
        {category.description || 'এই বিভাগে ইসকনের বিভিন্ন কার্যক্রম ও সংবাদসমূহ অন্তর্ভুক্ত রয়েছে।'}
      </p>
    </div>
  );
  return (
    <HomeLayout hasSidebar heading={Heading}>
      <Head title={`${category.title} সংবাদ - মাসিক হরেকৃষ্ণ সমাচার`}>
        <meta name="description" content={`${category.title} সংবাদ - ${category.description || 'এই বিভাগে ইসকনের বিভিন্ন কার্যক্রম ও সংবাদসমূহ অন্তর্ভুক্ত রয়েছে।'}`} />
        <meta property="og:title" content={`${category.title} সংবাদ - মাসিক হরেকৃষ্ণ সমাচার`} />
        <meta property="og:description" content={category.description || 'এই বিভাগে ইসকনের বিভিন্ন কার্যক্রম ও সংবাদসমূহ অন্তর্ভুক্ত রয়েছে।'} />
      </Head>

      {/* Category Header */}
      {articles.data.length > 0 ? (
        <>
          <NewsSection articles={articles.data} />

          {articles.last_page > 1 && (
            <PaginationNav
              currentPage={articles.current_page}
              lastPage={articles.last_page}
              prevPageUrl={articles.prev_page_url}
              nextPageUrl={articles.next_page_url}
              links={articles.links}
            />
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center text-gray-500">
          <Folder className="h-20 w-20 text-red-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800">ওহ! এখানে এখনো কিছুই নেই</h2>
          <p className="mt-3 text-base text-gray-600 max-w-md">
            এই বিভাগে এখনো কোনো পোস্ট প্রকাশিত হয়নি। আমরা শিগগিরই নতুন কিছু যুক্ত করব — ততক্ষণে অন্য বিভাগগুলো ঘুরে দেখুন!
          </p>
          <Link
            href="/categories"
            className="mt-6 inline-block px-6 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-700 transition duration-300"
          >
            সব বিভাগে ফিরে যান
          </Link>
        </div>
      )}
    </HomeLayout>
  );
};

export default CategoryPage;