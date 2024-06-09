import DatePicker from '../ArticleForm/DatePicker';
export default function Header(handleView, handleDate, date) {
    return (
        <div className='flex flex-wrap justify-center items-center gap-5 my-3'>
            <button onClick={handleView} className='bg-blue-500 text-white px-4 py-2 rounded'>
                Toggle Articles/Gallery
            </button>
            <DatePicker onChange={handleDate} />
            <h1>Top Africa Atricle: {`${date.day}/${date.month}/${date.year}`}</h1>
        </div>
    );
}
