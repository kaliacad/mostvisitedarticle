import { useEffect, useState } from 'react';
import '../../styles/NavBar.css'; // Nous allons ajouter des styles pour la transition
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpToLine, faBook, faBug, faCode, faComment, faCopyright, faPager, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../common/LanguageSelector';

const NavBar = () => {
    const [helpMenuOpen, setHelpMenuOpen] = useState(false);
    const { t } = useTranslation();

    const toggleHelpMenu = () => {
        setHelpMenuOpen(!helpMenuOpen);
    };

    useEffect(() => {
        const closeHelpMenu = (event) => {
            if (helpMenuOpen && !event.target.closest('.help-menu')) {
                setHelpMenuOpen(false);
            }
        };

        window.addEventListener('mousedown', closeHelpMenu);

        return () => {
            window.removeEventListener('mousedown', closeHelpMenu);
        };
    }, [helpMenuOpen]);

    return (
        <nav className='fixed top-0 left-0 right-0 shadow-md z-50'>
            <div className='flex items-center justify-between bg-blue-800 h-16 px-6 py-2'>
                <a href='/'>
                    <div className='text-white text-xl font-bold'>
                        Emi <span className=' font-light max-md:hidden'>{t('nav.subtitle')}</span>
                    </div>
                </a>

                <div className='flex items-center justify-between gap-4'>
                    <ul className='flex items-center justify-center gap-4 text-white'>
                        <li>
                            <a href='/page-views' className=' text-white underline'>
                                <span className='max-md:hidden'>{t('nav.pageViews')}</span>
                                <span className='hidden max-md:block'>
                                    <FontAwesomeIcon icon={faPager} style={{ color: '#ffffff' }} />
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href='/top-africa' className=' text-white underline'>
                                <span className='max-md:hidden'>{t('nav.topAfrica')}</span>
                                <span className='hidden max-md:block'>
                                    <FontAwesomeIcon icon={faArrowsUpToLine} style={{ color: '#ffffff' }} />
                                </span>
                            </a>
                        </li>
                    </ul>
                    <LanguageSelector />
                    <div>
                        <button onClick={toggleHelpMenu} className='help-icon'>
                            {t('common.help')} ▼
                        </button>
                        {helpMenuOpen && (
                            <div className='help-menu absolute shadow-2xl right-1 rounded-xl bg-white'>
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
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
