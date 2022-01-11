import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import { Button, Container, Header, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import QuestionTimer from './QuestionTimer';
import StartGame from './StartGame';
import StartTimer from './StartTimer';


export default observer(function Play() {
    const { quizStore, userStore } = useStore();
    const { selectedQuiz: quiz, loadQuiz, loadingInitial, clearSelectedQuiz } = quizStore;
    const { id } = useParams<{ id: string }>();

    const [start, setStart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questionOver, setQuestionOver] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [timerEnded, setTimerEnded] = useState(false);

    const handleAnswerOptionClick = (isCorrect: boolean) => {
        setCorrect(isCorrect);
        setQuestionOver(true);
    }

    const handleNextQuestion = () => {
        setQuestionOver(false);
        setScore(0);
        setCorrect(false);
        const nextQuestion = currentQuestion + 1;
        if (quiz && nextQuestion < quiz.questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setGameOver(true);
        }
    }

    const handleStart = () => {
        setStart(true);
    }

    const handleTimerEnded = () => {
        setTimerEnded(true);
        handleAnswerOptionClick(false);
    }

    const time = new Date();
    time.setSeconds(time.getSeconds() + 3);

    // const { seconds, isRunning, restart } = useTimer({ expiryTimestamp: time, onExpire: () => restartTimer()});

    // useEffect(() => {
    //     if (id) loadQuiz(id);
    // }, [id, loadQuiz, clearSelectedQuiz]);

    useEffect(() => {
        if (id) loadQuiz(id);
        if (correct) {
            setScore(quiz!.questions[currentQuestion].points);
            setTotalScore(totalScore + score);
        }
        if (start && quiz) time.setSeconds(time.getSeconds() + quiz.questions[currentQuestion].time);
    }, [questionOver, score])

    if (loadingInitial || !quiz) return <LoadingComponent />;

    return (
        <>
            {start
                ?
                (!gameOver
                    ?
                    (!questionOver
                        ?
                        <>
                            <QuestionTimer expiryTimestamp={time} onExpire={handleTimerEnded} />
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
                            {timerEnded ? 
                                <span>You ran out of time! Be faster next time</span>
                                : 
                                <span>{correct ? 'Correct' : 'Wrong'}</span>
                            }
                            <h1>{score} points</h1>
                            <h1>Total points: {totalScore}</h1>
                            <Button fluid color='red' content='Next question' onClick={() => handleNextQuestion()} /><br />
                        </>
                    )
                    :
                    <>
                        <h1>Finished</h1>
                        <h1>You earned {totalScore} points</h1>
                        <Button as={Link} to={'/community'} content='Go to homepage' />
                    </>
                )
                :
                // <Segment inverted textAlign='center' vertical className='masthead'>
                //     <Container >
                //         <div style={{ textAlign: 'center' }}>
                //             <Header as='h2' content={`Get Ready, ${userStore.user?.firstName}`} />
                //             <Header as='h1' content='Starting in...' />
                //             <div style={{ fontSize: '100px' }}>
                //                 <Header content={seconds} />
                //             </div>
                //         </div>
                //     </Container>
                // </Segment>
                <StartTimer expiryTimestamp={time} onExpire={handleStart} />
            }
        </>
    )
})


{/* <>
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
                            <Button as={Link} to={'/community'} content='Go to homepage' />
                        </>
                    )
                    :
                    <StartGame setStart={setStart} />
            }
        </> */}