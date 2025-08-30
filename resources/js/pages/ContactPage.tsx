import Sidebar from '@/components/Sidebar';
import HomeLayout from '@/layouts/home-layout';
import { numberMapper } from '@/lib/helpers';
import { useForm } from '@inertiajs/react';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { Clock, Facebook, Globe, Instagram, Loader2Icon, Mail, MapPin, MessageSquare, Phone, Send, Twitter, Users, Youtube } from 'lucide-react';
import React, { useRef } from 'react';
import { toast } from 'sonner';

const ContactPage: React.FC = () => {
    const ref = useRef<TurnstileInstance | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: 'সাধারণ',
        message: '',
        turnstile_response: '',
    });

    const turnstileKey = document.querySelector('meta[name="turnstile-key"]')?.getAttribute('content') || '';

    const categories = ['সাধারণ', 'সংবাদ সম্পর্কিত', 'প্রযুক্তিগত সমস্যা', 'সদস্যপদ', 'বিজ্ঞাপন', 'কপিরাইট', 'অভিযোগ', 'অন্যান্য'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        post(route('contact.store'), {
            onSuccess: () => {
                reset();
                toast.success('Your message has been sent successfully.');
                ref.current?.reset();
            },
            onError: (error) => {
                toast.error(error.message || 'Something went wrong. Please try again later.');
                ref.current?.reset();
            },
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'ইমেইল',
            details: ['info@hksamacar.com', 'news@hksamacar.com'],
            description: 'সাধারণ যোগাযোগ ও সংবাদের জন্য',
        },
        {
            icon: Phone,
            title: 'ফোন',
            details: ['+৮৮০ ১৭১৫ ৭৫৮৯৪৮'],
            description: 'সকাল ৯টা থেকে সন্ধ্যা ৬টা (রবি-বৃহস্পতি)',
        },
        {
            icon: MapPin,
            title: 'ঠিকানা',
            details: ['মাসিক হরেকৃষ্ণ সমাচার', '৭৯ স্বামীবাগ, ঢাকা, বাংলাদেশ'],
            description: 'আমাদের প্রধান কার্যালয়',
        },
        {
            icon: Clock,
            title: 'কার্যসময়',
            details: ['রবি-বৃহস্পতি: ৯:০০ - ১৮:০০', 'শুক্রবার: ৯:০০ - ১৭:০০'],
            description: 'শনিবার বন্ধ',
        },
    ];

    const departments = [
        {
            name: 'সংবাদ বিভাগ',
            email: 'news@hksamacar.com',
            phone: '+৮৮০ ১৭১৫ ৭৫৮৯৪৮',
            description: 'সংবাদ পাঠানো ও সংবাদ সম্পর্কিত যোগাযোগ',
        },
        {
            name: 'প্রযুক্তি সহায়তা',
            email: 'support@hksamacar.com',
            phone: '+৮৮০ ১৭১৫ ৭৫৮৯৪৮',
            description: 'ওয়েবসাইট ও অ্যাপ সংক্রান্ত সমস্যা',
        },
        {
            name: 'সদস্যপদ সেবা',
            email: 'membership@hksamacar.com',
            phone: '+৮৮০ ১৭১৫ ৭৫৮৯৪৮',
            description: 'সদস্যপদ ও সাবস্ক্রিপশন সংক্রান্ত',
        },
        {
            name: 'বিজ্ঞাপন বিভাগ',
            email: 'ads@hksamacar.com',
            phone: '+৮৮০ ১৭১৫ ৭৫৮৯৪৮',
            description: 'বিজ্ঞাপন ও অংশীদারিত্ব',
        },
    ];

    return (
        <HomeLayout>
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="mb-6 border-b-4 border-red-600 pb-4 text-3xl font-bold text-gray-900">যোগাযোগ</h1>
                    <p className="text-lg text-gray-600">আমাদের সাথে যোগাযোগ করুন। আপনার মতামত, প্রশ্ন বা সহায়তার জন্য আমরা এখানে আছি।</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <div className="lg:col-span-3">
                        {/* Contact Form */}
                        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                            <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
                                <MessageSquare className="mr-2 h-6 w-6 text-red-500" />
                                আমাদের বার্তা পাঠান
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                                            আপনার নাম *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            // required
                                            value={data.name}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-red-600 focus:!outline-0"
                                            placeholder="আপনার পূর্ণ নাম"
                                        />
                                        {errors.name && <div className="mt-0.5 text-sm text-red-600">{errors.name}</div>}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                                            ইমেইল ঠিকানা *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            // required
                                            value={data.email}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-red-600 focus:!outline-0"
                                            placeholder="আপনার ইমেইল"
                                        />
                                        {errors.email && <div className="mt-0.5 text-sm text-red-600">{errors.email}</div>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                                            ফোন নম্বর
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={data.phone}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-red-600 focus:!outline-0"
                                            placeholder="আপনার ফোন নম্বর"
                                        />
                                        {errors.phone && <div className="mt-0.5 text-sm text-red-600">{errors.phone}</div>}
                                    </div>

                                    <div>
                                        <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-700">
                                            বিষয়ের ধরন *
                                        </label>
                                        <select
                                            id="category"
                                            name="category"
                                            // required
                                            value={data.category}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-transparent focus:ring-2 focus:ring-red-600 focus:!outline-0"
                                        >
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category && <div className="mt-0.5 text-sm text-red-600">{errors.category}</div>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
                                        বিষয় *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        // required
                                        value={data.subject}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-transparent focus:ring-2 focus:ring-red-600 focus:!outline-0"
                                        placeholder="আপনার বার্তার বিষয়"
                                    />
                                    {errors.subject && <div className="mt-0.5 text-sm text-red-600">{errors.subject}</div>}
                                </div>

                                <div>
                                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                                        বার্তা *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        // required
                                        rows={6}
                                        value={data.message}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-600 focus:!outline-0"
                                        placeholder="আপনার বার্তা বিস্তারিত লিখুন..."
                                    ></textarea>
                                    {errors.message && <div className="mt-0.5 text-sm text-red-600">{errors.message}</div>}
                                </div>
                                {turnstileKey && (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <Turnstile
                                                ref={ref}
                                                siteKey={turnstileKey}
                                                as="aside"
                                                options={{ theme: 'light', size: 'normal' }}
                                                scriptOptions={{ defer: true }}
                                                onSuccess={(token) => setData('turnstile_response', token)}
                                            />
                                        </div>
                                        {errors.turnstile_response && <div className="mb-0.5 text-sm text-red-600">{errors.turnstile_response}</div>}
                                    </>
                                )}
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-600">
                                        <span className="text-2xl text-red-600">*</span> চিহ্নিত ক্ষেত্রগুলো পূরণ করা আবশ্যক
                                    </p>
                                    <button
                                        type="submit"
                                        className="flex items-center space-x-2 rounded-lg bg-red-600 px-8 py-3 text-white transition-colors hover:bg-red-700"
                                    >
                                        {processing ? <Loader2Icon className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                                        <span>বার্তা পাঠান</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">যোগাযোগের তথ্য</h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex items-start space-x-4 rounded-lg bg-gray-50 p-4">
                                        <div className="rounded-lg bg-red-100 p-3">
                                            <info.icon className="h-6 w-6 text-red-500" />
                                        </div>
                                        <div>
                                            <h3 className="mb-1 font-semibold text-gray-900">{info.title}</h3>
                                            {info.details.map((detail, idx) => (
                                                <p key={idx} className="text-gray-700">
                                                    {detail}
                                                </p>
                                            ))}
                                            <p className="mt-1 text-sm text-gray-600">{info.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Departments */}
                        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                            <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
                                <Users className="mr-2 h-6 w-6 text-red-500" />
                                বিভাগীয় যোগাযোগ
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {departments.map((dept, index) => (
                                    <div key={index} className="rounded-lg border border-gray-200 p-4">
                                        <h3 className="mb-2 font-semibold text-gray-900">{dept.name}</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <Mail className="h-4 w-4 text-gray-500" />
                                                <a href={`mailto:${dept.email}`} className="text-red-500 hover:text-red-700">
                                                    {dept.email}
                                                </a>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Phone className="h-4 w-4 text-gray-500" />
                                                <a href={`tel:${numberMapper(dept.phone)}`} className="text-red-500 hover:text-red-700">
                                                    {dept.phone}
                                                </a>
                                            </div>
                                            <p className="text-gray-600">{dept.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
                                <Globe className="mr-2 h-6 w-6 text-red-500" />
                                সোশ্যাল মিডিয়া
                            </h2>
                            <p className="mb-6 text-gray-600">সোশ্যাল মিডিয়ায় আমাদের ফলো করুন এবং সর্বশেষ আপডেট পান</p>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                <a
                                    href="#"
                                    className="flex items-center justify-center space-x-2 rounded-lg bg-blue-600 p-4 text-white transition-colors hover:bg-blue-700"
                                >
                                    <Facebook className="h-5 w-5" />
                                    <span>Facebook</span>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center justify-center space-x-2 rounded-lg bg-blue-400 p-4 text-white transition-colors hover:bg-blue-500"
                                >
                                    <Twitter className="h-5 w-5" />
                                    <span>Twitter</span>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center justify-center space-x-2 rounded-lg bg-red-600 p-4 text-white transition-colors hover:bg-red-700"
                                >
                                    <Youtube className="h-5 w-5" />
                                    <span>YouTube</span>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center justify-center space-x-2 rounded-lg bg-pink-600 p-4 text-white transition-colors hover:bg-pink-700"
                                >
                                    <Instagram className="h-5 w-5" />
                                    <span>Instagram</span>
                                </a>
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

export default ContactPage;
