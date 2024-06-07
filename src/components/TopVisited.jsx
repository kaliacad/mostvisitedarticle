import { useEffect, useState } from 'react';
import ArticleForm from './ArticleForm';
import ArticleCard from './ArticleCard';

import fetchArticles from '../helpers/fetchdata';

const TopVisited = () => {
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    const topVisitedArticles = articles?.slice(0, 900);

    const handleSubmit = async (formData) => {
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
    };

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
        <div className='container mx-auto flex_center'>
            <div className='bg-slate-100 rounded-md py-10'>
                <ArticleForm onSubmit={handleSubmit} loading={loading} />
            </div>

            {loading && <p className='loading'>Loading...</p>}
            {error && <p className='error'>Error: {error}</p>}

            <div className='articles'>
                {articles?.length > 0 ? (
                    <ul className='flex flex-wrap items-center pt-[2rem]'>
                        {topVisitedArticles?.length > 0 &&
                            topVisitedArticles?.map(({ article, project, rank, views_ceil }) => (
                                <div className='w-1/3 p-8 ' key={article}>
                                    <ArticleCard key={article} article={article} project={project} rank={rank} views_ceil={views_ceil} />
                                </div>
                            ))}
                    </ul>
                ) : (
                    <p className='noArticleMessage text-center text-2xl font-bold'>Please, Fill the form to get your desired articles from country</p>
                )}
            </div>
        </div>
    );
};

export default TopVisited;
