import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { Footer } from './footer';

export default function Layout() {
    return (
        <div className='layout'>
            <NavBar />
            <div className='main-content'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
