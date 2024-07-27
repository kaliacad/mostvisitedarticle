import './articleview.css';
import getPageURL from '../../helpers/getPageUrl';
// import fetchImageFromArticle from '../../api/fetchImageFromArticle';
import fetchArticleImage from '../../api/fetchArticleImage';
import fetchArticleEditor from '../../api/fetchArticleEditor';
import pageNameDecoder from '../../helpers/pageNameDecoder';
import { useEffect, useState } from 'react';
import Button from '../common/Button';
import fetchArticleDescription from '../../api/fetchArticleDescription';

const ArticleCard = ({ article, project, views_ceil, rank, country }) => {
    const [url, setUrl] = useState(null);
    const [editors, setEditors] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const link = await fetchArticleImage(article, project);
                setUrl(link);
            } catch (error) {
                setUrl(null);
            }
        };

        const fetchEditors = async () => {
            try {
                const editor = await fetchArticleEditor(project, article);
                setEditors(editor);
            } catch (error) {
                setEditors(null);
            }
        };
        const fetchDescript = async () => {
            try {
                const smallDescript = await fetchArticleDescription(project, article);
                setDescription(smallDescript);
            } catch (error) {
                setDescription(null);
            }
        };
        fetchEditors();
        fetchImages();
        fetchDescript();
    }, [article, project]);
    return (
        <div className='article-card flex flex-col bg-[#ffff] hover:shadow-[0px_0px_15px_0px_#718096b8] shadow-[0px_0px_7px_0px_#a9a9a9] duration-500 rounded-md w-full overflow-hidden'>
            <div className='card-image-container'>
                <img src={url ? url : './article-placeholder.png'} alt={article} className='article-image bg-gray-200 !object-cover' />
            </div>

            <div className='article-content'>
                <h3 className='article-title'>
                    <a href={getPageURL(article, project)} target='_blank'>
                        {pageNameDecoder(article)}
                    </a>
                </h3>
                <div className='article-description flex flex-col gap-2'>
                    <p>
                        <span>Description: </span>
                        {description ? description : 'pas de description'}
                        <span></span>
                    </p>
                    <p>
                        <span>Country:</span> <span>{country ? country : 'N/A'}</span>
                    </p>
                    <p>
                        <span>Project: </span> <span>{project}</span>
                    </p>
                    <p>
                        <span>Rank: </span> <span>{rank}</span>
                    </p>
                    <p>
                        <span>Views : </span> <span>{views_ceil}</span>
                    </p>
                    <p>
                        <span>Editors : </span> <span>{editors ? editors : 'Not found'}</span>
                    </p>
                </div>

                <Button event={() => (window.location.href = getPageURL(article, project))} text="Lire l'article" className='article-link' />
            </div>
        </div>
    );
};

export default ArticleCard;
