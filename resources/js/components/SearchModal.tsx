import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/hooks/use-api';
import { debounce } from '@/lib/helpers';
import { useTranslation } from '@/lib/useTranslation';
import { Link } from '@inertiajs/react';
import {
    BookIcon,
    CalendarFoldIcon,
    ChevronLeft,
    ChevronRight,
    ExternalLinkIcon,
    FanIcon,
    FileTextIcon,
    Folder,
    FolderIcon,
    GraduationCapIcon,
    Loader2Icon,
    LucideIcon,
    Search,
    TrendingUp,
    X,
} from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { route } from 'ziggy-js';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface SearchResult {
    id: string;
    title: string;
    slug: string;
    url: string;
    type: string;
}

interface IconProps {
    type?: string;
    className?: string;
}

const ContentIcon: React.FC<IconProps> = ({ type = 'common', className = 'w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors' }) => {
    const contentIcons: Record<string, LucideIcon> = {
        article: FileTextIcon,
        paper: GraduationCapIcon,
        book: BookIcon,
        category: FanIcon,
        festival: CalendarFoldIcon,
        common: FolderIcon,
    };

    const IconComponent = contentIcons[type] || contentIcons.common;
    return <IconComponent className={className} />;
};

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState<{ last_page: number; current_page: number }>({ last_page: 1, current_page: 1 });

    const popularSearches = ['করোনা আপডেট', 'ক্রিকেট সংবাদ', 'অর্থনীতি', 'শিক্ষা নীতি', 'প্রযুক্তি'];

    const fetchResults = useCallback(async (query: string, pageNumber = 1) => {
        if (query.length < 3) return;

        setLoading(true);
        try {
            const { data } = await api.get(route('api.news.search'), {
                params: { query, page: pageNumber },
            });
            setResults(data.data);
            setPagination({ last_page: data.last_page, current_page: data.current_page });
        } catch (error) {
            setResults([]);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const debouncedSearch = useMemo(
        () =>
            debounce((query: string, pageNumber: number) => {
                fetchResults(query, pageNumber);
            }, 800),
        [fetchResults],
    );

    useEffect(() => {
        if (searchQuery.length >= 3) {
            debouncedSearch(searchQuery, page);
        }
    }, [searchQuery, page, debouncedSearch]);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        },
        [onClose],
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    const resetState = () => {
        setSearchQuery('');
        setPage(1);
        setResults([]);
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20">
            <div className="mx-4 max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-lg bg-white/80 shadow-xl backdrop-blur-lg backdrop-filter">
                <div className="border-b border-gray-500 p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">{t('search_label')}</h2>
                        <button onClick={handleClose} className="cursor-pointer p-1 text-gray-500 hover:text-gray-700">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            type="search"
                            placeholder={`${t('search_news')}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="peer w-full rounded-lg border-2 border-gray-400 py-3 pr-4 pl-10 focus:border-gray-500 focus:!outline-0"
                            autoFocus
                        />
                        {loading ? (
                            <Loader2Icon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform animate-spin text-gray-600" />
                        ) : (
                            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400 peer-focus:text-gray-600" />
                        )}
                    </div>
                </div>

                <div className="max-h-96 overflow-y-auto p-6">
                    {searchQuery.length >= 3 ? (
                        loading ? (
                            <>
                                <p className="text-center text-gray-500">লোড হচ্ছে...</p>
                                <div className="mt-4 space-y-4">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <div className="block space-y-2 rounded-lg bg-gray-100 p-3 transition-colors hover:bg-gray-50" key={i}>
                                            <Skeleton className="h-3 w-100 bg-gray-300" />
                                            <Skeleton className="h-2 w-80 bg-gray-300" />
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : results.length > 0 ? (
                            <>
                                <h3 className="mb-4 text-lg font-semibold">{t('search_results')}</h3>
                                <div className="space-y-2">
                                    {results.map((result) => (
                                        <Link
                                            key={result.id}
                                            href={result.url}
                                            onClick={handleClose}
                                            className="group block rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                {/* Mobile layout - type below title */}
                                                <div className="min-w-0 flex-1 md:hidden">
                                                    <h4 className="mb-1 line-clamp-1 font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                                                        {result.title}
                                                    </h4>

                                                    {result.type && (
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                            <ContentIcon type={result.type?.toLowerCase()} />
                                                            <span className="font-medium capitalize">{result.type}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Desktop layout - type on left, title on right */}
                                                <div className="hidden min-w-0 flex-1 items-start gap-2 md:flex">
                                                    {result.type && (
                                                        <div className="relative flex min-w-[50px] flex-shrink-0 flex-col items-center gap-2 text-xs text-gray-500 transition-colors group-hover:text-blue-500">
                                                            <div className="relative rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 p-2 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:from-blue-50 group-hover:to-blue-100">
                                                                <ContentIcon type={result.type?.toLowerCase()} />
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex-1">
                                                        <h4 className="line-clamp-2 text-base leading-tight font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                                                            {result.title}
                                                        </h4>
                                                        <span className="text-sm font-medium text-gray-400 capitalize">{result.type}</span>
                                                    </div>
                                                </div>

                                                <div className="opacity-0 transition-opacity group-hover:opacity-100">
                                                    <ExternalLinkIcon className="h-4 w-4 text-gray-400" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {pagination.last_page > 1 && (
                                    <div className="mt-4 flex items-center justify-between">
                                        <button
                                            disabled={page <= 1}
                                            onClick={() => setPage((p) => p - 1)}
                                            className="flex items-center rounded bg-gray-100 px-3 py-1.5 disabled:opacity-50"
                                        >
                                            <ChevronLeft className="mr-1 h-4 w-4" />
                                            আগের পৃষ্ঠা
                                        </button>
                                        <span className="text-sm text-gray-600">
                                            {pagination.current_page} / {pagination.last_page}
                                        </span>
                                        <button
                                            disabled={page >= pagination.last_page}
                                            onClick={() => setPage((p) => p + 1)}
                                            className="flex items-center rounded bg-gray-100 px-3 py-1.5 disabled:opacity-50"
                                        >
                                            পরের পৃষ্ঠা
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="py-8 text-center">
                                <Folder className="mx-auto mb-4 h-16 w-16 text-red-300" />
                                <h2 className="text-xl font-semibold text-gray-700">{t('no_result')}</h2>
                                <p className="mt-1 text-gray-500">অনুগ্রহ করে ভিন্ন কীওয়ার্ড ব্যবহার করুন।</p>
                            </div>
                        )
                    ) : (
                        <>
                            <h3 className="mb-4 flex items-center text-lg font-semibold">
                                <TrendingUp className="mr-2 h-5 w-5 text-red-500" />
                                {t('popular_search')}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {popularSearches.map((search, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSearchQuery(search)}
                                        className="rounded-full bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-white"
                                    >
                                        {search}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
