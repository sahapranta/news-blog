import React, { useRef, useState } from 'react';
import { Mail, Bell, Smartphone, Loader2, Loader2Icon } from 'lucide-react';
import { api } from '@/hooks/use-api';
import { route } from 'ziggy-js';
import { Turnstile } from '@marsidev/react-turnstile';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { toast } from 'sonner';
import { ApiError } from '@/types/model';

const CTASection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileKey = document.querySelector('meta[name="turnstile-key"]')?.getAttribute('content') || '';
  const emailInputRef = useRef<HTMLInputElement>(null);

  const openSubscriptionModal = () => {
    if (modalOpen) return;
    if (!email) {
      emailInputRef.current?.focus();
      return;
    }
    setModalOpen(true);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !turnstileToken) {
      setError('সঠিক ইমেইল দিন ও Turnstile যাচাই শেষ করুন।');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post(route('api.subscription.subscribe'), {
        name,
        email,
        'turnstile-response': turnstileToken,
      });

      if (data.success) {
        setSuccess(true);
        setEmail('');
        setName('');
        toast.success(data.message || 'সাবস্ক্রিপশনের সময় একটি সমস্যা হয়েছে।');
      } else {
        setError(data.message || 'সাবস্ক্রিপশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
        toast.error(data.message || 'সাবস্ক্রিপশনের সময় একটি সমস্যা হয়েছে।');
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      setError(apiError?.response?.data?.message || 'সাবস্ক্রিপশনের সময় একটি সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gradient-to-r from-red-500 to-red-600 py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              সর্বশেষ সংবাদ পেতে যুক্ত হন
            </h2>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              গুরুত্বপূর্ণ সংবাদ ও আপডেট সবার আগে পেতে আমাদের সাথে যুক্ত থাকুন
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: <Mail className="w-8 h-8" />, title: 'নিউজলেটার', desc: 'দৈনিক সংবাদ সারাংশ ইমেইলে পান' },
              { icon: <Bell className="w-8 h-8" />, title: 'পুশ নোটিফিকেশন', desc: 'ব্রেকিং নিউজ তাৎক্ষণিক পান' },
              { icon: <Smartphone className="w-8 h-8" />, title: 'মোবাইল অ্যাপ', desc: 'যেকোনো সময় সংবাদ পড়ুন' },
            ].map(({ icon, title, desc }, idx) => (
              <div className="text-center" key={idx}>
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-white">
                  {icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-red-100">{desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                ref={emailInputRef}
                placeholder="আপনার ইমেইল ঠিকানা"
                className="bg-white flex-1 px-4 py-3 rounded-lg border-0 focus:!outline-orange-100"
              />

              <button
                onClick={() => openSubscriptionModal()}
                type="button"
                className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors focus:!outline-orange-100" disabled={loading}
              >
                {loading && <Loader2Icon className="w-5 h-5 animate-spin mr-2" />}
                সাবস্ক্রাইব করুন
              </button>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white max-w-md w-full p-6 rounded-lg shadow-lg">
            <DialogTitle className="text-lg font-bold mb-4 text-center">
              সাবস্ক্রিপশন নিশ্চিত করুন
            </DialogTitle>

            {success ? (
              <>
                <img src="https://notioly.com/wp-content/uploads/2024/07/416.Data-Analyst.png" className='w-60 mx-auto' alt="image" />
                <p className="text-gray-700 text-center">
                  আপনার ইমেইলে সাবস্ক্রিপশন নিশ্চিতকরণ লিঙ্ক পাঠানো হয়েছে।
                </p>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="আপনার নাম"
                  className="w-full px-4 py-3 border rounded-lg !outline-0 focus:ring-2 focus:ring-red-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="আপনার ইমেইল ঠিকানা"
                  className="w-full px-4 py-3 border rounded-lg !outline-0 focus:ring-2 focus:ring-red-400"
                />
                <Turnstile
                  siteKey={turnstileKey}
                  onSuccess={(token) => setTurnstileToken(token)}
                  options={{ theme: 'light', size: 'flexible', action: 'subscribe' }}
                  scriptOptions={{ defer: true }}
                  className='rounded-lg'
                />
                {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : 'সাবস্ক্রাইব করুন'}
                </button>
              </form>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default CTASection;