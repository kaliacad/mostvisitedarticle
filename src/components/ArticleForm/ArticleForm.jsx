import { useState, useEffect } from 'react';
import CountryPickList from './CountryPicker';
import fetchLocation from '../../api/fetchLocation';
import { toast } from 'react-toastify';

const ArticleForm = ({ onSubmit, loading, countryUrl, continentUrl }) => {
    const [formErrors, setFormErrors] = useState({});
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const [form, setForm] = useState({
        country: '',
        date: today.toISOString().split('T')[0],
        access: 'all-access',
    });

    useEffect(() => {
        const getLocation = async (lat, lon) => {
            try {
                const countryCode = await fetchLocation(lat, lon);

                setForm((prevForm) => ({
                    ...prevForm,
                    country: countryCode,
                }));
            } catch (error) {
                toast.error(`Error fetching location data.`, {
                    autoClose: false,
                    position: 'top-right',
                    hideProgressBar: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    getLocation(latitude, longitude);
                },
                () => {
                    toast.error(`Error getting geolocation.`, {
                        autoClose: false,
                        position: 'top-right',
                        hideProgressBar: true,
                        draggable: true,
                        progress: undefined,
                    });
                },
            );
        } else {
            toast.error(`Geolocation is not supported by this browser.`, {
                autoClose: false,
                position: 'top-right',
                hideProgressBar: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, []);

    const [country, setCountry] = useState('CD');
    const [continent, setContinent] = useState('Africa');

    useEffect(() => {
        if (countryUrl) {
            setCountry(countryUrl);
        }
        if (continentUrl) {
            setContinent(continentUrl);
        }
    }, [countryUrl, continentUrl]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const validateForm = () => {
        const errors = {};
        if (!form.country) errors.country = 'Country is required';
        if (!form.date) errors.date = 'La date est requise';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            toast.error(errors.date, {
                position: 'top-center',
                draggable: true,
                progress: undefined,
            });
        } else {
            setFormErrors({});
            const [year, month, day] = form.date.split('-');
            onSubmit({ ...form, year, month, day });
        }
    };

    return (
        <div className='w-full p-4 md:p-6'>
            <form onSubmit={handleSubmit} className='w-full max-w-full p-6 bg-white rounded-lg shadow-lg'>
                <h2 className='mb-6 text-2xl font-semibold text-center'>Veuillez remplir le formulaire pour obtenir les articles souhaités</h2>

                <div className='space-y-4'>
                    <div className='mb-6'>
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
                    </div>

                    <div className='flex flex-col gap-4 md:flex-row md:gap-6'>
                        <div className='flex-1'>
                            <label htmlFor='fullDate' className='block mb-2 text-sm font-medium'>
                                Date
                            </label>
                            <input
                                id='fullDate'
                                type='date'
                                name='date'
                                className='w-full p-2 border border-gray-300 rounded-lg'
                                value={form.date}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='flex-1'>
                            <label htmlFor='access' className='block mb-2 text-sm font-medium'>
                                Platform
                            </label>
                            <select
                                id='access'
                                name='access'
                                className='w-full p-2 border border-gray-300 rounded-lg'
                                value={form.access}
                                onChange={handleChange}
                            >
                                <option value='all-access'>all-access</option>
                                <option value='desktop'>desktop</option>
                                <option value='mobile-app'>mobile-app</option>
                                <option value='mobile-web'>mobile-web</option>
                            </select>
                            {formErrors.access && <div className='mt-1 text-sm text-red-500'>{formErrors.access}</div>}
                        </div>
                    </div>

                    <button type='submit' className='w-full py-3 mt-4 text-lg font-semibold text-white bg-green-500 rounded-lg'>
                        {loading ? 'Envoie en cours...' : 'Envoyer'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ArticleForm;
