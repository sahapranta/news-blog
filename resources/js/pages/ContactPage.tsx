import React, { useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Globe,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Loader2Icon
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import HomeLayout from '@/layouts/home-layout';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { toast } from 'sonner';
import { useForm } from '@inertiajs/react';
import { numberMapper } from '@/lib/helpers';

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

  const categories = [
    'সাধারণ',
    'সংবাদ সম্পর্কিত',
    'প্রযুক্তিগত সমস্যা',
    'সদস্যপদ',
    'বিজ্ঞাপন',
    'কপিরাইট',
    'অভিযোগ',
    'অন্যান্য'
  ];

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
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'ইমেইল',
      details: ['info@hksamacar.com', 'news@hksamacar.com'],
      description: 'সাধারণ যোগাযোগ ও সংবাদের জন্য'
    },
    {
      icon: Phone,
      title: 'ফোন',
      details: ['+৮৮০ ১৭১৫ ৭৫৮৯৪৮'],
      description: 'সকাল ৯টা থেকে সন্ধ্যা ৬টা (রবি-বৃহস্পতি)'
    },
    {
      icon: MapPin,
      title: 'ঠিকানা',
      details: ['মাসিক হরেকৃষ্ণ সমাচার', '৭৯ স্বামীবাগ, ঢাকা, বাংলাদেশ'],
      description: 'আমাদের প্রধান কার্যালয়'
    },
    {
      icon: Clock,
      title: 'কার্যসময়',
      details: ['রবি-বৃহস্পতি: ৯:০০ - ১৮:০০', 'শুক্রবার: ৯:০০ - ১৭:০০'],
      description: 'শনিবার বন্ধ'
    }
  ];

  const departments = [
    {
      name: 'সংবাদ বিভাগ',
      email: 'news@hksamacar.com',
      phone: '+৮৮০ ১৭১৫ ৭৫৮৯৪৮',
      description: 'সংবাদ পাঠানো ও সংবাদ সম্পর্কিত যোগাযোগ'
    },
    {
      name: 'প্রযুক্তি সহায়তা',
      email: 'support@hksamacar.com',
      phone: '+৮৮০ ১৭১৫ ৭৫৮৯৪৮',
      description: 'ওয়েবসাইট ও অ্যাপ সংক্রান্ত সমস্যা'
    },
    {
      name: 'সদস্যপদ সেবা',
      email: 'membership@hksamacar.com',
      phone: '+৮৮০ ১৭১৫ ৭৫৮৯৪৮',
      description: 'সদস্যপদ ও সাবস্ক্রিপশন সংক্রান্ত'
    },
    {
      name: 'বিজ্ঞাপন বিভাগ',
      email: 'ads@hksamacar.com',
      phone: '+৮৮০ ১৭১৫ ৭৫৮৯৪৮',
      description: 'বিজ্ঞাপন ও অংশীদারিত্ব'
    }
  ];

  return (
    <HomeLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 border-b-4 border-red-600 pb-4 mb-6">
            যোগাযোগ
          </h1>
          <p className="text-gray-600 text-lg">
            আমাদের সাথে যোগাযোগ করুন। আপনার মতামত, প্রশ্ন বা সহায়তার জন্য আমরা এখানে আছি।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-red-500" />
                আমাদের বার্তা পাঠান
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      আপনার নাম *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      // required
                      value={data.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:!outline-0 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="আপনার পূর্ণ নাম"
                    />
                    {errors.name && <div className='text-red-600 text-sm mt-0.5'>{errors.name}</div>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      ইমেইল ঠিকানা *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      // required
                      value={data.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:!outline-0 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="আপনার ইমেইল"
                    />
                    {errors.email && <div className='text-red-600 text-sm mt-0.5'>{errors.email}</div>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      ফোন নম্বর
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={data.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:!outline-0 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="আপনার ফোন নম্বর"
                    />
                    {errors.phone && <div className='text-red-600 text-sm mt-0.5'>{errors.phone}</div>}
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      বিষয়ের ধরন *
                    </label>
                    <select
                      id="category"
                      name="category"
                      // required
                      value={data.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:!outline-0 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && <div className='text-red-600 text-sm mt-0.5'>{errors.category}</div>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    বিষয় *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    // required
                    value={data.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:!outline-0 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="আপনার বার্তার বিষয়"
                  />
                  {errors.subject && <div className='text-red-600 text-sm mt-0.5'>{errors.subject}</div>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    বার্তা *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    // required
                    rows={6}
                    value={data.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:!outline-0 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="আপনার বার্তা বিস্তারিত লিখুন..."
                  ></textarea>
                  {errors.message && <div className='text-red-600 text-sm mt-0.5'>{errors.message}</div>}
                </div>
                {turnstileKey &&
                  <>
                    <div className="flex items-center justify-between">
                      <Turnstile ref={ref}
                        siteKey={turnstileKey} as='aside'
                        options={{ theme: 'light', size: 'normal' }}
                        scriptOptions={{ defer: true }}
                        onSuccess={(token) => setData('turnstile_response', token)}
                      />
                    </div>
                    {errors.turnstile_response && <div className='text-red-600 text-sm mb-0.5'>{errors.turnstile_response}</div>}
                  </>
                }
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    <span className='text-red-600 text-2xl'>*</span> চিহ্নিত ক্ষেত্রগুলো পূরণ করা আবশ্যক
                  </p>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    {processing ? (<Loader2Icon className="w-4 h-4" />) : (<Send className="w-4 h-4" />)}
                    <span>বার্তা পাঠান</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">যোগাযোগের তথ্য</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <info.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-700">{detail}</p>
                      ))}
                      <p className="text-sm text-gray-600 mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Departments */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2 text-red-500" />
                বিভাগীয় যোগাযোগ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {departments.map((dept, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{dept.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <a href={`mailto:${dept.email}`} className="text-red-500 hover:text-red-700">
                          {dept.email}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
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
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Globe className="w-6 h-6 mr-2 text-red-500" />
                সোশ্যাল মিডিয়া
              </h2>
              <p className="text-gray-600 mb-6">
                সোশ্যাল মিডিয়ায় আমাদের ফলো করুন এবং সর্বশেষ আপডেট পান
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a
                  href="#"
                  className="flex items-center justify-center space-x-2 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span>Facebook</span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center space-x-2 p-4 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Twitter</span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center space-x-2 p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                  <span>YouTube</span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center space-x-2 p-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
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