import { useEffect, useState } from 'react';
import '../../styles/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBug, faCode, faComment, faCopyright, faUsers, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../common/LanguageSelector';

const NavBar = () => {
    const [helpMenuOpen, setHelpMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const closeMenus = (event) => {
            if (!event.target.closest('.help-menu') && !event.target.closest('.help-icon')) {
                setHelpMenuOpen(false);
            }

            if (!event.target.closest('.mobile-menu') && !event.target.closest('.mobile-toggle')) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('mousedown', closeMenus);
        return () => window.removeEventListener('mousedown', closeMenus);
    }, []);

    return (
        <nav className='fixed top-0 left-0 right-0 shadow-md z-50 bg-blue-800'>
            <div className='flex items-center justify-between h-16 px-4 md:px-6'>
                {/* Logo */}
                <a href='/' className='text-white text-xl font-bold'>
                    Emi <span className='font-light hidden md:inline'>{t('nav.subtitle')}</span>
                </a>

                {/* Desktop Menu */}
                <div className='hidden md:flex items-center gap-4'>
                    <a href='/page-views' className='text-white underline'>
                        {t('nav.pageViews')}
                    </a>
                    <a href='/top-africa' className='text-white underline'>
                        {t('nav.topAfrica')}
                    </a>
                    <LanguageSelector />
                    <button onClick={() => setHelpMenuOpen(!helpMenuOpen)} className='help-icon text-white'>
                        {t('common.help')} ▼
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button className='md:hidden text-white text-xl mobile-toggle' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} />
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className='mobile-menu md:hidden bg-blue-700 px-4 py-3 space-y-3 text-white'>
                    <a href='/page-views' className='block underline'>
                        {t('nav.pageViews')}
                    </a>
                    <a href='/top-africa' className='block underline'>
                        {t('nav.topAfrica')}
                    </a>

                    <LanguageSelector />

                    <button onClick={() => setHelpMenuOpen(!helpMenuOpen)} className='block w-full text-left'>
                        {t('common.help')} ▼
                    </button>
                </div>
            )}

            {/* Help Menu */}
            {helpMenuOpen && (
                <div className='help-menu absolute right-2 mt-2 rounded-xl bg-white shadow-2xl w-56'>
                    <a href='https://meta.wikimedia.org/wiki/Emi_Solution' className='footer-link' target='_blank'>
                        <FontAwesomeIcon icon={faBook} /> {t('common.documentation')}
                    </a>
                    <a href='https://github.com/kaliacad/mostvisitedarticle' className='footer-link' target='_blank'>
                        <FontAwesomeIcon icon={faCode} /> {t('common.viewSource')}
                    </a>
                    <a href='https://github.com/kaliacad/mostvisitedarticle/issues' className='footer-link' target='_blank'>
                        <FontAwesomeIcon icon={faBug} /> {t('common.reportIssue')}
                    </a>
                    <a
                        href='https://meta.wikimedia.org/w/index.php?title=Talk:Emi_Solution&action=edit&redlink=1'
                        className='footer-link'
                        target='_blank'
                    >
                        <FontAwesomeIcon icon={faComment} /> {t('common.feedback')}
                    </a>
                    <a href='https://github.com/kaliacad.org/' className='footer-link' target='_blank'>
                        <FontAwesomeIcon icon={faUsers} /> {t('common.developedBy')}
                    </a>
                    <a href='https://kaliacademy.org/' className='footer-link' target='_blank'>
                        <FontAwesomeIcon icon={faCopyright} /> {t('common.kaliAcademy')}
                    </a>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
