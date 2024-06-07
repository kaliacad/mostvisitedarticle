import { useCallback, useEffect, useState } from 'react';
import ArticleForm from './ArticleForm';
import ArticleCard from './ArticleCard';

import fetchArticles from '../helpers/fetchdata';
import Pagination from './Pagination';

const TopVisited = () => {
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

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
            setArticles([]);
            if (error.code === 'ECONNABORTED') {
                setError('Request timed out. Please try again.');
            } else {
                setError(error.response ? error.response.data : error.message);
            }
        } finally {
            setLoading(false);
        }
    });

    useEffect(() => {
        handleSubmit({
            country: 'FR',
            access: 'all-access',
            year: '2024',
            month: new Date().getMonth().toString(),
            day: new Date().getDate().toString(),
        });
    }, []);

    return (
        <div className='topVisitedContainer flex_center'>
            <ArticleForm onSubmit={handleSubmit} loading={loading} />

            {loading && <p className='loading'>Loading...</p>}
            {error && <p className='error'>Error: {error}</p>}

            <div className='articles'>
                {articles?.length > 0 ? (
                    <div>
                        <ul className='flex flex-wrap justify-evenly items-center gap-[5rem] pt-[2rem]'>
                            {paginatedItems?.length > 0 &&
                                paginatedItems.map(({ article, project, rank, views_ceil }) => (
                                    <ArticleCard key={article} article={article} project={project} rank={rank} views_ceil={views_ceil} />
                                ))}
                        </ul>
                        <Pagination
                            onCurrentChange={handleCurrentPage}
                            totalPages={Math.ceil(articles.length / itemsPerPage)}
                            currentPage={currentPage}
                            items={articles}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                ) : (
                    <p className='noArticleMessage text-center text-2xl font-bold'>Please, Fill the form to get your desired articles from country</p>
                )}
            </div>
        </div>
    );
};

export default TopVisited;
