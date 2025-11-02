import React from 'react';
import ReactDOM from 'react-dom/client';
// Import the component you created
import ProductListingPage from './ProductListingPage';
// Import the corresponding CSS file
import './ProductListingPage.css';

// Get the root element from the HTML (usually index.html)
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the ProductListingPage component inside React's Strict Mode
root.render(
  <React.StrictMode>
    <ProductListingPage />
  </React.StrictMode>
);