import React, { useState } from 'react';
import {
  Smartphone,
  Download,
  Star,
  Shield,
  Zap,
  Bell,
  BookOpen,
  Play,
  Apple,
  QrCode,
  ArrowRight,
  Globe,
  Wifi,
} from 'lucide-react';
import HomeLayout from '@/layouts/home-layout';

const AppDownloadPage: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<'android' | 'ios'>('android');

  const appStats = {
    downloads: '১০,০০,০০০+',
    rating: 4.8,
    reviews: '২৫,৪৫০',
    size: '১৫ MB',
    version: '২.৩.১',
    lastUpdate: '১৫ ডিসেম্বর ২০২৪'
  };

  const features = [
    {
      icon: Bell,
      title: 'তাৎক্ষণিক নোটিফিকেশন',
      description: 'ব্রেকিং নিউজ এবং গুরুত্বপূর্ণ সংবাদের জন্য তাৎক্ষণিক বিজ্ঞপ্তি পান'
    },
    {
      icon: Wifi,
      title: 'অফলাইন পড়ার সুবিধা',
      description: 'ইন্টারনেট ছাড়াই সংবাদ পড়ুন। আগে থেকে ডাউনলোড করে রাখুন'
    },
    {
      icon: BookOpen,
      title: 'বই ও পত্রিকা',
      description: 'বাংলা সাহিত্যের বই এবং মাসিক পত্রিকা পড়ুন মোবাইলে'
    },
    {
      icon: Zap,
      title: 'দ্রুত লোডিং',
      description: 'অপ্টিমাইজড ডিজাইনের কারণে দ্রুত লোড হয় এবং কম ডেটা খরচ'
    },
    {
      icon: Shield,
      title: 'নিরাপদ ও বিশ্বস্ত',
      description: 'আপনার ব্যক্তিগত তথ্য সুরক্ষিত এবং কোন অবাঞ্ছিত বিজ্ঞাপন নেই'
    },
    {
      icon: Globe,
      title: 'বহুভাষিক সাপোর্ট',
      description: 'বাংলা, ইংরেজি এবং অন্যান্য ভাষায় সংবাদ পড়ার সুবিধা'
    }
  ];

  const screenshots = [
    {
      url: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=300",
      title: "হোম স্ক্রিন"
    },
    {
      url: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=300",
      title: "সংবাদ পড়ার ইন্টারফেস"
    },
    {
      url: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=300",
      title: "বই পড়ার পেজ"
    },
    {
      url: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=300",
      title: "সেটিংস মেনু"
    }
  ];

  const systemRequirements = {
    android: {
      os: 'Android 6.0+',
      ram: '২ GB RAM',
      storage: '৫০ MB',
      processor: 'ARM64'
    },
    ios: {
      os: 'iOS 12.0+',
      ram: '২ GB RAM',
      storage: '৫০ MB',
      processor: 'A10 Bionic+'
    }
  };

  const reviews = [
    {
      name: 'আহমেদ হাসান',
      rating: 5,
      comment: 'খুবই ভালো অ্যাপ। সংবাদ পড়তে খুব সুবিধা হয়। অফলাইন ফিচার অসাধারণ।',
      date: '১০ ডিসেম্বর ২০২৪'
    },
    {
      name: 'ফাতেমা খাতুন',
      rating: 5,
      comment: 'বাংলা বই পড়ার জন্য দুর্দান্ত অ্যাপ। ইন্টারফেস খুব সুন্দর।',
      date: '৮ ডিসেম্বর ২০২৪'
    },
    {
      name: 'রফিকুল ইসলাম',
      rating: 4,
      comment: 'নোটিফিকেশন সিস্টেম খুব ভালো। সব সময় আপডেট থাকি।',
      date: '৫ ডিসেম্বর ২০২৪'
    }
  ];

  return (
    <HomeLayout hasSidebar>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 mb-8 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              হরেকৃষ্ণ সমাচার মোবাইল অ্যাপ
            </h1>
            <p className="text-xl text-red-100 mb-6">
              যেকোনো সময়, যেকোনো জায়গায় বিশ্বস্ত সংবাদ পড়ুন
            </p>
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-semibold">{appStats.rating}</span>
                <span className="text-red-100">({appStats.reviews} রিভিউ)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>{appStats.downloads} ডাউনলোড</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Play className="w-5 h-5 mr-2" />
                Google Play Store
              </a>
              <a
                href="#"
                className="flex items-center justify-center bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Apple className="w-5 h-5 mr-2" />
                App Store
              </a>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/20 rounded-lg p-6 inline-block">
              <QrCode className="w-32 h-32 text-white mx-auto mb-4" />
              <p className="text-red-100">QR কোড স্ক্যান করে ডাউনলোড করুন</p>
            </div>
          </div>
        </div>
      </div>

      {/* App Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">অ্যাপ তথ্য</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
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
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">বিশেষ ফিচারসমূহ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <feature.icon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Screenshots */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">স্ক্রিনশট</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {screenshots.map((screenshot, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-200 rounded-lg aspect-[9/16] mb-2 overflow-hidden">
                <img
                  src={screenshot.url}
                  alt={screenshot.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600">{screenshot.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* System Requirements */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">সিস্টেম প্রয়োজনীয়তা</h2>
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setSelectedPlatform('android')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${selectedPlatform === 'android'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Android</span>
          </button>
          <button
            onClick={() => setSelectedPlatform('ios')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${selectedPlatform === 'ios'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            <Apple className="w-4 h-4" />
            <span>iOS</span>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">অপারেটিং সিস্টেম</h4>
            <p className="text-gray-600">{systemRequirements[selectedPlatform].os}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">RAM</h4>
            <p className="text-gray-600">{systemRequirements[selectedPlatform].ram}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">স্টোরেজ</h4>
            <p className="text-gray-600">{systemRequirements[selectedPlatform].storage}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">প্রসেসর</h4>
            <p className="text-gray-600">{systemRequirements[selectedPlatform].processor}</p>
          </div>
        </div>
      </div>

      {/* User Reviews */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">ব্যবহারকারীদের মতামত</h2>
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{review.name}</h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
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
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">আজই ডাউনলোড করুন</h2>
        <p className="text-gray-300 mb-6">
          বিশ্বস্ত সংবাদ এবং বাংলা সাহিত্য আপনার হাতের মুঠোয়
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="flex items-center justify-center bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Play className="w-5 h-5 mr-2" />
            Google Play Store
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
          <a
            href="#"
            className="flex items-center justify-center bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Apple className="w-5 h-5 mr-2" />
            App Store
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AppDownloadPage;