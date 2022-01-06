import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
            points: 1000,
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
            points: 1000,
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
            points: 1000,
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
    const [start, setStart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questionOver, setQuestionOver] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);

    const handleAnswerOptionClick = (isCorrect: boolean) => {
        setCorrect(isCorrect);
        setQuestionOver(true);
    }

    const handleNextQuestion = () => {
        setQuestionOver(false);
        setScore(0);
        setCorrect(false);
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quiz.questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setGameOver(true);
        }
    }

    useEffect(() => {
        if (correct) {
            setScore(quiz.questions[currentQuestion].points);
            setTotalScore(totalScore + score);
        }
    }, [questionOver, score])

    return (
        <>
            {
                start
                    ?
                    (!gameOver
                        ?
                        (!questionOver
                            ?
                            <>
                                <span>Question {currentQuestion + 1}/{quiz.questions.length}</span>
                                <h1>{quiz.questions[currentQuestion].text}</h1>
                                <hr />
                                <div>
                                    <Button fluid color='red' content={quiz.questions[currentQuestion].answers[0].text} onClick={() => handleAnswerOptionClick(quiz.questions[currentQuestion].answers[0].isCorrect)} /><br />
                                    <Button fluid color='green' content={quiz.questions[currentQuestion].answers[1].text} onClick={() => handleAnswerOptionClick(quiz.questions[currentQuestion].answers[1].isCorrect)} /><br />
                                    <Button fluid color='purple' content={quiz.questions[currentQuestion].answers[2].text} onClick={() => handleAnswerOptionClick(quiz.questions[currentQuestion].answers[2].isCorrect)} /><br />
                                    <Button fluid color='yellow' content={quiz.questions[currentQuestion].answers[3].text} onClick={() => handleAnswerOptionClick(quiz.questions[currentQuestion].answers[3].isCorrect)} />
                                </div>
                            </>
                            :
                            <>
                                <span>{correct ? 'Correct' : 'Wrong'}</span>
                                <h1>{score} points</h1>
                                <h1>Total points: {totalScore}</h1>
                                <Button fluid color='red' content='Next question' onClick={() => handleNextQuestion()} /><br />
                            </>
                        )
                        :
                        <>
                            <h1>Finished</h1>
                            <h1>You earned {totalScore} points</h1>
                                <Button as={Link} to={'/home'} content='Go to homepage' />
                        </>
                    )
                    :
                    <StartGame setStart={setStart} />
            }
        </>
    )
})