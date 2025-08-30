import React, { useState } from 'react';
import {
  CreditCard,
  Check,
  Star,
  Gift,
  Truck,
  Calendar,
  BookOpen,
  Download,
  Bell,
  Shield,
  Users,
  Award
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import HomeLayout from '@/layouts/home-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const MembershipPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'bkash'
  });

  const benefits = [
    {
      icon: BookOpen,
      title: 'মাসিক পত্রিকা',
      description: 'প্রিমিয়াম কন্টেন্ট সহ মাসিক পত্রিকা ঘরে বসে পান'
    },
    {
      icon: Download,
      title: 'ডিজিটাল অ্যাক্সেস',
      description: 'সকল ডিজিটাল কন্টেন্ট ও বই ডাউনলোড করুন'
    },
    {
      icon: Bell,
      title: 'প্রাথমিক সংবাদ',
      description: 'গুরুত্বপূর্ণ সংবাদ সবার আগে পান'
    },
    {
      icon: Gift,
      title: 'বিশেষ ছাড়',
      description: 'ইভেন্ট ও বইয়ে বিশেষ ছাড় পান'
    },
    {
      icon: Users,
      title: 'এক্সক্লুসিভ কমিউনিটি',
      description: 'সদস্যদের বিশেষ গ্রুপে যোগ দিন'
    },
    {
      icon: Award,
      title: 'বিশেষ উৎসব',
      description: 'সদস্যদের জন্য বিশেষ ইভেন্টে অংশগ্রহণ'
    }
  ];

  const paymentMethods = [
    { id: 'bkash', name: 'বিকাশ', logo: '💳' },
    { id: 'nagad', name: 'নগদ', logo: '💰' },
    { id: 'rocket', name: 'রকেট', logo: '🚀' },
    { id: 'bank', name: 'ব্যাংক ট্রান্সফার', logo: '🏦' }
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
      [e.target.name]: e.target.value
    });
  };

  return (
    <HomeLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 border-b-4 border-red-600 pb-4 mb-6">
            সদস্যপদ
          </h1>
          <p className="text-gray-600 text-lg">
            হরেকৃষ্ণ সমাচার প্রিমিয়াম সদস্য হয়ে বিশেষ সুবিধা ও কন্টেন্ট উপভোগ করুন
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Membership Plan */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 mb-8 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Star className="w-6 h-6 fill-current" />
                    <span className="text-red-100">প্রিমিয়াম সদস্যপদ</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">বার্ষিক সাবস্ক্রিপশন</h2>
                  <div className="flex items-baseline space-x-2 mb-6">
                    <span className="text-4xl font-bold">২৫০</span>
                    <span className="text-xl">টাকা</span>
                    <span className="text-red-100">/বছর</span>
                  </div>
                  <p className="text-red-100 mb-6">
                    মাত্র ২৫০ টাকায় পুরো বছরের জন্য প্রিমিয়াম সদস্যপদ নিন এবং বিশেষ সুবিধা উপভোগ করুন।
                  </p>
                  <div className="flex items-center space-x-4">
                    <Truck className="w-5 h-5" />
                    <span>বাংলাদেশের যেকোনো জায়গায় ফ্রি ডেলিভারি</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-lg p-6">
                    <BookOpen className="w-16 h-16 text-white mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">মাসিক পত্রিকা</h3>
                    <p className="text-red-100">প্রিন্ট কপি ঘরে পৌঁছে যাবে</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">সদস্যপদের সুবিধা</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <benefit.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Membership Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-red-500" />
                সদস্যপদ ফর্ম
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">ব্যক্তিগত তথ্য</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        পূর্ণ নাম <span className='text-red-600'>*</span>
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className='px-4 py-3 h-12 focus:!outline-0 focus:!ring-2 focus:!ring-red-500'
                        placeholder="আপনার পূর্ণ নাম"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        ইমেইল ঠিকানা <span className='text-red-600'>*</span>
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className='px-4 py-3 h-12 focus:!outline-0 focus:!ring-2 focus:!ring-red-500'
                        placeholder="আপনার ইমেইল"
                      />

                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      মোবাইল নম্বর <span className='text-red-600'>*</span>
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className='px-4 py-3 h-12 focus:!outline-0 focus:!ring-2 focus:!ring-red-500'
                      placeholder="আপনার মোবাইল নম্বর"
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">ডেলিভারি ঠিকানা</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                        সম্পূর্ণ ঠিকানা <span className='text-red-600'>*</span>
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        required
                        rows={3}
                        value={formData.address}
                        onChange={handleInputChange}                        
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:!outline-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus:!ring-2 focus:!ring-red-500'
                        placeholder="বাড়ি/ফ্ল্যাট নম্বর, রাস্তা, এলাকা"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                          শহর <span className='text-red-600'>*</span>
                        </label>
                        <Input
                          type="text"
                          id="city"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          className='px-4 py-3 h-12 focus:!outline-0 focus:!ring-2 focus:!ring-red-500'
                          placeholder="আপনার শহর"
                        />
                      </div>

                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                          পোস্টাল কোড
                        </label>
                        <Input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className='px-4 py-3 h-12 focus:!outline-0 focus:!ring-2 focus:!ring-red-500'
                          placeholder="পোস্টাল কোড"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">পেমেন্ট পদ্ধতি</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === method.id
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
                          <div className="text-2xl mb-2">{method.logo}</div>
                          <div className="text-sm font-medium">{method.name}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">অর্ডার সারাংশ</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>বার্ষিক সদস্যপদ</span>
                      <span>২৫০ টাকা</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ডেলিভারি চার্জ</span>
                      <span className="text-green-600">ফ্রি</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
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
                    className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    আমি <a href="/usage-policy" className="text-red-500 hover:text-red-600">ব্যবহারের শর্তাবলী</a> এবং <a href="/privacy-policy" className="text-red-500 hover:text-red-700">গোপনীয়তা নীতি</a> সম্মত।
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
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