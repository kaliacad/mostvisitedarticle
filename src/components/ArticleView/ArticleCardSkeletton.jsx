import '../../styles/articleCardSkeletton.css';

// Documentatin d'utilisation de skeletton
// Ce composant prend un props qui est le nombre de fois où nous souhaiter afficher le skeletton
function afficheSkeletton(nombre) {
    const skeletton = [];
    for (let i = 0; i < nombre; i++) {
        skeletton.push(
            <div key={i} className='article-cardskeleton'>
                <div className='article-imageskeleton skeleton'></div>
                <div className='article-content-skeleton'>
                    <div className='article-title-skeleton skeleton'></div>
                    <div className='article-author skeleton'></div>
                    <div className='article-date skeleton'></div>
                </div>
            </div>,
        );
    }
    return skeletton;
}

const ArticleCardSkeletton = ({ nombre = 1 }) => {
    return (
        <div>
            <div className='articles-gallery'>{afficheSkeletton(nombre)}</div>
        </div>
    );
};
export default ArticleCardSkeletton;
