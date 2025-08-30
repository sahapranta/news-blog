import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('বাংলা');

  const languages = [
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' }
  ];

  const handleLanguageChange = (language: any) => {
    setCurrentLanguage(language.name);
    setIsOpen(false);
    // Here you would implement actual language switching logic
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-red-500 p-2 rounded-lg transition-colors"
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium">{currentLanguage}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm font-medium text-gray-700">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;