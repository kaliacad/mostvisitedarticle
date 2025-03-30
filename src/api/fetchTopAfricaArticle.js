import axios from 'axios';

export default async function fetchTopAfricaArticle() {
    try {
        const response = await axios.get('https://en.wikipedia.org/w/api.php', {
            params: {
                action: 'query',
                format: 'json',
                list: 'search',
                srsearch: 'Africa',
                origin: '*',
            },
        });

        return response.data;
    } catch (error) {
        return error;
    }
}
