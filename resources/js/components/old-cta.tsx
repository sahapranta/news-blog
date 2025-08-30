import { Bell, Loader2Icon, Mail, Smartphone } from 'lucide-react';
import React, { useActionState, useState } from 'react';
// import { api } from '@/hooks/use-api';
// import { route } from 'ziggy-js';
import { Turnstile } from '@marsidev/react-turnstile';

const CTASection: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading] = useState(false);
    const [error] = useState<string | null>(null);
    // const [turnstileResponse, setTurnstileResponse] = useState<string | null>(null);
    const [success] = useState(false);
    const turnstileKey = document.querySelector('meta[name="turnstile-key"]')?.getAttribute('content');
    // const turnstileWidgetId = useRef<string | null>(null);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    // const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   if (!email) {
    //     setError('Please enter a valid email address.');
    //     return;
    //   }

    //   setLoading(true);
    //   setError(null);
    //   setSuccess(false);

    //   try {

    //     const { data } = await api.post(route('api.subscription.subscribe'), {
    //       email,
    //       // 'turnstile-response': response,
    //     });
    //     if (data.success) {
    //       setSuccess(true);
    //       setEmail('');
    //     } else {
    //       setError(data.message || 'Subscription failed. Please try again.');
    //     }
    //   } catch (err) {
    //     console.error('Subscription error:', err);
    //     setError('An error occurred while subscribing. Please try again later.');
    //   } finally {
    //     setLoading(false);
    //   }
    // };

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

    const manageSubscribe = async (state: unknown, formData: FormData) => {
        console.log('Email:', formData.get('email') as string);
        console.log('Turnstile response:', formData.get('cf-turnstile-response') as string);
    };

    const [formState, subscribeAction] = useActionState(manageSubscribe, null);

    console.log(formState);

    return (
        <section className="relative bg-gradient-to-r from-red-500 to-red-600 py-16">
            <div className="z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-xl font-bold text-white md:text-2xl">সর্বশেষ সংবাদ পেতে যুক্ত হন</h2>
                    <p className="mx-auto max-w-2xl text-xl text-red-100">গুরুত্বপূর্ণ সংবাদ ও আপডেট সবার আগে পেতে আমাদের সাথে যুক্ত থাকুন</p>
                </div>

                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white">
                            <Mail className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-white">নিউজলেটার</h3>
                        <p className="text-red-100">দৈনিক সংবাদ সারাংশ ইমেইলে পান</p>
                    </div>

                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                            <Bell className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-white">পুশ নোটিফিকেশন</h3>
                        <p className="text-red-100">ব্রেকিং নিউজ তাৎক্ষণিক পান</p>
                    </div>

                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                            <Smartphone className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-white">মোবাইল অ্যাপ</h3>
                        <p className="text-red-100">যেকোনো সময় সংবাদ পড়ুন</p>
                    </div>
                </div>

                <div className="mx-auto max-w-md">
                    <form id="subscription-form" action={subscribeAction}>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <input
                                type="email"
                                value={email}
                                name="email"
                                onChange={handleEmailChange}
                                disabled={loading}
                                required
                                placeholder="আপনার ইমেইল ঠিকানা"
                                className="flex-1 rounded-lg border-0 bg-white px-4 py-3 focus:!outline-orange-100"
                            />
                            <button
                                className="rounded-lg bg-white px-6 py-3 font-semibold text-red-500 transition-colors hover:bg-gray-100 focus:!outline-orange-100"
                                disabled={loading}
                            >
                                {loading && <Loader2Icon className="h-5 w-5 animate-spin" />}
                                সাবস্ক্রাইব করুন
                            </button>
                        </div>
                        {turnstileKey && (
                            <Turnstile
                                siteKey={turnstileKey}
                                as="aside"
                                options={{
                                    size: 'invisible',
                                }}
                                scriptOptions={{
                                    async: true,
                                    defer: true,
                                    appendTo: 'body',
                                }}
                            />
                        )}
                    </form>
                    {error && <p className="mt-2 text-center text-xs text-yellow-200">{error}</p>}
                    {success && <p className="mt-3 text-center text-sm text-green-500">আপনার ইমেইলে সাবস্ক্রিপশন নিশ্চিতকরণ লিঙ্ক পাঠানো হয়েছে।</p>}
                    <p className="mt-3 text-center text-sm text-red-100">আমরা আপনার গোপনীয়তা রক্ষা করি। স্প্যাম পাঠাই না।</p>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
