import { api } from '@/hooks/use-api';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { route } from 'ziggy-js';
import { AdsProps, ArticleProps, QuotationProps } from '@/types/model';

const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

type SiteData = {
    breakingNews: { title: string, link: string, target: string, out?: boolean }[];
    lastFetched: number | null;
    topBanner: | null;
    quote: QuotationProps | null;
    ads: AdsProps | null;
    trendingNews: ArticleProps[];
    popularNews: { title: string, slug: string }[];
    clearBreakingNews: () => void;
    getBreakingNews: () => SiteData['breakingNews'];
    fetchBreakingNews: (force?: boolean) => Promise<void>;
}

export const useSiteData = create<SiteData>()(
    persist(
        (set, get) => ({
            breakingNews: [],
            trendingNews: [],
            popularNews: [],
            ads: null,
            lastFetched: null,
            topBanner: null,
            quote: null,
            clearBreakingNews: () => set({ breakingNews: [] }),
            getBreakingNews: () => get().breakingNews,
            fetchBreakingNews: async (force = false) => {
                const now = Date.now();
                const { lastFetched } = get();
                const isExpired = !lastFetched || now - lastFetched > CACHE_DURATION_MS;
                if (!force && !isExpired) return; // Use cached data
                // const { data } = await api.get(route('api.news.breaking'));
                const { data } = await api.get(route('api.frontend'));

                set({
                    breakingNews: data.ticker,
                    lastFetched: now,
                    topBanner: data.topBanner,
                    trendingNews: data.trending,
                    popularNews: data.popular,
                    quote: data.quote,
                    ads: data.ads,
                });
            },
        }),
        {
            version: 1,
            name: 'site-data',
            storage: createJSONStorage(() => sessionStorage),
        })
)
