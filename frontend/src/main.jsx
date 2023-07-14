import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import { handleError, handleReactQueryError } from './utils/error'
import Header from './components/Header';
import Footer from './components/Footer';
import Error503 from './pages/Error503';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <QueryClientProvider client={queryClient} onError={handleReactQueryError}>
              <ErrorBoundary onError={handleError} fallback={<><Header /><Error503 /><Footer /></>}>
                <App />
              </ErrorBoundary>
            </QueryClientProvider>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
