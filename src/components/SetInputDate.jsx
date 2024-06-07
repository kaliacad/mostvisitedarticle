import './../global.css';

export default function SetInputDate({ value, onChange }) {
    return <input className='inputDate' value={value} onChange={(e) => onChange(e.target.value)} type='date'></input>;
}
