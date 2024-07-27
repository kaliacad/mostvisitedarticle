import axios from 'axios';

async function getWikiInfo(project) {
    const MW_API_URL = `https://${project}.org/w/api.php`;

    const params = {
        action: 'query',
        meta: 'siteinfo',
        format: 'json',
        siprop: 'general|namespaces',
        origin: '*',
    };

    try {
        const response = await axios.get(MW_API_URL, { params });
        const data = response.data;
        const mainpage = data.query.general.mainpage.replace(' ', '_');
        const namespaces = Object.values(data.query.namespaces)
            .filter((ns_info) => ns_info.id !== 0)
            .map((ns_info) => ns_info['*'].replace(' ', '_'));

        return {
            mainpage: mainpage,
            namespaces: namespaces,
        };
    } catch (error) {
        return {
            mainpage: '',
            namespaces: [],
        };
    }
}

export default getWikiInfo;
