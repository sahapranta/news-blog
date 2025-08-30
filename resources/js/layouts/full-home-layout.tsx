import HomeLayoutTemplate from '@/layouts/home/home-header-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface HomeLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, ...props }: HomeLayoutProps) => (
    <HomeLayoutTemplate {...props}>
        {children}
    </HomeLayoutTemplate>
);
