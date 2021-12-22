import React, { useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';
import { useStore } from '../stores/store';
import { ToastContainer } from 'react-toastify';
import NavBar from './NavBar';
import HomePage from '../../features/home/HomePage';

function App() {
  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
          </>
        )}
      />
    </>
  );
}

export default App;
