import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import country from 'country-list-js';
import axios from 'axios';

const ArticleForm = ({ onSubmit, loading }) => {
    const [formErrors, setFormErrors] = useState({});
    const [form, setForm] = useState({
        country: '',
        date: '',
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
            setForm({
                country: '',
                access: 'all-access',
                date: '',
            });
        }
    };

    const countryData = Object.keys(country.all);

    return (
        <form onSubmit={handleSubmit} className='w-full'>
            <div className='flex flex-col  justify-between items-center w-full py-3'>
                <div className='inputs w-[40vw] flex gap-7 py-4 justify-between'>
                    <div className=' w-1/3'>
                        <select
                            className='countrySelect w-full border border-slate-300 rounded py-2 px-1 bg-white'
                            name='country'
                            value={form.country}
                            onChange={handleChange}
                            required
                        >
                            <option value='' disabled>
                                Select country by ISO code
                            </option>
                            {countryData && countryData.length > 0 ? (
                                countryData.map((countryCode) => (
                                    <option key={countryCode} value={countryCode}>
                                        {countryCode}
                                    </option>
                                ))
                            ) : (
                                <option value='undefined'>undefined</option>
                            )}
                        </select>
                        {formErrors.country && <div className='error'>{formErrors.country}</div>}
                    </div>

                    <label htmlFor=' w-1/3'>
                        <div className='flex flex-col w-full'>
                            {/* <span>Sélectionner une date</span> */}
                            <input
                                id='fullDate'
                                type='date'
                                name='date'
                                className='text-sm  outline-none w-full border py-2 px-1 rounded'
                                value={form.date}
                                onChange={handleChange}
                            />
                        </div>
                        {formErrors.date && <div className='text-red-500'>{formErrors.date}</div>}
                    </label>

                    <div className=' w-1/3'>
                        <select
                            className='access border border-slate-300 w-full  rounded py-2 px-1 bg-white'
                            name='access'
                            value={form.access}
                            onChange={handleChange}
                        >
                            <option value='all-access'>all-access</option>
                            <option value='desktop'>desktop</option>
                            <option value='mobile-app'>mobile-app</option>
                            <option value='mobile-web'>mobile-web</option>
                        </select>
                        {formErrors.access && <div className='error'>{formErrors.access}</div>}
                    </div>
                </div>
                <button type='submit' className=' py-[0.5rem] bg-green-500 text-white px-6 text-[18px] capitalize font-600 w-56'>
                    {loading ? 'Submitting' : 'submit'}
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
