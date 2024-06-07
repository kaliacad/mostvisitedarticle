import { useState } from 'react';
import '../NavBar.css'; // Nous allons ajouter des styles pour la transition
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBug, faCode, faComment, faCopyright, faUsers } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
    const [helpMenuOpen, setHelpMenuOpen] = useState(false);

    const toggleHelpMenu = () => {
        setHelpMenuOpen(!helpMenuOpen);
    };

    return (
        <nav className='navbar'>
            <div className='navbar-logo'>Most visited wikimedia articles</div>
            <div className='navbar-search'>
                <input type='text' className={`search-input`} placeholder='Search...' />
                <button className='search-icon'>🔍</button>
            </div>
            <div className='navbar-help'>
                <button onClick={toggleHelpMenu} className='help-icon'>
                    Aide ▼
                </button>
                {helpMenuOpen && (
                    <div className='help-menu'>
                        <a href='#' className='footer-link'>
                            <FontAwesomeIcon icon={faBook} /> Documentation
                        </a>
                        <a href='https://github.com/kaliacad/mostvisitedarticle' className='footer-link'>
                            <FontAwesomeIcon icon={faCode} /> View source
                        </a>
                        <a href='#' className='footer-link'>
                            <FontAwesomeIcon icon={faBug} /> Report an issue
                        </a>
                        <a href='#' className='footer-link'>
                            <FontAwesomeIcon icon={faComment} /> Feedback
                        </a>
                        <a href='https://kaliacademy.org/' className='footer-link'>
                            <FontAwesomeIcon icon={faUsers} /> Developed by Kali Academy
                        </a>
                        <a href='https://kaliacademy.org/' className='footer-link'>
                            <FontAwesomeIcon icon={faCopyright} /> Kali Academy
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
