import Sidebar from '@/components/Sidebar';
import HomeLayoutTemplate from '@/layouts/home/home-header-layout';
import { type BreadcrumbItem } from '@/types';
import { JSX, type ReactNode } from 'react';

interface HomeLayoutProps {
    children: ReactNode;
    heading?: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    hasSidebar?: boolean;
}

export default ({ children, breadcrumbs, heading, hasSidebar = false, ...props }: HomeLayoutProps) => (
    <HomeLayoutTemplate {...props}>
        {hasSidebar ?
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {heading && heading}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                        {children}
                    </div>
                    <div className="lg:col-span-1">
                        <Sidebar />
                    </div>
                </div>
            </main>
            :
            children
        }
    </HomeLayoutTemplate>
);
