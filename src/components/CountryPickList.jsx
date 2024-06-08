/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import countries from '../helpers/countriesIsoCodes';
import { Menu } from './Menu';

export default function CountryPickList({ label, country, onChangeCountry, defaultCountry, continent, onChangeContinent, defaultContinent }) {
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
        <div className='country_select'>
            <p className='label'>{label}</p>
            <div className='select_options'>
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
        </div>
    );
}
