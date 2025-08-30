import Sidebar from '@/components/Sidebar';
import HomeLayout from '@/layouts/home-layout';
import { Award, BookOpen, Calendar, Camera, Clock, Download, Edit3, Eye, Heart, MapPin, Settings, TrendingUp, User } from 'lucide-react';
import React, { useState } from 'react';

const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo] = useState({
        name: 'মোহাম্মদ রহিম',
        email: 'rahim@example.com',
        phone: '+৮৮০ ১৭১৫ ৭৫৮৯৪৮',
        location: 'ঢাকা, বাংলাদেশ',
        joinDate: '২০২৩-০১-১৫',
        bio: 'সংবাদ পড়তে ভালোবাসি এবং বাংলা সাহিত্যের একজন অনুরাগী।',
    });

    const stats = {
        articlesRead: 1247,
        booksRead: 23,
        bookmarks: 156,
        downloads: 45,
        readingStreak: 15,
        totalReadingTime: '২৮৫ ঘন্টা',
    };

    const recentActivity = [
        {
            type: 'article',
            title: 'বাংলাদেশে নতুন অর্থনৈতিক সংস্কার কর্মসূচি ঘোষণা',
            time: '২ ঘন্টা আগে',
            category: 'অর্থনীতি',
        },
        {
            type: 'book',
            title: 'পদ্মা নদীর মাঝি',
            time: '১ দিন আগে',
            category: 'উপন্যাস',
        },
        {
            type: 'bookmark',
            title: 'আন্তর্জাতিক ক্রিকেট টুর্নামেন্টে বাংলাদেশ দল',
            time: '২ দিন আগে',
            category: 'খেলা',
        },
        {
            type: 'download',
            title: 'গীতাঞ্জলি',
            time: '৩ দিন আগে',
            category: 'কবিতা',
        },
    ];

    const favoriteCategories = [
        { title: 'অর্থনীতি', count: 45, percentage: 35 },
        { title: 'খেলা', count: 38, percentage: 30 },
        { title: 'প্রযুক্তি', count: 25, percentage: 20 },
        { title: 'বিনোদন', count: 19, percentage: 15 },
    ];

    const readingGoals = {
        monthly: { target: 50, current: 32 },
        yearly: { target: 500, current: 247 },
    };

    const achievements = [
        { title: 'নিয়মিত পাঠক', description: '১০০+ সংবাদ পড়েছেন', icon: BookOpen, earned: true },
        { title: 'বই প্রেমী', description: '২০+ বই পড়েছেন', icon: Heart, earned: true },
        { title: 'সংগ্রাহক', description: '১০০+ বুকমার্ক', icon: Award, earned: true },
        { title: 'অন্বেষণকারী', description: 'সব ক্যাটেগরি পড়েছেন', icon: TrendingUp, earned: false },
    ];

    const tabs = [
        { id: 'overview', label: 'সংক্ষিপ্ত বিবরণ', icon: User },
        { id: 'activity', label: 'কার্যকলাপ', icon: Clock },
        { id: 'books', label: 'বই সংগ্রহ', icon: BookOpen },
        { id: 'settings', label: 'সেটিংস', icon: Settings },
    ];

    return (
        <HomeLayout>
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <div className="lg:col-span-3">
                        {/* Profile Header */}
                        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-6">
                                    <div className="relative">
                                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-2xl font-bold text-white">
                                            {userInfo.name.charAt(0)}
                                        </div>
                                        <button className="absolute right-0 bottom-0 rounded-full bg-white p-2 shadow-md transition-shadow hover:shadow-lg">
                                            <Camera className="h-4 w-4 text-gray-600" />
                                        </button>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">{userInfo.name}</h1>
                                        <p className="mb-2 text-gray-600">{userInfo.bio}</p>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <span className="flex items-center">
                                                <Calendar className="mr-1 h-4 w-4" />
                                                যোগদান: {userInfo.joinDate}
                                            </span>
                                            <span className="flex items-center">
                                                <MapPin className="mr-1 h-4 w-4" />
                                                {userInfo.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="flex items-center space-x-2 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                                >
                                    <Edit3 className="h-4 w-4" />
                                    <span>প্রোফাইল সম্পাদনা</span>
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-6 md:grid-cols-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">{stats.articlesRead}</div>
                                    <div className="text-sm text-gray-600">সংবাদ পড়েছেন</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">{stats.booksRead}</div>
                                    <div className="text-sm text-gray-600">বই পড়েছেন</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">{stats.bookmarks}</div>
                                    <div className="text-sm text-gray-600">বুকমার্ক</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">{stats.downloads}</div>
                                    <div className="text-sm text-gray-600">ডাউনলোড</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">{stats.readingStreak}</div>
                                    <div className="text-sm text-gray-600">দিন ধারাবাহিক</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">{stats.totalReadingTime}</div>
                                    <div className="text-sm text-gray-600">পড়ার সময়</div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="mb-8 rounded-lg bg-white shadow-sm">
                            <div className="border-b">
                                <nav className="flex space-x-8 px-6 focus-visible:outline-0">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center space-x-2 border-b-2 py-4 text-sm font-medium !outline-red-300/30 transition-colors ${
                                                activeTab === tab.id
                                                    ? 'border-red-600 text-red-600'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                        >
                                            <tab.icon className="h-4 w-4" />
                                            <span>{tab.label}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="p-6">
                                {/* Overview Tab */}
                                {activeTab === 'overview' && (
                                    <div className="space-y-8">
                                        {/* Reading Goals */}
                                        <div>
                                            <h3 className="mb-4 text-lg font-semibold">পড়ার লক্ষ্য</h3>
                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                <div className="rounded-lg bg-gray-50 p-4">
                                                    <div className="mb-2 flex items-center justify-between">
                                                        <span className="font-medium">মাসিক লক্ষ্য</span>
                                                        <span className="text-sm text-gray-600">
                                                            {readingGoals.monthly.current}/{readingGoals.monthly.target}
                                                        </span>
                                                    </div>
                                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                                        <div
                                                            className="h-2 rounded-full bg-red-600"
                                                            style={{
                                                                width: `${(readingGoals.monthly.current / readingGoals.monthly.target) * 100}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div className="rounded-lg bg-gray-50 p-4">
                                                    <div className="mb-2 flex items-center justify-between">
                                                        <span className="font-medium">বার্ষিক লক্ষ্য</span>
                                                        <span className="text-sm text-gray-600">
                                                            {readingGoals.yearly.current}/{readingGoals.yearly.target}
                                                        </span>
                                                    </div>
                                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                                        <div
                                                            className="h-2 rounded-full bg-red-600"
                                                            style={{ width: `${(readingGoals.yearly.current / readingGoals.yearly.target) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Favorite Categories */}
                                        <div>
                                            <h3 className="mb-4 text-lg font-semibold">প্রিয় বিষয়</h3>
                                            <div className="space-y-3">
                                                {favoriteCategories.map((category, index) => (
                                                    <div key={index} className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-3">
                                                            <span className="font-medium">{category.title}</span>
                                                            <span className="text-sm text-gray-600">({category.count} সংবাদ)</span>
                                                        </div>
                                                        <div className="flex items-center space-x-3">
                                                            <div className="h-2 w-24 rounded-full bg-gray-200">
                                                                <div
                                                                    className="h-2 rounded-full bg-red-600"
                                                                    style={{ width: `${category.percentage}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="w-8 text-sm text-gray-600">{category.percentage}%</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Achievements */}
                                        <div>
                                            <h3 className="mb-4 text-lg font-semibold">অর্জন</h3>
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                {achievements.map((achievement, index) => (
                                                    <div
                                                        key={index}
                                                        className={`rounded-lg border-2 p-4 ${
                                                            achievement.earned ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                                                        }`}
                                                    >
                                                        <div className="flex items-center space-x-3">
                                                            <div
                                                                className={`rounded-full p-2 ${
                                                                    achievement.earned ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                                                                }`}
                                                            >
                                                                <achievement.icon className="h-5 w-5" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-medium">{achievement.title}</h4>
                                                                <p className="text-sm text-gray-600">{achievement.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Activity Tab */}
                                {activeTab === 'activity' && (
                                    <div>
                                        <h3 className="mb-4 text-lg font-semibold">সাম্প্রতিক কার্যকলাপ</h3>
                                        <div className="space-y-4">
                                            {recentActivity.map((activity, index) => (
                                                <div key={index} className="flex items-center space-x-4 rounded-lg bg-gray-50 p-4">
                                                    <div className="flex-shrink-0">
                                                        {activity.type === 'article' && <Eye className="h-5 w-5 text-blue-600" />}
                                                        {activity.type === 'book' && <BookOpen className="h-5 w-5 text-green-600" />}
                                                        {activity.type === 'bookmark' && <Heart className="h-5 w-5 text-red-600" />}
                                                        {activity.type === 'download' && <Download className="h-5 w-5 text-purple-600" />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium">{activity.title}</h4>
                                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                            <span>{activity.category}</span>
                                                            <span>•</span>
                                                            <span>{activity.time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Books Tab */}
                                {activeTab === 'books' && (
                                    <div>
                                        <h3 className="mb-4 text-lg font-semibold">আমার বই সংগ্রহ</h3>
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                            <div className="rounded-lg bg-gray-50 p-4 text-center">
                                                <BookOpen className="mx-auto mb-2 h-8 w-8 text-red-600" />
                                                <h4 className="font-medium">পড়া হয়েছে</h4>
                                                <p className="text-2xl font-bold text-red-600">{stats.booksRead}</p>
                                            </div>
                                            <div className="rounded-lg bg-gray-50 p-4 text-center">
                                                <Clock className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                                                <h4 className="font-medium">পড়ছি</h4>
                                                <p className="text-2xl font-bold text-blue-600">৩</p>
                                            </div>
                                            <div className="rounded-lg bg-gray-50 p-4 text-center">
                                                <Heart className="mx-auto mb-2 h-8 w-8 text-green-600" />
                                                <h4 className="font-medium">পড়তে চাই</h4>
                                                <p className="text-2xl font-bold text-green-600">১২</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Settings Tab */}
                                {activeTab === 'settings' && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="mb-4 text-lg font-semibold">ব্যক্তিগত তথ্য</h3>
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                    <label className="mb-1 block text-sm font-medium text-gray-700">নাম</label>
                                                    <input
                                                        type="text"
                                                        value={userInfo.name}
                                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-600 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="mb-1 block text-sm font-medium text-gray-700">ইমেইল</label>
                                                    <input
                                                        type="email"
                                                        value={userInfo.email}
                                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-600 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="mb-1 block text-sm font-medium text-gray-700">ফোন</label>
                                                    <input
                                                        type="tel"
                                                        value={userInfo.phone}
                                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-600 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="mb-1 block text-sm font-medium text-gray-700">ঠিকানা</label>
                                                    <input
                                                        type="text"
                                                        value={userInfo.location}
                                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-600 focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="mb-4 text-lg font-semibold">নোটিফিকেশন সেটিংস</h3>
                                            <div className="space-y-3">
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-red-600 focus:ring-red-600"
                                                        defaultChecked
                                                    />
                                                    <span className="ml-2">ব্রেকিং নিউজ</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-red-600 focus:ring-red-600"
                                                        defaultChecked
                                                    />
                                                    <span className="ml-2">দৈনিক নিউজলেটার</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-600" />
                                                    <span className="ml-2">নতুন বই প্রকাশ</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button className="rounded-lg bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700">
                                                পরিবর্তন সংরক্ষণ করুন
                                            </button>
                                        </div>
                                    </div>
                                )}
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

export default ProfilePage;
