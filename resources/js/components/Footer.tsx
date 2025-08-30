import React from 'react';
import { Facebook, Twitter, Youtube, Instagram, Mail, Phone } from 'lucide-react';
import { Link } from '@inertiajs/react';
import CTASection from './CTASection';
import { useTranslation } from '@/lib/useTranslation';
import { url } from '@/lib/helpers';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <CTASection />

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 md:gap-8 gap-4">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-4">
                {/* <span className="text-red-500">BBC</span> বাংলা */}
                <img src={url('/hksamacar-logo.png')} alt="logo" className="w-24 h-24 mb-4" />
              </h3>
              <p className="text-gray-400 mb-4">
                মাসিক হরেকৃষ্ণ সমাচার
                <br />পারমার্থিক নবজাগরণের মাসিক বার্তাবহ।
              </p>
              <div className="flex space-x-4">
                <a href="#" title={t('facebook')} className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" title={t('twitter')} className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" title={t('youtube')} className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" title={t('instagram')} className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col md:flex-row gap-x-0 md:gap-x-10">
              <div>
                <h4 className="text-lg font-semibold mb-4">কন্টেন্ট ও সেবা</h4>
                <ul className="space-y-2">
                  <li><Link href="/paper" className="text-gray-400 hover:text-white transition-colors">{t('paper')}</Link></li>
                  <li><Link href="/books" className="text-gray-400 hover:text-white transition-colors">{t('books')}</Link></li>
                  <li><Link href="/events" className="text-gray-400 hover:text-white transition-colors">{t('events')}</Link></li>
                  <li><Link href="/membership" className="text-gray-400 hover:text-white transition-colors">{t('membership')}</Link></li>
                  <li><Link href="/membership-status" className="text-gray-400 hover:text-white transition-colors">{t('membership_status')}</Link></li>
                  <li><Link href="/app-download" className="text-gray-400 hover:text-white transition-colors">{t('app_download')}</Link></li>
                </ul>
              </div>
              {/* Support & Legal */}

              <div>
                {/* <h4 className="text-lg font-semibold mb-4">সহায়তা ও আইনি</h4> */}
                <ul className="space-y-2 md:mt-11">
                  <li><Link href="/categories" className="text-gray-400 hover:text-white transition-colors">{t('categories')}</Link></li>
                  <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">{t('about_us')}</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">{t('contact')}</Link></li>
                  <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">{t('faq')}</Link></li>
                  {/* <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">{t('privacy_policy')}</Link></li>
                <li><Link to="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">{t('cookie_policy')}</Link></li>
                <li><Link to="/usage-policy" className="text-gray-400 hover:text-white transition-colors">{t('usage_policy')}</Link></li> */}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-semibold mb-4">{t('contact')}</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-400"><a href="mailto:info@hksamacar.com">info@hksamacar.com</a></span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-400"><a href="tel:+8801715758948">+৮৮০ ১৭১৫ ৭৫৮৯৪৮</a></span>
                </div>
              </div>
              <div className="mt-8 flex justify-around md:justify-start items-center space-x-3">              
                <img src="https://static.vecteezy.com/system/resources/thumbnails/050/703/262/small_2x/secure-connection-ssl-shield-protected-https-certificate-privacy-icon-ssl-safe-png.png" alt="gdpr compliant" className="w-22" />
                <img src="/images/dmca.svg" alt="dmca compliant" className="w-28" />
                {/* <img src="/images/pci_dss.png" alt="pci dss compliant" className="w-24" /> */}
                <img src="/images/gdpr.png" alt="gdpr compliant" className="w-14" />
                {/* <img src="https://static.vecteezy.com/system/resources/thumbnails/050/703/272/small_2x/secure-connection-ssl-shield-protected-https-certificate-privacy-icon-ssl-safe-png.png" alt="gdpr compliant" className="w-12" /> */}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 sm:pt-8 mt-8 pt-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} মাসিক হরেকৃষ্ণ সমাচার। সর্বস্বত্ব সংরক্ষিত।
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t('privacy_policy')}
                </Link>
                <Link href="/usage-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {t('usage_policy')}
                </Link>
                <Link href="/cookie-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
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