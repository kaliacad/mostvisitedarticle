import { useContext } from 'react';
import PageViewsContext from './Context';
import DatePicker from '../ArticleForm/DatePicker';
import { todayDay, todayMonth, todayYear } from '../../helpers/dateNowSpliter';

// Helper function to format date strings as YYYYMMDD
const stringifyDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`;
};

export default function Interval() {
    const { dates, setDates } = useContext(PageViewsContext);

    const handleChangeStart = (e) => {
        setDates({ ...dates, start: stringifyDate(e.target.value) });
    };

    const handleChangeEnd = (e) => {
        setDates({ ...dates, end: stringifyDate(e.target.value) });
    };

    return (
        <div>
            <DatePicker onChange={handleChangeStart} label='Start' date={new Date(`${todayYear}-01-01`).toISOString().split('T')[0]} />
            <DatePicker
                onChange={handleChangeEnd}
                label='End'
                date={new Date(`${todayYear}-${todayMonth}-${todayDay}`).toISOString().split('T')[0]}
            />
        </div>
    );
}
