import React, { useState } from 'react';
import { Cookie, Settings, Shield, Eye, Globe, Calendar } from 'lucide-react';
import HomeLayout from '@/layouts/home-layout';

const CookiePolicyPage: React.FC = () => {
  const [cookieSettings, setCookieSettings] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    preferences: true
  });

  const lastUpdated = '১৫ ডিসেম্বর ২০২৪';

  const cookieTypes = [
    {
      name: 'প্রয়োজনীয় কুকিজ',
      key: 'essential',
      description: 'ওয়েবসাইটের মূল কার্যকারিতার জন্য অপরিহার্য',
      examples: ['লগইন স্ট্যাটাস', 'ভাষা পছন্দ', 'নিরাপত্তা টোকেন'],
      required: true
    },
    {
      name: 'বিশ্লেষণ কুকিজ',
      key: 'analytics',
      description: 'ওয়েবসাইট ব্যবহারের পরিসংখ্যান সংগ্রহ করে',
      examples: ['Google Analytics', 'পেজ ভিউ ট্র্যাকিং', 'ব্যবহারকারীর আচরণ'],
      required: false
    },
    {
      name: 'মার্কেটিং কুকিজ',
      key: 'marketing',
      description: 'ব্যক্তিগতকৃত বিজ্ঞাপন প্রদর্শনের জন্য',
      examples: ['বিজ্ঞাপন ট্র্যাকিং', 'সোশ্যাল মিডিয়া', 'তৃতীয় পক্ষের বিজ্ঞাপন'],
      required: false
    },
    {
      name: 'পছন্দের কুকিজ',
      key: 'preferences',
      description: 'আপনার পছন্দ ও সেটিংস সংরক্ষণ করে',
      examples: ['থিম পছন্দ', 'ফন্ট সাইজ', 'লেআউট সেটিংস'],
      required: false
    }
  ];

  const handleCookieToggle = (key: string) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled
    setCookieSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const saveSettings = () => {
    // Save cookie preferences
    localStorage.setItem('cookiePreferences', JSON.stringify(cookieSettings));
    alert('কুকি সেটিংস সংরক্ষিত হয়েছে');
  };

  return (
    <HomeLayout hasSidebar>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Cookie className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-bold text-gray-900">কুকি নীতি</h1>
        </div>
        <p className="text-gray-600 text-lg mb-4">
          হরেকৃষ্ণ সমাচার কীভাবে কুকিজ ব্যবহার করে এবং আপনি কীভাবে সেগুলো নিয়ন্ত্রণ করতে পারেন তা জানুন।
        </p>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>সর্বশেষ আপডেট: {lastUpdated}</span>
        </div>
      </div>

      {/* What are Cookies */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">কুকিজ কী?</h2>
        <div className="space-y-4 text-gray-600">
          <p>
            কুকিজ হলো ছোট টেক্সট ফাইল যা আপনার ডিভাইসে (কম্পিউটার, ট্যাবলেট বা মোবাইল) সংরক্ষিত হয় যখন আপনি আমাদের ওয়েবসাইট ভিজিট করেন। এগুলো ওয়েবসাইটকে আপনার ডিভাইস চিনতে এবং আপনার পছন্দ মনে রাখতে সাহায্য করে।
          </p>
          <p>
            কুকিজ আপনার ব্রাউজিং অভিজ্ঞতা উন্নত করে, ওয়েবসাইটের কার্যকারিতা বৃদ্ধি করে এবং আমাদের সেবার মান উন্নতিতে সহায়তা করে।
          </p>
        </div>
      </div>

      {/* Cookie Types */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">কুকিজের ধরন</h2>
        <div className="space-y-6">
          {cookieTypes.map((type, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{type.name}</h3>
                <div className="flex items-center space-x-2">
                  {type.required && (
                    <span className="text-xs bg-red-100 text-red-500 px-2 py-1 rounded">
                      প্রয়োজনীয়
                    </span>
                  )}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cookieSettings[type.key as keyof typeof cookieSettings]}
                      onChange={() => handleCookieToggle(type.key)}
                      disabled={type.required}
                      className="sr-only peer"
                    />
                    <div className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500 ${type.required ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                  </label>
                </div>
              </div>
              <p className="text-gray-600 mb-3">{type.description}</p>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">উদাহরণ:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {type.examples.map((example, idx) => (
                    <li key={idx}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How We Use Cookies */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">আমরা কীভাবে কুকিজ ব্যবহার করি</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              কার্যকারিতা উন্নতি
            </h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>• আপনার ভাষা পছন্দ মনে রাখা</li>
              <li>• লগইন স্ট্যাটাস বজায় রাখা</li>
              <li>• পড়ার অগ্রগতি সংরক্ষণ</li>
              <li>• ব্যক্তিগত সেটিংস সংরক্ষণ</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-3 flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              বিশ্লেষণ ও উন্নতি
            </h3>
            <ul className="space-y-2 text-green-800 text-sm">
              <li>• ওয়েবসাইট ব্যবহারের পরিসংখ্যান</li>
              <li>• জনপ্রিয় কন্টেন্ট চিহ্নিতকরণ</li>
              <li>• ব্যবহারকারীর আচরণ বিশ্লেষণ</li>
              <li>• সেবার মান উন্নতি</li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              নিরাপত্তা
            </h3>
            <ul className="space-y-2 text-purple-800 text-sm">
              <li>• জালিয়াতি প্রতিরোধ</li>
              <li>• অননুমোদিত অ্যাক্সেস রোধ</li>
              <li>• নিরাপত্তা টোকেন যাচাই</li>
              <li>• স্প্যাম নিয়ন্ত্রণ</li>
            </ul>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 mb-3 flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              ব্যক্তিগতকরণ
            </h3>
            <ul className="space-y-2 text-orange-800 text-sm">
              <li>• প্রাসঙ্গিক সংবাদ প্রদর্শন</li>
              <li>• পছন্দের বিষয় অগ্রাধিকার</li>
              <li>• কাস্টমাইজড অভিজ্ঞতা</li>
              <li>• সুপারিশকৃত কন্টেন্ট</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Managing Cookies */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">কুকিজ নিয়ন্ত্রণ করুন</h2>
        <div className="space-y-4 text-gray-600">
          <p>
            আপনি আপনার ব্রাউজার সেটিংস থেকে কুকিজ নিয়ন্ত্রণ করতে পারেন। বেশিরভাগ ব্রাউজার স্বয়ংক্রিয়ভাবে কুকিজ গ্রহণ করে, তবে আপনি চাইলে এটি পরিবর্তন করতে পারেন।
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">গুরুত্বপূর্ণ নোট</h3>
            <p className="text-yellow-700 text-sm">
              যদি আপনি সব কুকিজ নিষ্ক্রিয় করেন, তাহলে ওয়েবসাইটের কিছু ফিচার সঠিকভাবে কাজ নাও করতে পারে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Chrome</h4>
              <p className="text-sm">Settings → Privacy and Security → Cookies and other site data</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Firefox</h4>
              <p className="text-sm">Options → Privacy & Security → Cookies and Site Data</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Safari</h4>
              <p className="text-sm">Preferences → Privacy → Cookies and website data</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Edge</h4>
              <p className="text-sm">Settings → Cookies and site permissions → Cookies and site data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">আপনার কুকি সেটিংস</h2>
        <p className="text-gray-600 mb-6">
          নিচের সেটিংস ব্যবহার করে আপনি কোন ধরনের কুকিজ গ্রহণ করবেন তা নির্ধারণ করতে পারেন:
        </p>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              আপনার পছন্দ অনুযায়ী কুকি সেটিংস কাস্টমাইজ করুন। প্রয়োজনীয় কুকিজ সবসময় সক্রিয় থাকবে।
            </p>
          </div>
          <button
            onClick={saveSettings}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            সেটিংস সংরক্ষণ করুন
          </button>
        </div>
      </div>

    </HomeLayout>
  );
};

export default CookiePolicyPage;