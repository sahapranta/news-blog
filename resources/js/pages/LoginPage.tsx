import { Link } from '@inertiajs/react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt:', formData);
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <Link href="/" classID="text-center">
                        {/* <h1 className="text-3xl font-bold text-gray-900">
              <span className="text-red-600">Hksamacar</span> বাংলা
            </h1> */}
                        <img src="/hksamacar-logo.webp" alt="Logo" className="mt-1 h-9 w-auto" />
                    </Link>
                    <h2 className="mt-6 text-2xl font-bold text-gray-900">আপনার অ্যাকাউন্টে লগইন করুন</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        অথবা{' '}
                        <Link href="/register" className="font-medium text-red-600 hover:text-red-500">
                            নতুন অ্যাকাউন্ট তৈরি করুন
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                ইমেইল ঠিকানা
                            </label>
                            <div className="relative mt-1">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="relative block w-full appearance-none rounded-lg border border-gray-300 py-3 pr-3 pl-10 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:ring-red-500 focus:outline-none"
                                    placeholder="আপনার ইমেইল লিখুন"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                পাসওয়ার্ড
                            </label>
                            <div className="relative mt-1">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="relative block w-full appearance-none rounded-lg border border-gray-300 py-3 pr-10 pl-10 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:ring-red-500 focus:outline-none"
                                    placeholder="আপনার পাসওয়ার্ড লিখুন"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                আমাকে মনে রাখুন
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link href="/forgot-password" className="font-medium text-red-600 hover:text-red-500">
                                পাসওয়ার্ড ভুলে গেছেন?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-lg border border-transparent bg-red-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                        >
                            লগইন করুন
                        </button>
                    </div>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-gray-50 px-2 text-gray-500">অথবা</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button className="inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                                <span>Google</span>
                            </button>
                            <button className="inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                                <span>Facebook</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default LoginPage;
