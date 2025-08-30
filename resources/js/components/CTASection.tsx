import { api } from '@/hooks/use-api';
import { ApiError } from '@/types/model';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Turnstile } from '@marsidev/react-turnstile';
import { Bell, Loader2, Loader2Icon, Mail, Smartphone } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

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
            <section className="relative bg-gradient-to-r from-red-500 to-red-600 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-xl font-bold text-white md:text-2xl">সর্বশেষ সংবাদ পেতে যুক্ত হন</h2>
                        <p className="mx-auto max-w-2xl text-xl text-red-100">গুরুত্বপূর্ণ সংবাদ ও আপডেট সবার আগে পেতে আমাদের সাথে যুক্ত থাকুন</p>
                    </div>

                    <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {[
                            { icon: <Mail className="h-8 w-8" />, title: 'নিউজলেটার', desc: 'দৈনিক সংবাদ সারাংশ ইমেইলে পান' },
                            { icon: <Bell className="h-8 w-8" />, title: 'পুশ নোটিফিকেশন', desc: 'ব্রেকিং নিউজ তাৎক্ষণিক পান' },
                            { icon: <Smartphone className="h-8 w-8" />, title: 'মোবাইল অ্যাপ', desc: 'যেকোনো সময় সংবাদ পড়ুন' },
                        ].map(({ icon, title, desc }, idx) => (
                            <div className="text-center" key={idx}>
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white">
                                    {icon}
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
                                <p className="text-red-100">{desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mx-auto max-w-md">
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <input
                                type="email"
                                value={email}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                required
                                ref={emailInputRef}
                                placeholder="আপনার ইমেইল ঠিকানা"
                                className="flex-1 rounded-lg border-0 bg-white px-4 py-3 focus:!outline-orange-100"
                            />

                            <button
                                onClick={() => openSubscriptionModal()}
                                type="button"
                                className="rounded-lg bg-white px-6 py-3 font-semibold text-red-500 transition-colors hover:bg-gray-100 focus:!outline-orange-100"
                                disabled={loading}
                            >
                                {loading && <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />}
                                সাবস্ক্রাইব করুন
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <DialogTitle className="mb-4 text-center text-lg font-bold">সাবস্ক্রিপশন নিশ্চিত করুন</DialogTitle>

                        {success ? (
                            <>
                                <img src="https://notioly.com/wp-content/uploads/2024/07/416.Data-Analyst.png" className="mx-auto w-60" alt="image" />
                                <p className="text-center text-gray-700">আপনার ইমেইলে সাবস্ক্রিপশন নিশ্চিতকরণ লিঙ্ক পাঠানো হয়েছে।</p>
                            </>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="আপনার নাম"
                                    className="w-full rounded-lg border px-4 py-3 !outline-0 focus:ring-2 focus:ring-red-400"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="আপনার ইমেইল ঠিকানা"
                                    className="w-full rounded-lg border px-4 py-3 !outline-0 focus:ring-2 focus:ring-red-400"
                                />
                                <Turnstile
                                    siteKey={turnstileKey}
                                    onSuccess={(token) => setTurnstileToken(token)}
                                    options={{ theme: 'light', size: 'flexible', action: 'subscribe' }}
                                    scriptOptions={{ defer: true }}
                                    className="rounded-lg"
                                />
                                {error && <p className="text-center text-sm text-red-600">{error}</p>}
                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-red-600 py-3 text-white transition hover:bg-red-700"
                                    disabled={loading}
                                >
                                    {loading ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : 'সাবস্ক্রাইব করুন'}
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
