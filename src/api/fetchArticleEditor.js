import axios from 'axios';

const fetchArticleEditor = async (project, title) => {
    try {
        const response = await axios.get(`https://${project}.org/w/api.php`, {
            params: {
                action: 'query',
                prop: 'contributors',
                titles: title,
                pclimit: 'max',
                format: 'json',
                origin: '*',
            },
        });
        const process = (data) => {
            const contributors = [...new Set(Object.values(data.query.pages)[0].contributors.map((cont) => cont.name))];
            return contributors.length;
        };

        return process(response.data);
    } catch (error) {
        return null;
    }
};

export default fetchArticleEditor;
