import { useState, useEffect, useRef, useCallback } from 'react';
import CountryPickList from './CountryPicker';
import fetchLocation from '../../api/fetchLocation';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ArticleForm = ({ onSubmit, loading, countryUrl, continentUrl }) => {
    const [formErrors, setFormErrors] = useState({});
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const yesterdayDate = today.toISOString().split('T')[0];
    const [form, setForm] = useState({
        country: '',
        date: yesterdayDate,
        access: 'all-access',
    });
    const { t } = useTranslation();
    const isInitialMount = useRef(true);


    useEffect(() => {
        const getLocation = async (lat, lon) => {
            try {
                const countryCode = await fetchLocation(lat, lon);

                setForm((prevForm) => ({
                    ...prevForm,
                    country: countryCode,
                }));
            } catch (error) {
                toast.error(t('form.errorLocation'), {
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
                    toast.error(t('form.errorGeolocation'), {
                        autoClose: false,
                        position: 'top-right',
                        hideProgressBar: true,
                        draggable: true,
                        progress: undefined,
                    });
                },
            );
        } else {
            toast.error(t('form.geolocationNotSupported'), {
                autoClose: false,
                position: 'top-right',
                hideProgressBar: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [t]);

    const [country, setCountry] = useState('CD');
    const [continent, setContinent] = useState('Africa');

    // Initialize form with default country when component mounts
    useEffect(() => {
        if (!form.country && country) {
            setForm(prevForm => ({ ...prevForm, country }));
        }
    }, [country, form.country]);

    useEffect(() => {
        (async () => {
            if (countryUrl) {
                setCountry(countryUrl);
                setForm(prevForm => ({ ...prevForm, country: countryUrl }));
            }
            if (continentUrl) {
                setContinent(continentUrl);
            }
        })();
    }, [countryUrl, continentUrl]);

    // Auto-submit when form fields change
    useEffect(() => {
        // Skip auto-submit on initial mount to avoid duplicate calls
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Only auto-submit if we have required fields and they are valid strings
        if (form.country && typeof form.country === 'string' && form.country.length > 0 && 
            form.date && continent && typeof continent === 'string' && continent.length > 0) {
            const errors = validateForm();
            if (Object.keys(errors).length === 0) {
                const [year, month, day] = form.date.split('-');
                onSubmit({ ...form, year, month, day, continent });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.country, form.date, form.access, continent]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const validateForm = useCallback(() => {
        const errors = {};
        if (!form.country) errors.country = t('form.countryRequired');
        if (!form.date) errors.date = t('form.dateRequired');
        return errors;
    }, [form.country, form.date, t]);

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
            onSubmit({ ...form, year, month, day, continent });
        }
    };

    return (
        <form onSubmit={handleSubmit} className='w-full formBorder py-5 rounded-xl max-md:w-[95vw]'>
            <div className='flex flex-col gap-[0.5rem] justify-between items-center w-full'>
                <div className='text-start mb-2 py-5'>
                    <p className='date text-[20px] max-md:text-xs text-center'>{t('form.fillForm')}</p>
                </div>

                <div className='inputs flex gap-[1rem] max-md:flex-col max-md:text-xs'>
                    <CountryPickList
                        country={country}
                        onChangeCountry={(country) => {
                            setForm({ ...form, country });
                            setCountry(country);
                        }}
                        defaultCountry={'CD'}
                        continent={continent}
                        onChangeContinent={(continent) => setContinent(continent)}
                        defaultContinent='Africa'
                    />
                    <div className='select_container country_select'>
                        <div>
                            <label className='select_label'>{t('form.date')}</label>
                            <input id='fullDate' type='date' name='date' className='select_options' value={form.date} onChange={handleChange} />
                        </div>
                    </div>

                    <div className='select_container country_select'>
                        <div>
                            <label htmlFor='' className='select_label'>
                                {t('form.platform')}
                            </label>
                            <select className='select_options' name='access' value={form.access} onChange={handleChange}>
                                <option value='all-access'>{t('form.allAccess')}</option>
                                <option value='desktop'>{t('form.desktop')}</option>
                                <option value='mobile-app'>{t('form.mobileApp')}</option>
                                <option value='mobile-web'>{t('form.mobileWeb')}</option>
                            </select>
                            {formErrors.access && <div className='error'>{formErrors.access}</div>}
                        </div>
                    </div>
                </div>
                <button type='submit' className=' py-[0.7rem] my-5 bg-green-500 text-white px-6 text-[18px] font-600 w-56 max-md:text-xs'>
                    {loading ? t('form.sending') : t('form.submit')}
                </button>
            </div>
        </form>
    );
};

export default ArticleForm;
