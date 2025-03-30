/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import countries from '../../helpers/countriesIsoCodes';
import { Menu } from '../common/Menu';
import { useTranslation } from 'react-i18next';

export default function CountryPickList({ country, onChangeCountry, defaultCountry, continent, onChangeContinent, defaultContinent }) {
    const countryRef = useRef(null);
    const { t } = useTranslation();

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
                label={t('form.continent')}
                className='continent'
                data={Object.keys(countries).map((el) => ({ value: el, label: el }))}
                value={continent}
                onChange={handleChangeContinent}
                defaultValue={defaultContinent}
            />

            <Menu
                label={t('form.country')}
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
