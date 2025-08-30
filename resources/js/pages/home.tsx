import BreakingNews from '@/components/BreakingNews';
import FeaturedNews from '@/components/FeaturedNews';
import NewsSection from '@/components/NewsSection';
import SEOHead from '@/components/SEOHead';
import Sidebar from '@/components/Sidebar';
import HomeLayout from '@/layouts/home-layout';
import { useSiteData } from '@/stores/useSiteData';
import { type ArticleProps, CategoryProps, FeaturedNewsProps } from '@/types/model';
import { XIcon } from 'lucide-react';

interface CategoryArticleProps extends CategoryProps {
    articles: ArticleProps[];
}

const Home: React.FC<{
    featured: FeaturedNewsProps;
    sideArticles: ArticleProps[];
    categories: CategoryArticleProps[];
}> = ({ featured, sideArticles, categories }) => {
    const { ads } = useSiteData();
    const horizontal = ads?.horizontal_ads;

    return (
        <HomeLayout>
            <BreakingNews />
            <SEOHead />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <div className="lg:col-span-3">
                        <FeaturedNews featured={featured} sideArticles={sideArticles} />
                        {/* <HeroArea featured={featured}/> */}

                        {categories.map((category, index) => {
                            const adsBefore = horizontal?.filter((ad) => ad.index == index && ad.position === 'before');
                            const adsAfter = horizontal?.filter((ad) => ad.index == index && ad.position === 'after');

                            return (
                                <div key={index}>
                                    {adsBefore &&
                                        adsBefore.map((ad, i) => (
                                            <div key={`before-${i}`} className="relative col-span-full mb-6 overflow-hidden bg-white p-3 shadow-sm">
                                                <button className="absolute top-0 right-0 rounded-full bg-red-500 p-2 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none">
                                                    <span className="sr-only">Close</span>
                                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                                <a href={ad.url} target="_blank" rel="noopener noreferrer" title={ad.title}>
                                                    <img src={ad.image} alt="Ad" className="w-full object-cover" />
                                                </a>
                                            </div>
                                        ))}

                                    <NewsSection
                                        key={category.slug}
                                        slug={category.slug}
                                        title={category.title}
                                        articles={category.articles.map((article) => ({
                                            ...article,
                                            category: category,
                                            slug: article.slug,
                                            image_url: article.image_url,
                                        }))}
                                    />

                                    {adsAfter &&
                                        adsAfter.map((ad, i) => (
                                            <div key={`after-${i}`} className="relative col-span-full mb-6 overflow-hidden bg-white p-3 shadow-sm">
                                                <a href={ad.url} target="_blank" rel="noopener noreferrer" title={ad.title}>
                                                    <img src={ad.image} alt="Ad" className="w-full object-cover" />
                                                </a>
                                            </div>
                                        ))}
                                </div>
                            );
                        })}
                    </div>

                    <div className="lg:col-span-1">
                        <Sidebar />
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
};

export default Home;
