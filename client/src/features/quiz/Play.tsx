import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, Divider, Grid, Header, Icon, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import QuestionTimer from './QuestionTimer';
import StartTimer from './StartTimer';
import useSound from 'use-sound';
import Leaderboard from './Leaderboard';

export default observer(function Play() {
    const { quizStore } = useStore();
    const { selectedQuiz: quiz, loadQuiz, loadingInitial, streak, increaseStreak, restartStreak,
        increaseCorrectCount, questionsCorrectCount, answerHistory } = quizStore;
    const { id } = useParams<{ id: string }>();

    const [start, setStart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questionOver, setQuestionOver] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [timerEnded, setTimerEnded] = useState(false);
    const [lastQuestion, setLastQuestion] = useState(false);

    const [play, { stop }] = useSound('/assets/sounds/music.mp3', {
        volume: 1
    })
    const [playSubmitAnswer] = useSound('/assets/sounds/submitAnswer.mp3');

    const handleStart = () => {
        setStart(true);
        play();
    }

    const handleTimerEnded = () => {
        setTimerEnded(true);
        handleAnswerOptionClick(false);
        stop();
        playSubmitAnswer();
    }

    const handleAnswerOptionClick = (isCorrect: boolean) => {
        answerHistory.push(isCorrect ? 'correct' : 'incorrect');
        setCorrect(isCorrect);

        if (isCorrect) {
            increaseStreak();
            increaseCorrectCount();
        }
        else {
            restartStreak();
        }
        setQuestionOver(true);
        stop();
        playSubmitAnswer();
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
        stop();
        if (!lastQuestion) {
            play();
        }
    }

    const handleQuizEnd = async () => {
        await quizStore.saveResult(id, { score: totalScore, answerHistory }).then(() => console.log('Saved results'));
        setGameOver(true);
        stop();
    }

    let startTime = new Date();
    startTime.setSeconds(startTime.getSeconds() + 3);
    let questionTimer = new Date();

    useEffect(() => {
        if (id) {
            loadQuiz(id)
        }
        if (correct) {
            setScore(quiz!.questions[currentQuestion].points);
            setTotalScore(totalScore + score);
        }
        if (quiz) {
            questionTimer.setSeconds(questionTimer.getSeconds() + quiz.questions[currentQuestion].time);
        }
        if (quiz && currentQuestion + 1 === quiz?.questions.length) {
            setLastQuestion(true);
        }
    }, [questionOver, score, start, quiz])

    if (loadingInitial || !quiz) return <LoadingComponent />;

    return (
        <>
            {start
                ?
                (!gameOver
                    ?
                    (!questionOver
                        ?
                        <Segment inverted textAlign='center' vertical className='questions'>
                            <Container>
                                <div>
                                    <Segment secondary circular>
                                        <QuestionTimer expiryTimestamp={questionTimer} onExpire={handleTimerEnded} />
                                    </Segment>
                                    <div style={{ fontSize: '40px' }}>
                                        <Header style={{ color: 'white' }} content={`${currentQuestion + 1}/${quiz.questions.length}`} />
                                    </div>
                                </div>
                                <div className='questions-container' >
                                    <h1 className='player-name'>{quiz.questions[currentQuestion].text}</h1>
                                    <div className='questions-grid' >
                                        <div className='question q1' onClick={() => handleAnswerOptionClick(quiz.questions[currentQuestion].answers[0].isCorrect)}>
                                            <div className='answer'>
                                                <div className='shape-container'>
                                                    <img src={'/assets/circle.svg'} alt='' className='shape-question' />
                                                </div>
                                                <h2>{quiz.questions[currentQuestion].answers[0].text}</h2>
                                            </div>
                                        </div>
                                        <div className='question q2' onClick={() => handleAnswerOptionClick(quiz.questions[currentQuestion].answers[1].isCorrect)}>
                                            <div className='answer'>
                                                <div className='shape-container'>
                                                    <img src={'/assets/diamond.svg'} alt='' className='shape-question' />
                                                </div>
                                                <h2>{quiz.questions[currentQuestion].answers[1].text}</h2>
                                            </div>
                                        </div>

                                        <div className='question q3' onClick={() => handleAnswerOptionClick(quiz.questions[currentQuestion].answers[2].isCorrect)}>
                                            <div className='answer'>
                                                <div className='shape-container'>
                                                    <img src={'/assets/square.svg'} alt='' className='shape-question' />
                                                </div>
                                                <h2>{quiz.questions[currentQuestion].answers[2].text}</h2>
                                            </div>
                                        </div>
                                        <div className='question q4' onClick={() => handleAnswerOptionClick(quiz.questions[currentQuestion].answers[3].isCorrect)}>
                                            <div className='answer'>
                                                <div className='shape-container'>
                                                    <img src={'/assets/triangle.svg'} alt='' className='shape-question' />
                                                </div>
                                                <h2>{quiz.questions[currentQuestion].answers[3].text}</h2>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </Segment>
                        :
                        <Segment inverted textAlign='center' vertical className='questions'>
                            <Container>
                                {timerEnded ?
                                    <Segment textAlign='center' className='result' inverted color={'red'}>
                                        <span role="img" aria-label="Heart">
                                            ⌛️
                                        </span>
                                        <Header style={{ 'font-size': '40px' }} content={'You ran out of time! Try to be faster next time...'} />
                                    </Segment>
                                    :
                                    <Segment textAlign='center' className='result' inverted color={correct ? 'green' : 'red'}>
                                        {correct ?
                                            <span role="img" aria-label="Heart">
                                                🥳
                                            </span>
                                            :
                                            <span role="img" aria-label="Heart">
                                                😣
                                            </span>
                                        }
                                        <Header style={{ 'font-size': '50px' }} content={correct ? 'Correct' : 'Wrong'} />
                                    </Segment>
                                }
                                <Header style={{ 'font-size': '70px', 'margin-top': '100px', 'color': 'white' }} content={`${correct ? '+' : ''} ${score} points`} />
                                {streak !== 0 &&
                                    <h1>{`Answer streak🔥 `}<Label content={streak} color='red' circular size='massive' /></h1>
                                }
                                {!lastQuestion
                                    ?
                                    <>
                                        <Button icon='right arrow' labelPosition='right' size='huge' color='pink' content='Next question' onClick={() => handleNextQuestion()} /><br />
                                    </>
                                    :
                                    <>
                                        <Button icon='right arrow' labelPosition='right' size='huge' color='pink' content='End quiz' onClick={() => handleQuizEnd()} /><br />
                                    </>
                                }
                            </Container>
                        </Segment>
                    )
                    :
                    <Segment inverted textAlign='center' vertical className='questions'>
                        <Container>
                            <div style={{ "marginTop": "50px" }}>
                                <span role="img" aria-label="Heart" id='finished-span'>
                                    {questionsCorrectCount === 0 && '💩'}
                                    {questionsCorrectCount === quiz.questions.length && '🌟'}
                                    {questionsCorrectCount > 0 && questionsCorrectCount < quiz.questions.length && '🌟'}
                                </span>
                                {questionsCorrectCount === 0 && <h1>Mamma mia, that was horrendous...</h1>}
                                {questionsCorrectCount === quiz.questions.length && <h1>You are a star!!</h1>}
                                {questionsCorrectCount > 0 && questionsCorrectCount < quiz.questions.length && <h1>Superb!</h1>}
                            </div>
                            <br />
                            <Label size='huge' basic color='blue' circular><h1 style={{ "fontSize": "30px", "padding": "0px 30px" }}>
                                You earned {totalScore} points</h1></Label>
                            <br />
                            <Label size='huge' basic color='purple' circular><h1 style={{ "fontSize": "30px", "padding": "0px 30px" }}>
                                {questionsCorrectCount} correct out of {quiz.questions.length}</h1></Label>
                                <br /><br />
                            <div style={{"display": "flex", "flexDirection": "column", "justifyContent": "center", "alignItems": "center"}}>
                                <h1>Top 5 all time</h1>
                                <Leaderboard id={id} />
                            </div>
                            <br /><br />
                            <Button.Group size='large'>
                                <Button color='pink' as={Link} to='/community' onClick={() => restartStreak()}>Homepage</Button>
                                <Button.Or />
                                <Button positive onClick={() => window.location.reload()}>Replay quiz</Button>
                            </Button.Group>
                        </Container>
                    </Segment>
                )
                :
                <StartTimer expiryTimestamp={startTime} onExpire={handleStart} />
            }
        </>
    )
})

