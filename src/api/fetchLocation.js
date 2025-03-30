import axios from 'axios';

const fetchLocation = async (lat, lon) => {
    try {
        const response = await axios.get('https://api.bigdatacloud.net/data/reverse-geocode-client', {
            params: {
                latitude: lat,
                longitude: lon,
                localityLanguage: 'en',
            },
        });

        return response.data;
    } catch (error) {
        return null;
    }
};

export default fetchLocation;
