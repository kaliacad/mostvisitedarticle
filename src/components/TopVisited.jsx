import { useCallback, useState } from 'react';
import Papa from 'papaparse'; // Importer papaparse
import ArticleForm from './ArticleForm';
import ArticleCard from './ArticleCard';
import fetchArticles from '../helpers/fetchdata';
import Pagination from './Pagination';
import Loading from './loading';

const TopVisited = () => {
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [paginatedItems, setPaginatedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handlePageChange = (currentPage, paginatedItems) => {
        setPaginatedItems(paginatedItems);
    };
    const handleCurrentPage = (page) => {
        setCurrentPage(page);
    };

    // const paginatedItems = ;

    const handleSubmit = useCallback(async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchArticles(formData);

            if (response && response.data && response.data.items && response.data.items.length > 0) {
                setArticles(response.data.items[0].articles);
                setError(null);
            } else {
                setArticles([]);
                setError('No articles found for the given parameters.');
            }
        } catch (error) {
            if (typeof error === 'string') {
                setError(error);
            } else if (error.code === 'ECONNABORTED') {
                setError('Request timed out. Please try again.');
            } else {
                setError(error.response ? error.response.data : error.message);
            }
            setArticles([]);
        } finally {
            setLoading(false);
        }
    });

    const exportToCSV = () => {
        const csv = Papa.unparse(
            articles.map(({ article, project, rank, views_ceil }) => ({
                article,
                project,
                rank,
                views_ceil,
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

    return (
        <div className='container mx-auto flex_center'>
            <div className='bg-slate-100 rounded-xl'>
                <ArticleForm onSubmit={handleSubmit} loading={loading} />
            </div>

            {loading && (
                <div className='flex items-center justify-center mt-[1rem]'>
                    <Loading />
                </div>
            )}
            {error && <p className='error text-center my-3'>Error: {error}</p>}

            {articles.length > 0 && (
                <div className='relative inline-block text-left'>
                    <div>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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
                        <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
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
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    role='menuitem'
                                >
                                    Export to JSON
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className='articles'>
                {articles && articles?.length > 0 ? (
                    <div>
                        <ul className='flex flex-wrap items-center justify-center pt-[2rem]'>
                            {paginatedItems?.length > 0 &&
                                paginatedItems.map(({ article, project, rank, views_ceil }) => (
                                    <div className='w-1/3 p-8 ' key={article}>
                                        <ArticleCard key={article} article={article} project={project} rank={rank} views_ceil={views_ceil} />
                                    </div>
                                ))}
                        </ul>
                        <div className='flex justify-center'>
                            <Pagination
                                onCurrentChange={handleCurrentPage}
                                totalPages={Math.ceil(articles.length / itemsPerPage)}
                                currentPage={currentPage}
                                items={articles}
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
    );
};

export default TopVisited;
