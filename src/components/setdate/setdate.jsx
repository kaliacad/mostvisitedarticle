import { useState } from 'react';
import './../../global.css';

export default function SetDate() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const today = new Date();
    today.setDate(today.getDate());
    const [intervalDate, setIntervalDate] = useState({
        startDate: date.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0],
    });

    const handleChange = (e) => {
        setIntervalDate({ ...intervalDate, [e.target.name]: e.target.value });
    };

    return (
        <div className='setdate'>
            <h6>Choisir un intervalle</h6>
            <div>
                <div>
                    <span className='label' htmlFor='startDate'>
                        Date de debut
                    </span>

                    <input type='date' name='startDate' defaultValue={intervalDate.startDate} onChange={handleChange} required />
                    <ul className='dropdown-list' id='date-dropdown'></ul>
                </div>
                <div>
                    <span className='label' htmlFor='endDate'>
                        Date de fin
                    </span>
                    <input type='date' name='endDate' defaultValue={intervalDate.endDate} onChange={handleChange} required />
                </div>
            </div>
        </div>
    );
}
