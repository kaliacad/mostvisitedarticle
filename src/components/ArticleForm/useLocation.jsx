import { useState, useEffect } from 'react';
import fetchLocation from '../../api/fetchLocation';

const useLocation = () => {
    const [location, setLocation] = useState({ country: '', error: '' });

    useEffect(() => {
        const fetchLocationData = async (lat, lon) => {
            try {
                const data = fetchLocation(lat, lon);
                const { countryCode } = data;
                setLocation({ countryCode: countryCode, error: null });
            } catch {
                setLocation({ country: null, error: 'Error fetching location data.' });
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchLocationData(latitude, longitude);
                },
                () => {
                    setLocation({ country: '', error: 'Error getting geolocation.' });
                },
            );
        } else {
            setLocation({ country: '', error: 'Geolocation is not supported by this browser.' });
        }
    }, []);

    return location;
};

export default useLocation;
