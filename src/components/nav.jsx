import MenuIcone from '../icones/menu.png';
import SearchIcone from '../icones/chercher.png';
export default function Navigation() {
    return (
        <nav id='navbar'>
            <p id='app_title'>MOSTE VISITED WIKIMEDIA ARTICLES</p>
            <div id='nav_icone'>
                <img src={MenuIcone} alt='menu_barre' />
                <img src={SearchIcone} alt='search_ingine' />
            </div>
        </nav>
    );
}
