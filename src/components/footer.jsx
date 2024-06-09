import { faBook, faCode, faBug, faComment, faUsers, faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Footer() {
    return (
        <footer className='footer absolute bottom-0 w-full'>
            <a href='https://meta.wikimedia.org/wiki/Emi_Solution' className='footer-link' target='_blank'>
                <FontAwesomeIcon icon={faBook} /> Documentation
            </a>
            <a href='https://github.com/kaliacad/mostvisitedarticle' className='footer-link' target='_blank'>
                <FontAwesomeIcon icon={faCode} /> View source
            </a>
            <a href='https://github.com/kaliacad/mostvisitedarticle/issues' className='footer-link' target='_blank'>
                <FontAwesomeIcon icon={faBug} /> Report an issue
            </a>
            <a href='https://meta.wikimedia.org/w/index.php?title=Talk:Emi_Solution&action=edit&redlink=1' className='footer-link' target='_blank'>
                <FontAwesomeIcon icon={faComment} /> Feedback
            </a>
            <a href='https://github.com/kaliacad.org/' className='footer-link' target='_blank'>
                <FontAwesomeIcon icon={faUsers} /> Developed by Kali Academy
            </a>
            <a href='https://kaliacademy.org/' className='footer-link' target='_blank'>
                <FontAwesomeIcon icon={faCopyright} /> Kali Academy
            </a>
        </footer>
    );
}
