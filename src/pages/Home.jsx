// import { useState } from 'react';
// import CountryPickList from '../components/CountryPickList';
import NavBar from '../components/NavBar';
import { Footer } from '../components/footer';
import TopVisited from '../components/TopVisited';
// import ArticleForm from '../components/ArticleForm';

export default function Home() {
    // const [country, setCountry] = useState();
    // const [continent, setContinent] = useState();

    return (
        <>
            <header>
                <NavBar />
            </header>
            <main className="px-9 pt-10">
                {/* <CountryPickList
                    label={'Select a Country'}
                    continent={continent}
                    onChangeContinent={(continent) => setContinent(continent)}
                    defaultContinent='Africa'
                    country={country}
                    onChangeCountry={(country) => setCountry(country)}
                    defaultCountry={'CD'}
                /> */}

                <TopVisited  />
            </main>
            <footer style={{ position: 'absolute', bottom: 0, width: '100vw' }}>
                <Footer />
            </footer>
        </>
    );
}
