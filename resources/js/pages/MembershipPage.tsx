import Sidebar from '@/components/Sidebar';
import { Input } from '@/components/ui/input';
import HomeLayout from '@/layouts/home-layout';
import { Award, Bell, BookOpen, CreditCard, Download, Gift, Star, Truck, Users } from 'lucide-react';
import React, { useState } from 'react';

const MembershipPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        paymentMethod: 'bkash',
    });

    const benefits = [
        {
            icon: BookOpen,
            title: 'মাসিক পত্রিকা',
            description: 'প্রিমিয়াম কন্টেন্ট সহ মাসিক পত্রিকা ঘরে বসে পান',
        },
        {
            icon: Download,
            title: 'ডিজিটাল অ্যাক্সেস',
            description: 'সকল ডিজিটাল কন্টেন্ট ও বই ডাউনলোড করুন',
        },
        {
            icon: Bell,
            title: 'প্রাথমিক সংবাদ',
            description: 'গুরুত্বপূর্ণ সংবাদ সবার আগে পান',
        },
        {
            icon: Gift,
            title: 'বিশেষ ছাড়',
            description: 'ইভেন্ট ও বইয়ে বিশেষ ছাড় পান',
        },
        {
            icon: Users,
            title: 'এক্সক্লুসিভ কমিউনিটি',
            description: 'সদস্যদের বিশেষ গ্রুপে যোগ দিন',
        },
        {
            icon: Award,
            title: 'বিশেষ উৎসব',
            description: 'সদস্যদের জন্য বিশেষ ইভেন্টে অংশগ্রহণ',
        },
    ];

    const paymentMethods = [
        { id: 'bkash', name: 'বিকাশ', logo: '💳' },
        { id: 'nagad', name: 'নগদ', logo: '💰' },
        { id: 'rocket', name: 'রকেট', logo: '🚀' },
        { id: 'bank', name: 'ব্যাংক ট্রান্সফার', logo: '🏦' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Membership form submitted:', formData);
        // Redirect to payment or confirmation page
        window.location.href = '/thank-you';
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <HomeLayout>
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="mb-6 border-b-4 border-red-600 pb-4 text-3xl font-bold text-gray-900">সদস্যপদ</h1>
                    <p className="text-lg text-gray-600">হরেকৃষ্ণ সমাচার প্রিমিয়াম সদস্য হয়ে বিশেষ সুবিধা ও কন্টেন্ট উপভোগ করুন</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <div className="lg:col-span-3">
                        {/* Membership Plan */}
                        <div className="mb-8 rounded-lg bg-gradient-to-r from-red-600 to-red-700 p-8 text-white">
                            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                                <div>
                                    <div className="mb-4 flex items-center space-x-2">
                                        <Star className="h-6 w-6 fill-current" />
                                        <span className="text-red-100">প্রিমিয়াম সদস্যপদ</span>
                                    </div>
                                    <h2 className="mb-4 text-3xl font-bold">বার্ষিক সাবস্ক্রিপশন</h2>
                                    <div className="mb-6 flex items-baseline space-x-2">
                                        <span className="text-4xl font-bold">২৫০</span>
                                        <span className="text-xl">টাকা</span>
                                        <span className="text-red-100">/বছর</span>
                                    </div>
                                    <p className="mb-6 text-red-100">
                                        মাত্র ২৫০ টাকায় পুরো বছরের জন্য প্রিমিয়াম সদস্যপদ নিন এবং বিশেষ সুবিধা উপভোগ করুন।
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <Truck className="h-5 w-5" />
                                        <span>বাংলাদেশের যেকোনো জায়গায় ফ্রি ডেলিভারি</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="rounded-lg bg-white/20 p-6">
                                        <BookOpen className="mx-auto mb-4 h-16 w-16 text-white" />
                                        <h3 className="mb-2 text-xl font-semibold">মাসিক পত্রিকা</h3>
                                        <p className="text-red-100">প্রিন্ট কপি ঘরে পৌঁছে যাবে</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">সদস্যপদের সুবিধা</h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start space-x-4 rounded-lg bg-gray-50 p-4">
                                        <div className="rounded-lg bg-red-100 p-3">
                                            <benefit.icon className="h-6 w-6 text-red-500" />
                                        </div>
                                        <div>
                                            <h3 className="mb-2 font-semibold text-gray-900">{benefit.title}</h3>
                                            <p className="text-sm text-gray-600">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Membership Form */}
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
                                <CreditCard className="mr-2 h-6 w-6 text-red-500" />
                                সদস্যপদ ফর্ম
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information */}
                                <div>
                                    <h3 className="mb-4 text-lg font-semibold text-gray-900">ব্যক্তিগত তথ্য</h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                                                পূর্ণ নাম <span className="text-red-600">*</span>
                                            </label>
                                            <Input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="h-12 px-4 py-3 focus:!ring-2 focus:!ring-red-500 focus:!outline-0"
                                                placeholder="আপনার পূর্ণ নাম"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                                                ইমেইল ঠিকানা <span className="text-red-600">*</span>
                                            </label>
                                            <Input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="h-12 px-4 py-3 focus:!ring-2 focus:!ring-red-500 focus:!outline-0"
                                                placeholder="আপনার ইমেইল"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                                            মোবাইল নম্বর <span className="text-red-600">*</span>
                                        </label>
                                        <Input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="h-12 px-4 py-3 focus:!ring-2 focus:!ring-red-500 focus:!outline-0"
                                            placeholder="আপনার মোবাইল নম্বর"
                                        />
                                    </div>
                                </div>

                                {/* Delivery Address */}
                                <div>
                                    <h3 className="mb-4 text-lg font-semibold text-gray-900">ডেলিভারি ঠিকানা</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-700">
                                                সম্পূর্ণ ঠিকানা <span className="text-red-600">*</span>
                                            </label>
                                            <textarea
                                                id="address"
                                                name="address"
                                                required
                                                rows={3}
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:!ring-2 focus:!ring-red-500 focus:!outline-0 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
                                                placeholder="বাড়ি/ফ্ল্যাট নম্বর, রাস্তা, এলাকা"
                                            ></textarea>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div>
                                                <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-700">
                                                    শহর <span className="text-red-600">*</span>
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="city"
                                                    name="city"
                                                    required
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="h-12 px-4 py-3 focus:!ring-2 focus:!ring-red-500 focus:!outline-0"
                                                    placeholder="আপনার শহর"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="postalCode" className="mb-2 block text-sm font-medium text-gray-700">
                                                    পোস্টাল কোড
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="postalCode"
                                                    name="postalCode"
                                                    value={formData.postalCode}
                                                    onChange={handleInputChange}
                                                    className="h-12 px-4 py-3 focus:!ring-2 focus:!ring-red-500 focus:!outline-0"
                                                    placeholder="পোস্টাল কোড"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div>
                                    <h3 className="mb-4 text-lg font-semibold text-gray-900">পেমেন্ট পদ্ধতি</h3>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {paymentMethods.map((method) => (
                                            <label
                                                key={method.id}
                                                className={`flex cursor-pointer items-center justify-center rounded-lg border-2 p-4 transition-colors ${
                                                    formData.paymentMethod === method.id
                                                        ? 'border-red-500 bg-red-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value={method.id}
                                                    checked={formData.paymentMethod === method.id}
                                                    onChange={handleInputChange}
                                                    className="sr-only"
                                                />
                                                <div className="text-center">
                                                    <div className="mb-2 text-2xl">{method.logo}</div>
                                                    <div className="text-sm font-medium">{method.name}</div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="rounded-lg bg-gray-50 p-6">
                                    <h3 className="mb-4 text-lg font-semibold text-gray-900">অর্ডার সারাংশ</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>বার্ষিক সদস্যপদ</span>
                                            <span>২৫০ টাকা</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>ডেলিভারি চার্জ</span>
                                            <span className="text-green-600">ফ্রি</span>
                                        </div>
                                        <div className="flex justify-between border-t pt-2 font-semibold">
                                            <span>মোট</span>
                                            <span>২৫০ টাকা</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Terms */}
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        required
                                        className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-600">
                                        আমি{' '}
                                        <a href="/usage-policy" className="text-red-500 hover:text-red-600">
                                            ব্যবহারের শর্তাবলী
                                        </a>{' '}
                                        এবং{' '}
                                        <a href="/privacy-policy" className="text-red-500 hover:text-red-700">
                                            গোপনীয়তা নীতি
                                        </a>{' '}
                                        সম্মত।
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="flex cursor-pointer items-center space-x-2 rounded-lg bg-red-500 px-8 py-3 text-white transition-colors hover:bg-red-600"
                                    >
                                        <CreditCard className="h-4 w-4" />
                                        <span>পেমেন্ট করুন</span>
                                    </button>
                                </div>
                            </form>
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

export default MembershipPage;
