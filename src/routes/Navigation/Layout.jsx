import { Link } from 'react-router-dom';

export default function Layout() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>About</Link>
                    </li>
                    <li>
                        <Link to='/More languages'>More languages</Link>
                    </li>
                    <li>
                        <Link to='/Feed'>Feed</Link>
                    </li>
                    <li>
                        <Link to='Blog'>Blog</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
