import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CountryPickList from './CountryPicker';
import axios from 'axios';

const ArticleForm = ({ onSubmit, loading, countryUrl, continentUrl }) => {
    const [formErrors, setFormErrors] = useState({});
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const [form, setForm] = useState({
        country: '',
        date: today.toISOString().split('T')[0],
        access: 'all-access',
    });
    const [locationError, setLocationError] = useState('');

    useEffect(() => {
        const fetchLocation = async (lat, lon) => {
            try {
                const response = await axios.get('https://api.bigdatacloud.net/data/reverse-geocode-client', {
                    params: {
                        latitude: lat,
                        longitude: lon,
                        localityLanguage: 'en',
                    },
                });

                const { countryCode } = response.data;
                setForm((prevForm) => ({
                    ...prevForm,
                    country: countryCode,
                }));
            } catch (error) {
                setLocationError('Error fetching location data.');
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchLocation(latitude, longitude);
                },
                () => {
                    setLocationError('Error getting geolocation.');
                },
            );
        } else {
            setLocationError('Geolocation is not supported by this browser.');
        }
    }, []);

    const [country, setCountry] = useState('CD');
    const [continent, setContinent] = useState('Africa');

    useEffect(() => {
        (async () => {
            if (countryUrl) {
                setCountry(countryUrl);
            }
            if (continentUrl) {
                setContinent(continentUrl);
            }
        })();
    }, [countryUrl, continentUrl]);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const validateForm = () => {
        const errors = {};
        if (!form.country) errors.country = 'Country is required';
        if (!form.date) errors.date = 'La date est requise est requise';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            setFormErrors({});
            const [year, month, day] = form.date.split('-');
            onSubmit({ ...form, year, month, day });
            // setForm({
            //     country: '',
            //     access: 'all-access',
            //     date: '',
            // });
        }
    };

    // const countryData = Object.keys(country.all);

    return (
        <form onSubmit={handleSubmit} className='w-full formBorder py-5 rounded-xl max-md:w-[95vw]'>
            <div className='flex flex-col gap-[0.5rem] justify-between items-center w-full'>
                <div className='text-start mb-2 py-5'>
                    <p className='date text-[20px] max-md:text-xs text-center'>Veuillez remplir le formulaire pour obtenir les articles souhaités</p>
                </div>

                <div className='inputs flex gap-[1rem] max-md:flex-col max-md:text-xs'>
                    <CountryPickList
                        country={country}
                        onChangeCountry={(country) => {
                            setForm({ ...form, country, continent });
                            setCountry(country);
                        }}
                        defaultCountry={'CD'}
                        continent={continent}
                        onChangeContinent={(continent) => setContinent(continent)}
                        defaultContinent='Africa'
                    />
                    <div className='select_container country_select'>
                        <div>
                            <label className='select_label'>Date</label>

                            <input id='fullDate' type='date' name='date' className='select_options' value={form.date} onChange={handleChange} />
                        </div>
                        {formErrors.date && <div className='text-red-500'>{formErrors.date}</div>}
                    </div>

                    <div className='select_container country_select'>
                        <div>
                            <label htmlFor='' className='select_label'>
                                Platform
                            </label>
                            <select className='select_options' name='access' value={form.access} onChange={handleChange}>
                                <option value='all-access'>all-access</option>
                                <option value='desktop'>desktop</option>
                                <option value='mobile-app'>mobile-app</option>
                                <option value='mobile-web'>mobile-web</option>
                            </select>
                            {formErrors.access && <div className='error'>{formErrors.access}</div>}
                        </div>
                    </div>
                </div>
                <button type='submit' className=' py-[0.7rem] my-5 bg-green-500 text-white px-6 text-[18px] font-600 w-56 max-md:text-xs'>
                    {loading ? 'Envoie en cours...' : 'Envoyer'}
                </button>
            </div>
            {locationError && <div className='error'>{locationError}</div>}
        </form>
    );
};

ArticleForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};

export default ArticleForm;
