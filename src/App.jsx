import { ToastContainer } from 'react-toastify';
import TopVisited from './components/TopVisited.jsx';
import 'react-toastify/dist/ReactToastify.css';
function App() {
    return (
        <div>
            <div className='container mx-auto py-4 mb-8'>
                <ToastContainer />
                <TopVisited />
            </div>
        </div>
    );
}
export default App;
