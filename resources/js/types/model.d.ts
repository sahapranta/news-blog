// import exp from "constants";

export interface CategoryProps {
    title: string;
    slug?: string;
    description?: string;
}

export interface ArticleProps {
    id: string;
    title: string;
    subtitle?: string;
    slug: string;
    content: string;
    content_html?: string;
    readingTime: string;
    excerpt: string;
    image_url: string;
    time: string;
    views?: string;
    category: CategoryProps;
    author?: AuthorProps;
    tags?: string[];
    created_at?: string;
    updated_at?: string;
}

// interface ArticleProps {
//     id: string;
//     title: string;
//     slug: string;
//     content: string;
//     readingTime: string;
//     excerpt: string;
//     image_url: "https://www.bssnews.net/bangla/assets/news_photos/2024/07/06/image-144355-1720256355.jpg";
//     time: string;
//     views?: string;
// };

export interface AuthorProps {
    name: string;
    username: string;
}

type FeaturedNewsProps = Omit<ArticleProps, 'content'>;

export interface QuotationProps {
    author: string;
    body: string;
    source: string;
    title: string;
    type: 'blue' | 'yellow' | 'white' | 'red' | 'green';
    is_active: boolean;
}

export interface TopAdProps {
    title: string;
    description: string;
    link_title: string;
    url: string;
    active: boolean;
    dismissible: boolean;
    image: string;
}

export interface VerticalAdProps {
    title: string;
    url: string;
    target: '_self' | '_blank' | '_parent' | '_top';
    active: boolean;
    image: string;
}

export interface HorizontalAdProps {
    title: string;
    url: string;
    index: number;
    position: 'before' | 'after';
    active: boolean;
    image: string;
}

export interface AdsProps {
    horizontal_ads: HorizontalAdProps[];
    vertical_ads: VerticalAdProps;
    top_ads: TopAdProps;
}

export interface MediaProps {
    name: string;
    order: number;
    url: string;
}

export interface PaperProps {
    id: string;
    title: string;
    slug: string;
    description: string;
    version: string;
    pdf_url: string;
    thumbnail: string;
    created_at: string;
    updated_at: string;
    download_count: number;
    media?: MediaProps[];
}

interface ApiError {
    message?: string;
    response?: {
        status?: number;
        data?: {
            message?: string;
        };
    };
}
