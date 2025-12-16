import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { Footer } from './footer';
import { toast, ToastContainer } from 'react-toastify';

export default function Layout({ children }) {
    const [featuredImage, setFeaturedImage] = useState('');

    useEffect(() => {
        async function fetchFeaturedImages() {
            try {
                const response = await fetch(
                    'https://commons.wikimedia.org/w/api.php?action=query&generator=categorymembers&gcmtitle=Category:Featured_pictures_on_Wikimedia_Commons&gcmtype=file&gcmlimit=10&prop=imageinfo&iiprop=url|thumbnail&iiurlwidth=1366&format=json&origin=*',
                );
                const data = await response.json();

                if (data.query && data.query.pages) {
                    const pages = data.query.pages;
                    const images = Object.keys(pages).map((key) => pages[key].imageinfo[0].thumburl);
                    const randomImage = images[Math.floor(Math.random() * images.length)];
                    setFeaturedImage(randomImage);
                }
            } catch (error) {
                toast.error('Error fetching the featured images', {
                    position: 'top-right',
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    autoClose: 5000,
                });
            }
        }

        fetchFeaturedImages();
        const intervalId = setInterval(fetchFeaturedImages, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='relative min-h-screen'>
            {/* Image de fond avec superposition sombre */}
            {featuredImage && (
                <>
                    <div className='bg-black opacity-60 -z-10 absolute top-0 left-0 w-full h-full'></div>
                    <img
                        src={featuredImage}
                        alt='background'
                        className='absolute w-full h-full top-0 left-0 -z-20 object-cover'
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </>
            )}

            {/* Contenu principal */}
            <main className='relative z-0'>
                <NavBar />
                <div className='main-content pb-16'>{children}</div>
                <Footer />
            </main>

            <ToastContainer />
        </div>
    );
}
