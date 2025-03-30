import axios from 'axios';

const DEFAULT_IMAGE = './article-placeholder.png';

const fetchArticleImage = async (title, project) => {
    const params = {
        action: 'query',
        prop: 'pageimages',
        // piprop:'original',
        pithumbsize: 500,
        pilicense: 'any',
        pilimit: 50,
        format: 'json',
        origin: '*',
        titles: title,
    };

    try {
        const response = await axios.get(`https://${project}.org/w/api.php`, { params });
        const pages = response.data.query.pages;
        const images = Object.values(pages).map((page) => page.thumbnail?.source || DEFAULT_IMAGE);

        return images[0];
    } catch (error) {
        return DEFAULT_IMAGE;
    }
};

export default fetchArticleImage;
