import './articlecard.css';
import getPageURL from '../helpers/getPageUrl';
import fetchImageFromArticle from '../api/fetchImageFromArticle';
import { useEffect, useState } from 'react';
import Button from './Button';
const ArticleCard = ({ article, project, views_ceil, rank }) => {
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
    }, []);

    return (
        <div className='article-card'>
            <img src={url ? url : './article-placeholder.png'} alt='nom article' className='article-image' />
            <div className='article-content'>
                <h3 className='article-title'>
                    <a href={getPageURL(article, project)} target='_blank'>
                        {article}
                    </a>
                </h3>
                <div className='article-description'>
                    <p>
                        <span>Project</span> : <span>{project}</span>
                    </p>
                    <p>
                        <span>Rank</span> : <span>{rank}</span>
                    </p>
                    <p>
                        <span>Views : </span> : <span>{views_ceil}</span>
                    </p>
                </div>

                <Button event={() => (window.location.href = getPageURL(article, project))} text="Lire l'article" className='article-link' />
            </div>
        </div>
    );
};

export default ArticleCard;
