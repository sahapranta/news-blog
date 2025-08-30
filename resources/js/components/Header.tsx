import React, { useState, useCallback, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Search, User, X } from 'lucide-react';
import SearchModal from './SearchModal';
// import LanguageSwitcher from './LanguageSwitcher';
import { type SharedData } from '@/types';
// import { ChevronsUpDown } from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';
import { isMac } from '@/lib/helpers';



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
      setIsSearchModalOpen(prev => !prev);
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
      <header className="bg-white/70 backdrop-filter backdrop-blur-lg shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="shrink-0">
                <Link href="/">
                  {/* <h1 className="text-2xl font-bold text-gray-900">
                    <span className="text-red-500">BBC</span> বাংলা
                  </h1> */}
                  <img src="/hksamacar-logo.webp" alt="Logo" className="h-9 mt-1 w-auto" />
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${isActive(item.path)
                    ? 'text-red-500 border-b-2 border-red-600'
                    : 'text-gray-700 hover:text-red-500'
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
                className="text-gray-700 hover:text-red-500 p-2 rounded-lg transition-colors cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* <LanguageSwitcher /> */}

              <Link
                href={auth.user ? "/profile" : "/login"}
                className="text-gray-700 hover:text-red-500 p-2 rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>

              <button
                className="lg:hidden text-gray-700 hover:text-red-500 p-2 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-gray-50 border-t">
            <nav className="px-4 py-2">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`py-2 text-sm font-medium transition-colors ${isActive(item.path)
                      ? 'text-red-500'
                      : 'text-gray-700 hover:text-red-500'
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

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
};

export default Header;