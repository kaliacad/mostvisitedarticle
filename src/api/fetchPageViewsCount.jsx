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
        const response = await axios.get(
            `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/${project}/${acess}/${agents}/${article}/${dateType}/${start}/${end}`,
        );
        return response.data;
    } catch (error) {
        return;
    }
};

export default fetchPageViewsCount;
