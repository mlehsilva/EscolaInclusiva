import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AcessibilidadeProvider } from './context/AcessibilidadeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AcessibilidadeProvider>
      <App />
    </AcessibilidadeProvider>
  </React.StrictMode>
);
