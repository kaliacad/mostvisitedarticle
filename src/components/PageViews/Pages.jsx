import { useContext, useRef } from 'react';
import PageViewsContext from './Context';
import pageNameDecoder from '../../helpers/pageNameDecoder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Pages() {
    const { pages, setPages } = useContext(PageViewsContext);
    const inputRef = useRef('');
    const handleSubmit = (e) => {
        e.preventDefault();
        setPages([...pages, inputRef.current.value]);
        inputRef.current.value = '';
    };

    function deleteItemAtIndex(i) {
        const newPages = [...pages];
        if (i === 0) {
            newPages.pop();
        } else {
            newPages.splice(i, 1);
        }

        setPages(newPages);
    }

    return (
        <div className='flex my-3 gap-4 flex-wrap'>
            <form onSubmit={handleSubmit} method='POST' className='flex gap-3 flex-wrap'>
                <input type='text' className='page-input' name='page' ref={inputRef} />
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
                    <FontAwesomeIcon icon={faAdd} />
                </button>
            </form>
            <div className='list-none flex flex-wrap gap-1'>
                {pages.map((page, index) => (
                    <span
                        key={index}
                        className='border-1 solid flex justify-center text-[12px] items-center h-6 border-[#ccc] p-1 bg-blue-300 rounded-lg'
                    >
                        <span>{pageNameDecoder(page)}</span>
                        <button onClick={() => deleteItemAtIndex(index)} className='flex justify-center text-[12px] bg-transparent !p-0'>
                            <FontAwesomeIcon icon={faXmark} className='pl-1' />
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
}
