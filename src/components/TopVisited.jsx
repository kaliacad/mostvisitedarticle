import { useCallback, useEffect, useState } from 'react';
import Papa from 'papaparse';
import ArticleForm from './ArticleForm/ArticleForm';
import ArticleCard from './ArticleView/ArticleCard';
import fetchArticles from '../helpers/fetchdata';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import { toast } from 'react-toastify';
import ArticleCardSkeletton from './ArticleCardSkeletton';
import getTrueArticles from '../helpers/getTrueArticles';
import countries from '../helpers/countriesIsoCodes';

const getCountryNameByCode = (continent, code) => {
    const country = countries[continent].find((country) => country.code === code);
    return country ? country.name : code;
};

const TopVisited = () => {
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [theUrl] = useState(window.location.origin + window.location.pathname);
    const [newUrl, setNewUrl] = useState('');
    const [paginatedItems, setPaginatedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [countryFromUrl, setCountryFromUrl] = useState('');
    const [continentFromUrl, setContinentFromUrl] = useState('');
    const [filteredArticles, setFilteredArticles] = useState(articles);
    const handlePageChange = (currentPage, paginatedItems) => {
        setPaginatedItems(paginatedItems);
    };
    const handleCurrentPage = (page) => {
        setCurrentPage(page);
    };

    const handleSubmit = useCallback(async (formData) => {
        setLoading(true);

        try {
            const response = await fetchArticles(formData);

            if (response && response.data && response.data.items && response.data.items.length > 0) {
                const trueArticles = await getTrueArticles(
                    response.data.items[0].articles.map((art) => {
                        return { ...art, title: art.article, country: getCountryNameByCode(formData.continent, response.data.items[0].country) };
                    }),
                );
                setArticles(trueArticles);
                setNewUrl(theUrl + 'permanent/' + formData.country + '_' + formData.access + '_' + formData.date + '_' + formData.continent);
            } else {
                setArticles([]);
            }
        } catch (error) {
            if (typeof error === 'string') {
                toast.error(error, {
                    autoClose: 1000,
                    position: 'bottom-center',
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            } else if (error.code === 'ECONNABORTED') {
                toast.error('Request timed out. Please try again.', {
                    autoClose: false,
                    position: 'bottom-center',
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            } else {
                toast.error(error.response ? error.response.data : error.message, {
                    autoClose: 1000,
                    position: 'bottom-center',
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
            setArticles([]);
        } finally {
            setLoading(false);
        }
    }, [theUrl]);

    useEffect(() => {
        if (theUrl.includes('permanent')) {
            const params = theUrl.split('permanent')[1].slice(1).split('_');
            setCountryFromUrl(params[0]);
            setContinentFromUrl(params[3]);
            const date = params[2].split('-');
            const formData = {};
            formData.country = params[0];
            formData.access = params[1];
            formData.year = date[0];
            formData.month = date[1];
            formData.day = date[2];

            handleSubmit(formData);
        }
    }, [theUrl, handleSubmit]);

    async function handleCopyUrl() {
        await navigator.clipboard.writeText(newUrl).then(() =>
            toast.success('Link copied to clipboard!', {
                position: 'top-center',
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            }),
        );
    }

    const exportToCSV = () => {
        const csv = Papa.unparse(
            articles.map(({ article, project, rank, views_ceil, country }) => ({
                article,
                project,
                rank,
                views_ceil,
                country,
            })),
        );

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', 'top_visited_articles.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToJSON = () => {
        const json = JSON.stringify(articles, null, 2);
        const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', 'top_visited_articles.json');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        setFilteredArticles(articles);
    }, [articles]);

    return (
        <>
            <div className='container mx-auto flex_center'>
                <div className='bg-slate-100 rounded-xl max-md:flex max-md:justify-center'>
                    <ArticleForm onSubmit={handleSubmit} loading={loading} continentUrl={continentFromUrl} countryUrl={countryFromUrl} />
                </div>
                {loading && (
                    <div>
                        <ul className='flex flex-wrap items-center justify-center pt-[2rem] max-md:flex-col'>
                            {[1, 2, 3].map((e, i) => (
                                <div className='w-1/3 p-8  max-md:w-[90vw]' key={i}>
                                    <ArticleCardSkeletton element={e} />
                                </div>
                            ))}
                        </ul>
                    </div>
                )}
                {articles.length > 0 && (
                    <div className='flex justify-between max-md:flex-col-reverse pt-4'>
                        <div className='relative flex text-left'>
                            <div>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className='inline-flex justify-center ml-2 w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                    id='options-menu'
                                >
                                    Export
                                    <svg
                                        className='-mr-1 ml-2 h-5 w-5'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 20 20'
                                        fill='currentColor'
                                        aria-hidden='true'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                </button>
                            </div>
                            {dropdownOpen && (
                                <div className=' origin-top-right absolute right-0 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5'>
                                    <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
                                        <a
                                            href='#'
                                            onClick={exportToCSV}
                                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                            role='menuitem'
                                        >
                                            Export to CSV
                                        </a>
                                        <a
                                            href='#'
                                            onClick={exportToJSON}
                                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 mt-4'
                                            role='menuitem'
                                        >
                                            Export to JSON
                                        </a>
                                    </div>
                                </div>
                            )}
                            <button className='ml-10 bg-gray-300' onClick={handleCopyUrl}>
                                Lien permanent
                            </button>
                        </div>
                        <SearchBar articles={articles} setFilteredArticles={setFilteredArticles} />
                    </div>
                )}
                <div className='articles'>
                    {filteredArticles && filteredArticles?.length > 0 ? (
                        <div>
                            <ul className='flex flex-wrap items-center justify-center pt-[2rem] max-md:flex-col'>
                                {paginatedItems?.length > 0 &&
                                    paginatedItems.map(({ article, project, rank, views_ceil, country }) => (
                                        <div className='w-1/3 p-8  max-md:w-[90vw]' key={article}>
                                            <ArticleCard
                                                key={article}
                                                article={article}
                                                project={project}
                                                rank={rank}
                                                views_ceil={views_ceil}
                                                country={country}
                                            />
                                        </div>
                                    ))}
                            </ul>
                            <div className='flex justify-center mb-10'>
                                <Pagination
                                    onCurrentChange={handleCurrentPage}
                                    totalPages={Math.ceil(filteredArticles.length / itemsPerPage)}
                                    currentPage={currentPage}
                                    items={filteredArticles}
                                    itemsPerPage={itemsPerPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    ) : (
                        <p className='noArticleMessage text-center text-2xl font-bold'></p>
                    )}
                </div>
            </div>
        </>
    );
};

export default TopVisited;
