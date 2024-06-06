import { useEffect, useState } from 'react';
import fetchTopArticles from '../api';
import countriesFr from '../helpers/countriesFr';
import ArticleCard from './ArticleCard';

const africanCountries = countriesFr.Afrique;

const WikiAfricaTopArticles = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataForAllCountries = async () => {
            try {
                const allData = await Promise.all(
                    africanCountries.map((country) => fetchTopArticles({ countryCode: country.code, month: '05', day: '01' })),
                );
                setData(allData);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchDataForAllCountries();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <br />
            <h1>Top Wikimedia Articles in Africa</h1>
            <br />
            {data.map((countryData, index) => {
                if (!Array.isArray(countryData)) {
                    const CountryItems = countryData.items;

                    return (
                        <div key={index}>
                            <h2>{africanCountries[index].name}</h2>
                            <br />
                            <ul>
                                {CountryItems.map((item, p) => {
                                    const countryArticles = item.articles;
                                    return (
                                        <div key={p} className='WikiAfricaTopArticles'>
                                            {countryArticles.map((article, i) => (
                                                <ArticleCard
                                                    key={i}
                                                    article={article.article}
                                                    project={article.project}
                                                    views_ceil={article.views_ceil}
                                                    rank={article.rank}
                                                />
                                            ))}{' '}
                                        </div>
                                    );
                                })}
                            </ul>
                            <br />
                        </div>
                    );
                } else return <></>;
            })}
        </div>
    );
};

export default WikiAfricaTopArticles;
