import React from 'react';
import { FeaturedNewsProps } from '@/types/model';
import { Link } from '@inertiajs/react';

const HeroArea: React.FC<{ featured: FeaturedNewsProps }> = ({ featured }) => {
    return (
        <div className="relative flex flex-col overflow-hidden rounded-xl bg-gradient-to-br from-gray-200 to-gray-100 p-6 text-black shadow-xl md:flex-row md:items-center md:justify-between mb-8">
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-60">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern
                            id="grid"
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 20 0 L 0 0 0 20"
                                fill="none"
                                stroke="white"
                                strokeWidth="1"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Content */}
            <div className="z-10 space-y-3 md:w-3/5">
                <div className="inline-block rounded-lg bg-red-500 px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase">
                    {featured.category.title}
                </div>
                <h2 className="text-2xl leading-tight font-bold tracking-tight lg:text-4xl">
                    {featured.title}
                </h2>
                <p className="max-w-xl text-sm text-gray-800 md:text-base">
                    {featured.excerpt}
                </p>
                <div>
                    <Link href={route('article.show', { slug: featured.slug })} className="rounded-md border border-white/30 bg-transparent font-medium transition-all hover:bg-white/10">
                        Read More ...
                    </Link>
                </div>
            </div>

            {/* Image */}
            <div className="relative z-10 mt-6 h-60 w-full md:mt-0 md:h-80 md:w-2/5">
                <div className="absolute -top-4 -right-4 h-60 w-60 rounded-full bg-blue-500/30 blur-xl"></div>
                <div className="relative h-full w-full">
                    <img
                        src="https://www.shova.link/wp-content/uploads/2025/01/%E0%A6%87%E0%A6%B8%E0%A6%95%E0%A6%A8-%E0%A6%B8%E0%A6%AE%E0%A7%8D%E0%A6%AA%E0%A6%B0%E0%A7%8D%E0%A6%95%E0%A7%87-%E0%A6%AC%E0%A6%BF%E0%A6%B8%E0%A7%8D%E0%A6%A4%E0%A6%BE%E0%A6%B0%E0%A6%BF%E0%A6%A4-%E0%A6%A4%E0%A6%A5%E0%A7%8D%E0%A6%AF.webp"
                        alt={featured.title}
                        className="drop-shadow-2xl object-cover h-full"
                    />
                </div>
            </div>
        </div>
    );
}

export default HeroArea;