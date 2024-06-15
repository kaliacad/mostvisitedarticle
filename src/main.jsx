import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './global.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import PageViews from './components/PageViews/PageViews.jsx';
import Africa from './pages/Africa.jsx';
import NotFound from './pages/NotFound.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/permanent/:id',
        element: <App />,
    },
    {
        path: '/home',
        element: <Home />,
    },
    {
        path: '/page-views',
        element: <PageViews />,
    },
    {
        path: '/top-africa',
        element: <Africa />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Layout>
        <RouterProvider router={router} />
    </Layout>,
);
