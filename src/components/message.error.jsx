import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const App = async () => {
            try {
                const response = await axios.get('https://api.example.com/data');
                setData(response.data);
                setLoading(false);
            } catch (err) {
                if (err.response) {
                    setError(`erreur  HTTP: ${err.response.status} - ${err.response.statusText}`);
                } else if (err.request) {
                    setError('Erreur de connexion : Aucune réponse');
                } else {
                    setError(`Erreur: ${err.message}`);
                }
                setLoading(false);
            }
        };
        App();
    }, []);
    if (loading) {
        return <div>chargement....</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div>
            <h1>Données reçues</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};
export default App;
