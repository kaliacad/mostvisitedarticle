import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigation = useNavigate();
    const handleClick = () => navigation('/');
    return (
        <div className='text-center flex items-center justify-center p-[25vh]'>
            <div className='bg-white/45 p-5'>
                <h1 className='text-4xl mb-2.5'>404 - Page non trouvée</h1>
                <p className='text-lg'>{"Désolé, la page que vous recherchez n'existe pas."}</p>
                <button className='py-1 my-1.5 text-base bg-gray-300' onClick={handleClick}>
                    Go to home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
