import React, { useActionState, useEffect, useRef, useState } from 'react';
import { Mail, Bell, Smartphone, Loader2Icon } from 'lucide-react';
import { api } from '@/hooks/use-api';
import { route } from 'ziggy-js';
import { Turnstile } from '@marsidev/react-turnstile'

const CTASection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileResponse, setTurnstileResponse] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const turnstileKey = document.querySelector('meta[name="turnstile-key"]')?.getAttribute('content');
  const turnstileWidgetId = useRef<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {

      const { data } = await api.post(route('api.subscription.subscribe'), {
        email,
        // 'turnstile-response': response,
      });
      if (data.success) {
        setSuccess(true);
        setEmail('');
      } else {
        setError(data.message || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setError('An error occurred while subscribing. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   if ((window as any).turnstile && turnstileKey) {
  //     turnstileWidgetId.current = (window as any).turnstile.render('#cf-turnstile-container', {
  //       sitekey: turnstileKey,
  //       action: 'subscribe',
  //       size: 'invisible',
  //     });
  //   }
  // }

  const manageSubscribe = async (state: any, formData: FormData) => {
    console.log('Email:', formData.get("email") as string);
    console.log('Turnstile response:', formData.get("cf-turnstile-response") as string);
  }

  const [formState, subscribeAction] = useActionState(manageSubscribe, null)

  return (
    <section className="bg-gradient-to-r from-red-500 to-red-600 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
            সর্বশেষ সংবাদ পেতে যুক্ত হন
          </h2>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            গুরুত্বপূর্ণ সংবাদ ও আপডেট সবার আগে পেতে আমাদের সাথে যুক্ত থাকুন
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-white">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">নিউজলেটার</h3>
            <p className="text-red-100">দৈনিক সংবাদ সারাংশ ইমেইলে পান</p>
          </div>

          <div className="text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">পুশ নোটিফিকেশন</h3>
            <p className="text-red-100">ব্রেকিং নিউজ তাৎক্ষণিক পান</p>
          </div>

          <div className="text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">মোবাইল অ্যাপ</h3>
            <p className="text-red-100">যেকোনো সময় সংবাদ পড়ুন</p>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <form id='subscription-form' action={subscribeAction}>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                name='email'
                onChange={handleEmailChange}
                disabled={loading}
                required
                placeholder="আপনার ইমেইল ঠিকানা"
                className="bg-white flex-1 px-4 py-3 rounded-lg border-0 focus:!outline-orange-100"
              />
              <button className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors focus:!outline-orange-100" disabled={loading}>
                {loading && <Loader2Icon className="w-5 h-5 animate-spin" />}
                সাবস্ক্রাইব করুন
              </button>
            </div>
            {turnstileKey && <Turnstile siteKey={turnstileKey} as='aside'
              options={{
                size: 'invisible',
              }}              
              scriptOptions={{
                async: true,
                defer: true,
                appendTo: 'body'
              }} />}
          </form>
          {error && <p className="text-yellow-200 text-xs mt-2 text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-3 text-center">আপনার ইমেইলে সাবস্ক্রিপশন নিশ্চিতকরণ লিঙ্ক পাঠানো হয়েছে।</p>}
          <p className="text-red-100 text-sm mt-3 text-center">
            আমরা আপনার গোপনীয়তা রক্ষা করি। স্প্যাম পাঠাই না।
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;