import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    Settings,
    Bookmark,
    Share2,
    Download,
    Sun,
    Moon,
    Minus,
    Plus,
    Menu
} from 'lucide-react';
import FullHomeLayout from '@/layouts/full-home-layout';

type BookInterface = {
    id: number;
    title: string;
    author: string;
    totalPages: number;
    chapters: { id: number; title: string; startPage: number }[];
    content: { [key: number]: string };
};

const BookReaderPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [fontSize, setFontSize] = useState(16);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showTableOfContents, setShowTableOfContents] = useState(false);
    const [bookmarks, setBookmarks] = useState<number[]>([]);

    // Mock book data
    const book: BookInterface = {
        id: 1,
        title: "পদ্মা নদীর মাঝি",
        author: "মানিক বন্দ্যোপাধ্যায়",
        totalPages: 280,
        chapters: [
            { id: 1, title: "প্রথম অধ্যায়", startPage: 1 },
            { id: 2, title: "দ্বিতীয় অধ্যায়", startPage: 15 },
            { id: 3, title: "তৃতীয় অধ্যায়", startPage: 32 },
            { id: 4, title: "চতুর্থ অধ্যায়", startPage: 48 },
            { id: 5, title: "পঞ্চম অধ্যায়", startPage: 65 },
        ],
        content: {
            1: `
        <h2>প্রথম অধ্যায়</h2>
        <p>পদ্মার ঢেউ আছড়ে পড়ছে তীরে। কুবের মাঝি তার নৌকা নিয়ে বসে আছে ঘাটে। আজ যেন মাছ ধরার মন নেই তার। মনটা কেমন যেন অস্থির লাগছে।</p>
        
        <p>পদ্মার জল আজ কেমন যেন ঘোলা। সকাল থেকেই আকাশে মেঘের ঘনঘটা। বর্ষার শুরু হয়ে গেছে। এই সময়ে মাছ ধরা কঠিন হয়ে পড়ে।</p>
        
        <p>কুবের মাঝির বয়স পঞ্চাশের কাছাকাছি। সারাজীবন এই পদ্মার বুকেই কেটেছে তার। ছোটবেলা থেকেই বাবার সাথে নৌকায় উঠত। এখন নিজেই একজন অভিজ্ঞ মাঝি।</p>
        
        <p>গ্রামের মানুষেরা তাকে খুব শ্রদ্ধা করে। তার নৌকায় চড়ে অনেকেই নদী পার হয়। কুবের মাঝি কখনো কারো থেকে বেশি ভাড়া নেয় না।</p>
        
        <p>আজ সকালে তার স্ত্রী কপিলা বলেছিল, "আজ নদীতে যেও না। মন ভালো লাগছে না।" কিন্তু কুবের মাঝি শুনেনি। এই নদীই তো তার জীবন।</p>
      `
        }
    };

    const toggleBookmark = () => {
        setBookmarks(prev =>
            prev.includes(currentPage)
                ? prev.filter(p => p !== currentPage)
                : [...prev, currentPage]
        );
    };

    const nextPage = () => {
        if (currentPage < book.totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const goToChapter = (startPage: number) => {
        setCurrentPage(startPage);
        setShowTableOfContents(false);
    };

    const progress = (currentPage / book.totalPages) * 100;

    return (
        <FullHomeLayout>
            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                {/* Header */}
                <header className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border-b`}>
                    <div className="max-w-4xl mx-auto px-4 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/books"
                                    className={`p-2 rounded-lg hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors`}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </Link>
                                <div>
                                    <h1 className="font-semibold text-lg">{book.title}</h1>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {book.author} • পৃষ্ঠা {currentPage} / {book.totalPages}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setShowTableOfContents(!showTableOfContents)}
                                    className={`p-2 rounded-lg hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors`}
                                >
                                    <Menu className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={toggleBookmark}
                                    className={`p-2 rounded-lg transition-colors ${bookmarks.includes(currentPage)
                                        ? 'text-red-600 bg-red-50'
                                        : `hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`
                                        }`}
                                >
                                    <Bookmark className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setShowSettings(!showSettings)}
                                    className={`p-2 rounded-lg hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors`}
                                >
                                    <Settings className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className={`mt-3 w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-1`}>
                            <div
                                className="bg-red-600 h-1 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </header>

                <div className="flex">
                    {/* Table of Contents Sidebar */}
                    {showTableOfContents && (
                        <div className={`w-80 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} border-r min-h-screen p-6`}>
                            <h3 className="text-lg font-semibold mb-4">সূচিপত্র</h3>
                            <div className="space-y-2">
                                {book.chapters.map((chapter) => (
                                    <button
                                        key={chapter.id}
                                        onClick={() => goToChapter(chapter.startPage)}
                                        className={`w-full text-left p-3 rounded-lg transition-colors ${currentPage >= chapter.startPage
                                            ? 'bg-red-100 text-red-600'
                                            : `hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`
                                            }`}
                                    >
                                        <div className="font-medium">{chapter.title}</div>
                                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            পৃষ্ঠা {chapter.startPage}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {bookmarks.length > 0 && (
                                <div className="mt-8">
                                    <h4 className="font-semibold mb-3">বুকমার্ক</h4>
                                    <div className="space-y-2">
                                        {bookmarks.map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`w-full text-left p-2 rounded-lg hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors`}
                                            >
                                                পৃষ্ঠা {page}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Settings Panel */}
                    {showSettings && (
                        <div className={`fixed right-0 top-16 w-80 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-l shadow-lg z-40 p-6`}>
                            <h3 className="text-lg font-semibold mb-4">পড়ার সেটিংস</h3>

                            <div className="space-y-6">
                                {/* Theme Toggle */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">থিম</label>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setIsDarkMode(false)}
                                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${!isDarkMode ? 'bg-red-100 text-red-600' : `hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`
                                                }`}
                                        >
                                            <Sun className="w-4 h-4" />
                                            <span>হালকা</span>
                                        </button>
                                        <button
                                            onClick={() => setIsDarkMode(true)}
                                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isDarkMode ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            <Moon className="w-4 h-4" />
                                            <span>গাঢ়</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Font Size */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">ফন্ট সাইজ</label>
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => setFontSize(prev => Math.max(12, prev - 2))}
                                            className={`p-2 rounded-lg hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="text-sm w-12 text-center">{fontSize}px</span>
                                        <button
                                            onClick={() => setFontSize(prev => Math.min(24, prev + 2))}
                                            className={`p-2 rounded-lg hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="space-y-3">
                                    <button className={`w-full flex items-center space-x-2 p-3 rounded-lg hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors`}>
                                        <Download className="w-4 h-4" />
                                        <span>ডাউনলোড করুন</span>
                                    </button>
                                    <button className={`w-full flex items-center space-x-2 p-3 rounded-lg hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors`}>
                                        <Share2 className="w-4 h-4" />
                                        <span>শেয়ার করুন</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="max-w-4xl mx-auto px-6 py-8">
                            <div
                                className="prose prose-lg max-w-none leading-relaxed"
                                style={{ fontSize: `${fontSize}px` }}
                                dangerouslySetInnerHTML={{ __html: book.content[currentPage] || '<p>পৃষ্ঠা লোড হচ্ছে...</p>' }}
                            />
                        </div>

                        {/* Navigation */}
                        <div className={`fixed bottom-0 left-0 right-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-t p-4`}>
                            <div className="max-w-4xl mx-auto flex items-center justify-between">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${currentPage === 1
                                        ? 'opacity-50 cursor-not-allowed'
                                        : `hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`
                                        }`}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    <span>পূর্ববর্তী</span>
                                </button>

                                <div className="flex items-center space-x-4">
                                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        পৃষ্ঠা {currentPage} / {book.totalPages}
                                    </span>
                                    <input
                                        type="range"
                                        min="1"
                                        max={book.totalPages}
                                        value={currentPage}
                                        onChange={(e) => setCurrentPage(parseInt(e.target.value))}
                                        className="w-32"
                                    />
                                </div>

                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === book.totalPages}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${currentPage === book.totalPages
                                        ? 'opacity-50 cursor-not-allowed'
                                        : `hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`
                                        }`}
                                >
                                    <span>পরবর্তী</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FullHomeLayout>
    );
};

export default BookReaderPage;