import { faBook, faCode, faBug, faComment, faUsers, faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Footer() {
    return (
        <footer className='footer fixed bottom-0 w-full bg-white max-md:relative max-md:text-center items-center'>
            <a href='https://meta.wikimedia.org/wiki/Emi_Solution' className='footer-link max-md:text-xs lg:flex items-center gap-2' target='_blank'>
                <FontAwesomeIcon icon={faBook} /> <span className='md:hidden block lg:block lg:text-sm'>Documentation</span>
            </a>
            <a
                href='https://github.com/kaliacad/mostvisitedarticle'
                className='footer-link max-md:text-xs lg:flex items-center gap-2'
                target='_blank'
            >
                <FontAwesomeIcon icon={faCode} /> <span className='md:hidden block lg:block lg:text-sm'>View source</span>
            </a>
            <a
                href='https://github.com/kaliacad/mostvisitedarticle/issues'
                className='footer-link max-md:text-xs lg:flex items-center gap-2'
                target='_blank'
            >
                <FontAwesomeIcon icon={faBug} /> <span className='md:hidden block lg:block lg:text-sm'>Report an issue</span>
            </a>
            <a
                href='https://meta.wikimedia.org/w/index.php?title=Talk:Emi_Solution&action=edit&redlink=1'
                className='footer-link max-md:text-xs lg:flex items-center gap-2'
                target='_blank'
            >
                <FontAwesomeIcon icon={faComment} /> <span className='md:hidden block lg:block'>Feedback</span>
            </a>
            <a href='https://github.com/kaliacad.org/' className='footer-link max-md:text-xs lg:flex items-center gap-2' target='_blank'>
                <FontAwesomeIcon icon={faUsers} /> <span className='md:hidden block lg:block lg:text-sm'>Developed by Kali Academy</span>
            </a>
            <a href='https://kaliacademy.org/' className='footer-link max-md:text-xs lg:flex items-center gap-2' target='_blank'>
                <FontAwesomeIcon icon={faCopyright} /> <span className='md:hidden block lg:block lg:text-sm'>Kali Academy</span>
            </a>
        </footer>
    );
}
