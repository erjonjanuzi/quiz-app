import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useStore } from '../stores/store';
import { ToastContainer } from 'react-toastify';
import NavBar from './NavBar';
import HomePage from '../../features/home/HomePage';
import { Container } from 'semantic-ui-react';
import QuizList from '../../features/quiz/QuizList';
import ViewQuizPage from '../../features/quiz/ViewQuizPage';
import Play from '../../features/quiz/Play';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import PrivateRoute from './PrivateRoute';
import Main from '../../features/community/Main';

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  // if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <ToastContainer position='top-right' hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <PrivateRoute path='/community' component={Main} />
                <PrivateRoute path='/quiz/view/:quizId' component={ViewQuizPage} />
                <PrivateRoute exact path='/quiz/play/:quizId' component={Play} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
