import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { useSiteData } from '@/stores/useSiteData';
import { Link } from '@inertiajs/react';

const BreakingNews: React.FC = () => {
  const { breakingNews } = useSiteData();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (breakingNews.length === 0) return;

    setCurrentIndex(Math.floor(Math.random() * breakingNews.length));

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === breakingNews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [breakingNews]);

  if (breakingNews.length === 0) return null;
  return (
    <div className="bg-gradient-to-l from-[#f59e0b] via-[#f97316] to-[#dc2626] text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="flex items-center mr-3">
            <AlertCircle className="w-5 h-5 mr-0 sm:mr-2 animate-pulse" />
            <span className="font-bold text-sm hidden sm:block">বিশেষ সংবাদ</span>
          </div>
          <div className="flex-1 overflow-hidden text-sm">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.isArray(breakingNews) && breakingNews.map(({ title, link, target, out = true }, index) => (
                <div key={index} className="w-full shrink-0">
                  {out ? (
                    <a href={link} className="whitespace-nowrap hover:underline" target={target} rel={out ? 'noopener noreferrer' : ''} >{title}</a>
                  ) : (
                    <Link href={link} className="whitespace-nowrap hover:underline">{title}</Link>
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