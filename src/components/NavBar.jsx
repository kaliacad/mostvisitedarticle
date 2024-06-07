import { useEffect, useState } from 'react';

import '../NavBar.css'; // Nous allons ajouter des styles pour la transition
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBug, faCode, faComment, faCopyright, faUsers } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
    const [helpMenuOpen, setHelpMenuOpen] = useState(false);

    const toggleHelpMenu = () => {
        setHelpMenuOpen(!helpMenuOpen);
    };

    // Fonction pour fermer le menu d'aide lorsqu'on clique en dehors
    const closeHelpMenu = (event) => {
        if (helpMenuOpen && !event.target.closest('.navbar-help')) {
            setHelpMenuOpen(false);
        }
    };

    // Ajouter l'écouteur d'événement au montage et le supprimer au démontage
    useEffect(() => {
        document.addEventListener('click', closeHelpMenu);
        return () => {
            document.removeEventListener('click', closeHelpMenu);
        };
    }, [helpMenuOpen]);

    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                Emi - <span className='font-normal'>articles les plus visités par pays</span>
            </div>
            <div className='navbar-help'>
                <button onClick={toggleHelpMenu} className='help-icon'>
                    Aide ▼
                </button>
                {helpMenuOpen && (
                    <div className='help-menu'>
                        <a href='https://meta.wikimedia.org/wiki/Emi_Solution' className='footer-link' target='_blank'>
                            <FontAwesomeIcon icon={faBook} /> Documentation
                        </a>
                        <a href='https://github.com/kaliacad/mostvisitedarticle' className='footer-link' target='_blank'>
                            <FontAwesomeIcon icon={faCode} /> View source
                        </a>
                        <a href='https://github.com/kaliacad/mostvisitedarticle/issues' className='footer-link' target='_blank'>
                            <FontAwesomeIcon icon={faBug} /> Report an issue
                        </a>
                        <a
                            href='https://meta.wikimedia.org/w/index.php?title=Talk:Emi_Solution&action=edit&redlink=1'
                            className='footer-link'
                            target='_blank'
                        >
                            <FontAwesomeIcon icon={faComment} /> Feedback
                        </a>
                        <a href='https://github.com/kaliacad.org/' className='footer-link' target='_blank'>
                            <FontAwesomeIcon icon={faUsers} /> Developed by Kali Academy
                        </a>
                        <a href='https://kaliacademy.org/' className='footer-link' target='_blank'>
                            <FontAwesomeIcon icon={faCopyright} /> Kali Academy
                        </a>
                    </div>
                )}
            </div>
            {/* <div className='navbar-search'>
                <input type='text' className={`search-input`} placeholder='Search...' />
                <button className='search-icon'>🔍</button>
            </div> */}
        </nav>
    );
};

export default NavBar;
