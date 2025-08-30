import React, { useState } from 'react';
import { Shield, Eye, Lock, Users, Database, Globe, Mail, Phone, Calendar } from 'lucide-react';
import HomeLayout from '@/layouts/home-layout';
import { Turnstile } from '@marsidev/react-turnstile';
import { Head } from '@inertiajs/react';

const PrivacyPolicyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const turnstileKey = document.querySelector('meta[name="turnstile-key"]')?.getAttribute('content') || '';
  const sections = [
    { id: 'overview', title: 'সংক্ষিপ্ত বিবরণ', icon: Eye },
    { id: 'collection', title: 'তথ্য সংগ্রহ', icon: Database },
    { id: 'usage', title: 'তথ্য ব্যবহার', icon: Users },
    { id: 'sharing', title: 'তথ্য শেয়ারিং', icon: Globe },
    { id: 'security', title: 'নিরাপত্তা', icon: Shield },
    { id: 'rights', title: 'আপনার অধিকার', icon: Lock },
    // { id: 'contact', title: 'যোগাযোগ', icon: Mail }
  ];

  const lastUpdated = '১৫ ডিসেম্বর ২০২৪';

  return (
    <HomeLayout hasSidebar>
      <Head>
        <title>গোপনীয়তা নীতি</title>        
      </Head>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-bold text-gray-900">গোপনীয়তা নীতি</h1>
        </div>
        <p className="text-gray-600 text-lg mb-4">
          হরেকৃষ্ণ সমাচার আপনার গোপনীয়তা রক্ষায় প্রতিশ্রুতিবদ্ধ। এই নীতিমালায় আমরা কীভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষা করি তা ব্যাখ্যা করা হয়েছে।
        </p>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>সর্বশেষ আপডেট: {lastUpdated}</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="border-b">
          <nav className="flex flex-wrap gap-2 p-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === section.id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <section.icon className="w-4 h-4" />
                <span>{section.title}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">সংক্ষিপ্ত বিবরণ</h2>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h3 className="font-semibold text-blue-800 mb-2">গুরুত্বপূর্ণ তথ্য</h3>
                <p className="text-blue-700">
                  হরেকৃষ্ণ সমাচার ব্রিটিশ ব্রডকাস্টিং কর্পোরেশনের একটি সেবা। আমরা আপনার গোপনীয়তাকে সর্বোচ্চ গুরুত্ব দিয়ে থাকি এবং আন্তর্জাতিক মানের ডেটা সুরক্ষা নীতি অনুসরণ করি।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">আমরা যা সংগ্রহ করি</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• ব্যক্তিগত তথ্য (নাম, ইমেইল)</li>
                    <li>• ব্যবহারের তথ্য</li>
                    <li>• ডিভাইস তথ্য</li>
                    <li>• কুকিজ ও ট্র্যাকিং ডেটা</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">আমরা যা করি না</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• তৃতীয় পক্ষের কাছে বিক্রি করি না</li>
                    <li>• অনুমতি ছাড়া শেয়ার করি না</li>
                    <li>• স্প্যাম পাঠাই না</li>
                    <li>• অপ্রয়োজনীয় ডেটা রাখি না</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Data Collection Section */}
          {activeSection === 'collection' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">তথ্য সংগ্রহ</h2>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">ব্যক্তিগত তথ্য</h3>
                  <p className="text-gray-600 mb-3">
                    আপনি যখন আমাদের সেবা ব্যবহার করেন, আমরা নিম্নলিখিত তথ্য সংগ্রহ করতে পারি:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>পরিচয়গত তথ্য:</strong> নাম, ইমেইল ঠিকানা, ফোন নম্বর</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>অ্যাকাউন্ট তথ্য:</strong> ব্যবহারকারীর নাম, পাসওয়ার্ড, প্রোফাইল ছবি</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>যোগাযোগের তথ্য:</strong> ঠিকানা, শহর, দেশ</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">ব্যবহারের তথ্য</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>কোন সংবাদ বা বই আপনি পড়েছেন</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>সাইটে কতক্ষণ সময় কাটিয়েছেন</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>কোন লিংকে ক্লিক করেছেন</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>সার্চ করা শব্দ ও বাক্য</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">প্রযুক্তিগত তথ্য</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>IP ঠিকানা ও ভৌগোলিক অবস্থান</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>ব্রাউজার ও অপারেটিং সিস্টেমের তথ্য</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>ডিভাইসের ধরন ও স্ক্রিন রেজোলিউশন</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>কুকিজ ও অনুরূপ প্রযুক্তি</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Data Usage Section */}
          {activeSection === 'usage' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">তথ্য ব্যবহার</h2>

              <p className="text-gray-600">
                আমরা আপনার তথ্য নিম্নলিখিত উদ্দেশ্যে ব্যবহার করি:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-3">সেবা প্রদান</h3>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li>• আপনার অ্যাকাউন্ট পরিচালনা</li>
                    <li>• ব্যক্তিগতকৃত সংবাদ প্রদান</li>
                    <li>• বুকমার্ক ও পছন্দ সংরক্ষণ</li>
                    <li>• পড়ার ইতিহাস ট্র্যাক করা</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-3">যোগাযোগ</h3>
                  <ul className="space-y-2 text-green-800 text-sm">
                    <li>• গুরুত্বপূর্ণ নোটিফিকেশন</li>
                    <li>• নিউজলেটার পাঠানো</li>
                    <li>• সেবা আপডেট জানানো</li>
                    <li>• গ্রাহক সেবা প্রদান</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-3">উন্নতি</h3>
                  <ul className="space-y-2 text-purple-800 text-sm">
                    <li>• সেবার মান বৃদ্ধি</li>
                    <li>• নতুন ফিচার তৈরি</li>
                    <li>• ব্যবহারকারীর অভিজ্ঞতা উন্নত করা</li>
                    <li>• প্রযুক্তিগত সমস্যা সমাধান</li>
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-900 mb-3">নিরাপত্তা</h3>
                  <ul className="space-y-2 text-orange-800 text-sm">
                    <li>• জালিয়াতি প্রতিরোধ</li>
                    <li>• স্প্যাম নিয়ন্ত্রণ</li>
                    <li>• নিরাপত্তা ঝুঁকি মূল্যায়ন</li>
                    <li>• আইনি বাধ্যবাধকতা পূরণ</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Data Sharing Section */}
          {activeSection === 'sharing' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">তথ্য শেয়ারিং</h2>

              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <h3 className="font-semibold text-red-800 mb-2">গুরুত্বপূর্ণ নীতি</h3>
                <p className="text-red-700">
                  আমরা আপনার ব্যক্তিগত তথ্য কখনোই বিক্রি করি না বা বাণিজ্যিক উদ্দেশ্যে তৃতীয় পক্ষের সাথে শেয়ার করি না।
                </p>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">যখন আমরা তথ্য শেয়ার করি</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs font-bold">১</span>
                      </div>
                      <div>
                        <strong>আপনার সম্মতিতে:</strong> আপনি যখন স্পষ্টভাবে অনুমতি দেন
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs font-bold">২</span>
                      </div>
                      <div>
                        <strong>আইনি প্রয়োজনে:</strong> আদালতের আদেশ বা আইনি বাধ্যবাধকতায়
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs font-bold">৩</span>
                      </div>
                      <div>
                        <strong>নিরাপত্তার জন্য:</strong> জালিয়াতি বা অপরাধ প্রতিরোধে
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs font-bold">৪</span>
                      </div>
                      <div>
                        <strong>সেবা প্রদানকারী:</strong> আমাদের বিশ্বস্ত প্রযুক্তি অংশীদারদের সাথে (শুধুমাত্র প্রয়োজনীয় তথ্য)
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">তৃতীয় পক্ষের সেবা</h3>
                  <p className="text-gray-600 mb-3">
                    আমাদের ওয়েবসাইট ও অ্যাপে নিম্নলিখিত তৃতীয় পক্ষের সেবা ব্যবহৃত হতে পারে:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Google Analytics (ব্যবহারের পরিসংখ্যানের জন্য)</li>
                    <li>• Firebase (নোটিফিকেশন সেবার জন্য)</li>
                    <li>• Cloudflare (নিরাপত্তা ও গতি বৃদ্ধির জন্য)</li>
                    <li>• Social Media Plugins (শেয়ারিং এর জন্য)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeSection === 'security' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">নিরাপত্তা</h2>

              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                <h3 className="font-semibold text-green-800 mb-2">আমাদের প্রতিশ্রুতি</h3>
                <p className="text-green-700">
                  আপনার ব্যক্তিগত তথ্যের নিরাপত্তা আমাদের সর্বোচ্চ অগ্রাধিকার। আমরা আন্তর্জাতিক মানের নিরাপত্তা ব্যবস্থা প্রয়োগ করি।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Lock className="w-5 h-5 text-blue-600 mr-2" />
                    প্রযুক্তিগত নিরাপত্তা
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• SSL/TLS এনক্রিপশন</li>
                    <li>• নিরাপদ ডেটাবেস</li>
                    <li>• ফায়ারওয়াল সুরক্ষা</li>
                    <li>• নিয়মিত নিরাপত্তা আপডেট</li>
                    <li>• দ্বি-ফ্যাক্টর অথেন্টিকেশন</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Users className="w-5 h-5 text-green-600 mr-2" />
                    প্রশাসনিক নিরাপত্তা
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• সীমিত অ্যাক্সেস নিয়ন্ত্রণ</li>
                    <li>• কর্মচারী প্রশিক্ষণ</li>
                    <li>• নিয়মিত নিরাপত্তা অডিট</li>
                    <li>• ডেটা ব্যাকআপ ব্যবস্থা</li>
                    <li>• ঘটনা প্রতিক্রিয়া পরিকল্পনা</li>
                  </ul>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">আপনার দায়িত্ব</h3>
                <p className="text-gray-600 mb-3">
                  আপনার অ্যাকাউন্টের নিরাপত্তার জন্য নিম্নলিখিত বিষয়গুলো মনে রাখুন:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>শক্তিশালী ও অনন্য পাসওয়ার্ড ব্যবহার করুন</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>পাসওয়ার্ড কারো সাথে শেয়ার করবেন না</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>সন্দেহজনক কার্যকলাপ দেখলে আমাদের জানান</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>পাবলিক কম্পিউটারে লগআউট করতে ভুলবেন না</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* User Rights Section */}
          {activeSection === 'rights' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">আপনার অধিকার</h2>

              <p className="text-gray-600">
                আপনার ব্যক্তিগত তথ্যের উপর আপনার সম্পূর্ণ নিয়ন্ত্রণ রয়েছে। নিম্নলিখিত অধিকারগুলো আপনার রয়েছে:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    দেখার অধিকার
                  </h3>
                  <p className="text-blue-800 text-sm">
                    আমরা আপনার কী তথ্য সংরক্ষণ করেছি তা জানার অধিকার আপনার রয়েছে। আপনি যেকোনো সময় আপনার ডেটার একটি কপি চাইতে পারেন।
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                    <Lock className="w-5 h-5 mr-2" />
                    সংশোধনের অধিকার
                  </h3>
                  <p className="text-green-800 text-sm">
                    আপনার তথ্যে কোনো ভুল থাকলে তা সংশোধন করার অধিকার আপনার রয়েছে। আপনি আপনার প্রোফাইল থেকে তথ্য আপডেট করতে পারেন।
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-3 flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    মুছে ফেলার অধিকার
                  </h3>
                  <p className="text-red-800 text-sm">
                    আপনি আপনার অ্যাকাউন্ট ও সংশ্লিষ্ট সকল তথ্য মুছে ফেলার অধিকার রাখেন। এটি করতে আমাদের সাথে যোগাযোগ করুন।
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-3 flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    স্থানান্তরের অধিকার
                  </h3>
                  <p className="text-purple-800 text-sm">
                    আপনার ডেটা অন্য সেবায় স্থানান্তর করার অধিকার আপনার রয়েছে। আমরা আপনার ডেটা পোর্টেবল ফরম্যাটে প্রদান করব।
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">কীভাবে আপনার অধিকার প্রয়োগ করবেন</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start space-x-3">
                    <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">১</span>
                    <span>আপনার প্রোফাইল সেটিংসে গিয়ে তথ্য দেখুন ও সম্পাদনা করুন</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">২</span>
                    <span>বিশেষ অনুরোধের জন্য আমাদের সাথে ইমেইলে যোগাযোগ করুন</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">৩</span>
                    <span>আমরা ৩০ দিনের মধ্যে আপনার অনুরোধের জবাব দেব</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Section */}
          {activeSection === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">যোগাযোগ</h2>

              <p className="text-gray-600">
                গোপনীয়তা নীতি সম্পর্কে কোনো প্রশ্ন বা উদ্বেগ থাকলে আমাদের সাথে যোগাযোগ করুন:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">যোগাযোগের তথ্য</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-medium">ইমেইল</p>
                        <p className="text-gray-600"><a href="mailto:privacy@hksamacar.com">privacy@hksamacar.com</a></p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-medium">ফোন</p>
                        <p className="text-gray-600"><a href="tel:+8801715758948">+৮৮০ ১৭১৫ ৭৫৮৯৪৮</a></p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Globe className="w-5 h-5 text-red-500 mt-1" />
                      <div>
                        <p className="font-medium">ঠিকানা</p>
                        <p className="text-gray-600">
                          মাসিক হরেকৃষ্ণ সমাচার<br />
                          ৭৯ স্বামীবাগ, ঢাকা, বাংলাদেশ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">দ্রুত যোগাযোগ</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        আপনার নাম
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:!outline-0 focus:ring-2 focus:ring-red-500"
                        placeholder="আপনার নাম লিখুন"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ইমেইল
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:!outline-0 focus:ring-2 focus:ring-red-500"
                        placeholder="আপনার ইমেইল লিখুন"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        বার্তা
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:!outline-0 focus:ring-2 focus:ring-red-500"
                        placeholder="আপনার প্রশ্ন বা মন্তব্য লিখুন"
                      ></textarea>
                    </div>
                    {turnstileKey &&
                      <div className="flex items-center justify-between">
                        <Turnstile siteKey={turnstileKey} as='aside' options={{ theme: 'light', size: 'normal' }} scriptOptions={{ defer: true }} />
                      </div>
                    }
                    <button
                      type="submit"
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      বার্তা পাঠান
                    </button>
                  </form>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">গুরুত্বপূর্ণ নোট</h3>
                <p className="text-yellow-700 text-sm">
                  এই গোপনীয়তা নীতি সময়ে সময়ে আপডেট হতে পারে। কোনো পরিবর্তন হলে আমরা আপনাকে জানিয়ে দেব। নিয়মিত এই পেজ চেক করার পরামর্শ দিচ্ছি।
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default PrivacyPolicyPage;