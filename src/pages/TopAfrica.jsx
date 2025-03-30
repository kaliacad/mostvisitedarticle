import { useEffect, useState } from 'react';
import { fetchTopArticles } from '../api';
import ArticleCard from '../components/ArticleView/ArticleCard';
import Loading from '../components/common/loading';
import countries from '../helpers/countriesIsoCodes';
import ListArticlesResult from '../components/ArticleView/ArticleList';
import DatePicker from '../components/ArticleForm/DatePicker';
import ArticleCardSkeletton from '../components/ArticleView/ArticleCardSkeletton';
import getTrueArticles from '../helpers/getTrueArticles';

const africanCountries = countries.Africa;

const getCountryNameByCode = (code) => {
    const country = africanCountries.find((country) => country.code === code);
    return country ? country.name : code;
};

const stringifyDate = (date) => {
    const [year, month, day] = date.split('-');
    return { year, month, day };
};

export default function Africa() {
    const today = new Date();
    const [data, setData] = useState([]);
    const [date, setDate] = useState(stringifyDate(today.toISOString().split('T')[0]));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCard, setShowCard] = useState(true);
    const [loadingCard, setLoadingCard] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = showCard ? 12 : 18; // Display 9 or 12 items per page

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
                const trueArticles = await getTrueArticles(transformedData);
                setData(trueArticles);
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

    // Calculate pagination values
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = data.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(data.length / articlesPerPage);

    // Handle  pagination changes
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Render page numbers for pagination
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => paginate(i)}
                    className={`px-2 py-1 mx-1 ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                    {i}
                </button>,
            );
        }
        return pageNumbers;
    };

    // Display loading component if data is loading
    if (loading)
        return (
            <div className='flex items-center justify-center w-full h-full m-4'>
                <Loading />
            </div>
        );
    if (error) return <p>Error: {error.message}</p>;
    return (
        <main>
            <div className='p-4 african'>
                <h1 className='mb-4 text-2xl font-bold text-center text-white'>Top Wikimedia Articles in Africa</h1>

                <div className='flex flex-wrap items-center justify-center gap-5 my-3'>
                    <button onClick={handleClicked} className='px-4 py-2 text-white bg-blue-500 rounded'>
                        Articles List/Article Gallery
                    </button>
                    <DatePicker onChange={handleChange} />
                    <h1 className='text-white'>Top Africa Article: {`${date.day}/${date.month}/${date.year}`}</h1>
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
                        <div className='flex flex-col items-center justify-center'>
                            <ListArticlesResult articlesData={currentArticles} />
                        </div>
                    ))}
                {data.length == 0 && (
                    <div className='flex justify-center w-full mb-3 text-white'>
                        <p>No Article Post</p>
                    </div>
                )}

                <div className='flex items-center justify-center gap-4 my-5 mb-12'>
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50'
                    >
                        &larr;
                    </button>
                    <div className='flex'>{renderPageNumbers()}</div>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50'
                    >
                        &rarr;
                    </button>
                </div>
            </div>
        </main>
    );
}
