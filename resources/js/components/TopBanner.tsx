'use client';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export type TopBannerProps = {
    visible: boolean;
    type: 'success' | 'info' | 'warning' | 'error';
    badge?: string;
    message: string;
    dismissible: boolean;
    link: {
        text: string;
        url: string;
    };
};

type BannerProps = {
    banner: TopBannerProps;
};

const TopBanner: React.FC<BannerProps> = ({ banner }) => {
    const [isVisible, setIsVisible] = useState(true);

    const dismissBanner = () => {
        setIsVisible(false);
        sessionStorage.setItem('top-banner-hidden', 'true');
    };

    useEffect(() => {
        // if (sessionStorage.getItem('top-banner-hidden') === 'true') {
        //     setIsVisible(false);
        // }
    }, []);

    if (!isVisible) return null;

    const bgColor = {
        success: 'from-teal-600 to-cyan-600',
        info: 'from-indigo-600 to-sky-600',
        warning: 'from-amber-600 to-green-500',
        error: 'from-emerald-600 to-rose-600',
    }[banner.type];

    return (
        <div className={`relative overflow-hidden bg-gradient-to-r px-4 py-3 shadow-md ${bgColor}`}>
            {/* Background decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="h-32 w-32 rotate-12 rounded-full border-4 border-white"></div>
                <div className="absolute -right-6 h-24 w-24 -rotate-12 rounded-full border-4 border-white"></div>
                <div className="absolute -left-8 h-16 w-16 rotate-45 rounded-full border-4 border-white"></div>
            </div>

            <div className="relative z-10 flex items-center justify-between">
                <div className="flex flex-1 items-center justify-center text-center sm:justify-start sm:text-left">
                    <div className="hidden sm:block">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-3 h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <p className="flex items-center text-sm font-medium text-white">
                        {banner.badge && (
                            <span className="mr-1.5 hidden rounded-full bg-white px-2 py-0.5 text-xs font-bold text-teal-500 sm:inline-block">
                                {banner.badge}
                            </span>
                        )}
                        <span>
                            {banner.message}
                            {banner.link.url && (
                                <a href={banner.link.url} className="ml-1.5 whitespace-nowrap underline hover:text-teal-100">
                                    {banner.link.text}
                                </a>
                            )}
                        </span>
                    </p>
                </div>
                {banner.dismissible && (
                    <button className="ml-3 flex-shrink-0 text-white focus:outline-none" onClick={dismissBanner} aria-label="Dismiss">
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default TopBanner;
