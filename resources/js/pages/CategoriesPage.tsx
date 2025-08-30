import React from 'react';
import HomeLayout from '@/layouts/home-layout';
import { CategoryProps } from '@/types/model';
import { Head, Link } from '@inertiajs/react';
import { Folder, Stars } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/lib/useTranslation';

interface CategoriesPageProps extends CategoryProps {
    articles_count: number;
}

const CategoriesPage: React.FC<{ categories: CategoriesPageProps[] }> = ({ categories }) => {
    const { t } = useTranslation();
    return (
        <HomeLayout>
            <Head title={`${t('categories')} - মাসিক হরেকৃষ্ণ সমাচার`} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">{t('categories')}</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        মাসিক হরেকৃষ্ণ সমাচার এর বিভিন্ন সংবাদ বিভাগসমূহ।
                    </p>
                </div>

                {categories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/category/${category.slug}`}
                                className="group block bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden"
                            >
                                <div className="p-6 flex justify-between items-center">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <Stars className="w-6 h-6 text-red-500" />
                                            <h2 className="text-xl font-semibold text-gray-900">
                                                {category.title}
                                            </h2>
                                            {/* <Badge className='bg-red-100 text-red-800 border-red-200'>
                                                {category.articles_count}
                                            </Badge> */}
                                        </div>
                                        <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                                            {category.description || 'এই বিভাগে ইসকনের বিভিন্ন কার্যক্রম অন্তর্ভুক্ত রয়েছে।'}
                                        </p>
                                    </div>
                                    {category.articles_count > 0 && (
                                        <div className='flex flex-col items-center'>
                                            <span className='text-3xl text-gray-400 group-hover:text-red-400 transition-colors'>
                                                {category.articles_count} <br />
                                            </span>
                                            <span className='text-sm text-gray-400 capitalize group-hover:text-red-400 transition-colors'>
                                                posts
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center text-gray-500">
                        <Folder className="h-20 w-20 text-red-300 mb-6" />
                        <h2 className="text-xl font-semibold">এখনো কোনো বিভাগ যুক্ত করা হয়নি</h2>
                        <p className="mt-2 text-gray-500">পরবর্তীতে এখানে বিভিন্ন বিভাগ প্রদর্শিত হবে।</p>
                    </div>
                )}
            </main>
        </HomeLayout>
    );
};

export default CategoriesPage;
