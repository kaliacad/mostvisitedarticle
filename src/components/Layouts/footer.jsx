import { faBook, faCode, faBug, faComment, faUsers, faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className='bg-white border-t md:fixed md:bottom-0 w-full'>
            <div className='max-w-7xl mx-auto px-4 py-3'>
                <div className='flex flex-wrap justify-center md:justify-between gap-4 text-sm'>
                    <FooterLink href='https://meta.wikimedia.org/wiki/Emi_Solution' icon={faBook} label={t('footer.documentation')} />
                    <FooterLink href='https://github.com/kaliacad/mostvisitedarticle' icon={faCode} label={t('footer.viewSource')} />
                    <FooterLink href='https://github.com/kaliacad/mostvisitedarticle/issues' icon={faBug} label={t('footer.reportIssue')} />
                    <FooterLink
                        href='https://meta.wikimedia.org/w/index.php?title=Talk:Emi_Solution&action=edit&redlink=1'
                        icon={faComment}
                        label={t('footer.feedback')}
                    />
                    <FooterLink href='https://github.com/kaliacad.org/' icon={faUsers} label={t('footer.developedBy')} />
                    <FooterLink href='https://kaliacademy.org/' icon={faCopyright} label={t('footer.kaliAcademy')} />
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ href, icon, label }) {
    return (
        <a href={href} target='_blank' className='flex items-center gap-2 text-gray-700 hover:text-blue-700 transition' rel='noreferrer'>
            <FontAwesomeIcon icon={icon} />
            <span className='hidden sm:inline'>{label}</span>
        </a>
    );
}
