import HomeLayout from '@/layouts/home-layout';
import { Apple, ArrowRight, Bell, BookOpen, Download, Globe, Play, QrCode, Shield, Smartphone, Star, Wifi, Zap } from 'lucide-react';
import React, { useState } from 'react';

const AppDownloadPage: React.FC = () => {
    const [selectedPlatform, setSelectedPlatform] = useState<'android' | 'ios'>('android');

    const appStats = {
        downloads: '১০,০০,০০০+',
        rating: 4.8,
        reviews: '২৫,৪৫০',
        size: '১৫ MB',
        version: '২.৩.১',
        lastUpdate: '১৫ ডিসেম্বর ২০২৪',
    };

    const features = [
        {
            icon: Bell,
            title: 'তাৎক্ষণিক নোটিফিকেশন',
            description: 'ব্রেকিং নিউজ এবং গুরুত্বপূর্ণ সংবাদের জন্য তাৎক্ষণিক বিজ্ঞপ্তি পান',
        },
        {
            icon: Wifi,
            title: 'অফলাইন পড়ার সুবিধা',
            description: 'ইন্টারনেট ছাড়াই সংবাদ পড়ুন। আগে থেকে ডাউনলোড করে রাখুন',
        },
        {
            icon: BookOpen,
            title: 'বই ও পত্রিকা',
            description: 'বাংলা সাহিত্যের বই এবং মাসিক পত্রিকা পড়ুন মোবাইলে',
        },
        {
            icon: Zap,
            title: 'দ্রুত লোডিং',
            description: 'অপ্টিমাইজড ডিজাইনের কারণে দ্রুত লোড হয় এবং কম ডেটা খরচ',
        },
        {
            icon: Shield,
            title: 'নিরাপদ ও বিশ্বস্ত',
            description: 'আপনার ব্যক্তিগত তথ্য সুরক্ষিত এবং কোন অবাঞ্ছিত বিজ্ঞাপন নেই',
        },
        {
            icon: Globe,
            title: 'বহুভাষিক সাপোর্ট',
            description: 'বাংলা, ইংরেজি এবং অন্যান্য ভাষায় সংবাদ পড়ার সুবিধা',
        },
    ];

    const screenshots = [
        {
            url: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=300',
            title: 'হোম স্ক্রিন',
        },
        {
            url: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=300',
            title: 'সংবাদ পড়ার ইন্টারফেস',
        },
        {
            url: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=300',
            title: 'বই পড়ার পেজ',
        },
        {
            url: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=300',
            title: 'সেটিংস মেনু',
        },
    ];

    const systemRequirements = {
        android: {
            os: 'Android 6.0+',
            ram: '২ GB RAM',
            storage: '৫০ MB',
            processor: 'ARM64',
        },
        ios: {
            os: 'iOS 12.0+',
            ram: '২ GB RAM',
            storage: '৫০ MB',
            processor: 'A10 Bionic+',
        },
    };

    const reviews = [
        {
            name: 'আহমেদ হাসান',
            rating: 5,
            comment: 'খুবই ভালো অ্যাপ। সংবাদ পড়তে খুব সুবিধা হয়। অফলাইন ফিচার অসাধারণ।',
            date: '১০ ডিসেম্বর ২০২৪',
        },
        {
            name: 'ফাতেমা খাতুন',
            rating: 5,
            comment: 'বাংলা বই পড়ার জন্য দুর্দান্ত অ্যাপ। ইন্টারফেস খুব সুন্দর।',
            date: '৮ ডিসেম্বর ২০২৪',
        },
        {
            name: 'রফিকুল ইসলাম',
            rating: 4,
            comment: 'নোটিফিকেশন সিস্টেম খুব ভালো। সব সময় আপডেট থাকি।',
            date: '৫ ডিসেম্বর ২০২৪',
        },
    ];

    return (
        <HomeLayout hasSidebar>
            {/* Hero Section */}
            <div className="mb-8 rounded-lg bg-gradient-to-r from-red-600 to-red-700 p-8 text-white">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                    <div>
                        <h1 className="mb-4 text-3xl font-bold md:text-4xl">হরেকৃষ্ণ সমাচার মোবাইল অ্যাপ</h1>
                        <p className="mb-6 text-xl text-red-100">যেকোনো সময়, যেকোনো জায়গায় বিশ্বস্ত সংবাদ পড়ুন</p>
                        <div className="mb-6 flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                                <Star className="h-5 w-5 fill-current" />
                                <span className="font-semibold">{appStats.rating}</span>
                                <span className="text-red-100">({appStats.reviews} রিভিউ)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Download className="h-5 w-5" />
                                <span>{appStats.downloads} ডাউনলোড</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <a
                                href="#"
                                className="flex items-center justify-center rounded-lg bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800"
                            >
                                <Play className="mr-2 h-5 w-5" />
                                Google Play Store
                            </a>
                            <a
                                href="#"
                                className="flex items-center justify-center rounded-lg bg-white px-6 py-3 text-black transition-colors hover:bg-gray-100"
                            >
                                <Apple className="mr-2 h-5 w-5" />
                                App Store
                            </a>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="inline-block rounded-lg bg-white/20 p-6">
                            <QrCode className="mx-auto mb-4 h-32 w-32 text-white" />
                            <p className="text-red-100">QR কোড স্ক্যান করে ডাউনলোড করুন</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* App Stats */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">অ্যাপ তথ্য</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{appStats.downloads}</div>
                        <div className="text-sm text-gray-600">ডাউনলোড</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{appStats.rating}</div>
                        <div className="text-sm text-gray-600">রেটিং</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{appStats.reviews}</div>
                        <div className="text-sm text-gray-600">রিভিউ</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{appStats.size}</div>
                        <div className="text-sm text-gray-600">সাইজ</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{appStats.version}</div>
                        <div className="text-sm text-gray-600">ভার্সন</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">নতুন</div>
                        <div className="text-sm text-gray-600">আপডেট</div>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">বিশেষ ফিচারসমূহ</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-4">
                            <div className="rounded-lg bg-red-100 p-3">
                                <feature.icon className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="mb-2 font-semibold text-gray-900">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Screenshots */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">স্ক্রিনশট</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {screenshots.map((screenshot, index) => (
                        <div key={index} className="text-center">
                            <div className="mb-2 aspect-[9/16] overflow-hidden rounded-lg bg-gray-200">
                                <img src={screenshot.url} alt={screenshot.title} className="h-full w-full object-cover" />
                            </div>
                            <p className="text-sm text-gray-600">{screenshot.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* System Requirements */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">সিস্টেম প্রয়োজনীয়তা</h2>
                <div className="mb-6 flex space-x-4">
                    <button
                        onClick={() => setSelectedPlatform('android')}
                        className={`flex items-center space-x-2 rounded-lg px-4 py-2 transition-colors ${
                            selectedPlatform === 'android' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <Smartphone className="h-4 w-4" />
                        <span>Android</span>
                    </button>
                    <button
                        onClick={() => setSelectedPlatform('ios')}
                        className={`flex items-center space-x-2 rounded-lg px-4 py-2 transition-colors ${
                            selectedPlatform === 'ios' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <Apple className="h-4 w-4" />
                        <span>iOS</span>
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div>
                        <h4 className="mb-1 font-medium text-gray-900">অপারেটিং সিস্টেম</h4>
                        <p className="text-gray-600">{systemRequirements[selectedPlatform].os}</p>
                    </div>
                    <div>
                        <h4 className="mb-1 font-medium text-gray-900">RAM</h4>
                        <p className="text-gray-600">{systemRequirements[selectedPlatform].ram}</p>
                    </div>
                    <div>
                        <h4 className="mb-1 font-medium text-gray-900">স্টোরেজ</h4>
                        <p className="text-gray-600">{systemRequirements[selectedPlatform].storage}</p>
                    </div>
                    <div>
                        <h4 className="mb-1 font-medium text-gray-900">প্রসেসর</h4>
                        <p className="text-gray-600">{systemRequirements[selectedPlatform].processor}</p>
                    </div>
                </div>
            </div>

            {/* User Reviews */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">ব্যবহারকারীদের মতামত</h2>
                <div className="space-y-6">
                    {reviews.map((review, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                            <div className="mb-2 flex items-start justify-between">
                                <div>
                                    <h4 className="font-medium text-gray-900">{review.name}</h4>
                                    <div className="flex items-center space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < review.rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Download CTA */}
            <div className="rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-center text-white">
                <h2 className="mb-4 text-2xl font-bold">আজই ডাউনলোড করুন</h2>
                <p className="mb-6 text-gray-300">বিশ্বস্ত সংবাদ এবং বাংলা সাহিত্য আপনার হাতের মুঠোয়</p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <a
                        href="#"
                        className="flex items-center justify-center rounded-lg bg-red-600 px-8 py-4 text-white transition-colors hover:bg-red-700"
                    >
                        <Play className="mr-2 h-5 w-5" />
                        Google Play Store
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                    <a
                        href="#"
                        className="flex items-center justify-center rounded-lg bg-white px-8 py-4 text-black transition-colors hover:bg-gray-100"
                    >
                        <Apple className="mr-2 h-5 w-5" />
                        App Store
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                </div>
            </div>
        </HomeLayout>
    );
};

export default AppDownloadPage;
