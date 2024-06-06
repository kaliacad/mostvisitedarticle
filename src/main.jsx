import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './global.css';
import Loading from './components/loading.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
        <Loading />
    </React.StrictMode>,
);
