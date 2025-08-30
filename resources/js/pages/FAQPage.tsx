import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import HomeLayout from '@/layouts/home-layout';

type FaqInterface = {
  id: number;
  question: string;
  answer: string;
  category: string;
};


type FAQProps = {
  title: string;
  questions: FaqInterface[];
}

const FAQPage: React.FC<{ faqs: FAQProps[] }> = ({ faqs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);


  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <HomeLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 border-b-4 border-red-600 pb-4 mb-6">
            প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ)
          </h1>
          <p className="text-gray-600 text-lg">
            হরেকৃষ্ণ সমাচার সম্পর্কে আপনার সাধারণ প্রশ্নের উত্তর খুঁজে নিন
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Search Box */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="প্রশ্ন খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:!outline-0 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* FAQ Categories */}
            <div className="space-y-8">
              {filteredFAQs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <HelpCircle className="w-6 h-6 mr-2 text-red-500" />
                    {category.title}
                  </h2>

                  <div className="space-y-4">
                    {category.questions.map((faq) => (
                      <div key={faq.id} className="border border-gray-200 rounded-lg focus-within:ring-1 focus-within:ring-red-500">
                        <button
                          onClick={() => toggleItem(faq.id)}
                          className="w-full flex items-center justify-between p-4 text-left rounded-lg hover:bg-gray-50 transition-colors !outline-0"
                        >
                          <span className="font-medium text-gray-900">{faq.question}</span>
                          {openItems.includes(faq.id) ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </button>

                        {openItems.includes(faq.id) && (
                          <div className="px-4 pb-4">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Support */}
            <div className="mt-8 bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                আপনার প্রশ্নের উত্তর পাননি?
              </h3>
              <p className="text-gray-600 mb-4">
                আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন। আমরা আপনাকে সাহায্য করতে প্রস্তুত।
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                  সাপোর্টে যোগাযোগ করুন
                </button>
                <button className="border border-red-600 text-red-500 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors">
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