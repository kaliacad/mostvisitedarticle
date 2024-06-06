import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './global.css';
import Loading from './components/loading.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MostVisitedArtiliclesByCountryAndDate from './pages/MostVisitedArtiliclesByCountryAndDate/MostVisitedArtiliclesByCountryAndDate'

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
        path: '/top_visited_articles_country_day',
        element: <MostVisitedArtiliclesByCountryAndDate />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
