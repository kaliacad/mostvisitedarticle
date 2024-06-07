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
    }, [article, project]);

    return (
        <div className='flex flex-col bg-[#ffff1] hover:shadow-[0px_0px_15px_0px_#718096b8] shadow-[0px_0px_7px_0px_#a9a9a9] duration-500 rounded-md w-full overflow-hidden'>
            <img
                src={url ? url : 'https://cdn-icons-png.flaticon.com/256/4598/4598489.png'}
                alt={article}
                className='article-image bg-gray-200 !object-cover'
            />
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
