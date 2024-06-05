import { useState, useEffect } from 'react';
import axios from 'axios';

const MostArticleByProject = ({ project }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMostViewedArticles = async () => {
            try {
                const response = await axios.get(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/${project}/all-access/2024/06/01`);
                setArticles(response.data.items[0].articles);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchMostViewedArticles();
    }, [project]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return <div>{`Affichage des articles le plus visités par projet mediawiki ex : N°1 : ${articles[0].article}`}</div>;
};

export default MostArticleByProject;
