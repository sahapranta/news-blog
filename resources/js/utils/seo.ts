// SEO utility functions
export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
    // Remove HTML tags and extra whitespace
    const cleanContent = content
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    if (cleanContent.length <= maxLength) {
        return cleanContent;
    }

    // Find the last complete sentence within the limit
    const truncated = cleanContent.substring(0, maxLength);
    const lastSentenceEnd = Math.max(truncated.lastIndexOf('।'), truncated.lastIndexOf('।'), truncated.lastIndexOf('!'));

    if (lastSentenceEnd > maxLength * 0.7) {
        return truncated.substring(0, lastSentenceEnd + 1);
    }

    // If no sentence end found, truncate at word boundary
    const lastSpace = truncated.lastIndexOf(' ');
    return truncated.substring(0, lastSpace) + '...';
};

export const generateKeywords = (title: string, content: string, category: string): string => {
    const commonKeywords = ['হরেকৃষ্ণ সমাচার', 'বাংলা সংবাদ', 'বাংলাদেশ', 'সংবাদ', 'খবর'];

    // Extract important words from title and content
    const titleWords = title.split(' ').filter((word) => word.length > 3);
    const categoryKeyword = category;

    const keywords = [...commonKeywords, categoryKeyword, ...titleWords.slice(0, 5)];

    return [...new Set(keywords)].join(', ');
};

export const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^\u0980-\u09FF\w\s-]/g, '') // Keep Bengali characters, letters, numbers, spaces, hyphens
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

export const calculateReadingTime = (content: string): string => {
    const wordsPerMinute = 200; // Average reading speed in Bengali
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} মিনিট`;
};

export const formatDateForSEO = (date: Date): string => {
    return date.toISOString();
};

export const generateCanonicalUrl = (path: string): string => {
    const baseUrl = 'https://hksamacar.com';
    return `${baseUrl}${path}`;
};

export const optimizeImageAlt = (title: string, category?: string): string => {
    const categoryText = category ? ` - ${category}` : '';
    return `${title}${categoryText} | হরেকৃষ্ণ সমাচার`;
};

// Social media sharing URLs
export const generateSocialShareUrls = (url: string, title: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    return {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
        telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    };
};

// Sitemap generation helper
export const generateSitemapEntry = (
    url: string,
    lastmod: Date,
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'daily',
    priority: number = 0.8,
) => {
    return {
        url,
        lastmod: lastmod.toISOString().split('T')[0],
        changefreq,
        priority,
    };
};

// Rich snippets helpers
export const generateBreadcrumbData = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'প্রচ্ছদ', url: 'https://hksamacar.com/' }];

    let currentPath = '';
    segments.forEach((segment) => {
        currentPath += `/${segment}`;
        const name = getBreadcrumbName(segment);
        breadcrumbs.push({
            name,
            url: `https://hksamacar.com${currentPath}`,
        });
    });

    return breadcrumbs;
};

const getBreadcrumbName = (segment: string): string => {
    const nameMap: { [key: string]: string } = {
        bangladesh: 'বাংলাদেশ',
        international: 'আন্তর্জাতিক',
        sports: 'খেলাধুলা',
        entertainment: 'বিনোদন',
        technology: 'প্রযুক্তি',
        books: 'বই',
        magazine: 'পত্রিকা',
        events: 'ইভেন্ট',
        about: 'আমাদের সম্পর্কে',
        contact: 'যোগাযোগ',
        'privacy-policy': 'গোপনীয়তা নীতি',
        'cookie-policy': 'কুকি নীতি',
        'usage-policy': 'ব্যবহারের নীতি',
        membership: 'সদস্যপদ',
        faq: 'FAQ',
    };

    return nameMap[segment] || segment;
};
