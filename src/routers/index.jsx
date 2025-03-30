import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import PageViews from '../pages/PageViews.jsx';
import TopAfrica from '../pages/TopAfrica.jsx';
import NotFound from '../pages/NotFound.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/permanent/:id',
        element: <Home />,
    },
    {
        path: '/page-views',
        element: <PageViews />,
    },
    {
        path: '/top-africa',
        element: <TopAfrica />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;
