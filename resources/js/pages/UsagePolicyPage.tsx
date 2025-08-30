import HomeLayout from '@/layouts/home-layout';
import { Head } from '@inertiajs/react';
import { AlertTriangle, Calendar, CheckCircle, FileText, Shield, Users, XCircle } from 'lucide-react';
import React, { useState } from 'react';

const UsagePolicyPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState('overview');

    const sections = [
        { id: 'overview', title: 'সংক্ষিপ্ত বিবরণ', icon: FileText },
        { id: 'acceptable', title: 'গ্রহণযোগ্য ব্যবহার', icon: CheckCircle },
        { id: 'prohibited', title: 'নিষিদ্ধ কার্যকলাপ', icon: XCircle },
        { id: 'content', title: 'কন্টেন্ট নীতি', icon: Users },
        { id: 'enforcement', title: 'নীতি প্রয়োগ', icon: Shield },
        { id: 'reporting', title: 'রিপোর্ট করুন', icon: AlertTriangle },
    ];

    const lastUpdated = '১৫ ডিসেম্বর ২০২৪';

    return (
        <HomeLayout hasSidebar>
            <Head>
                <title>ব্যবহারের নীতি</title>
            </Head>
            {/* Header */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-red-500" />
                    <h1 className="text-3xl font-bold text-gray-900">ব্যবহারের নীতিমালা</h1>
                </div>
                <p className="mb-4 text-lg text-gray-600">
                    হরেকৃষ্ণ সমাচার সেবা ব্যবহারের জন্য নিয়ম ও শর্তাবলী। সকল ব্যবহারকারীকে এই নীতিমালা মেনে চলতে হবে।
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>সর্বশেষ আপডেট: {lastUpdated}</span>
                </div>
            </div>

            {/* Navigation */}
            <div className="mb-8 rounded-lg bg-white shadow-sm">
                <div className="border-b">
                    <nav className="flex flex-wrap gap-2 p-4">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                    activeSection === section.id ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <section.icon className="h-4 w-4" />
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

                            <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
                                <h3 className="mb-2 font-semibold text-blue-800">স্বাগতম</h3>
                                <p className="text-blue-700">
                                    হরেকৃষ্ণ সমাচার ব্যবহার করে আপনি এই নীতিমালা মেনে চলতে সম্মত হচ্ছেন। এই নীতিমালা আমাদের সেবার নিরাপদ ও কার্যকর
                                    ব্যবহার নিশ্চিত করে।
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="rounded-lg bg-green-50 p-4">
                                    <h4 className="mb-2 font-semibold text-green-900">আমাদের প্রতিশ্রুতি</h4>
                                    <ul className="space-y-1 text-sm text-green-700">
                                        <li>• বিশ্বস্ত ও নিরপেক্ষ সংবাদ</li>
                                        <li>• ব্যবহারকারীর গোপনীয়তা রক্ষা</li>
                                        <li>• নিরাপদ অনলাইন পরিবেশ</li>
                                        <li>• মানসম্পন্ন সেবা প্রদান</li>
                                    </ul>
                                </div>
                                <div className="rounded-lg bg-orange-50 p-4">
                                    <h4 className="mb-2 font-semibold text-orange-900">আপনার দায়িত্ব</h4>
                                    <ul className="space-y-1 text-sm text-orange-700">
                                        <li>• নীতিমালা মেনে চলা</li>
                                        <li>• সঠিক তথ্য প্রদান</li>
                                        <li>• অন্যদের সম্মান করা</li>
                                        <li>• আইন মেনে চলা</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-200 p-4">
                                <h3 className="mb-3 font-semibold text-gray-900">প্রযোজ্যতা</h3>
                                <p className="text-gray-600">এই নীতিমালা হরেকৃষ্ণ সমাচারর সকল সেবার জন্য প্রযোজ্য, যার মধ্যে রয়েছে:</p>
                                <ul className="mt-2 space-y-1 text-gray-600">
                                    <li>• ওয়েবসাইট ও মোবাইল অ্যাপ</li>
                                    <li>• সংবাদ ও নিবন্ধ</li>
                                    <li>• বই ও পত্রিকা</li>
                                    <li>• ব্যবহারকারীর অ্যাকাউন্ট</li>
                                    <li>• কমেন্ট ও ইন্টারঅ্যাকশন</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Acceptable Use Section */}
                    {activeSection === 'acceptable' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">গ্রহণযোগ্য ব্যবহার</h2>

                            <div className="space-y-4">
                                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                                    <h3 className="mb-3 flex items-center font-semibold text-green-900">
                                        <CheckCircle className="mr-2 h-5 w-5" />
                                        উৎসাহিত কার্যকলাপ
                                    </h3>
                                    <ul className="space-y-2 text-green-800">
                                        <li className="flex items-start space-x-2">
                                            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></span>
                                            <span>সংবাদ পড়া ও শেয়ার করা</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></span>
                                            <span>শিক্ষামূলক কন্টেন্ট ব্যবহার</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></span>
                                            <span>গঠনমূলক আলোচনায় অংশগ্রহণ</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></span>
                                            <span>বই ও পত্রিকা পড়া</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></span>
                                            <span>ব্যক্তিগত শিক্ষার জন্য ব্যবহার</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="rounded-lg border border-gray-200 p-4">
                                    <h3 className="mb-3 font-semibold text-gray-900">অ্যাকাউন্ট ব্যবহার</h3>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• সঠিক ও আপডেট তথ্য প্রদান করুন</li>
                                        <li>• আপনার পাসওয়ার্ড গোপন রাখুন</li>
                                        <li>• একটি ব্যক্তি একটি অ্যাকাউন্ট ব্যবহার করুন</li>
                                        <li>• সন্দেহজনক কার্যকলাপ রিপোর্ট করুন</li>
                                    </ul>
                                </div>

                                <div className="rounded-lg border border-gray-200 p-4">
                                    <h3 className="mb-3 font-semibold text-gray-900">কন্টেন্ট ব্যবহার</h3>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• ব্যক্তিগত ও অবাণিজ্যিক ব্যবহার</li>
                                        <li>• সূত্র উল্লেখ করে শেয়ার করা</li>
                                        <li>• কপিরাইট আইন মেনে চলা</li>
                                        <li>• ফেয়ার ইউজ নীতি অনুসরণ</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Prohibited Activities Section */}
                    {activeSection === 'prohibited' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">নিষিদ্ধ কার্যকলাপ</h2>

                            <div className="border-l-4 border-red-400 bg-red-50 p-4">
                                <h3 className="mb-2 font-semibold text-red-800">গুরুত্বপূর্ণ সতর্কতা</h3>
                                <p className="text-red-700">
                                    নিম্নলিখিত কার্যকলাপ সম্পূর্ণ নিষিদ্ধ। এগুলো করলে আপনার অ্যাকাউন্ট স্থগিত বা বাতিল হতে পারে।
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                                    <h3 className="mb-3 font-semibold text-red-900">কন্টেন্ট সংক্রান্ত</h3>
                                    <ul className="space-y-2 text-sm text-red-800">
                                        <li>• মিথ্যা বা বিভ্রান্তিকর তথ্য প্রচার</li>
                                        <li>• হেট স্পিচ বা বৈষম্যমূলক বক্তব্য</li>
                                        <li>• অশ্লীল বা আপত্তিকর কন্টেন্ট</li>
                                        <li>• কপিরাইট লঙ্ঘন</li>
                                        <li>• স্প্যাম বা অবাঞ্ছিত বার্তা</li>
                                    </ul>
                                </div>

                                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                                    <h3 className="mb-3 font-semibold text-red-900">প্রযুক্তিগত অপব্যবহার</h3>
                                    <ul className="space-y-2 text-sm text-red-800">
                                        <li>• হ্যাকিং বা সিস্টেম ভাঙার চেষ্টা</li>
                                        <li>• ম্যালওয়্যার বা ভাইরাস প্রচার</li>
                                        <li>• অতিরিক্ত ট্রাফিক তৈরি</li>
                                        <li>• বট বা স্বয়ংক্রিয় সিস্টেম ব্যবহার</li>
                                        <li>• নিরাপত্তা ব্যবস্থা এড়ানোর চেষ্টা</li>
                                    </ul>
                                </div>

                                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                                    <h3 className="mb-3 font-semibold text-red-900">আইনি লঙ্ঘন</h3>
                                    <ul className="space-y-2 text-sm text-red-800">
                                        <li>• অবৈধ কার্যকলাপে উৎসাহ প্রদান</li>
                                        <li>• হুমকি বা ভয় দেখানো</li>
                                        <li>• ব্যক্তিগত তথ্য চুরি</li>
                                        <li>• জালিয়াতি বা প্রতারণা</li>
                                        <li>• মানহানিকর বক্তব্য</li>
                                    </ul>
                                </div>

                                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                                    <h3 className="mb-3 font-semibold text-red-900">বাণিজ্যিক অপব্যবহার</h3>
                                    <ul className="space-y-2 text-sm text-red-800">
                                        <li>• অনুমতি ছাড়া বিজ্ঞাপন</li>
                                        <li>• কন্টেন্ট বিক্রয় বা পুনর্বিতরণ</li>
                                        <li>• প্রতিযোগী সেবার প্রচার</li>
                                        <li>• অবৈধ ব্যবসায়িক কার্যকলাপ</li>
                                        <li>• মিথ্যা পরিচয়ে ব্যবসা</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content Policy Section */}
                    {activeSection === 'content' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">কন্টেন্ট নীতি</h2>

                            <div className="space-y-4">
                                <div className="rounded-lg border border-gray-200 p-4">
                                    <h3 className="mb-3 font-semibold text-gray-900">আমাদের কন্টেন্ট মান</h3>
                                    <p className="mb-3 text-gray-600">হরেকৃষ্ণ সমাচারর সকল কন্টেন্ট নিম্নলিখিত মান অনুসরণ করে:</p>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• সত্যতা ও নির্ভুলতা</li>
                                        <li>• নিরপেক্ষতা ও ভারসাম্য</li>
                                        <li>• সাংবাদিকতার নৈতিকতা</li>
                                        <li>• সাংস্কৃতিক সংবেদনশীলতা</li>
                                        <li>• আইনি সম্মতি</li>
                                    </ul>
                                </div>

                                <div className="rounded-lg border border-gray-200 p-4">
                                    <h3 className="mb-3 font-semibold text-gray-900">ব্যবহারকারীর কন্টেন্ট</h3>
                                    <p className="mb-3 text-gray-600">যদি আপনি কোনো কন্টেন্ট (কমেন্ট, রিভিউ ইত্যাদি) জমা দেন:</p>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• আপনি এর দায়বদ্ধতা গ্রহণ করেন</li>
                                        <li>• এটি আমাদের নীতিমালা মেনে চলতে হবে</li>
                                        <li>• আমরা এটি পর্যালোচনা ও সম্পাদনা করতে পারি</li>
                                        <li>• প্রয়োজনে আমরা এটি সরিয়ে দিতে পারি</li>
                                    </ul>
                                </div>

                                <div className="rounded-lg border border-gray-200 p-4">
                                    <h3 className="mb-3 font-semibold text-gray-900">কপিরাইট ও বুদ্ধিবৃত্তিক সম্পদ</h3>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• আমাদের কন্টেন্ট কপিরাইট সুরক্ষিত</li>
                                        <li>• অনুমতি ছাড়া বাণিজ্যিক ব্যবহার নিষিদ্ধ</li>
                                        <li>• সূত্র উল্লেখ করে শেয়ার করুন</li>
                                        <li>• অন্যের কপিরাইট সম্মান করুন</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Enforcement Section */}
                    {activeSection === 'enforcement' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">নীতি প্রয়োগ</h2>

                            <div className="space-y-4">
                                <div className="rounded-lg border border-gray-200 p-4">
                                    <h3 className="mb-3 font-semibold text-gray-900">লঙ্ঘনের পরিণতি</h3>
                                    <p className="mb-3 text-gray-600">নীতিমালা লঙ্ঘনের জন্য নিম্নলিখিত ব্যবস্থা নেওয়া হতে পারে:</p>
                                    <div className="space-y-3">
                                        <div className="flex items-start space-x-3">
                                            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100">
                                                <span className="text-xs font-bold text-yellow-600">১</span>
                                            </div>
                                            <div>
                                                <strong>সতর্কতা:</strong> প্রথম লঙ্ঘনে সতর্কতা প্রদান
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-100">
                                                <span className="text-xs font-bold text-orange-600">২</span>
                                            </div>
                                            <div>
                                                <strong>সাময়িক স্থগিতাদেশ:</strong> নির্দিষ্ট সময়ের জন্য অ্যাকাউন্ট স্থগিত
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                                                <span className="text-xs font-bold text-red-500">৩</span>
                                            </div>
                                            <div>
                                                <strong>স্থায়ী নিষেধাজ্ঞা:</strong> গুরুতর বা পুনরাবৃত্ত লঙ্ঘনে স্থায়ী বাতিল
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-gray-200 p-4">
                                    <h3 className="mb-3 font-semibold text-gray-900">আপিল প্রক্রিয়া</h3>
                                    <p className="mb-3 text-gray-600">যদি আপনি মনে করেন যে আপনার বিরুদ্ধে ভুল ব্যবস্থা নেওয়া হয়েছে:</p>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• আমাদের সাথে যোগাযোগ করুন</li>
                                        <li>• বিস্তারিত ব্যাখ্যা প্রদান করুন</li>
                                        <li>• প্রমাণ সংযুক্ত করুন (যদি থাকে)</li>
                                        <li>• আমরা ৭ দিনের মধ্যে পর্যালোচনা করব</li>
                                    </ul>
                                </div>

                                <div className="rounded-lg border border-gray-200 p-4">
                                    <h3 className="mb-3 font-semibold text-gray-900">আইনি ব্যবস্থা</h3>
                                    <p className="text-gray-600">
                                        গুরুতর লঙ্ঘনের ক্ষেত্রে আমরা আইন প্রয়োগকারী সংস্থার সাথে সহযোগিতা করতে পারি এবং প্রয়োজনে আইনি ব্যবস্থা নিতে
                                        পারি।
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reporting Section */}
                    {activeSection === 'reporting' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">রিপোর্ট করুন</h2>

                            <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
                                <h3 className="mb-2 font-semibold text-blue-800">আমাদের সাহায্য করুন</h3>
                                <p className="text-blue-700">
                                    নিরাপদ পরিবেশ বজায় রাখতে আপনার সহযোগিতা প্রয়োজন। কোনো নীতি লঙ্ঘন দেখলে আমাদের জানান।
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="rounded-lg border border-gray-200 p-4">
                                    <h3 className="mb-3 font-semibold text-gray-900">কী রিপোর্ট করবেন</h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li>• অনুপযুক্ত কন্টেন্ট</li>
                                        <li>• স্প্যাম বা জাল অ্যাকাউন্ট</li>
                                        <li>• হয়রানি বা হুমকি</li>
                                        <li>• কপিরাইট লঙ্ঘন</li>
                                        <li>• প্রযুক্তিগত সমস্যা</li>
                                        <li>• নিরাপত্তা ঝুঁকি</li>
                                    </ul>
                                </div>

                                <div className="rounded-lg border border-gray-200 p-4">
                                    <h3 className="mb-3 font-semibold text-gray-900">কীভাবে রিপোর্ট করবেন</h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li>• ইমেইল: report@hksamacar.com</li>
                                        <li>• ফোন: +৮৮০ ১৭১৫ ৭৫৮৯৪৮</li>
                                        <li>• অনলাইন ফর্ম ব্যবহার করুন</li>
                                        <li>• বিস্তারিত তথ্য প্রদান করুন</li>
                                        <li>• স্ক্রিনশট সংযুক্ত করুন</li>
                                        <li>• আপনার যোগাযোগের তথ্য দিন</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-200 p-4">
                                <h3 className="mb-3 font-semibold text-gray-900">রিপোর্ট প্রক্রিয়া</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                            <span className="text-xs font-bold text-blue-600">১</span>
                                        </div>
                                        <div>
                                            <strong>রিপোর্ট গ্রহণ:</strong> আমরা আপনার রিপোর্ট গ্রহণ করি
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                            <span className="text-xs font-bold text-blue-600">২</span>
                                        </div>
                                        <div>
                                            <strong>পর্যালোচনা:</strong> আমাদের টিম বিষয়টি পর্যালোচনা করে
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                            <span className="text-xs font-bold text-blue-600">৩</span>
                                        </div>
                                        <div>
                                            <strong>ব্যবস্থা গ্রহণ:</strong> প্রয়োজনীয় ব্যবস্থা নেওয়া হয়
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                            <span className="text-xs font-bold text-blue-600">৪</span>
                                        </div>
                                        <div>
                                            <strong>ফলাফল জানানো:</strong> আপনাকে ফলাফল জানানো হয়
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                                <h3 className="mb-2 font-semibold text-green-900">ধন্যবাদ</h3>
                                <p className="text-sm text-green-700">
                                    আপনার রিপোর্ট আমাদের কমিউনিটি নিরাপদ রাখতে সাহায্য করে। আমরা সকল রিপোর্ট গুরুত্বের সাথে বিবেচনা করি।
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
};

export default UsagePolicyPage;
