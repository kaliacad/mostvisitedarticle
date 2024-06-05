import PropTypes from 'prop-types';

const defaultEvent = () => {
    alert('You need an event on this button');
};
export default function Button({ text, event }) {
    const text2 = "You have to add a prop 'text'";
    if (event) {
        return <button onClick={defaultEvent()}>{text || text2}</button>;
    } else {
        if (text) return <button onClick={event || defaultEvent}>{text}</button>;
        else {
            return <button onClick={event || defaultEvent}>{text2}</button>;
        }
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    event: PropTypes.string.isRequired,
};
