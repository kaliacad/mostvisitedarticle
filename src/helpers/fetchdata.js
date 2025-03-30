import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
    headers: {
        'User-Agent': 'MyApp/1.0 (Contact: tresorsawsawa@example.com)',
    },
});

const fetchMostVisitedArticlesData = async ({ country, access, year, month, day }) => {
    try {
        const formattedMonth = month.padStart(2, '0');
        const formattedDay = day.padStart(2, '0');
        const apiUrl = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${country}/${access}/${year}/${formattedMonth}/${formattedDay}`;

        return await axiosInstance.get(apiUrl);
    } catch (error) {
        toast.error('Aucune donnée trouvée pour les paramètres passées', {
            autoClose: 5000,
            position: 'bottom-center',
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    }
};

export default fetchMostVisitedArticlesData;
