import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router/Router';
import './reset.css';
import './variables.scss';

// Use ReactDOM.createRoot to render the application into the root element
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrap the entire application with BrowserRouter for routing functionality
  <BrowserRouter>
    {/* Render the Router component, which contains the routing logic */}
    <Router />
  </BrowserRouter>,
);

