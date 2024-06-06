import { useEffect, useState } from 'react';
import fetchTopArticles from '../api';
import countriesFr from '../helpers/countriesFr';

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
                                {CountryItems.map((item) => {
                                    const countryArticles = item.articles;
                                    return countryArticles.map((article, i) => (
                                        <li key={i}>
                                            {article.article} - {article.views_ceil} views
                                        </li>
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
