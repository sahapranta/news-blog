import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, X, TrendingUp, Folder, ChevronLeft, ChevronRight, Loader2Icon, ExternalLinkIcon, FileTextIcon, GraduationCapIcon, BookIcon, FolderIcon, CalendarFoldIcon, FanIcon, LucideIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useTranslation } from '@/lib/useTranslation';
import { route } from 'ziggy-js';
import { api } from '@/hooks/use-api';
import { debounce } from '@/lib/helpers';
import { Skeleton } from "@/components/ui/skeleton";

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

const ContentIcon: React.FC<IconProps> = ({ type = 'common', className = "w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" }) => {
  const contentIcons: Record<string, LucideIcon> = {
    article: FileTextIcon,
    paper: GraduationCapIcon,
    book: BookIcon,
    category: FanIcon,
    festival: CalendarFoldIcon,
    common: FolderIcon
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

  const popularSearches = [
    "করোনা আপডেট",
    "ক্রিকেট সংবাদ",
    "অর্থনীতি",
    "শিক্ষা নীতি",
    "প্রযুক্তি"
  ];

  const fetchResults = useCallback(async (query: string, pageNumber = 1) => {
    if (query.length < 3) return;

    setLoading(true);
    try {
      const { data } = await api.get(route('api.news.search'), {
        params: { query, page: pageNumber }
      });
      setResults(data.data);
      setPagination({ last_page: data.last_page, current_page: data.current_page });
    } catch (error) {
      setResults([]);
      console.log(error)
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useMemo(
    () => debounce((query: string, pageNumber: number) => {
      fetchResults(query, pageNumber);
    }, 800),
    [fetchResults]
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
    [onClose]
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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white/80 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">{t('search_label')}</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 p-1 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="relative">
            <input
              type="search"
              placeholder={`${t('search_news')}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 focus:border-gray-500 rounded-lg focus:!outline-0 peer"
              autoFocus
            />
            {loading ? (
              <Loader2Icon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5 animate-spin' />
            ) : (
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 peer-focus:text-gray-600" />
            )}
          </div>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          {searchQuery.length >= 3 ? (
            loading ? (
              <>
                <p className="text-center text-gray-500">লোড হচ্ছে...</p>
                <div className='space-y-4 mt-4'>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div className="block p-3 hover:bg-gray-50 bg-gray-100 rounded-lg transition-colors space-y-2" key={i}>
                      <Skeleton className="h-3 w-100 bg-gray-300" />
                      <Skeleton className="h-2 w-80 bg-gray-300" />
                    </div>
                  ))}
                </div>
              </>
            ) : results.length > 0 ? (
              <>
                <h3 className="text-lg font-semibold mb-4">{t('search_results')}</h3>
                <div className="space-y-2">
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      href={result.url}
                      onClick={handleClose}
                      className="group block p-4 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-lg transition-all duration-200 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        {/* Mobile layout - type below title */}
                        <div className="flex-1 min-w-0 md:hidden">
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                            {result.title}
                          </h4>

                          {result.type && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <ContentIcon type={result.type?.toLowerCase()} />
                              <span className="capitalize font-medium">{result.type}</span>
                            </div>
                          )}
                        </div>

                        {/* Desktop layout - type on left, title on right */}
                        <div className="hidden md:flex items-start gap-2 flex-1 min-w-0">
                          {result.type && (
                            <div className="relative flex flex-col items-center gap-2 text-xs text-gray-500 flex-shrink-0 min-w-[50px] group-hover:text-blue-500 transition-colors">
                              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-50 group-hover:to-blue-100 rounded-xl p-2 transition-all duration-300 group-hover:scale-105 shadow-sm">
                                <ContentIcon type={result.type?.toLowerCase()} />
                              </div>
                            </div>
                          )}

                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-base leading-tight">
                              {result.title}
                            </h4>
                            <span className='text-sm text-gray-400 font-medium capitalize'>{result.type}</span>
                          </div>
                        </div>

                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLinkIcon className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.last_page > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <button
                      disabled={page <= 1}
                      onClick={() => setPage((p) => p - 1)}
                      className="flex items-center px-3 py-1.5 bg-gray-100 rounded disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      আগের পৃষ্ঠা
                    </button>
                    <span className="text-sm text-gray-600">
                      {pagination.current_page} / {pagination.last_page}
                    </span>
                    <button
                      disabled={page >= pagination.last_page}
                      onClick={() => setPage((p) => p + 1)}
                      className="flex items-center px-3 py-1.5 bg-gray-100 rounded disabled:opacity-50"
                    >
                      পরের পৃষ্ঠা
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <Folder className="h-16 w-16 text-red-300 mb-4 mx-auto" />
                <h2 className="text-xl font-semibold text-gray-700">{t('no_result')}</h2>
                <p className="text-gray-500 mt-1">অনুগ্রহ করে ভিন্ন কীওয়ার্ড ব্যবহার করুন।</p>
              </div>
            )
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-red-500" />
                {t('popular_search')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, i) => (
                  <button
                    key={i}
                    onClick={() => setSearchQuery(search)}
                    className="px-3 py-2 bg-gray-100 hover:bg-white rounded-full text-sm text-gray-700"
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