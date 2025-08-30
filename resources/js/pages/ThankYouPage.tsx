import React, { useEffect, useState } from 'react';
import {
  CheckCircle,
  Download,
  Mail,
  Phone,
  Calendar,
  Gift,
  ArrowRight,
  Home,
  Share2,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import HomeLayout from '@/layouts/home-layout';

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
      <div className="max-w-2xl w-full mx-auto my-8">
        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ধন্যবাদ!</h1>
            <p className="text-lg text-gray-600">
              আপনার অনুরোধ সফলভাবে সম্পন্ন হয়েছে
            </p>
          </div>

          {/* Download Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-3 flex items-center justify-center">
              <Download className="w-6 h-6 mr-2" />
              ডাউনলোড শুরু হচ্ছে
            </h2>

            {!downloadStarted ? (
              <div className="space-y-3">
                <p className="text-blue-700">
                  আপনার ডাউনলোড স্বয়ংক্রিয়ভাবে শুরু হবে...
                </p>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${((3 - timeLeft) / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-green-700 font-medium">
                  ✓ ডাউনলোড শুরু হয়েছে!
                </p>
                <p className="text-blue-700 text-sm">
                  যদি ডাউনলোড শুরু না হয়, নিচের বাটনে ক্লিক করুন
                </p>
              </div>
            )}

            <button
              onClick={startDownload}
              className="mt-4 flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
            >
              <Download className="w-4 h-4" />
              <span>ম্যানুয়াল ডাউনলোড</span>
            </button>
          </div>

          {/* What's Next */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <Mail className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">ইমেইল চেক করুন</h3>
              <p className="text-gray-600 text-sm">
                আপনার ইমেইলে নিশ্চিতকরণ বার্তা পাঠানো হয়েছে
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <Gift className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">বিশেষ অফার</h3>
              <p className="text-gray-600 text-sm">
                নতুন সদস্যদের জন্য বিশেষ ছাড় ও সুবিধা
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-3">সহায়তা প্রয়োজন?</h3>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-600" />
                <span className="text-yellow-700">support@hksamacar.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-yellow-600" />
                <span className="text-yellow-700">+৮৮০ ১৭১৫ ৭৫৮৯৪৮</span>
              </div>
            </div>
          </div>

          {/* Share Section */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-center">
              <Share2 className="w-5 h-5 mr-2" />
              বন্ধুদের সাথে শেয়ার করুন
            </h3>
            <div className="flex justify-center space-x-3 mb-6">
              <button
                onClick={() => shareOnSocial('facebook')}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </button>
              <button
                onClick={() => shareOnSocial('twitter')}
                className="flex items-center space-x-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
              >
                <Twitter className="w-4 h-4" />
                <span>Twitter</span>
              </button>
              <button
                onClick={() => shareOnSocial('linkedin')}
                className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>হোমপেজে ফিরুন</span>
            </Link>

            <Link
              href="/books"
              className="flex items-center space-x-2 border border-red-600 text-red-500 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors"
            >
              <span>আরও বই দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Auto Redirect Notice */}
          {timeLeft > 0 && (
            <p className="text-gray-500 text-sm mt-4">
              {timeLeft} সেকেন্ড পর স্বয়ংক্রিয়ভাবে হোমপেজে চলে যাবে
            </p>
          )}
        </div>

        {/* Additional Information */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-red-500" />
            পরবর্তী পদক্ষেপ
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-500 text-xs font-bold">১</span>
              </div>
              <span>আপনার ইমেইল ইনবক্স চেক করুন এবং নিশ্চিতকরণ লিংকে ক্লিক করুন</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-500 text-xs font-bold">২</span>
              </div>
              <span>আপনার অ্যাকাউন্ট সেটআপ সম্পূর্ণ করুন এবং প্রোফাইল আপডেট করুন</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-500 text-xs font-bold">৩</span>
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