import React, { useState } from 'react';
import {
  Search,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  MapPin,
  Package,
  Truck,
  CreditCard,
  RefreshCw
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import HomeLayout from '@/layouts/home-layout';
import { Input } from '@/components/ui/input';

type MembershipInterface = {
  id: string,
  name: string,
  email: string,
  phone: string,
  address: string,
  status: string,
  startDate: string,
  endDate: string,
  paymentStatus: string,
  paymentMethod: string,
  transactionId: string,
  deliveryStatus: string,
  lastDelivery: string,
  nextDelivery: string,
  totalIssues: number,
  deliveredIssues: number,
  remainingIssues: number
}

const MembershipStatusPage: React.FC = () => {
  const [membershipId, setMembershipId] = useState('');
  const [membershipData, setMembershipData] = useState<MembershipInterface | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock membership data
  const mockMembershipData = {
    'MEM001': {
      id: 'MEM001',
      name: 'মোহাম্মদ রহিম',
      email: 'rahim@example.com',
      phone: '+৮৮০ ১৭১৫ ৭৫৮৯৪৮',
      address: 'বাড়ি নং ১২৩, রোড নং ৫, ধানমন্ডি, ঢাকা-১২০৫',
      status: 'active',
      startDate: '২০২৪-০১-১৫',
      endDate: '২০২৫-০১-১৪',
      paymentStatus: 'paid',
      paymentMethod: 'বিকাশ',
      transactionId: 'TXN123456789',
      deliveryStatus: 'delivered',
      lastDelivery: '২০২৪-১২-০১',
      nextDelivery: '২০২৫-০১-০১',
      totalIssues: 12,
      deliveredIssues: 11,
      remainingIssues: 1
    },
    'MEM002': {
      id: 'MEM002',
      name: 'ফাতেমা খাতুন',
      email: 'fatema@example.com',
      phone: '+৮৮০ ১৭১২ ৯৮৭৬৫৪',
      address: 'ফ্ল্যাট নং ৪বি, বিল্ডিং নং ৭, গুলশান-২, ঢাকা-১২১২',
      status: 'expired',
      startDate: '২০২৩-০৬-১০',
      endDate: '২০২৪-০৬-০৯',
      paymentStatus: 'pending',
      paymentMethod: 'নগদ',
      transactionId: 'TXN987654321',
      deliveryStatus: 'pending',
      lastDelivery: '২০২৪-০৫-০১',
      nextDelivery: 'N/A',
      totalIssues: 12,
      deliveredIssues: 12,
      remainingIssues: 0
    },
    'MEM003': {
      id: 'MEM003',
      name: 'আহমেদ হাসান',
      email: 'ahmed@example.com',
      phone: '+৮৮০ ১৭১২ ১১২২৩৩',
      address: 'বাড়ি নং ৪৫, সেক্টর ৭, উত্তরা, ঢাকা-১২৩০',
      status: 'active',
      startDate: '২০২৪-০৩-২০',
      endDate: '২০২৫-০৩-১৯',
      paymentStatus: 'paid',
      paymentMethod: 'রকেট',
      transactionId: 'TXN456789123',
      deliveryStatus: 'shipped',
      lastDelivery: '২০২৪-১১-০১',
      nextDelivery: '২০২৪-১২-০১',
      totalIssues: 12,
      deliveredIssues: 9,
      remainingIssues: 3
    }
  };

  const handleSearch = async () => {
    if (!membershipId.trim()) {
      setError('অনুগ্রহ করে সদস্যপদ আইডি প্রবেশ করান');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const data = mockMembershipData[membershipId as keyof typeof mockMembershipData];
      if (data) {
        setMembershipData(data);
        setError('');
      } else {
        setMembershipData(null);
        setError('এই আইডি দিয়ে কোনো সদস্যপদ পাওয়া যায়নি');
      }
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'expired':
        return 'text-red-500 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'সক্রিয়';
      case 'expired':
        return 'মেয়াদ শেষ';
      case 'pending':
        return 'অপেক্ষমাণ';
      default:
        return 'অজানা';
    }
  };

  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'shipped':
        return 'text-blue-600 bg-blue-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getDeliveryStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'ডেলিভার হয়েছে';
      case 'shipped':
        return 'পাঠানো হয়েছে';
      case 'pending':
        return 'অপেক্ষমাণ';
      default:
        return 'অজানা';
    }
  };

  return (
    <HomeLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 border-b-4 border-red-600 pb-4 mb-6">
            সদস্যপদ স্ট্যাটাস চেক
          </h1>
          <p className="text-gray-600 text-lg">
            আপনার সদস্যপদ আইডি দিয়ে বর্তমান স্ট্যাটাস ও ডেলিভারি তথ্য দেখুন
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Search Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Search className="w-6 h-6 mr-2 text-red-500" />
                সদস্যপদ খুঁজুন
              </h2>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    type="search"
                    value={membershipId}
                    onChange={(e) => setMembershipId(e.target.value)}
                    placeholder="আপনার সদস্যপদ আইডি প্রবেশ করান (যেমন: MEM001)"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="!outline-0 focus:!ring-2 focus:!ring-red-500 h-12"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="flex items-center space-x-2 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:bg-red-500/50"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  <span>{loading ? 'খুঁজছি...' : 'খুঁজুন'}</span>
                </button>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700">{error}</span>
                  </div>
                </div>
              )}

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">টেস্ট করার জন্য:</h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• <strong>MEM001</strong> - সক্রিয় সদস্যপদ</p>
                  <p>• <strong>MEM002</strong> - মেয়াদ শেষ সদস্যপদ</p>
                  <p>• <strong>MEM003</strong> - সক্রিয় সদস্যপদ (শিপিং)</p>
                </div>
              </div>
            </div>

            {/* Membership Details */}
            {membershipData && (
              <div className="space-y-8">
                {/* Status Overview */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">সদস্যপদ তথ্য</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(membershipData.status)}`}>
                        {membershipData.status === 'active' ? (
                          <CheckCircle className="w-4 h-4 mr-1" />
                        ) : (
                          <XCircle className="w-4 h-4 mr-1" />
                        )}
                        {getStatusText(membershipData.status)}
                      </div>
                      <p className="text-gray-600 text-sm mt-2">সদস্যপদ স্ট্যাটাস</p>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{membershipData.deliveredIssues}/{membershipData.totalIssues}</div>
                      <p className="text-gray-600 text-sm">ডেলিভার হয়েছে</p>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-500">{membershipData.remainingIssues}</div>
                      <p className="text-gray-600 text-sm">বাকি আছে</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <User className="w-5 h-5 mr-2 text-red-500" />
                        ব্যক্তিগত তথ্য
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">নাম:</span>
                          <span className="font-medium">{membershipData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">ইমেইল:</span>
                          <span className="font-medium">{membershipData.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">ফোন:</span>
                          <span className="font-medium">{membershipData.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-red-500" />
                        সদস্যপদ মেয়াদ
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">শুরু:</span>
                          <span className="font-medium">{membershipData.startDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">শেষ:</span>
                          <span className="font-medium">{membershipData.endDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">আইডি:</span>
                          <span className="font-medium">{membershipData.id}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Package className="w-6 h-6 mr-2 text-red-500" />
                    ডেলিভারি তথ্য
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-red-500" />
                        ডেলিভারি ঠিকানা
                      </h3>
                      <p className="text-gray-600 text-sm">{membershipData.address}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Truck className="w-5 h-5 mr-2 text-red-500" />
                        ডেলিভারি স্ট্যাটাস
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">বর্তমান স্ট্যাটাস:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getDeliveryStatusColor(membershipData.deliveryStatus)}`}>
                            {getDeliveryStatusText(membershipData.deliveryStatus)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">শেষ ডেলিভারি:</span>
                          <span className="font-medium">{membershipData.lastDelivery}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">পরবর্তী ডেলিভারি:</span>
                          <span className="font-medium">{membershipData.nextDelivery}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <CreditCard className="w-6 h-6 mr-2 text-red-500" />
                    পেমেন্ট তথ্য
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">পেমেন্ট স্ট্যাটাস:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${membershipData.paymentStatus === 'paid'
                          ? 'text-green-600 bg-green-100'
                          : 'text-yellow-600 bg-yellow-100'
                          }`}>
                          {membershipData.paymentStatus === 'paid' ? 'পরিশোধিত' : 'অপেক্ষমাণ'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">পেমেন্ট পদ্ধতি:</span>
                        <span className="font-medium">{membershipData.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ট্রানজেকশন আইডি:</span>
                        <span className="font-medium">{membershipData.transactionId}</span>
                      </div>
                    </div>

                    {membershipData.status === 'expired' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2">সদস্যপদ নবায়ন করুন</h4>
                        <p className="text-yellow-700 text-sm mb-3">
                          আপনার সদস্যপদের মেয়াদ শেষ হয়ে গেছে। নবায়ন করে আবার সুবিধা উপভোগ করুন।
                        </p>
                        <a
                          href="/membership"
                          className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>নবায়ন করুন</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>
    </HomeLayout>
  );
};

export default MembershipStatusPage;