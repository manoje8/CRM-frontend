import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import './index.css';
import "react-toastify/dist/ReactToastify.css";

/**
 * concurrent mode, which allows React to update the UI in a more efficient and 
 * responsive way by breaking up large updates into smaller chunks.
*/
const root = ReactDOM.createRoot(document.getElementById('root'), {mode: 'concurrent'});
root.render(
    <Router>
      <ToastContainer autoClose={1000}/>
      <AppRoutes />
    </Router>
);

