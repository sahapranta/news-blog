import HomeLayout from '@/layouts/home-layout';
import { Award, BookOpen, Calendar, Globe, Heart, Mail, MapPin, Phone, Shield, Target, Users, Zap } from 'lucide-react';
import React from 'react';

const AboutPage: React.FC = () => {
    const stats = [
        { label: 'দৈনিক পাঠক', value: '১০ লক্ষ+', icon: Users },
        { label: 'প্রকাশিত সংবাদ', value: '৫০,০০০+', icon: BookOpen },
        { label: 'দেশ ও অঞ্চল', value: '৫০+', icon: Globe },
        { label: 'পুরস্কার', value: '২৫+', icon: Award },
    ];

    const values = [
        {
            icon: Shield,
            title: 'বিশ্বস্ততা',
            description: 'আমরা সত্য ও নির্ভুল সংবাদ প্রদানে প্রতিশ্রুতিবদ্ধ',
        },
        {
            icon: Target,
            title: 'নিরপেক্ষতা',
            description: 'সকল পক্ষের মতামত তুলে ধরে ভারসাম্যপূর্ণ সংবাদ পরিবেশন',
        },
        {
            icon: Heart,
            title: 'সেবা',
            description: 'জনগণের সেবায় নিবেদিত একটি গণমাধ্যম হিসেবে কাজ করা',
        },
        {
            icon: Zap,
            title: 'উৎকর্ষতা',
            description: 'সাংবাদিকতার সর্বোচ্চ মান বজায় রাখা',
        },
    ];

    const team = [
        {
            name: 'শ্রীপাদ্ চারু চন্দ্র দাস ব্রহ্মচারী',
            position: 'সম্পাদক',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA3LMU5hL3E856dX1Wae-E-FvRcMoR0cBH7sNHkMljWPSy3uEWEqdjyxQ5P9oikp6-qAU&usqp=CAU',
            bio: 'ইসকন বাংলাদেশের বলিষ্ঠ নেতৃত্বদানকারী ও প্রবীণ সম্পাদক',
        },
        {
            name: 'ফাতেমা খাতুন',
            position: 'সংবাদ সম্পাদক',
            image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
            bio: 'আন্তর্জাতিক সংবাদ ও রাজনীতি বিশেষজ্ঞ',
        },
        {
            name: 'মোহাম্মদ রহিম',
            position: 'প্রযুক্তি পরিচালক',
            image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
            bio: 'ডিজিটাল মিডিয়া ও প্রযুক্তি উন্নয়নে অগ্রণী',
        },
        {
            name: 'সালমা আক্তার',
            position: 'সাংস্কৃতিক সম্পাদক',
            image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
            bio: 'বাংলা সাহিত্য ও সংস্কৃতি বিষয়ক বিশেষজ্ঞ',
        },
    ];

    const milestones = [
        {
            year: '১৯৪০',
            title: 'হরেকৃষ্ণ সমাচার সেবা শুরু',
            description: 'দ্বিতীয় বিশ্বযুদ্ধের সময় বাংলা ভাষায় রেডিও সম্প্রচার শুরু',
        },
        {
            year: '১৯৭১',
            title: 'মুক্তিযুদ্ধের সংবাদ',
            description: 'বাংলাদেশের স্বাধীনতা যুদ্ধের নিরপেক্ষ সংবাদ প্রচার',
        },
        {
            year: '২০০০',
            title: 'অনলাইন সেবা চালু',
            description: 'ইন্টারনেটে হরেকৃষ্ণ সমাচারর ওয়েবসাইট চালু',
        },
        {
            year: '২০১৫',
            title: 'মোবাইল অ্যাপ',
            description: 'স্মার্টফোনের জন্য হরেকৃষ্ণ সমাচার অ্যাপ চালু',
        },
        {
            year: '২০২০',
            title: 'ডিজিটাল সম্প্রসারণ',
            description: 'সোশ্যাল মিডিয়া ও ডিজিটাল প্ল্যাটফর্মে সেবা বৃদ্ধি',
        },
        {
            year: '২০২৪',
            title: 'নতুন ওয়েবসাইট',
            description: 'আধুনিক ও ব্যবহারকারী-বান্ধব নতুন ওয়েবসাইট চালু',
        },
    ];

    const Heading = (
        <div className="mb-8">
            <h1 className="mb-6 border-b-4 border-red-600 pb-4 text-3xl font-bold text-gray-900">আমাদের সম্পর্কে</h1>
            <p className="text-lg text-gray-600">হরেকৃষ্ণ সমাচার - বিশ্বস্ত সংবাদ, সৎ মতামত এবং নিরপেক্ষ বিশ্লেষণের জন্য আপনার নির্ভরযোগ্য সূত্র</p>
        </div>
    );

    return (
        <HomeLayout hasSidebar heading={Heading}>
            {/* Hero Section */}
            <div className="mb-8 rounded-lg bg-gradient-to-r from-red-500 to-red-600 p-8 text-white">
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                    <div>
                        <h2 className="mb-4 text-3xl font-bold">হরেকৃষ্ণ সমাচার</h2>
                        <p className="mb-6 leading-relaxed text-red-100">
                            ১৯৪০ সাল থেকে বাংলা ভাষাভাষী মানুষের কাছে বিশ্বস্ত সংবাদ পৌঁছে দিচ্ছি। আমরা নিরপেক্ষ, সত্য এবং মানসম্পন্ন সাংবাদিকতার
                            মাধ্যমে সমাজের সেবা করে যাচ্ছি।
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold">৮০+</div>
                                <div className="text-sm text-red-100">বছরের অভিজ্ঞতা</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">২৪/৭</div>
                                <div className="text-sm text-red-100">সংবাদ সেবা</div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="rounded-lg bg-white/20 p-6">
                            <Globe className="mx-auto mb-4 h-16 w-16 text-white" />
                            <h3 className="mb-2 text-xl font-semibold">বিশ্বব্যাপী নেটওয়ার্ক</h3>
                            <p className="text-red-100">বিশ্বের যেকোনো প্রান্ত থেকে সংবাদ সংগ্রহ ও প্রচার</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">আমাদের পরিসংখ্যান</h2>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                <stat.icon className="h-8 w-8 text-red-500" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900">
                        <Target className="mr-2 h-6 w-6 text-red-500" />
                        আমাদের লক্ষ্য
                    </h2>
                    <p className="leading-relaxed text-gray-600">
                        বাংলা ভাষাভাষী মানুষের কাছে বিশ্বস্ত, নিরপেক্ষ এবং মানসম্পন্ন সংবাদ পৌঁছে দেওয়া। আমরা চাই প্রতিটি মানুষ সঠিক তথ্যের ভিত্তিতে
                        সিদ্ধান্ত নিতে পারুক।
                    </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900">
                        <Globe className="mr-2 h-6 w-6 text-red-500" />
                        আমাদের দৃষ্টিভঙ্গি
                    </h2>
                    <p className="leading-relaxed text-gray-600">
                        একটি অবহিত, শিক্ষিত এবং গণতান্ত্রিক সমাজ গড়ে তোলা যেখানে মানুষ সত্যের ভিত্তিতে মতামত গঠন করতে পারে এবং স্বাধীনভাবে চিন্তা
                        করতে পারে।
                    </p>
                </div>
            </div>

            {/* Values */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">আমাদের মূল্যবোধ</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {values.map((value, index) => (
                        <div key={index} className="flex items-start space-x-4 rounded-lg bg-gray-50 p-4">
                            <div className="rounded-lg bg-red-100 p-3">
                                <value.icon className="h-6 w-6 text-red-500" />
                            </div>
                            <div>
                                <h3 className="mb-2 font-semibold text-gray-900">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timeline */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
                    <Calendar className="mr-2 h-6 w-6 text-red-500" />
                    আমাদের যাত্রা
                </h2>
                <div className="space-y-6">
                    {milestones.map((milestone, index) => (
                        <div key={index} className="flex items-start space-x-4">
                            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
                                {milestone.year}
                            </div>
                            <div className="flex-1">
                                <h3 className="mb-1 font-semibold text-gray-900">{milestone.title}</h3>
                                <p className="text-gray-600">{milestone.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
                    <Users className="mr-2 h-6 w-6 text-red-500" />
                    আমাদের টিম
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {team.map((member, index) => (
                        <div key={index} className="text-center">
                            <img src={member.image} alt={member.name} className="mx-auto mb-4 h-24 w-24 rounded-full object-cover" />
                            <h3 className="mb-1 font-semibold text-gray-900">{member.name}</h3>
                            <p className="mb-2 text-sm text-red-500">{member.position}</p>
                            <p className="text-sm text-gray-600">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Info */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">যোগাযোগ করুন</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="flex items-center space-x-3">
                        <MapPin className="h-6 w-6 text-red-500" />
                        <div>
                            <h3 className="font-semibold text-gray-900">ঠিকানা</h3>
                            <p className="text-gray-600">ঢাকা, বাংলাদেশ</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Mail className="h-6 w-6 text-red-500" />
                        <div>
                            <h3 className="font-semibold text-gray-900">ইমেইল</h3>
                            <p className="text-gray-600">info@hksamacar.com</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Phone className="h-6 w-6 text-red-500" />
                        <div>
                            <h3 className="font-semibold text-gray-900">ফোন</h3>
                            <p className="text-gray-600">+৮৮০ ১৭১৫ ৭৫৮৯৪৮</p>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default AboutPage;
