import NavBar from './NavBar';
// import { Footer } from './footer';

export default function Layout({ children }) {
    return (
        <div className='layout'>
            <NavBar />
            <div className='main-content'>{children}</div>
            {/* <Footer /> */}
        </div>
    );
}
