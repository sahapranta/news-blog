import React from 'react';
import { Head } from '@inertiajs/react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  canonical?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "মাসিক হরেকৃষ্ণ সমাচার - বিশ্বস্ত সংবাদ, সৎ মতামত এবং নিরপেক্ষ বিশ্লেষণ",
  description = "মাসিক হরেকৃষ্ণ সমাচার থেকে পান সর্বশেষ বাংলাদেশ ও আন্তর্জাতিক সংবাদ, খেলাধুলা, বিনোদন, প্রযুক্তি এবং বিশ্লেষণধর্মী প্রতিবেদন। বিশ্বস্ত সাংবাদিকতার জন্য আমাদের সাথে থাকুন।",
  keywords = "হরেকৃষ্ণ সমাচার, বাংলা সংবাদ, বাংলাদেশ সংবাদ, আন্তর্জাতিক সংবাদ, খেলাধুলা, বিনোদন, প্রযুক্তি",
  image = "https://hksamacar.com/og-image.jpg",
  url = "https://hksamacar.com/",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "হরেকৃষ্ণ সমাচার",
  section,
  tags = [],
  noindex = false,
  canonical
}) => {
  const fullTitle = title.includes('মাসিক হরেকৃষ্ণ সমাচার') ? title : `${title} | মাসিক হরেকৃষ্ণ সমাচার`;
  const currentUrl = canonical || url;

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="মাসিক হরেকৃষ্ণ সমাচার" />
      <meta property="og:locale" content="bn_BD" />
      
      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@hksamacar" />
      <meta name="twitter:creator" content="@hksamacar" />
      
      {/* Additional Meta Tags */}
      <meta name="language" content="Bengali" />
      <meta name="geo.region" content="BD" />
      <meta name="geo.country" content="Bangladesh" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
    </>
  );
};

export default SEOHead;