import { useState } from 'react';
import PropTypes from 'prop-types';
import CountryPicker from './CountryPicker';
import DatePicker from './DatePicker';
import AccessPicker from './AccessPicker';

const ArticleForm = ({ onSubmit, loading }) => {
    const [formErrors, setFormErrors] = useState({});
    const [form, setForm] = useState({
        country: '',
        date: '',
        access: 'all-access',
    });

    const [country, setCountry] = useState('CD');
    const [continent, setContinent] = useState('Africa');

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

    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-col items-center'>
            <div className='flex flex-col gap-[0.5rem] justify-between items-center w-full py-3'>
                <div className='text-start mb-2'>
                    <span className='date text-[20px] '>Veuillez remplir le formulaire pour obtenir les articles souhaités</span>
                </div>

                <div className='inputs flex gap-[1rem] items-start'>
                    <CountryPicker
                        label={'Choisir un pays'}
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

                    <DatePicker label={'Date'} date={form.date} onChange={handleChange} error={formErrors.date} />

                    <AccessPicker label={'Plateforme'} access={form.access} onChange={handleChange} error={formErrors.access} />
                </div>

                <button type='submit' className='py-[0.5rem] bg-green-500 text-white px-6 text-[18px] capitalize font-600 w-56'>
                    {loading ? 'Submitting' : 'Envoyer'}
                </button>
            </div>
        </form>
    );
};

ArticleForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};

export default ArticleForm;
