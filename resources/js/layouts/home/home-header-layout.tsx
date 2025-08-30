import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import { type BreadcrumbItem } from '@/types';
import { useEffect, type PropsWithChildren } from 'react';
import { useSiteData } from '@/stores/useSiteData';
import { Toaster } from "@/components/ui/sonner"
import TopBanner from '@/components/TopBanner';

// export default function HomeHeaderLayout({ children }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
export default function HomeHeaderLayout({ children }: PropsWithChildren) {
    const { fetchBreakingNews, topBanner } = useSiteData();

    useEffect(() => {
        fetchBreakingNews();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
            {topBanner && <TopBanner banner={topBanner} />}
            <Header />
            {children}
            <Footer />
            <Toaster position="bottom-center" richColors/>
        </div>
    );
}