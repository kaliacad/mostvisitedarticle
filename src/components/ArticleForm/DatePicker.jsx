import PropTypes from 'prop-types';

const DatePicker = ({ date, onChange, error, label }) => {
    return (
        <div className='flex flex-col'>
            <p className='label'>{label}</p>
            <input
                id='fullDate'
                type='date'
                name='date'
                className='text-sm my-2 outline-none w-full border py-2 px-1 rounded'
                value={date}
                onChange={onChange}
            />
            {error && <div className='text-red-500'>{error}</div>}
        </div>
    );
};

DatePicker.propTypes = {
    date: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default DatePicker;
