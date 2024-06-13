import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { Footer } from './footer';

export default function Layout({ children }) {
    const [featuredImage, setFeaturedImage] = useState('');
    useEffect(() => {
        async function fetchFeaturedImages() {
            try {
                const response = await fetch(
                    'https://commons.wikimedia.org/w/api.php?action=query&generator=categorymembers&gcmtitle=Category:Featured_pictures_on_Wikimedia_Commons&gcmtype=file&gcmlimit=10&prop=imageinfo&iiprop=url|thumbnail&iiurlwidth=1366&format=json&origin=*',
                );
                const data = await response.json();
                const pages = data.query.pages;
                const images = Object.keys(pages).map((key) => pages[key].imageinfo[0].thumburl);
                const randomImage = images[Math.floor(Math.random() * images.length)];
                setFeaturedImage(randomImage);
            } catch (error) {
                window.alert('Error fetching the featured images:', error);
            }
        }
        fetchFeaturedImages();
    }, []);
    return (
        <main
            role='main'
            style={{
                backgroundImage: `url(${featuredImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
            className='layout'
        >
            <NavBar />
            <div className='main-content'>{children}</div>
            <Footer />
        </main>
    );
}
