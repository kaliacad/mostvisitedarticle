import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './styles/index.css';
import router from './routers';
import './i18n/i18n';

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
