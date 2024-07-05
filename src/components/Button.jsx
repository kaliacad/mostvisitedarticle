import { toast, ToastContainer } from 'react-toastify';

const defaultEvent = () => {
    toast.info('You need an event on this button');
};
export default function Button({ text, event }) {
    const text2 = "You have to add a prop 'text'";

    return (
        <>
            <ToastContainer />
            <button onClick={event || defaultEvent}>{text || text2}</button>;
        </>
    );
}
