import { useEffect, useState } from 'react';
import fetchTopArticles from '../api';
import countriesFr from '../helpers/countriesIsoCodes';
import ArticleCard from './ArticleCard';
import Loading from './loading';

const africanCountries = countriesFr.afrique;

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

    if (loading)
        return (
            <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Loading />
            </div>
        );
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='african'>
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
                            <ul className='african-article'>
                                {CountryItems.map((item) => {
                                    const countryArticles = item.articles;
                                    return countryArticles.map((article, i) => (
                                        <ArticleCard
                                            key={i}
                                            article={article.article}
                                            rank={article.rank}
                                            project={article.project}
                                            views_ceil={article.views_ceil}
                                        />
                                    ));
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
