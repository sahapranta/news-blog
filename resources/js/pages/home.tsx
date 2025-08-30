import BreakingNews from '@/components/BreakingNews';
import FeaturedNews from '@/components/FeaturedNews';
import NewsSection from '@/components/NewsSection';
import Sidebar from '@/components/Sidebar';
import HomeLayout from '@/layouts/home-layout';
import { type ArticleProps, CategoryProps, FeaturedNewsProps } from '@/types/model';
import SEOHead from '@/components/SEOHead';
import { useSiteData } from '@/stores/useSiteData';
import { XIcon } from 'lucide-react';

interface CategoryArticleProps extends CategoryProps {
    articles: ArticleProps[];
};

const Home: React.FC<{
    featured: FeaturedNewsProps,
    sideArticles: ArticleProps[],
    categories: CategoryArticleProps[]
}> = ({ featured, sideArticles, categories }) => {
    const { ads } = useSiteData();
    const horizontal = ads?.horizontal_ads;

    return (
        <HomeLayout>
            <BreakingNews />
            <SEOHead />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                        <FeaturedNews featured={featured} sideArticles={sideArticles} />
                        {/* <HeroArea featured={featured}/> */}

                        {categories.map((category, index) => {
                            const adsBefore = horizontal?.filter(ad => ad.index == index && ad.position === 'before');
                            const adsAfter = horizontal?.filter(ad => ad.index == index && ad.position === 'after');

                            return (
                                <div key={index}>
                                    {adsBefore && adsBefore.map((ad, i) => (
                                        <div key={`before-${i}`} className="col-span-full bg-white shadow-sm p-3 mb-6 overflow-hidden relative">
                                            <button className="absolute top-0 right-0 p-2 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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
                                        articles={category.articles.map(article => ({
                                            ...article,
                                            category: category,
                                            slug: article.slug,
                                            image_url: article.image_url,
                                        }))}
                                    />

                                    {adsAfter && adsAfter.map((ad, i) => (
                                        <div key={`after-${i}`} className="col-span-full bg-white shadow-sm p-3 mb-6 overflow-hidden relative">
                                            <a href={ad.url} target="_blank" rel="noopener noreferrer" title={ad.title}>
                                                <img src={ad.image} alt="Ad" className="w-full object-cover" />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )
                        })}
                    </div>

                    <div className="lg:col-span-1">
                        <Sidebar />
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}

export default Home;
