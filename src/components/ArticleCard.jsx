import './articlecard.css';
const ArticleCard = () => {
    return (
        <div className='article-card'>
            <img src='https://cdn-icons-png.flaticon.com/256/4598/4598489.png' alt='nom article' className='article-image' />
            <div className='article-content'>
                <h3 className='article-title'>Titre de l&apos;article</h3>
                <p className='article-description'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore illo, odio rem, nostrum sint aliquid cumque quod ratione
                    quibusdam ducimus culpa, laudantium aut quis numquam tenetur iusto? Enim, odio cum!
                </p>
                <a href='https://fr.wikipedia.org/wiki/Goma' className='article-link'>
                    Lire l&apos;article
                </a>
            </div>
        </div>
    );
};

export default ArticleCard;
