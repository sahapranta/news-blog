import Sidebar from '@/components/Sidebar';
import HomeLayout from '@/layouts/home-layout';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import React, { useState } from 'react';

type FaqInterface = {
    id: number;
    question: string;
    answer: string;
    category: string;
};

type FAQProps = {
    title: string;
    questions: FaqInterface[];
};

const FAQPage: React.FC<{ faqs: FAQProps[] }> = ({ faqs }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (id: number) => {
        setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    };

    const filteredFAQs = faqs
        .map((category) => ({
            ...category,
            questions: category.questions.filter(
                (q) => q.question.toLowerCase().includes(searchQuery.toLowerCase()) || q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
        }))
        .filter((category) => category.questions.length > 0);

    return (
        <HomeLayout>
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="mb-6 border-b-4 border-red-600 pb-4 text-3xl font-bold text-gray-900">প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ)</h1>
                    <p className="text-lg text-gray-600">হরেকৃষ্ণ সমাচার সম্পর্কে আপনার সাধারণ প্রশ্নের উত্তর খুঁজে নিন</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <div className="lg:col-span-3">
                        {/* Search Box */}
                        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="প্রশ্ন খুঁজুন..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-red-600 focus:!outline-0"
                                />
                            </div>
                        </div>

                        {/* FAQ Categories */}
                        <div className="space-y-8">
                            {filteredFAQs.map((category, categoryIndex) => (
                                <div key={categoryIndex} className="rounded-lg bg-white p-6 shadow-sm">
                                    <h2 className="mb-6 flex items-center text-xl font-semibold text-gray-900">
                                        <HelpCircle className="mr-2 h-6 w-6 text-red-500" />
                                        {category.title}
                                    </h2>

                                    <div className="space-y-4">
                                        {category.questions.map((faq) => (
                                            <div
                                                key={faq.id}
                                                className="rounded-lg border border-gray-200 focus-within:ring-1 focus-within:ring-red-500"
                                            >
                                                <button
                                                    onClick={() => toggleItem(faq.id)}
                                                    className="flex w-full items-center justify-between rounded-lg p-4 text-left !outline-0 transition-colors hover:bg-gray-50"
                                                >
                                                    <span className="font-medium text-gray-900">{faq.question}</span>
                                                    {openItems.includes(faq.id) ? (
                                                        <ChevronUp className="h-5 w-5 text-gray-500" />
                                                    ) : (
                                                        <ChevronDown className="h-5 w-5 text-gray-500" />
                                                    )}
                                                </button>

                                                {openItems.includes(faq.id) && (
                                                    <div className="px-4 pb-4">
                                                        <p className="leading-relaxed text-gray-600">{faq.answer}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact Support */}
                        <div className="mt-8 rounded-lg bg-gradient-to-r from-red-50 to-red-100 p-6">
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">আপনার প্রশ্নের উত্তর পাননি?</h3>
                            <p className="mb-4 text-gray-600">আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন। আমরা আপনাকে সাহায্য করতে প্রস্তুত।</p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <button className="rounded-lg bg-red-600 px-6 py-3 text-white transition-colors hover:bg-red-700">
                                    সাপোর্টে যোগাযোগ করুন
                                </button>
                                <button className="rounded-lg border border-red-600 px-6 py-3 text-red-500 transition-colors hover:bg-red-50">
                                    ইমেইল পাঠান
                                </button>
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

export default FAQPage;
