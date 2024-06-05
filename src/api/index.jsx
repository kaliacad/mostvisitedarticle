import axios from 'axios';

const BASE_URL = 'https://en.wikipedia.org/w/api.php';

//Get a list of Articles with a default limit of 10
async function fetchArticleList(limit = 10) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                action: 'query',
                list: 'recentchanges',
                rctype: 'new',
                rcprop: 'title|timestamp',
                rclimit: limit,
                format: 'json',
                origin: '*',
            },
        });
        return response.data.query.recentchanges;
    } catch (error) {
        return [];
    }
}

export default fetchArticleList;
