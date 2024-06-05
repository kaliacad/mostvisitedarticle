import PropTypes from 'prop-types';

const defaultEvent = () => {
    alert('You need an event on this button');
};
export default function Button({ text, event }) {
    const text2 = "You have to add a prop 'text'";

    return <button onClick={defaultEvent() || event}>{text || text2}</button>;
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    event: PropTypes.string.isRequired,
};
