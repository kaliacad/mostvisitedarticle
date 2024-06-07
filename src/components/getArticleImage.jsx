import fetchImageFromArticle from '../api/fetchImageFromArticle';
import { useState, useEffect } from 'react';

const GetArticleImage = ({ project, article }) => {
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const link = await fetchImageFromArticle(project, article);
                setUrl(link);
            } catch (error) {
                setUrl(null);
            }
        };

        fetchImages();
    }, [project, article]);

    return <img src={url} alt />;
};

export default GetArticleImage;
