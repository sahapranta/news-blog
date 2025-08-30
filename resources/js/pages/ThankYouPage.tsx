import HomeLayout from '@/layouts/home-layout';
import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, CheckCircle, Download, Facebook, Gift, Home, Linkedin, Mail, Phone, Share2, Twitter } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ThankYouPage: React.FC = () => {
    const [downloadStarted, setDownloadStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5);

    // Auto-start download after 3 seconds
    useEffect(() => {
        const downloadTimer = setTimeout(() => {
            startDownload();
        }, 3000);

        return () => clearTimeout(downloadTimer);
    }, []);

    // Countdown timer for redirect
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const startDownload = () => {
        setDownloadStarted(true);
        // Simulate file download
        const link = document.createElement('a');
        link.href = '#'; // In real app, this would be the actual file URL
        link.download = 'BBC_Bangla_Magazine_Latest.pdf';
        document.body.appendChild(link);
        // link.click();
        document.body.removeChild(link);
    };

    const shareUrl = window.location.origin;
    const shareText = 'হরেকৃষ্ণ সমাচার  সাথে যুক্ত হয়েছি! বিশ্বস্ত সংবাদ ও মানসম্পন্ন কন্টেন্টের জন্য।';

    const shareOnSocial = (platform: string) => {
        let url = '';
        switch (platform) {
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
                break;
        }
        window.open(url, '_blank', 'width=600,height=400');
    };

    return (
        <HomeLayout>
            <div className="mx-auto my-8 w-full max-w-2xl">
                {/* Success Message */}
                <div className="rounded-lg bg-white p-8 text-center shadow-xl">
                    <div className="mb-6">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle className="h-12 w-12 text-green-600" />
                        </div>
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">ধন্যবাদ!</h1>
                        <p className="text-lg text-gray-600">আপনার অনুরোধ সফলভাবে সম্পন্ন হয়েছে</p>
                    </div>

                    {/* Download Section */}
                    <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-6">
                        <h2 className="mb-3 flex items-center justify-center text-xl font-semibold text-blue-900">
                            <Download className="mr-2 h-6 w-6" />
                            ডাউনলোড শুরু হচ্ছে
                        </h2>

                        {!downloadStarted ? (
                            <div className="space-y-3">
                                <p className="text-blue-700">আপনার ডাউনলোড স্বয়ংক্রিয়ভাবে শুরু হবে...</p>
                                <div className="h-2 w-full rounded-full bg-blue-200">
                                    <div
                                        className="h-2 rounded-full bg-blue-600 transition-all duration-1000"
                                        style={{ width: `${((3 - timeLeft) / 3) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <p className="font-medium text-green-700">✓ ডাউনলোড শুরু হয়েছে!</p>
                                <p className="text-sm text-blue-700">যদি ডাউনলোড শুরু না হয়, নিচের বাটনে ক্লিক করুন</p>
                            </div>
                        )}

                        <button
                            onClick={startDownload}
                            className="mx-auto mt-4 flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                        >
                            <Download className="h-4 w-4" />
                            <span>ম্যানুয়াল ডাউনলোড</span>
                        </button>
                    </div>

                    {/* What's Next */}
                    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="rounded-lg bg-gray-50 p-4">
                            <Mail className="mx-auto mb-3 h-8 w-8 text-red-500" />
                            <h3 className="mb-2 font-semibold text-gray-900">ইমেইল চেক করুন</h3>
                            <p className="text-sm text-gray-600">আপনার ইমেইলে নিশ্চিতকরণ বার্তা পাঠানো হয়েছে</p>
                        </div>

                        <div className="rounded-lg bg-gray-50 p-4">
                            <Gift className="mx-auto mb-3 h-8 w-8 text-red-500" />
                            <h3 className="mb-2 font-semibold text-gray-900">বিশেষ অফার</h3>
                            <p className="text-sm text-gray-600">নতুন সদস্যদের জন্য বিশেষ ছাড় ও সুবিধা</p>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                        <h3 className="mb-3 font-semibold text-yellow-800">সহায়তা প্রয়োজন?</h3>
                        <div className="flex flex-col items-center justify-center space-y-2 text-sm sm:flex-row sm:space-y-0 sm:space-x-6">
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-yellow-600" />
                                <span className="text-yellow-700">support@hksamacar.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-yellow-600" />
                                <span className="text-yellow-700">+৮৮০ ১৭১৫ ৭৫৮৯৪৮</span>
                            </div>
                        </div>
                    </div>

                    {/* Share Section */}
                    <div className="border-t pt-6">
                        <h3 className="mb-4 flex items-center justify-center font-semibold text-gray-900">
                            <Share2 className="mr-2 h-5 w-5" />
                            বন্ধুদের সাথে শেয়ার করুন
                        </h3>
                        <div className="mb-6 flex justify-center space-x-3">
                            <button
                                onClick={() => shareOnSocial('facebook')}
                                className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                            >
                                <Facebook className="h-4 w-4" />
                                <span>Facebook</span>
                            </button>
                            <button
                                onClick={() => shareOnSocial('twitter')}
                                className="flex items-center space-x-2 rounded-lg bg-blue-400 px-4 py-2 text-white transition-colors hover:bg-blue-500"
                            >
                                <Twitter className="h-4 w-4" />
                                <span>Twitter</span>
                            </button>
                            <button
                                onClick={() => shareOnSocial('linkedin')}
                                className="flex items-center space-x-2 rounded-lg bg-blue-700 px-4 py-2 text-white transition-colors hover:bg-blue-800"
                            >
                                <Linkedin className="h-4 w-4" />
                                <span>LinkedIn</span>
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 rounded-lg bg-red-600 px-6 py-3 text-white transition-colors hover:bg-red-700"
                        >
                            <Home className="h-4 w-4" />
                            <span>হোমপেজে ফিরুন</span>
                        </Link>

                        <Link
                            href="/books"
                            className="flex items-center space-x-2 rounded-lg border border-red-600 px-6 py-3 text-red-500 transition-colors hover:bg-red-50"
                        >
                            <span>আরও বই দেখুন</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Auto Redirect Notice */}
                    {timeLeft > 0 && <p className="mt-4 text-sm text-gray-500">{timeLeft} সেকেন্ড পর স্বয়ংক্রিয়ভাবে হোমপেজে চলে যাবে</p>}
                </div>

                {/* Additional Information */}
                <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="mb-4 flex items-center font-semibold text-gray-900">
                        <Calendar className="mr-2 h-5 w-5 text-red-500" />
                        পরবর্তী পদক্ষেপ
                    </h3>
                    <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-start space-x-3">
                            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                                <span className="text-xs font-bold text-red-500">১</span>
                            </div>
                            <span>আপনার ইমেইল ইনবক্স চেক করুন এবং নিশ্চিতকরণ লিংকে ক্লিক করুন</span>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                                <span className="text-xs font-bold text-red-500">২</span>
                            </div>
                            <span>আপনার অ্যাকাউন্ট সেটআপ সম্পূর্ণ করুন এবং প্রোফাইল আপডেট করুন</span>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                                <span className="text-xs font-bold text-red-500">৩</span>
                            </div>
                            <span>আমাদের মোবাইল অ্যাপ ডাউনলোড করুন যেকোনো সময় সংবাদ পড়ার জন্য</span>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default ThankYouPage;
