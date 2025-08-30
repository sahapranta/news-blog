import React, { useState } from 'react';
import {
  User,
  Settings,
  BookOpen,
  Heart,
  Download,
  Eye,
  Calendar,  
  Edit3,
  Camera,  
  MapPin,
  Award,
  TrendingUp,
  Clock
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import HomeLayout from '@/layouts/home-layout';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo] = useState({
    name: 'মোহাম্মদ রহিম',
    email: 'rahim@example.com',
    phone: '+৮৮০ ১৭১৫ ৭৫৮৯৪৮',
    location: 'ঢাকা, বাংলাদেশ',
    joinDate: '২০২৩-০১-১৫',
    bio: 'সংবাদ পড়তে ভালোবাসি এবং বাংলা সাহিত্যের একজন অনুরাগী।'
  });

  const stats = {
    articlesRead: 1247,
    booksRead: 23,
    bookmarks: 156,
    downloads: 45,
    readingStreak: 15,
    totalReadingTime: '২৮৫ ঘন্টা'
  };

  const recentActivity = [
    {
      type: 'article',
      title: 'বাংলাদেশে নতুন অর্থনৈতিক সংস্কার কর্মসূচি ঘোষণা',
      time: '২ ঘন্টা আগে',
      category: 'অর্থনীতি'
    },
    {
      type: 'book',
      title: 'পদ্মা নদীর মাঝি',
      time: '১ দিন আগে',
      category: 'উপন্যাস'
    },
    {
      type: 'bookmark',
      title: 'আন্তর্জাতিক ক্রিকেট টুর্নামেন্টে বাংলাদেশ দল',
      time: '২ দিন আগে',
      category: 'খেলা'
    },
    {
      type: 'download',
      title: 'গীতাঞ্জলি',
      time: '৩ দিন আগে',
      category: 'কবিতা'
    }
  ];

  const favoriteCategories = [
    { title: 'অর্থনীতি', count: 45, percentage: 35 },
    { title: 'খেলা', count: 38, percentage: 30 },
    { title: 'প্রযুক্তি', count: 25, percentage: 20 },
    { title: 'বিনোদন', count: 19, percentage: 15 }
  ];

  const readingGoals = {
    monthly: { target: 50, current: 32 },
    yearly: { target: 500, current: 247 }
  };

  const achievements = [
    { title: 'নিয়মিত পাঠক', description: '১০০+ সংবাদ পড়েছেন', icon: BookOpen, earned: true },
    { title: 'বই প্রেমী', description: '২০+ বই পড়েছেন', icon: Heart, earned: true },
    { title: 'সংগ্রাহক', description: '১০০+ বুকমার্ক', icon: Award, earned: true },
    { title: 'অন্বেষণকারী', description: 'সব ক্যাটেগরি পড়েছেন', icon: TrendingUp, earned: false }
  ];

  const tabs = [
    { id: 'overview', label: 'সংক্ষিপ্ত বিবরণ', icon: User },
    { id: 'activity', label: 'কার্যকলাপ', icon: Clock },
    { id: 'books', label: 'বই সংগ্রহ', icon: BookOpen },
    { id: 'settings', label: 'সেটিংস', icon: Settings }
  ];

  return (
    <HomeLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {userInfo.name.charAt(0)}
                    </div>
                    <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
                      <Camera className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{userInfo.name}</h1>
                    <p className="text-gray-600 mb-2">{userInfo.bio}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        যোগদান: {userInfo.joinDate}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {userInfo.location}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>প্রোফাইল সম্পাদনা</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6 pt-6 border-t">
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
            <div className="bg-white rounded-lg shadow-sm mb-8">
              <div className="border-b">
                <nav className="flex space-x-8 px-6 focus-visible:outline-0">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors !outline-red-300/30 ${activeTab === tab.id
                          ? 'border-red-600 text-red-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      <tab.icon className="w-4 h-4" />
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
                      <h3 className="text-lg font-semibold mb-4">পড়ার লক্ষ্য</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">মাসিক লক্ষ্য</span>
                            <span className="text-sm text-gray-600">
                              {readingGoals.monthly.current}/{readingGoals.monthly.target}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-600 h-2 rounded-full"
                              style={{ width: `${(readingGoals.monthly.current / readingGoals.monthly.target) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">বার্ষিক লক্ষ্য</span>
                            <span className="text-sm text-gray-600">
                              {readingGoals.yearly.current}/{readingGoals.yearly.target}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-600 h-2 rounded-full"
                              style={{ width: `${(readingGoals.yearly.current / readingGoals.yearly.target) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Favorite Categories */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">প্রিয় বিষয়</h3>
                      <div className="space-y-3">
                        {favoriteCategories.map((category, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="font-medium">{category.title}</span>
                              <span className="text-sm text-gray-600">({category.count} সংবাদ)</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-red-600 h-2 rounded-full"
                                  style={{ width: `${category.percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 w-8">{category.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">অর্জন</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.map((achievement, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg border-2 ${achievement.earned
                                ? 'border-green-200 bg-green-50'
                                : 'border-gray-200 bg-gray-50'
                              }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-full ${achievement.earned ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                                }`}>
                                <achievement.icon className="w-5 h-5" />
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
                    <h3 className="text-lg font-semibold mb-4">সাম্প্রতিক কার্যকলাপ</h3>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0">
                            {activity.type === 'article' && <Eye className="w-5 h-5 text-blue-600" />}
                            {activity.type === 'book' && <BookOpen className="w-5 h-5 text-green-600" />}
                            {activity.type === 'bookmark' && <Heart className="w-5 h-5 text-red-600" />}
                            {activity.type === 'download' && <Download className="w-5 h-5 text-purple-600" />}
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
                    <h3 className="text-lg font-semibold mb-4">আমার বই সংগ্রহ</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <BookOpen className="w-8 h-8 text-red-600 mx-auto mb-2" />
                        <h4 className="font-medium">পড়া হয়েছে</h4>
                        <p className="text-2xl font-bold text-red-600">{stats.booksRead}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-medium">পড়ছি</h4>
                        <p className="text-2xl font-bold text-blue-600">৩</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
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
                      <h3 className="text-lg font-semibold mb-4">ব্যক্তিগত তথ্য</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
                          <input
                            type="text"
                            value={userInfo.name}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
                          <input
                            type="email"
                            value={userInfo.email}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">ফোন</label>
                          <input
                            type="tel"
                            value={userInfo.phone}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">ঠিকানা</label>
                          <input
                            type="text"
                            value={userInfo.location}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">নোটিফিকেশন সেটিংস</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-600" defaultChecked />
                          <span className="ml-2">ব্রেকিং নিউজ</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-600" defaultChecked />
                          <span className="ml-2">দৈনিক নিউজলেটার</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-600" />
                          <span className="ml-2">নতুন বই প্রকাশ</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
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