import axios from 'axios';

const fetchArticleLink = async (title) => {
    const END_POINT = 'https://en.wikipedia.org/w/api.php';
    const params = {
        action: 'query',
        format: 'json',
        prop: 'info',
        inprop: 'url',
        titles: title,
        origin: '*',
    };
    try {
        const response = await axios.get(END_POINT, { params });

        return response.data.query.pages;
    } catch (error) {
        return 'Article not found';
    }
};
export default fetchArticleLink;
