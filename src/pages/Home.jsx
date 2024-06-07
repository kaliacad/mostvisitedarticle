import NavBar from '../components/NavBar';
import { Footer } from '../components/footer';

export default function Home() {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <main></main>
            <footer style={{ position: 'absolute', bottom: 0, width: '100vw' }}>
                <Footer />
            </footer>
        </>
    );
}
