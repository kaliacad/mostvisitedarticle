import axios from 'axios';

const fetchArticleDescription = async (title) => {
    try {
        const response = await axios.get(`https://fr.wikipedia.org/api/rest_v1/page/summary/${title}`);
        return response.data.description;
    } catch (error) {
        return error.message;
    }
};

export default fetchArticleDescription;
