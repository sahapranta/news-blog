import { url } from '@/lib/helpers';
import { useTranslation } from '@/lib/useTranslation';
import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Mail, Phone, Twitter, Youtube } from 'lucide-react';
import React from 'react';
import CTASection from './CTASection';

const Footer: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <CTASection />

            <footer className="bg-gray-900 text-white">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-6">
                        {/* Company Info */}
                        <div className="lg:col-span-2">
                            <h3 className="mb-4 text-xl font-bold">
                                {/* <span className="text-red-500">BBC</span> বাংলা */}
                                <img src={url('/hksamacar-logo.png')} alt="logo" className="mb-4 h-24 w-24" />
                            </h3>
                            <p className="mb-4 text-gray-400">
                                মাসিক হরেকৃষ্ণ সমাচার
                                <br />
                                পারমার্থিক নবজাগরণের মাসিক বার্তাবহ।
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" title={t('facebook')} className="text-gray-400 transition-colors hover:text-white">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="#" title={t('twitter')} className="text-gray-400 transition-colors hover:text-white">
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a href="#" title={t('youtube')} className="text-gray-400 transition-colors hover:text-white">
                                    <Youtube className="h-5 w-5" />
                                </a>
                                <a href="#" title={t('instagram')} className="text-gray-400 transition-colors hover:text-white">
                                    <Instagram className="h-5 w-5" />
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-x-0 md:flex-row md:gap-x-10 lg:col-span-2">
                            <div>
                                <h4 className="mb-4 text-lg font-semibold">কন্টেন্ট ও সেবা</h4>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/paper" className="text-gray-400 transition-colors hover:text-white">
                                            {t('paper')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/books" className="text-gray-400 transition-colors hover:text-white">
                                            {t('books')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/events" className="text-gray-400 transition-colors hover:text-white">
                                            {t('events')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/membership" className="text-gray-400 transition-colors hover:text-white">
                                            {t('membership')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/membership-status" className="text-gray-400 transition-colors hover:text-white">
                                            {t('membership_status')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/app-download" className="text-gray-400 transition-colors hover:text-white">
                                            {t('app_download')}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            {/* Support & Legal */}

                            <div>
                                {/* <h4 className="text-lg font-semibold mb-4">সহায়তা ও আইনি</h4> */}
                                <ul className="space-y-2 md:mt-11">
                                    <li>
                                        <Link href="/categories" className="text-gray-400 transition-colors hover:text-white">
                                            {t('categories')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about" className="text-gray-400 transition-colors hover:text-white">
                                            {t('about_us')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="text-gray-400 transition-colors hover:text-white">
                                            {t('contact')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/faq" className="text-gray-400 transition-colors hover:text-white">
                                            {t('faq')}
                                        </Link>
                                    </li>
                                    {/* <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">{t('privacy_policy')}</Link></li>
                <li><Link to="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">{t('cookie_policy')}</Link></li>
                <li><Link to="/usage-policy" className="text-gray-400 hover:text-white transition-colors">{t('usage_policy')}</Link></li> */}
                                </ul>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="lg:col-span-2">
                            <h4 className="mb-4 text-lg font-semibold">{t('contact')}</h4>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <Mail className="mr-2 h-4 w-4 text-gray-400" />
                                    <span className="text-gray-400">
                                        <a href="mailto:info@hksamacar.com">info@hksamacar.com</a>
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="mr-2 h-4 w-4 text-gray-400" />
                                    <span className="text-gray-400">
                                        <a href="tel:+8801715758948">+৮৮০ ১৭১৫ ৭৫৮৯৪৮</a>
                                    </span>
                                </div>
                            </div>
                            <div className="mt-8 flex items-center justify-around space-x-3 md:justify-start">
                                <img
                                    src="https://static.vecteezy.com/system/resources/thumbnails/050/703/262/small_2x/secure-connection-ssl-shield-protected-https-certificate-privacy-icon-ssl-safe-png.png"
                                    alt="gdpr compliant"
                                    className="w-22"
                                />
                                <img src="/images/dmca.svg" alt="dmca compliant" className="w-28" />
                                {/* <img src="/images/pci_dss.png" alt="pci dss compliant" className="w-24" /> */}
                                <img src="/images/gdpr.png" alt="gdpr compliant" className="w-14" />
                                {/* <img src="https://static.vecteezy.com/system/resources/thumbnails/050/703/272/small_2x/secure-connection-ssl-shield-protected-https-certificate-privacy-icon-ssl-safe-png.png" alt="gdpr compliant" className="w-12" /> */}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-800 pt-4 sm:pt-8">
                        <div className="flex flex-col items-center justify-between md:flex-row">
                            <p className="text-sm text-gray-400">© {new Date().getFullYear()} মাসিক হরেকৃষ্ণ সমাচার। সর্বস্বত্ব সংরক্ষিত।</p>
                            <div className="mt-4 flex space-x-6 md:mt-0">
                                <Link href="/privacy-policy" className="text-sm text-gray-400 transition-colors hover:text-white">
                                    {t('privacy_policy')}
                                </Link>
                                <Link href="/usage-policy" className="text-sm text-gray-400 transition-colors hover:text-white">
                                    {t('usage_policy')}
                                </Link>
                                <Link href="/cookie-policy" className="text-sm text-gray-400 transition-colors hover:text-white">
                                    {t('cookie_policy')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
