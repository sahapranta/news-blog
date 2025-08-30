import { useSiteData } from '@/stores/useSiteData';
import { Link } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const BreakingNews: React.FC = () => {
    const { breakingNews } = useSiteData();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (breakingNews.length === 0) return;

        setCurrentIndex(Math.floor(Math.random() * breakingNews.length));

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === breakingNews.length - 1 ? 0 : prevIndex + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, [breakingNews]);

    if (breakingNews.length === 0) return null;
    return (
        <div className="bg-gradient-to-l from-[#f59e0b] via-[#f97316] to-[#dc2626] py-2 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <div className="mr-3 flex items-center">
                        <AlertCircle className="mr-0 h-5 w-5 animate-pulse sm:mr-2" />
                        <span className="hidden text-sm font-bold sm:block">বিশেষ সংবাদ</span>
                    </div>
                    <div className="flex-1 overflow-hidden text-sm">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {Array.isArray(breakingNews) &&
                                breakingNews.map(({ title, link, target, out = true }, index) => (
                                    <div key={index} className="w-full shrink-0">
                                        {out ? (
                                            <a
                                                href={link}
                                                className="whitespace-nowrap hover:underline"
                                                target={target}
                                                rel={out ? 'noopener noreferrer' : ''}
                                            >
                                                {title}
                                            </a>
                                        ) : (
                                            <Link href={link} className="whitespace-nowrap hover:underline">
                                                {title}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreakingNews;
