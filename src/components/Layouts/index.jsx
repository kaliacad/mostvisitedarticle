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
                const pages = data.query.pages;
                const images = Object.keys(pages).map((key) => pages[key].imageinfo[0].thumburl);
                const randomImage = images[Math.floor(Math.random() * images.length)];
                setFeaturedImage(randomImage);
            } catch (error) {
                toast.error('Error fetching the featured images', {
                    position: 'top-right',
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    autoClose: false,
                });
            }
        }
        fetchFeaturedImages();
    }, []);
    return (
        <>
            <main role='main' className=' relative'>
                <NavBar />
                <div className='main-content'>{children}</div>
                <Footer />
                <div className='bg-black opacity-60 -z-10  absolute top-0 left-0 w-full h-full'></div>
                <img src={featuredImage} alt='background image' className='absolute w-full h-full top-0 left-0 -z-20' />
            </main>
            <ToastContainer />
        </>
    );
}
