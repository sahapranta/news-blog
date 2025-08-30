import Sidebar from '@/components/Sidebar';
import HomeLayout from '@/layouts/home-layout';
import { Link } from '@inertiajs/react';
import { Book, Download, Eye, Filter, Search, Star } from 'lucide-react';
import React, { useState } from 'react';

const BooksPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('সব');
    const [sortBy, setSortBy] = useState('জনপ্রিয়তা');

    const categories = ['সব', 'উপন্যাস', 'কবিতা', 'গল্প', 'প্রবন্ধ', 'ইতিহাস', 'বিজ্ঞান', 'শিশুতোষ'];
    const sortOptions = ['জনপ্রিয়তা', 'নতুন প্রকাশিত', 'রেটিং', 'নাম অনুসারে'];

    const books = [
        {
            id: 1,
            title: 'পদ্মা নদীর মাঝি',
            author: 'মানিক বন্দ্যোপাধ্যায়',
            category: 'উপন্যাস',
            rating: 4.8,
            downloads: 15420,
            views: 45230,
            publishYear: 1936,
            pages: 280,
            description: 'বাংলা সাহিত্যের অন্যতম শ্রেষ্ঠ উপন্যাস। পদ্মা নদীর জেলে সমাজের জীবনযাত্রার বাস্তব চিত্র।',
            coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300',
            available: true,
        },
        {
            id: 2,
            title: 'গীতাঞ্জলি',
            author: 'রবীন্দ্রনাথ ঠাকুর',
            category: 'কবিতা',
            rating: 4.9,
            downloads: 28750,
            views: 67890,
            publishYear: 1910,
            pages: 156,
            description: 'নোবেল পুরস্কার বিজয়ী কাব্যগ্রন্থ। আধ্যাত্মিক ভাবনা ও প্রেমের অপূর্ব সমন্বয়।',
            coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300',
            available: true,
        },
        {
            id: 3,
            title: 'আরণ্যক',
            author: 'বিভূতিভূষণ বন্দ্যোপাধ্যায়',
            category: 'উপন্যাস',
            rating: 4.7,
            downloads: 12340,
            views: 34560,
            publishYear: 1939,
            pages: 320,
            description: 'বনজীবনের অভিজ্ঞতা নিয়ে লেখা অসাধারণ উপন্যাস। প্রকৃতি ও মানুষের সম্পর্কের গভীর বিশ্লেষণ।',
            coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300',
            available: true,
        },
        {
            id: 4,
            title: 'সেই সময়',
            author: 'সুনীল গঙ্গোপাধ্যায়',
            category: 'ইতিহাস',
            rating: 4.6,
            downloads: 9870,
            views: 23450,
            publishYear: 1981,
            pages: 450,
            description: 'ঊনবিংশ শতাব্দীর বাংলার সামাজিক ও রাজনৈতিক ইতিহাসের জীবন্ত চিত্র।',
            coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300',
            available: true,
        },
        {
            id: 5,
            title: 'হুমায়ূন আহমেদের গল্প সমগ্র',
            author: 'হুমায়ূন আহমেদ',
            category: 'গল্প',
            rating: 4.8,
            downloads: 22100,
            views: 56780,
            publishYear: 2000,
            pages: 680,
            description: 'বাংলা সাহিত্যের জনপ্রিয় লেখকের নির্বাচিত গল্পের সংকলন।',
            coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300',
            available: true,
        },
        {
            id: 6,
            title: 'বিজ্ঞানের অগ্রগতি',
            author: 'ড. জামিল চৌধুরী',
            category: 'বিজ্ঞান',
            rating: 4.5,
            downloads: 7650,
            views: 18900,
            publishYear: 2020,
            pages: 240,
            description: 'আধুনিক বিজ্ঞানের বিভিন্ন শাখার সহজ ব্যাখ্যা ও ভবিষ্যৎ সম্ভাবনা।',
            coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300',
            available: false,
        },
    ];

    const filteredBooks = books.filter((book) => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'সব' || book.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const sortedBooks = [...filteredBooks].sort((a, b) => {
        switch (sortBy) {
            case 'নতুন প্রকাশিত':
                return b.publishYear - a.publishYear;
            case 'রেটিং':
                return b.rating - a.rating;
            case 'নাম অনুসারে':
                return a.title.localeCompare(b.title);
            default: // জনপ্রিয়তা
                return b.downloads - a.downloads;
        }
    });

    return (
        <HomeLayout>
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="mb-6 border-b-4 border-red-600 pb-4 text-3xl font-bold text-gray-900">গ্রন্থ সংগ্রহ</h1>
                    <p className="text-lg text-gray-600">বাংলা সাহিত্যের শ্রেষ্ঠ বইগুলো পড়ুন এবং ডাউনলোড করুন</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <div className="lg:col-span-3">
                        {/* Search and Filters */}
                        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="বই বা লেখক খুঁজুন..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:ring-2 focus:ring-red-500 focus:!outline-0"
                                    />
                                </div>

                                <div className="relative">
                                    <Filter className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full appearance-none rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:ring-2 focus:ring-red-500 focus:!outline-0"
                                    >
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-red-500 focus:!outline-0"
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Books Grid */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {sortedBooks.map((book) => (
                                <div key={book.id} className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
                                    <div className="relative">
                                        <img src={book.coverUrl} alt={book.title} className="h-48 w-full object-cover" />
                                        <div className="absolute top-2 right-2">
                                            <span
                                                className={`rounded px-2 py-1 text-xs font-medium ${
                                                    book.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                                }`}
                                            >
                                                {book.available ? 'উপলব্ধ' : 'শীঘ্রই'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="rounded bg-red-100 px-2 py-1 text-xs text-red-600">{book.category}</span>
                                            <div className="flex items-center">
                                                <Star className="h-4 w-4 fill-current text-yellow-400" />
                                                <span className="ml-1 text-sm text-gray-600">{book.rating}</span>
                                            </div>
                                        </div>

                                        <h3 className="mb-1 line-clamp-2 font-semibold text-gray-900">{book.title}</h3>
                                        <p className="mb-2 text-sm text-gray-600">{book.author}</p>
                                        <p className="mb-3 line-clamp-2 text-xs text-gray-500">{book.description}</p>

                                        <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
                                            <span>{book.publishYear}</span>
                                            <span>{book.pages} পৃষ্ঠা</span>
                                        </div>

                                        <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
                                            <div className="flex items-center">
                                                <Download className="mr-1 h-3 w-3" />
                                                {book.downloads.toLocaleString()}
                                            </div>
                                            <div className="flex items-center">
                                                <Eye className="mr-1 h-3 w-3" />
                                                {book.views.toLocaleString()}
                                            </div>
                                        </div>

                                        <div className="flex space-x-2">
                                            <Link
                                                href={book.available ? `/book/${book.id}` : '#'}
                                                className={`flex-1 rounded px-3 py-2 text-center text-sm font-medium transition-colors ${
                                                    book.available
                                                        ? 'bg-red-600 text-white hover:bg-red-700'
                                                        : 'cursor-not-allowed bg-gray-300 text-gray-500'
                                                }`}
                                            >
                                                <Book className="mr-1 inline h-4 w-4" />
                                                পড়ুন
                                            </Link>
                                            <button
                                                className={`flex-1 rounded px-3 py-2 text-sm font-medium transition-colors ${
                                                    book.available
                                                        ? 'border border-red-600 text-red-600 hover:bg-red-50'
                                                        : 'cursor-not-allowed border border-gray-300 text-gray-500'
                                                }`}
                                                disabled={!book.available}
                                            >
                                                <Download className="mr-1 inline h-4 w-4" />
                                                ডাউনলোড
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Statistics */}
                        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">পরিসংখ্যান</h3>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">{books.length}</div>
                                    <div className="text-sm text-gray-600">মোট বই</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">
                                        {books.reduce((sum, book) => sum + book.downloads, 0).toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-600">মোট ডাউনলোড</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">
                                        {books.reduce((sum, book) => sum + book.views, 0).toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-600">মোট ভিউ</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">
                                        {(books.reduce((sum, book) => sum + book.rating, 0) / books.length).toFixed(1)}
                                    </div>
                                    <div className="text-sm text-gray-600">গড় রেটিং</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <Sidebar />
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
};

export default BooksPage;
