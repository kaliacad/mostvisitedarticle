import './articlecard.css';

const ArticleCard = ({ article, project, views_ceil, rank }) => {
    // props { article, rank, views_ceil, project }

    return (
        <div className='article-card'>
            <img src='https://cdn-icons-png.flaticon.com/256/4598/4598489.png' alt='nom article' className='article-image' />
            <div className='article-content'>
                <h3 className='article-title'>{article}</h3>
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

                <a href='https://fr.wikipedia.org/wiki/Goma' className='article-link'>
                    Lire l&apos;article
                </a>
            </div>
        </div>
    );
};

export default ArticleCard;
