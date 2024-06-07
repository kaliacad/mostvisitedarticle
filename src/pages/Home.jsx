// import { useState } from 'react';
// import CountryPickList from '../components/CountryPickList';
import NavBar from '../components/NavBar';
import { Footer } from '../components/footer';
import TopVisited from '../components/TopVisited';
import ArticleCardSkeletton from '../components/ArticleCardSkeletton';
// import ArticleForm from '../components/ArticleForm';

export default function Home() {
    // const [country, setCountry] = useState();
    // const [continent, setContinent] = useState();

    return (
        <div className='min-h-screen relative'>
            <header className='fixed top-0 w-full'>
                <NavBar />
            </header>
            <main className='px-9 pt-24'>
                <ArticleCardSkeletton />
                {/* <CountryPickList
                    label={'Select a Country'}
                    continent={continent}
                    onChangeContinent={(continent) => setContinent(continent)}
                    defaultContinent='Africa'
                    country={country}
                    onChangeCountry={(country) => setCountry(country)}
                    defaultCountry={'CD'}
                /> */}

                <TopVisited />
            </main>
            <footer className='relative w-full bottom-0'>
                <Footer />
            </footer>
        </div>
    );
}
