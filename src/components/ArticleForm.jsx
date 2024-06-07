import { useState } from 'react';
import PropTypes from 'prop-types';
import country from 'country-list-js';

const ArticleForm = ({ onSubmit, loading }) => {
    const [formErrors, setFormErrors] = useState({});
    const [form, setForm] = useState({
        country: '',
        access: 'all-access',
        year: '',
        month: '',
        day: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const validateForm = () => {
        const errors = {};
        if (!form.country) errors.country = 'Country is required';
        if (!form.year) errors.year = 'Year is required';
        if (!form.month) errors.month = 'Month is required';
        if (!form.day) errors.day = 'Day is required';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            setFormErrors({});
            onSubmit(form);
            setForm({
                country: '',
                access: 'all-access',
                year: '',
                month: '',
                day: '',
            });
        }
    };

    const countryData = Object.keys(country.all);

    return (
        <form onSubmit={handleSubmit} className='flex_center form'>
            <div className='select'>
                <select name='country' value={form.country} onChange={handleChange} required>
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
                {formErrors.access && <div className='error'>{formErrors.access}</div>}
            </div>

            <div className='select'>
                <select name='access' value={form.access} onChange={handleChange}>
                    <option value='all-access'>all-access</option>
                    <option value='desktop'>desktop</option>
                    <option value='mobile-app'>mobile-app</option>
                    <option value='mobile-web'>mobile-web</option>
                </select>
                {formErrors.access && <div className='error'>{formErrors.access}</div>}
            </div>

            <label htmlFor='year' className='flex flex-col'>
                <input type='text' name='year' value={form.year} placeholder='Year' className='' onChange={handleChange} />
                {formErrors.year && <div className='error'>{formErrors.year}</div>}
            </label>

            <label htmlFor='month' className='flex flex-col'>
                <input type='text' name='month' value={form.month} onChange={handleChange} placeholder='Month' className='' />
                {formErrors.month && <div className='error'>{formErrors.month}</div>}
            </label>

            <label htmlFor='day' className='flex flex-col'>
                <input type='text' name='day' value={form.day} onChange={handleChange} placeholder='Day' className='' />
                {formErrors.day && <div className='error'>{formErrors.day}</div>}
            </label>

            <button type='submit' className='submitArticleBtn'>
                {loading ? 'Submitting' : 'submit'}
            </button>
        </form>
    );
};

ArticleForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};

export default ArticleForm;
