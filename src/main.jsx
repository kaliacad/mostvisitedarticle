import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './global.css';
import Loading from './components/loading.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ExemplePagination from './pages/exemplePagination.jsx';

const router = createBrowserRouter([
    {
        path: '/',
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
