import { ChevronDown, Globe } from 'lucide-react';
import React, { useState } from 'react';

const LanguageSwitcher: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('বাংলা');

    const languages = [
        { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
        { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    ];

    const handleLanguageChange = (language: { code?: string; name: string; flag?: string }) => {
        setCurrentLanguage(language.name);
        setIsOpen(false);
        // Here you would implement actual language switching logic
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 rounded-lg p-2 text-gray-700 transition-colors hover:text-red-500"
            >
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium">{currentLanguage}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            onClick={() => handleLanguageChange(language)}
                            className="flex w-full items-center space-x-3 px-4 py-2 text-left transition-colors hover:bg-gray-50"
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
