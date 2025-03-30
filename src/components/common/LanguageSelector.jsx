import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

export default function LanguageSelector() {
    const { i18n } = useTranslation();

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'Français' },
        { code: 'es', name: 'Español' },
        { code: 'de', name: 'Deutsch' },
        { code: 'it', name: 'Italiano' },
        { code: 'pt', name: 'Português' },
        { code: 'ru', name: 'Русский' },
        { code: 'ja', name: '日本語' },
        { code: 'zh', name: '中文' },
        { code: 'ar', name: 'العربية' },
        { code: 'hi', name: 'हिंदी' },
        { code: 'nl', name: 'Nederlands' },
        { code: 'sw', name: 'Kiswahili' },
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className='relative group'>
            <button className='flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-700 text-white hover:bg-blue-600 transition-colors duration-200'>
                <FontAwesomeIcon icon={faGlobe} className='text-sm' />
                <span className='text-sm'>{languages.find((lang) => lang.code === i18n.language)?.name || 'English'}</span>
            </button>
            <div className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 hidden group-hover:block z-50'>
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left px-4 py-2 text-sm ${
                            i18n.language === lang.code ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                        } transition-colors duration-200`}
                    >
                        {lang.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
