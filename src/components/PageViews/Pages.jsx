import { useContext, useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PageViewsContext from './Context';
import pageNameDecoder from '../../helpers/pageNameDecoder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Pages() {
    const { pages, setPages, project } = useContext(PageViewsContext);
    const { t } = useTranslation();
    const inputRef = useRef(null);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = query.trim();
        if (!value) return;
        if (!pages.includes(value)) setPages([...pages, value]);
        setQuery('');
        setSuggestions([]);
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

    // Debounced fetch for Wikipedia OpenSearch
    // Replace the useEffect hook with this version that includes 'project' in the dependency array
    useEffect(() => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => {
            setIsLoading(true);
            const encoded = encodeURIComponent(query);
            const host =
                project && (project.startsWith('http://') || project.startsWith('https://')) ? project : `https://${project || 'en.wikipedia.org'}`;
            const url = `${host.replace(/\/$/, '')}/w/api.php?action=opensearch&format=json&formatversion=2&search=${encoded}&namespace=0&limit=10&origin=*`;

            fetch(url, { signal: controller.signal })
                .then((res) => res.json())
                .then((data) => {
                    // data[1] = titles, data[3] = urls
                    const titles = data[1] || [];
                    const urls = data[3] || [];
                    const merged = titles.map((title, i) => ({ title, url: urls[i] || '' }));
                    setSuggestions(merged);
                })
                .catch((err) => {
                    if (err.name !== 'AbortError') {
                        // You might want to handle the error here
                    }
                })
                .finally(() => setIsLoading(false));
        }, 300);

        return () => {
            controller.abort();
            clearTimeout(timeout);
        };
    }, [query, project]);

    const handleSelectSuggestion = (title) => {
        if (!pages.includes(title)) setPages([...pages, title]);
        setQuery('');
        setSuggestions([]);
        inputRef.current?.focus();
    };

    return (
        <div className='flex my-3 gap-4 flex-wrap'>
            <form onSubmit={handleSubmit} method='POST' className='flex gap-3 flex-wrap relative w-full max-w-lg'>
                <input
                    type='text'
                    className='page-input w-[320px]'
                    name='page'
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('pageViews.selectArticle')}
                    autoComplete='off'
                />
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
                    <FontAwesomeIcon icon={faAdd} />
                </button>

                {(suggestions.length > 0 || isLoading) && (
                    <ul className='absolute left-0 mt-12 w-[320px] bg-white border border-gray-200 rounded shadow max-h-56 overflow-auto z-50'>
                        {isLoading && <li className='p-2 text-sm text-gray-500'>{t('common.loading') || 'Loading...'}</li>}
                        {suggestions.map((s, i) => (
                            <li key={i} className='p-2 hover:bg-gray-100 cursor-pointer text-sm' onClick={() => handleSelectSuggestion(s.title)}>
                                <div className='font-medium'>{s.title}</div>
                                {s.url && <div className='text-xs text-gray-500'>{s.url}</div>}
                            </li>
                        ))}
                    </ul>
                )}
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
            {pages.length === 0 && <div className='text-gray-500'>{t('common.noData')}</div>}
        </div>
    );
}
