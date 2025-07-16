import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/app.css';
import './assets/styles/themes.css';
import './assets/styles/tailwind/index.css';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
