import { observer } from 'mobx-react-lite';
import React from 'react';

import QuizCard from './QuizCard';

const quizzes = [
    {
      id: '1',
      name: 'Quiz #1',
      description: 'This is quiz number 1 description',
      timesPlayed: 15,
      subject: 'Geography'
    },
    {
      id: '2',
      name: 'Quiz #2',
      description: 'This is quiz number 2 description',
      timesPlayed: 0,
      subject: 'Geography'
    }
  ]

export default observer( function QuizList() {
    return (
        <>
            <h1>Quiz list</h1>
            {/* {quizzes.map(quiz => <QuizCard quiz={quiz} />)} */}
        </>
    )
})