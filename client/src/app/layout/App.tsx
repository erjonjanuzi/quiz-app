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

function App() {
  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route path='/home' component={QuizList} />
                <Route path='/quiz/view/:quizId' component={ViewQuizPage} />
                <Route exact path='/quiz/play/:quizId' component={Play} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
