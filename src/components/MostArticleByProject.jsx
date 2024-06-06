import { useState, useEffect } from 'react';
//import axios from 'axios';
/*
Since we have already axios in the api component, I will import it here and use the the fetchTopArticles fucntions 
*/
import fetchTopArticles from '../api';

const MostArticleByProject = ({ project }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //The following line to is to handle the platform selection
    const [platform, setPlatform] = useState('all-access');

    useEffect(() => {
        const fetchMostViewedArticles = async () => {
            try {
                const response = await fetchTopArticles({ access: platform, year: '2024', month: '06', day: '01' });

                //const response = await axios.get(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/${project}/all-access/2024/06/01`);
                // Check if the response data is valid and has the expected structure
                if (response && response.items && response.items.length > 0) {
                    setArticles(response.items[0].articles);
                } else {
                    setArticles([]);
                }
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchMostViewedArticles();
    }, [project, platform]);
    const handlePlatformChange = (event) => {
        setPlatform(event.target.value);
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div>
            <label htmlFor='platform-select'>Select Platform:</label>
            <select id='platform-select' value={platform} onChange={handlePlatformChange}>
                <option value='all-access'>All Access</option>
                <option value='desktop'>Desktop</option>
                <option value='mobile-app'>Mobile App</option>
                <option value='mobile-web'>Mobile Web</option>
            </select>
            <div>{`Affichage des articles le plus visités par ${project} sur la platforme ${platform}:`}</div>
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        {index + 1}. {article.article} ({article.views} views)
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default MostArticleByProject;

/*
// Check if the response data is valid and has the expected structure
            if (response && response.items && response.items.length > 0) {
                setArticles(response.items[0].articles);
            } else {
                setArticles([]);
            }
 */
