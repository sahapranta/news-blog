import { Head } from '@inertiajs/react';
import React from 'react';

interface ArticleStructuredDataProps {
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified?: string;
    author: string;
    category: string;
    url: string;
    wordCount?: number;
    readingTime?: string;
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbStructuredDataProps {
    items: BreadcrumbItem[];
}

interface OrganizationStructuredDataProps {
    name?: string;
    url?: string;
    logo?: string;
    description?: string;
}

export const ArticleStructuredData: React.FC<ArticleStructuredDataProps> = ({
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author,
    category,
    url,
    wordCount,
    readingTime,
}) => {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: headline,
        description: description,
        image: {
            '@type': 'ImageObject',
            url: image,
            width: 800,
            height: 600,
        },
        datePublished: datePublished,
        dateModified: dateModified || datePublished,
        author: {
            '@type': 'Person',
            name: author,
            url: 'https://hksamacar.com/authors/' + author.toLowerCase().replace(/\s+/g, '-'),
        },
        publisher: {
            '@type': 'NewsMediaOrganization',
            name: 'মাসিক হরেকৃষ্ণ সমাচার',
            logo: {
                '@type': 'ImageObject',
                url: 'https://hksamacar.com/logo.png',
                width: 200,
                height: 60,
            },
            url: 'https://hksamacar.com',
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
        articleSection: category,
        inLanguage: 'bn-BD',
        isAccessibleForFree: true,
        ...(wordCount && { wordCount: wordCount }),
        ...(readingTime && { timeRequired: readingTime }),
    };

    return (
        <Head>
            <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Head>
    );
};

export const BreadcrumbStructuredData: React.FC<BreadcrumbStructuredDataProps> = ({ items }) => {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <Head>
            <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Head>
    );
};

export const OrganizationStructuredData: React.FC<OrganizationStructuredDataProps> = ({
    name = 'মাসিক হরেকৃষ্ণ সমাচার',
    url = 'https://hksamacar.com',
    logo = 'https://hksamacar.com/logo.png',
    description = 'মাসিক হরেকৃষ্ণ সমাচার - বিশ্বস্ত সংবাদ, সৎ মতামত এবং নিরপেক্ষ বিশ্লেষণের জন্য আপনার নির্ভরযোগ্য উৎস',
}) => {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'NewsMediaOrganization',
        name: name,
        url: url,
        logo: {
            '@type': 'ImageObject',
            url: logo,
            width: 200,
            height: 60,
        },
        description: description,
        foundingDate: '2008',
        sameAs: [
            'https://www.facebook.com/hksamacar',
            'https://twitter.com/hksamacar',
            'https://www.youtube.com/hksamacar',
            'https://www.instagram.com/hksamacar',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+880-1717-758948',
            contactType: 'customer service',
            email: 'info@hksamacar.com',
            availableLanguage: ['Bengali', 'English'],
        },
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'BD',
            addressLocality: '79 Swamibag, Dhaka',
            addressRegion: 'Dhaka Division',
        },
    };

    return (
        <Head>
            <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Head>
    );
};

export const FAQStructuredData: React.FC<{ faqs: Array<{ question: string; answer: string }> }> = ({ faqs }) => {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <Head>
            <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Head>
    );
};
