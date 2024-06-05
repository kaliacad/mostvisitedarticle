import { useEffect, useState } from 'react';
import fetchArticleList from '.';
const FetchData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticleList()
            .then((response) => {
                setData(response);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Fetched Articles</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.ns}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default FetchData;
