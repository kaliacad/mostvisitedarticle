import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => {
    const navigation = useNavigate();
    const handleClick = () => navigation('/');
    return (
        <div
            style={{
                textAlign: 'center',
                marginTop: '50px',
            }}
        >
            <h1
                style={{
                    fontSize: '36px',
                    marginBottom: '20px',
                }}
            >
                404 - Page non trouvée
            </h1>
            <p
                style={{
                    fontSize: '18px',
                }}
            >
                {"Désolé, la page que vous recherchez n'existe pas."}
            </p>
            <Button text={'Go to home'} event={handleClick} />
        </div>
    );
};

export default NotFound;
