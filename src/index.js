import React,{useState,useEffect} from 'react';
import { render } from 'react-dom';
import './index.css';
import ProductListingPage from './pages/productListPage/productListPage';
import ProductPage from './pages/ProductPage/App';
import reportWebVitals from './reportWebVitals';

const App = () => {
  const [route, setRoute] = useState('');

  useEffect(() => {
    const handleRouteChange = () => {
      const currentPath = window.location.pathname;
      setRoute(currentPath);
    };

    // Attach a listener to the 'popstate' event to detect route changes
    window.addEventListener('popstate', handleRouteChange);

    // Call the handler once to initialize the route
    handleRouteChange();

    // Clean up the listener on component unmount
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const renderPage = () => {
    if (route === '/pdp') {
      return <ProductPage />;
    } else {
      return <ProductListingPage />;
    }
  };

  return <div>{renderPage()}</div>;
};

export default App;

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
