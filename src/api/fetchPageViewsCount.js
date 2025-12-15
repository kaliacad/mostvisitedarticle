import axios from 'axios';
import { todayDay, todayMonth, todayYear } from '../helpers/dateNowSpliter';

const fetchPageViewsCount = async (specification) => {
    const {
        article,
        project,
        acess = 'all-access',
        agents = 'all-agents',
        dateType = 'daily',
        start = `${todayYear}0101`,
        end = `${todayYear}${todayMonth}${todayDay}`,
    } = specification;
    try {
        const encodedArticle = encodeURIComponent((article || '').replace(/\s+/g, '_'));
        const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/${project}/${acess}/${agents}/${encodedArticle}/${dateType}/${start}/${end}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        // On error (404 or network), return an empty items array so callers can
        // treat it as "no data" instead of triggering a fetch error UI.
        return { items: [] };
    }
};

export default fetchPageViewsCount;
