import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './global.css';
import Loading from './components/loading.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ExemplePagination from './pages/exemplePagination.jsx';
import TopAfrica from './pages/topAfrica.jsx';
import Home from './pages/Home.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/home',
        element: <App />,
    },
    {
        path: '/loading',
        element: <Loading />,
    },
    {
        path: '/exemple_pagination',
        element: <ExemplePagination />,
    },
    {
        path: '/top_africa',
        element: <TopAfrica />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
