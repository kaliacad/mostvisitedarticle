/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import countriesFr from '../helpers/countriesFr';

const countries = [...countriesFr.afrique, ...countriesFr.amerique, ...countriesFr.asie, ...countriesFr.europe, ...countriesFr.oceanie];
const allCountries = countries.sort((a, b) => a.name.localeCompare(b.name));

export default function CountryPickList() {
    const [filteredCountries, setFilteredItems] = useState(allCountries);

    const handleLetterClick = (event) => {
        const letter = event.key.toUpperCase();
        const filtered = allCountries.filter((item) => item.name.startsWith(letter));
        setFilteredItems(filtered);
    };

    return (
        <select className='select-box' onKeyUp={handleLetterClick}>
            {filteredCountries.map((country, index) => {
                return (
                    <option key={index} value={country.code}>
                        {country.name}
                    </option>
                );
            })}
        </select>
    );
}
