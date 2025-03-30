import axios from 'axios';

const fetchArticleDescription = async (project, title) => {
    try {
        const response = await axios.get(`https://${project}.org/api/rest_v1/page/summary/${title}`);
        return response.data.description;
    } catch (error) {
        return null;
    }
};

export default fetchArticleDescription;
