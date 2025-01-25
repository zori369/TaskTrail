import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Root element not found. Please ensure there's an element with id 'root' in your HTML.");
}

const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
