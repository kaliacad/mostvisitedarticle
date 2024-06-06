import { useState } from 'react';
import ArticleForm from './ArticleForm';

import './MostVisitedArtiliclesByCountryAndDate.css';
import fetchArticles from '../../helpers/fetchMostVisitedArticlesData';

const MostVisitedArticlesByCountryAndDate = () => {
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    const topVisitedArticles = articles.slice(0, 900);

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

    return (
        <div className='topVisitedContainer flex_center'>
            <h2 className='text-center'>Top visited articles by country and date</h2>

            <ArticleForm onSubmit={handleSubmit} loading={loading} />

            {loading && <p className='loading'>Loading...</p>}
            {error && <p className='error'>Error: {error}</p>}

            <div className='articles'>
                {articles.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Article</th>
                                <th>Views</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topVisitedArticles?.length > 0 &&
                                topVisitedArticles.map((article, index) => (
                                    <tr key={index}>
                                        <td>{article.rank}</td>
                                        <td>{article.article}</td>
                                        <td>{article.views_ceil}.</td>
                                    </tr>
                                ))}
                            {!topVisitedArticles?.length && <p className='error'>No articles found</p>}
                        </tbody>
                    </table>
                ) : (
                    <p className='noArticleMessage text-center'>Please, Fill the form to get your desired articles from country</p>
                )}
            </div>
        </div>
    );
};

export default MostVisitedArticlesByCountryAndDate;
