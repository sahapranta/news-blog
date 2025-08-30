import Sidebar from '@/components/Sidebar';
import HomeLayoutTemplate from '@/layouts/home/home-header-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface HomeLayoutProps {
    children: ReactNode;
    heading?: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    hasSidebar?: boolean;
}

export default ({ children, heading, hasSidebar = false, ...props }: HomeLayoutProps) => (
    <HomeLayoutTemplate {...props}>
        {hasSidebar ? (
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {heading && heading}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <div className="lg:col-span-3">{children}</div>
                    <div className="lg:col-span-1">
                        <Sidebar />
                    </div>
                </div>
            </main>
        ) : (
            children
        )}
    </HomeLayoutTemplate>
);
