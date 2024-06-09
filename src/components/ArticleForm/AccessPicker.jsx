import PropTypes from 'prop-types';

const AccessPicker = ({ access, onChange, error, label }) => {
    return (
        <div className='w-full'>
            <p className='label'>{label}</p>
            <select
                className='access my-2 border border-slate-300 w-full rounded py-2 px-1 bg-white'
                name='access'
                value={access}
                onChange={onChange}
            >
                <option value='all-access'>All</option>
                <option value='desktop'>Desktop</option>
                <option value='mobile-app'>Mobile App</option>
                <option value='mobile-web'>Mobile Web</option>
            </select>
            {error && <div className='error'>{error}</div>}
        </div>
    );
};

AccessPicker.propTypes = {
    access: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default AccessPicker;
