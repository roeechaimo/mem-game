import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import AppHeader from './AppHeader/AppHeader';
import { ROUTES } from './routes';

function App() {
  return (
    <div className='app'>
      <Router>
        <AppHeader />
        <Routes>
          {ROUTES.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
