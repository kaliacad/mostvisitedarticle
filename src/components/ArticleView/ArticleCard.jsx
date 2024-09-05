import './articleview.css';
import getPageURL from '../../helpers/getPageUrl';
import fetchImageFromArticle from '../../api/fetchImageFromArticle';
import fetchArticleEditor from '../../api/fetchArticleEditor';
import pageNameDecoder from '../../helpers/pageNameDecoder';
import { useEffect, useState } from 'react';
import fetchArticleDescription from '../../api/fetchArticleDescription';

const ArticleCard = ({ article, project, views_ceil, rank, country }) => {
    const [url, setUrl] = useState(null);
    const [editors, setEditors] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const link = await fetchImageFromArticle(project, article);
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
                const smallDescript = await fetchArticleDescription(article);
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
        <div className='article-card'>
            <img src={url ? url : './article-placeholder.png'} alt={article} className='article-image' />
            <div className='article-content'>
                <h3 className='article-title'>
                    <a href={getPageURL(article, project)} target='_blank' rel='noopener noreferrer'>
                        {pageNameDecoder(article)}
                    </a>
                </h3>
                <div className='article-description'>
                    <p>
                        <strong>Description:</strong> {description ? description : 'No description available'}
                    </p>
                    <p>
                        <strong>Country:</strong> {country ? country : 'N/A'}
                    </p>
                    <p>
                        <strong>Project:</strong> {project}
                    </p>
                    <p>
                        <strong>Rank:</strong> {rank}
                    </p>
                    <p>
                        <strong>Views:</strong> {views_ceil}
                    </p>
                    <p>
                        <strong>Editors:</strong> {editors ? editors : 'Not found'}
                    </p>
                </div>
                <a href={getPageURL(article, project)} target='_blank' rel='noopener noreferrer' className='button-blue-shadow'>
                    Lire l&apos;article
                </a>
            </div>
        </div>
    );
};

export default ArticleCard;