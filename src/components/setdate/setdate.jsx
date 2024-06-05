import { useState } from 'react';

export default function SetDate() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    return (
        <div className='setdate'>
            <h6>Choisir un intervalle</h6>
            <div>
                <span className='label' htmlFor='startDate'>
                    Date de debut
                </span>
                <input type='date' name='startDate' value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </div>
            <div>
                <span className='label' htmlFor='endDate'>
                    Date de fin
                </span>
                <input type='date' name='endDate' value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </div>
        </div>
    );
}
