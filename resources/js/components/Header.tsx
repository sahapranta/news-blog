import { Link, usePage } from '@inertiajs/react';
import { Menu, Search, User, X } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import SearchModal from './SearchModal';
// import LanguageSwitcher from './LanguageSwitcher';
import { type SharedData } from '@/types';
// import { ChevronsUpDown } from 'lucide-react';
import { isMac } from '@/lib/helpers';
import { useTranslation } from '@/lib/useTranslation';

const Header: React.FC = () => {
    const { auth } = usePage<SharedData>().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const { url } = usePage();
    const { t } = useTranslation();
    const isActive = (path: string) => {
        return url === path;
    };

    const navItems = [
        { path: '/', label: t('home') },
        { path: '/bangladesh', label: t('bangladesh') },
        { path: '/international', label: t('international') },
        { path: '/paper', label: t('paper') },
        { path: route('festival.index'), label: t('events') },
        { path: '/books', label: t('books') },
    ];

    const toggleSearchModal = useCallback((e: KeyboardEvent) => {
        const isK = e.key?.toLowerCase() === 'k';
        const isCmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

        if (isK && isCmdOrCtrl) {
            e.preventDefault(); // prevent default browser action
            setIsSearchModalOpen((prev) => !prev);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', toggleSearchModal);
        return () => {
            document.removeEventListener('keydown', toggleSearchModal);
        };
    }, [toggleSearchModal]);

    return (
        <>
            <header className="sticky top-0 z-50 bg-white/70 shadow backdrop-blur-lg backdrop-filter">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="shrink-0">
                                <Link href="/">
                                    {/* <h1 className="text-2xl font-bold text-gray-900">
                    <span className="text-red-500">BBC</span> বাংলা
                  </h1> */}
                                    <img src="/hksamacar-logo.webp" alt="Logo" className="mt-1 h-9 w-auto" />
                                </Link>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden space-x-6 lg:flex">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                                        isActive(item.path) ? 'border-b-2 border-red-600 text-red-500' : 'text-gray-700 hover:text-red-500'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Right side icons */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setIsSearchModalOpen(true)}
                                className="cursor-pointer rounded-lg p-2 text-gray-700 transition-colors hover:text-red-500"
                            >
                                <Search className="h-5 w-5" />
                            </button>

                            {/* <LanguageSwitcher /> */}

                            <Link
                                href={auth.user ? '/profile' : '/login'}
                                className="rounded-lg p-2 text-gray-700 transition-colors hover:text-red-500"
                            >
                                <User className="h-5 w-5" />
                            </Link>

                            <button
                                className="cursor-pointer p-2 text-gray-700 hover:text-red-500 lg:hidden"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="border-t bg-gray-50 lg:hidden">
                        <nav className="px-4 py-2">
                            <div className="flex flex-col space-y-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`py-2 text-sm font-medium transition-colors ${
                                            isActive(item.path) ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </nav>
                    </div>
                )}
            </header>

            <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
        </>
    );
};

export default Header;
