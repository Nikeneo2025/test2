import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' }
  ];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-600" />
      <Select value={i18n.language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-32">
          <SelectValue>
            <span className="flex items-center gap-2">
              <span>{currentLanguage.flag}</span>
              <span className="text-sm">{currentLanguage.name}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <span className="flex items-center gap-2">
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;

