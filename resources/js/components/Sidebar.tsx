import React, { useEffect, useState } from 'react';
import { TrendingUp, Clock, Eye } from 'lucide-react';
import NewsCard from './NewsCard';
import { Link } from '@inertiajs/react';
import { useSiteData } from '@/stores/useSiteData';
import { route } from 'ziggy-js';
import Banner from './CountdownBanner';
import AdsBox from './AdsBox';

const Sidebar: React.FC = () => {
  // const route = useRoute();
  const { popularNews, trendingNews, quote, ads } = useSiteData();

  const vertical = ads?.vertical_ads;
  const top = ads?.top_ads;

  const bn = ['১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

  return (
    <aside className="space-y-8">
      {/* Trending News */}
      {top &&
        <AdsBox
          image={top.image}
          title={top.title}
          body={top.description}
          ctaText={top.link_title}
          ctaLink={top.url}
          height="h-60"
          dismissible
        />
      }

      <Banner quote={quote} />

      {/* Popular Articles */}
      {Array.isArray(popularNews) && (
        <div className="bg-radial from-red-100 via-white to-neutral-50 rounded-lg shadow-md backdrop-blur ring-1 ring-black/5 p-6">
          <div className="flex items-center mb-4">
            <Eye className="w-5 h-5 text-red-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              জনপ্রিয় সংবাদ
            </h3>
          </div>
          <div className="space-y-3">
            {popularNews.map(({ title, slug }, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="text-red-500 font-bold text-4xl w-6 text-center">
                  {bn[index]}
                </span>
                <Link
                  href={route('article.show', { slug })}
                  className="text-gray-700 hover:text-red-600 leading-relaxed"
                >
                  {title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weather Widget */}
      {/* <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-xs p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">আবহাওয়া</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">ঢাকা</p>
            <p className="text-2xl font-bold">২৮°C</p>
            <p className="text-sm opacity-90">আংশিক মেঘলা</p>
          </div>
          <div className="text-right">
            <p className="text-sm">আর্দ্রতা: ৭৫%</p>
            <p className="text-sm">বাতাসের গতি: ১২ কিমি/ঘ</p>
          </div>
        </div>
      </div> */}
      {(trendingNews && Array.isArray(trendingNews)) && (
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-0.5">
          {/* Inner container with border effect */}
          <div className="relative rounded-md bg-white p-3 md:p-5 dark:bg-gray-900">
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-purple-500 opacity-10"></div>
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-indigo-500 opacity-10"></div>

            <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row">
              {/* Middle: Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-5 h-5 text-red-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    ট্রেন্ডিং সংবাদ
                  </h3>
                </div>
                <div className="space-y-4">
                  {trendingNews.map((article, index) => (
                    <NewsCard
                      key={index}
                      title={article.title}
                      slug={article.slug}
                      image_url={article.image_url}
                      category={article.category}
                      size="small"
                      className='border border-gray-100'
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {vertical && <div>
        <a href={vertical.url} target={vertical.target} title={vertical.title}>
          <img src={vertical.image} alt={vertical.title} className='w-full object-cover' />
        </a>
      </div>}

    </aside>
  );
};

export default Sidebar;