import { useEffect, useState } from 'react';
import fetchTopArticles from '../api';
import ArticleCard from './ArticleCard';
import Loading from './loading';
import countries from '../helpers/countriesIsoCodes';
import ListArticlesResult from './ListArticlesResult';

const africanCountries = countries.Africa;

const getCountryNameByCode = (code) => {
    const country = africanCountries.find((country) => country.code === code);
    if (country) {
        return country.name;
    }
    return code;
};

const WikiAfricaTopArticles = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCard, setshowCard] = useState(true);

    const handleClicked = () => {
        setshowCard(!showCard);
    };

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
            <div className='flex justify-center items-center w-full'>
                <Loading />
            </div>
        );
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='african p-4'>
            <h1 className='text-2xl font-bold text-center mb-4'>Top Wikimedia Articles in Africa</h1>
            <button onClick={handleClicked} className='bg-blue-500 text-white px-4 py-2 rounded mb-4'>
                Toggle Articles/Gallery
            </button>
            {data.map((countryData, index) => {
                if (!Array.isArray(countryData)) {
                    const CountryItems = countryData.items;

                    if (showCard) {
                        return (
                            <div key={index} className='flex flex-wrap gap-2'>
                                {CountryItems.map((item) => {
                                    const countryArticles = item.articles;
                                    return countryArticles.map((article, i) => (
                                        <ArticleCard
                                            key={i}
                                            article={article.article}
                                            rank={article.rank}
                                            project={article.project}
                                            views_ceil={article.views_ceil}
                                            country={getCountryNameByCode(item.country)}
                                        />
                                    ));
                                })}
                            </div>
                        );
                    } else {
                        return (
                            <div key={index} className='flex flex-col justify-center items-start '>
                                {CountryItems.map((item, idx) => {
                                    const countryArticles = item.articles;
                                    return (
                                        <div className='' key={idx}>
                                            <h1 className='text-center text-2xl font-bold mb-4'>{getCountryNameByCode(item.country)}</h1>
                                            <ListArticlesResult key={idx} articlesData={countryArticles} />
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    }
                } else return null;
            })}
        </div>
    );
};

export default WikiAfricaTopArticles;
