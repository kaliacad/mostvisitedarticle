import axios from 'axios';
import { todayYear, todayMonth, todayDay } from '../helpers/dateNowSpliter';

/*
Get a list of Articles per country , year, month, day
Use A dictionary to set all your requirements specification and give it as a arguments to this API REQUEST

***Use Empty Dics for no specification if the default match to your request***
NO SPECIFICATION EXAMPLE
fetchTopArticles({})

*** If you have your own specification ***
SPECIFIICATION DIC EXANPLE
const mySpecification = {
    countryCode:'RW', 
    access:'desketop', 
    year:'2023', 
    month:'07', 
    day:'01'
}
fetchTopArticles(mySpecification)
*/

const BASE_URL = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country';

const fetchTopArticles = async (specification) => {
    const { countryCode = 'CD', access = 'all-access', year = todayYear, month = todayMonth, day = todayDay } = specification;
    const END_POINT = `${BASE_URL}/${countryCode}/${access}/${year}/${month}/${day}`;

    try {
        const response = await axios.get(END_POINT);
        return response.data;
    } catch (error) {
        return [];
    }
};

export default fetchTopArticles;
