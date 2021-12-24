import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useStore } from '../stores/store';
import { ToastContainer } from 'react-toastify';
import NavBar from './NavBar';
import HomePage from '../../features/home/HomePage';
import { Container } from 'semantic-ui-react';
import PlayGameHome from '../../features/play/PlayGameHome';

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
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
