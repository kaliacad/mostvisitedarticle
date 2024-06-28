import { useEffect, useState } from 'react';
import fetchTopArticles from '../../api';
import ArticleCard from '../ArticleView/ArticleCard';
import Loading from '../loading';
import countries from '../../helpers/countriesIsoCodes';
import ListArticlesResult from '../ArticleView/ArticleList';
import DatePicker from '../ArticleForm/DatePicker';
import ArticleCardSkeletton from '../ArticleCardSkeletton';

const africanCountries = countries.Africa;

const getCountryNameByCode = (code) => {
    const country = africanCountries.find((country) => country.code === code);
    return country ? country.name : code;
};

const stringifyDate = (date) => {
    const [year, month, day] = date.split('-');
    return { year, month, day };
};

const TopAfrica = () => {
    const today = new Date();
    const [data, setData] = useState([]);
    const [date, setDate] = useState(stringifyDate(today.toISOString().split('T')[0]));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCard, setShowCard] = useState(true);
    const [loadingCard, setLoadingCard] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 6;

    const handleClicked = () => {
        setShowCard(!showCard);
    };

    const handleChange = (e) => {
        setLoadingCard(true);
        setDate(stringifyDate(e.target.value));
    };

    useEffect(() => {
        const fetchDataForAllCountries = async () => {
            try {
                const allData = await Promise.all(
                    africanCountries.map((country) =>
                        fetchTopArticles({
                            countryCode: country.code,
                            year: date.year,
                            month: date.month,
                            day: date.day,
                        }),
                    ),
                );

                const transformedData = allData.flatMap((countryData) => {
                    if (!Array.isArray(countryData)) {
                        return countryData.items.flatMap((item) =>
                            item.articles.map((article) => ({
                                country: getCountryNameByCode(item.country),
                                rank: article.rank,
                                title: article.article,
                                views: article.views_ceil,
                                project: article.project,
                            })),
                        );
                    }
                    return [];
                });

                setData(transformedData);
                setLoading(false);
                setLoadingCard(false);
            } catch (error) {
                setError(error);
                setLoading(false);
                setLoadingCard(false);
            }
        };

        fetchDataForAllCountries();
    }, [date]);

    // Pagination calculations
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = data.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(data.length / articlesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading)
        return (
            <div className='flex justify-center m-4 h-full items-center w-full'>
                <Loading />
            </div>
        );
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='african p-4'>
            <h1 className='text-2xl text-white font-bold text-center mb-4'>Top Wikimedia Articles in Africa</h1>

            <div className='flex flex-wrap justify-center items-center gap-5 my-3'>
                <button onClick={handleClicked} className='bg-blue-500 text-white px-4 py-2 rounded'>
                    Articles List/Article Gallery
                </button>
                <DatePicker onChange={handleChange} date={today.toISOString().split('T')[0]} />
                <h1>Top Africa Atricle: {`${date.day}/${date.month}/${date.year}`}</h1>
            </div>

            {loadingCard && !showCard && (
                <div className='flex flex-wrap items-center justify-center pt-[2rem] max-md:flex-col'>
                    <Loading />
                </div>
            )}

            {loadingCard && showCard && (
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

            {!loadingCard &&
                (showCard ? (
                    <div className='flex flex-wrap justify-center gap-4 my-9'>
                        {currentArticles.map((article, index) => (
                            <ArticleCard
                                key={index}
                                article={article.title}
                                rank={article.rank}
                                views_ceil={article.views}
                                country={article.country}
                                project={article.project}
                            />
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col justify-center items-center'>
                        <ListArticlesResult articlesData={currentArticles} />
                    </div>
                ))}
            {data.length == 0 && (
                <div className='w-full flex text-white justify-center mb-3'>
                    <p>No Article Post</p>
                </div>
            )}

            <div className='flex justify-center items-center gap-4 my-5 mb-12'>
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50'
                >
                    Previous
                </button>
                <span className='text-lg text-white font-semibold'>
                    Page {data.length == 0 ? 0 : currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50'
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TopAfrica;
