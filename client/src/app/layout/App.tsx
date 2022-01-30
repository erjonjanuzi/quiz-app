import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useStore } from '../stores/store';
import { ToastContainer } from 'react-toastify';
import HomePage from '../../features/home/HomePage';
import { Container } from 'semantic-ui-react';
import ViewQuizPage from '../../features/quiz/ViewQuizPage';
import Play from '../../features/quiz/Play';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import PrivateRoute from './PrivateRoute';
import Main from '../../features/community/Main';
import { observer } from 'mobx-react-lite';
import MyLibrary from '../../features/library/MyLibrary';
import CreateQuiz from '../../features/library/CreateQuiz';
import EditQuiz from '../../features/library/EditQuiz';

function App() {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <ToastContainer position='top-right' hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <PrivateRoute exact path='/quiz/play/:id' component={Play} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Container style={{ marginTop: '5em' }}>
              <Switch>
                <PrivateRoute path='/community' component={Main} />
                <PrivateRoute path='/quiz/view/:id' component={ViewQuizPage} />
                <PrivateRoute path='/quiz/create' component={CreateQuiz} />
                <PrivateRoute path='/quiz/edit/:id' component={EditQuiz} />
                <PrivateRoute path='/library' component={MyLibrary} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
