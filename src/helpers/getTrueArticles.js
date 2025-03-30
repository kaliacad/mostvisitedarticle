import getWikiInfo from '../api/getWikiInfo';
import isArticle from './isArticle';

const getTrueArticles = async (articles) => {
    const articlesWithWikiInfo = await Promise.all(
        articles.map(async (art) => {
            const wikiInfo = await getWikiInfo(art.project);
            return { ...art, wikiInfo };
        }),
    );

    return articlesWithWikiInfo.filter((art) => isArticle(art.title, art.wikiInfo));
};

export default getTrueArticles;
