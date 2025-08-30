import React, { useEffect, useRef, useState } from 'react';
import {
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Star,
  Search,
  TextSearchIcon,
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import HomeLayout from '@/layouts/home-layout';
import { PaperProps } from '@/types/model';
import { PaginatedResponse } from '@/types';
import { route } from 'ziggy-js';
import { Head, Link, router } from '@inertiajs/react';
import { PaginationNav } from '@/components/PaginationNav';

const MagazinePage: React.FC<{
  paper: PaperProps,
  papers: PaginatedResponse<PaperProps>,
  filters: { search?: string }
}> = ({ paper, papers, filters }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [loading, setLoading] = useState(false);

  const firstRun = useRef(true);

  useEffect(() => {
    // Skip first run to avoid duplicate fetch on mount
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    if (searchQuery === filters.search) return;

    const timeout = setTimeout(() => {
      setLoading(true);
      router.get(route('paper.index'), { search: searchQuery }, {
        preserveState: true,
        replace: true,
        preserveScroll: true,
        onFinish: () => setLoading(false),
      });
    }, 600);

    return () => clearTimeout(timeout);
  }, [searchQuery, filters.search]);

  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (selectedMonth === 1) {
        setSelectedMonth(12);
        setSelectedYear(prev => prev - 1);
      } else {
        setSelectedMonth(prev => prev - 1);
      }
    } else {
      if (selectedMonth === 12) {
        setSelectedMonth(1);
        setSelectedYear(prev => prev + 1);
      } else {
        setSelectedMonth(prev => prev + 1);
      }
    }
  };

  const Heading = (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 border-b-4 border-red-600 pb-4 mb-6">
        মাসিক পত্রিকা
      </h1>
      <p className="text-gray-600 text-lg">
        মাসিক হরেকৃষ্ণ সমাচার - পারমার্থিক নবজাগরণের মাসিক বার্তাবহ।
      </p>
    </div>
  );

  return (
    <HomeLayout hasSidebar heading={Heading}>
      <Head>
        <title>{paper.title}</title>
        <meta name="description" content={paper.description} />
        <meta property="og:title" content={paper.title} />
        <meta property="og:description" content={paper.description} />
        <meta property="og:image" content={paper.thumbnail} />
        <meta property="og:url" content={route('paper.show', { paper: paper.slug })} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={paper.title} />
        <meta name="twitter:description" content={paper.description} />
        <meta name="twitter:image" content={paper.thumbnail} />
      </Head>
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 mb-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5" />
              <span className="text-red-100">চলমান সংখ্যা</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">{paper.title}</h2>
            <p className="text-red-100 mb-6">{paper.description}</p>

            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>৮ পৃষ্ঠা</span>
              </div>
              <div className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>{paper.download_count || 200}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 fill-current" />
                <span>৫.০</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <a
                href={route('paper.show', { paper: paper.slug })}
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                পড়ুন
              </a>
              <Link
                href={route('paper.download', { paper: paper.slug })}
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
              >
                <Download className="w-4 h-4 inline mr-2" />
                ডাউনলোড
              </Link>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {paper.media?.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image.url}
                      alt={image.name}
                      className="h-100 object-cover mx-auto"
                      loading="lazy"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious size="icon" className="bg-red-600 hover:bg-red-200" />
              <CarouselNext size="icon" className="bg-red-600 hover:bg-red-200" />
            </Carousel>
          </div>
        </div>
      </div>

      {/* Archive */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">পত্রিকা আর্কাইভ</h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-medium">
              {months[selectedMonth - 1]} {selectedYear}
            </span>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="পত্রিকা খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:!outline-0 focus:ring-1 focus:ring-gray-600"
            />
            {loading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Papers Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-56 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {papers.data.map((cp) => (
            <div
              key={cp.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={cp.thumbnail}
                  alt={cp.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{cp.title}</h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{cp.description}</p>
                <div className="flex space-x-2">
                  <Link
                    href={route('paper.show', { paper: cp.slug })}
                    className="flex-1 bg-red-600 text-white py-2 px-3 text-center rounded text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    <BookOpen className="w-3 h-3 inline mr-1" />
                    পড়ুন
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {!papers.data.length && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500 col-span-full">
              <TextSearchIcon className="w-12 h-12 mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold">No papers found</h3>
              <p className="text-sm text-gray-400 mt-1">
                Try adjusting your search or filters.
              </p>
            </div>
          )}


        </div>
      )}

      {/* Pagination */}
      <div>
        {papers.last_page > 1 && (
          <PaginationNav
            currentPage={papers.current_page}
            lastPage={papers.last_page}
            prevPageUrl={papers.prev_page_url}
            nextPageUrl={papers.next_page_url}
            links={papers.links}
          />
        )}
      </div>
    </HomeLayout>
  );
};

export default MagazinePage;
