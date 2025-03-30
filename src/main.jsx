import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './styles/index.css';
import Layout from './components/Layouts';
import router from './routers';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Layout>
        <RouterProvider router={router} />
    </Layout>,
);
