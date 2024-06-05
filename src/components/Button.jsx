import PropTypes from 'prop-types';

export default function Button({ text }) {
    if (text) return <button>{text}</button>;
    else {
        text = "You have to add a prop 'text'";
        return <button>{text}</button>;
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
};
