/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import countries from '../../helpers/countriesIsoCodes';
import { Menu } from '../common/Menu';

export default function CountryPickList({ country, onChangeCountry, defaultCountry, continent, onChangeContinent, defaultContinent }) {
    const countryRef = useRef(null);

    // Set the default country when the Component is mounted
    useEffect(() => {
        if (defaultCountry) {
            onChangeCountry(defaultCountry);
        }
    }, [defaultCountry]);

    // Update the country when the continent changes
    useEffect(() => {
        onChangeCountry(countryRef.current.value);
    }, [continent]);

    const handleChangeCountry = (country) => {
        onChangeCountry(country);
    };

    const handleChangeContinent = (continent) => {
        onChangeContinent(continent);
    };

    return (
        <div className='country_select flex max-md:flex-col'>
            <Menu
                label='Continent'
                className='continent'
                data={Object.keys(countries).map((el) => ({ value: el, label: el }))}
                value={continent}
                onChange={handleChangeContinent}
                defaultValue={defaultContinent}
            />

            <Menu
                label='Pays'
                className='country'
                data={countries[continent ?? defaultContinent].map((el) => ({ value: el.code, label: el.name }))}
                value={country}
                onChange={handleChangeCountry}
                defaultValue={defaultCountry}
                ref={countryRef}
            />
        </div>
    );
}
