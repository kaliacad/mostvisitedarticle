import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect, useState } from 'react';
import Papa from 'papaparse';
import ArticleForm from '../components/ArticleForm/ArticleForm';
import ArticleCard from '../components/ArticleView/ArticleCard';
import fetchArticles from '../helpers/fetchdata';
import Pagination from '../components/common/Pagination';
import SearchBar from '../components/common/SearchBar';
import { toast } from 'react-toastify';
import ArticleCardSkeletton from '../components/ArticleView/ArticleCardSkeletton';
import getTrueArticles from '../helpers/getTrueArticles';
import countries from '../helpers/countriesIsoCodes';
import ListArticlesResult from '../components/ArticleView/ArticleList';
import { useTranslation } from 'react-i18next';

const getCountryNameByCode = (continent, code) => {
    const country = countries[continent].find((country) => country.code === code);
    return country ? country.name : code;
};

function App() {
    const { t } = useTranslation();
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

    const [view, setView] = useState('card');
    const handlePageChange = useCallback((currentPage, paginatedItems) => {
        setPaginatedItems(paginatedItems);
    }, []);
    const handleCurrentPage = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    const handleSubmit = useCallback(
        async (formData) => {
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
                    toast.error(t('common.requestTimeout'), {
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
        },
        [theUrl, t],
    );

    useEffect(() => {
        if (theUrl.includes('permanent')) {
            const params = theUrl.split('permanent')[1].slice(1).split('_');
            setCountryFromUrl(params[0]);
            setContinentFromUrl(params[3]);
            const date = params[2].split('-');
            const formData = {};
            formData.country = params[0];
            formData.access = params[1];
            formData.continent = params[3];
            formData.year = date[0];
            formData.month = date[1];
            formData.day = date[2];

            handleSubmit(formData);
        }
    }, [theUrl, handleSubmit]);

    async function handleCopyUrl() {
        await navigator.clipboard.writeText(newUrl).then(() =>
            toast.success(t('common.linkCopied'), {
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
        setCurrentPage(1); // Reset to first page when articles change
    }, [articles]);

    return (
        <div>
            <div className='container mx-auto py-4 mb-8'>
                <div className='container mx-auto flex_center'>
                    <div className='bg-slate-100 rounded-xl max-md:flex max-md:justify-center'>
                        <ArticleForm onSubmit={handleSubmit} loading={loading} continentUrl={continentFromUrl} countryUrl={countryFromUrl} />
                    </div>

                    {loading && (
                        <div>
                            <ul className='flex flex-wrap items-center justify-center pt-4 gap-2 max-md:flex-col'>
                                {[1, 2, 3].map((e, i) => (
                                    <div className=' max-md:w-[90vw]' key={i}>
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
                                        {t('common.export')}
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
                                                {t('common.exportToCSV')}
                                            </a>
                                            <a
                                                href='#'
                                                onClick={exportToJSON}
                                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 mt-4'
                                                role='menuitem'
                                            >
                                                {t('common.exportToJSON')}
                                            </a>
                                        </div>
                                    </div>
                                )}
                                <button className='ml-10 bg-gray-300' onClick={handleCopyUrl}>
                                    {t('common.permanentLink')}
                                </button>
                            </div>
                            <SearchBar articles={articles} setFilteredArticles={setFilteredArticles} />
                        </div>
                    )}

                    {articles.length > 0 && (
                        <div className='py-4 flex items-center gap-3 rounded-lg border'>
                            <button
                                onClick={() => {
                                    setView('card');
                                }}
                                className={view == 'card' ? 'bg-white' : 'text-white'}
                            >
                                <svg
                                    aria-hidden='true'
                                    focusable='false'
                                    data-prefix='fas'
                                    data-icon='grid-2'
                                    role='img'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 512 512'
                                    className='svg-inline--fa fa-grid-2 fa-lg'
                                >
                                    <path
                                        fill='currentColor'
                                        d='M224 80c0-26.5-21.5-48-48-48L80 32C53.5 32 32 53.5 32 80l0 96c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-96zm0 256c0-26.5-21.5-48-48-48l-96 0c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-96zM288 80l0 96c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48l-96 0c-26.5 0-48 21.5-48 48zM480 336c0-26.5-21.5-48-48-48l-96 0c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-96z'
                                        className=''
                                    ></path>
                                </svg>
                            </button>
                            <button
                                onClick={() => {
                                    setView('list');
                                }}
                                className={view == 'list' ? 'bg-white' : 'text-white'}
                            >
                                <svg
                                    aria-hidden='true'
                                    focusable='false'
                                    data-prefix='fas'
                                    data-icon='list-ul'
                                    role='img'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 512 512'
                                    className='svg-inline--fa fa-list-ul fa-lg'
                                >
                                    <path
                                        fill='currentColor'
                                        d='M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z'
                                        className=''
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    )}
                    <div className='articles'>
                        {filteredArticles && filteredArticles?.length > 0 ? (
                            <div>
                                {view == 'card' && (
                                    <ul className='flex flex-wrap items-center justify-between gap-4 p-3  max-md:flex-col'>
                                        {paginatedItems?.length > 0 &&
                                            paginatedItems.map(({ article, project, rank, views_ceil, country }) => {
                                                return (
                                                    <ArticleCard
                                                        key={article}
                                                        article={article}
                                                        project={project}
                                                        rank={rank}
                                                        views_ceil={views_ceil}
                                                        country={country}
                                                    />
                                                );
                                            })}
                                    </ul>
                                )}

                                {view == 'list' && paginatedItems?.length > 0 && <ListArticlesResult articlesData={paginatedItems} />}

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
                            <div className='text-center text-gray-500 mt-8'>{t('common.noData')}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default App;
