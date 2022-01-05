import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { Button } from 'semantic-ui-react';
import StartGame from './StartGame';

const quiz = {
    id: '1',
    name: 'Quiz #1',
    description: 'This is quiz number 1 description',
    timesPlayed: 15,
    subject: 'Geography',
    questions: [
        {
            number: 1,
            text: 'Is this the first question?',
            answers: [
                {
                    text: 'Yes',
                    isCorrect: true
                },
                {
                    text: 'No',
                    isCorrect: false
                },
                {
                    text: 'Perhaps',
                    isCorrect: false
                },
                {
                    text: 'Not sure',
                    isCorrect: false
                }]
        },
        {
            number: 2,
            text: 'Is this the second question?',
            answers: [
                {
                    text: 'Yes',
                    isCorrect: true
                },
                {
                    text: 'No',
                    isCorrect: false
                },
                {
                    text: 'Perhaps',
                    isCorrect: false
                },
                {
                    text: 'Not sure',
                    isCorrect: false
                }]
        },
        {
            number: 3,
            text: 'Is this the third question?',
            answers: [
                {
                    text: 'Yes',
                    isCorrect: true
                },
                {
                    text: 'No',
                    isCorrect: false
                },
                {
                    text: 'Perhaps',
                    isCorrect: false
                },
                {
                    text: 'Not sure',
                    isCorrect: false
                }]
        }
    ]
}

export default observer(function Play() {
    // const [currentQuestion, setCurrentQuestion] = useState(0);
    // const [showScore, setShowScore] = useState(false);
    // const [score, setScore] = useState(0);

    // const handleAnswerOptionClick = (isCorrect: boolean) => {
    //     if (isCorrect) {
    //         setScore(score + 1);
    //     }

    //     const nextQuestion = currentQuestion + 1;
    //     if (nextQuestion < quiz.questions.length) {
    //         setCurrentQuestion(nextQuestion);
    //     } else {
    //         setShowScore(true);
    //     }
    // };
    const [start, setStart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleAnswerOptionClick = (isCorrect: boolean) => {
        setCurrentQuestion(currentQuestion+1);
    }

    return (
        <>
            {
                start
                    ?
                    (!gameOver
                        ?
                        <>
                            <span>Question {currentQuestion + 1}/{quiz.questions.length}</span>
                            <h1>{quiz.questions[currentQuestion].text}</h1>
                            <hr />
                            <div>
                                <Button fluid color='red' content={quiz.questions[currentQuestion].answers[0].text} onClick={() => handleAnswerOptionClick(quiz.questions[currentQuestion].answers[0].isCorrect)} /><br />
                                <Button fluid color='green' content={quiz.questions[currentQuestion].answers[1].text} onClick={() => handleAnswerOptionClick(quiz.questions[currentQuestion].answers[1].isCorrect)}/><br />
                                <Button fluid color='purple' content={quiz.questions[currentQuestion].answers[2].text} onClick={() => handleAnswerOptionClick(quiz.questions[currentQuestion].answers[2].isCorrect)} /><br />
                                <Button fluid color='yellow'  content={quiz.questions[currentQuestion].answers[3].text} onClick={() => handleAnswerOptionClick(quiz.questions[currentQuestion].answers[3].isCorrect)} />
                            </div>
                        </>
                        :
                        <h1>Game is over</h1>
                    )
                    :
                    <StartGame setStart={setStart} />
            }
        </>
    )
})


{/* <div className='app'>
                {showScore ? (
                    <div className='score-section'>
                        You scored {score} out of {quiz.questions.length}
                    </div>
                ) : (
                    <>
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Question {currentQuestion + 1}</span>/{quiz.questions.length}
                            </div>
                            <div className='question-text'>{quiz.questions[currentQuestion].text}</div>
                        </div>
                        <div className='answer-section'>
                            {quiz.questions[currentQuestion].answers.map((answer) => (
                                <button onClick={() => handleAnswerOptionClick(answer.isCorrect)}>{answer.text}</button>
                            ))}
                        </div>
                    </>
                )}
            </div> */}