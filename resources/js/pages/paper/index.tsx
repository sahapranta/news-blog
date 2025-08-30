import { PaginationNav } from '@/components/PaginationNav';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import HomeLayout from '@/layouts/home-layout';
import { PaginatedResponse } from '@/types';
import { PaperProps } from '@/types/model';
import { Head, Link, router } from '@inertiajs/react';
import { BookOpen, Calendar, ChevronLeft, ChevronRight, Download, Search, Star, TextSearchIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { route } from 'ziggy-js';

const MagazinePage: React.FC<{
    paper: PaperProps;
    papers: PaginatedResponse<PaperProps>;
    filters: { search?: string };
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
            router.get(
                route('paper.index'),
                { search: searchQuery },
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                    onFinish: () => setLoading(false),
                },
            );
        }, 600);

        return () => clearTimeout(timeout);
    }, [searchQuery, filters.search]);

    const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

    const navigateMonth = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
            if (selectedMonth === 1) {
                setSelectedMonth(12);
                setSelectedYear((prev) => prev - 1);
            } else {
                setSelectedMonth((prev) => prev - 1);
            }
        } else {
            if (selectedMonth === 12) {
                setSelectedMonth(1);
                setSelectedYear((prev) => prev + 1);
            } else {
                setSelectedMonth((prev) => prev + 1);
            }
        }
    };

    const Heading = (
        <div className="mb-8">
            <h1 className="mb-6 border-b-4 border-red-600 pb-4 text-3xl font-bold text-gray-900">মাসিক পত্রিকা</h1>
            <p className="text-lg text-gray-600">মাসিক হরেকৃষ্ণ সমাচার - পারমার্থিক নবজাগরণের মাসিক বার্তাবহ।</p>
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
            <div className="mb-8 rounded-lg bg-gradient-to-r from-red-600 to-red-700 p-8 text-white">
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                    <div>
                        <div className="mb-4 flex items-center space-x-2">
                            <Calendar className="h-5 w-5" />
                            <span className="text-red-100">চলমান সংখ্যা</span>
                        </div>
                        <h2 className="mb-4 text-3xl font-bold">{paper.title}</h2>
                        <p className="mb-6 text-red-100">{paper.description}</p>

                        <div className="mb-6 flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                                <BookOpen className="h-4 w-4" />
                                <span>৮ পৃষ্ঠা</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Download className="h-4 w-4" />
                                <span>{paper.download_count || 200}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Star className="h-4 w-4 fill-current" />
                                <span>৫.০</span>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <a
                                href={route('paper.show', { paper: paper.slug })}
                                className="rounded-lg bg-white px-6 py-3 font-semibold text-red-600 transition-colors hover:bg-gray-100"
                            >
                                <BookOpen className="mr-2 inline h-4 w-4" />
                                পড়ুন
                            </a>
                            <Link
                                href={route('paper.download', { paper: paper.slug })}
                                className="rounded-lg border border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-red-600"
                            >
                                <Download className="mr-2 inline h-4 w-4" />
                                ডাউনলোড
                            </Link>
                        </div>
                    </div>

                    <div className="flex w-full justify-center">
                        <Carousel className="w-full max-w-xs">
                            <CarouselContent>
                                {paper.media?.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <img src={image.url} alt={image.name} className="mx-auto h-100 object-cover" loading="lazy" />
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
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-semibold">পত্রিকা আর্কাইভ</h3>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => navigateMonth('prev')} className="rounded-lg p-2 transition-colors hover:bg-gray-100">
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <span className="font-medium">
                            {months[selectedMonth - 1]} {selectedYear}
                        </span>
                        <button onClick={() => navigateMonth('next')} className="rounded-lg p-2 transition-colors hover:bg-gray-100">
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        <input
                            type="text"
                            placeholder="পত্রিকা খুঁজুন..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:ring-1 focus:ring-gray-600 focus:!outline-0"
                        />
                        {loading && (
                            <div className="absolute top-1/2 right-3 -translate-y-1/2">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Papers Grid */}
            {loading ? (
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-56 animate-pulse rounded-lg bg-gray-200" />
                    ))}
                </div>
            ) : (
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {papers.data.map((cp) => (
                        <div key={cp.id} className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
                            <div className="relative">
                                <img src={cp.thumbnail} alt={cp.title} className="h-48 w-full object-cover" />
                            </div>
                            <div className="p-4">
                                <h3 className="mb-1 font-semibold text-gray-900">{cp.title}</h3>
                                <p className="mb-3 line-clamp-2 text-xs text-gray-500">{cp.description}</p>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('paper.show', { paper: cp.slug })}
                                        className="flex-1 rounded bg-red-600 px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-red-700"
                                    >
                                        <BookOpen className="mr-1 inline h-3 w-3" />
                                        পড়ুন
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    {!papers.data.length && (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500">
                            <TextSearchIcon className="mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="text-lg font-semibold">No papers found</h3>
                            <p className="mt-1 text-sm text-gray-400">Try adjusting your search or filters.</p>
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
