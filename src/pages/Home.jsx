import { useState } from 'react';
import CountryPickList from '../components/CountryPickList';
import NavBar from '../components/NavBar';
import { Footer } from '../components/footer';

export default function Home() {
    const [country, setCountry] = useState();
    const [continent, setContinent] = useState();

    return (
        <>
            <header>
                <NavBar />
            </header>
            <main>
                <CountryPickList
                    label={'Select a Country'}
                    country={country}
                    onChangeCountry={(country) => setCountry(country)}
                    defaultCountry={'CD'}
                    continent={continent}
                    onChangeContinent={(continent) => setContinent(continent)}
                    defaultContinent='Africa'
                />
            </main>
            <footer style={{ position: 'absolute', bottom: 0, width: '100vw' }}>
                <Footer />
            </footer>
        </>
    );
}
