import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        'User-Agent': 'MyApp/1.0 (Contact: tresorsawsawa@example.com)',
    },
});

const fetchMostVisitedArticlesData = async ({ country, access, year, month, day }) => {
    const formattedMonth = month.padStart(2, '0');
    const formattedDay = day.padStart(2, '0');
    const apiUrl = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${country}/${access}/${year}/${formattedMonth}/${formattedDay}`;

    return await axiosInstance.get(apiUrl);
};

export default fetchMostVisitedArticlesData;
