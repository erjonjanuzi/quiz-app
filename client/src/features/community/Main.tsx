import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import NavBar from '../../app/layout/NavBar';
import { useStore } from '../../app/stores/store';
import QuizSection from './QuizSection';

export default observer(function Main() {
    const { quizStore } = useStore();

    useEffect(() => {
        quizStore.loadQuizzes();
    }, [quizStore.quizRegistry, quizStore])

    return (
        <>
            <NavBar />
            <Header as='h1' content='Most popular' />
            <QuizSection quizzes={quizStore.mostPopularQuizzes} />
            <Divider />
            <Header as='h1' content='Most recent' />
            <QuizSection quizzes={quizStore.quizzesByDate} />
            <Divider />
            <Header as='h1' content='Browse by subjects' />
            <Header sub content='' />
            <QuizSection quizzes={quizStore.getQuizzesBySubject('')} />
            <Header sub content='Animals' />
            <QuizSection quizzes={quizStore.getQuizzesBySubject('Animals')} /> 
            <Header sub content='Food' />
            <QuizSection quizzes={quizStore.getQuizzesBySubject('Food')} /> 
            <Header sub content='Gaming' />
            <QuizSection quizzes={quizStore.getQuizzesBySubject('Gaming')} /> 
            <Header sub content='General' />
            <QuizSection quizzes={quizStore.getQuizzesBySubject('General')} /> 
            <Header sub content='Geopgrahy' />
            <QuizSection quizzes={quizStore.getQuizzesBySubject('Geography')} /> 
            <Header sub content='History' />
            <QuizSection quizzes={quizStore.getQuizzesBySubject('History')} /> 
            <Header sub content='Literature' />
            <QuizSection quizzes={quizStore.getQuizzesBySubject('Literature')} /> 
            <Header sub content='Mathematics' />
            <QuizSection quizzes={quizStore.getQuizzesBySubject('Mathematics')} /> 
            <Header sub content='Science' />
            <QuizSection quizzes={quizStore.getQuizzesBySubject('Science')} /> 
            <Header sub content='Sports' />
            <QuizSection quizzes={quizStore.getQuizzesBySubject('Sports')} /> 
            <Header sub content='Travel' />
            <QuizSection quizzes={quizStore.getQuizzesBySubject('Travel')} /> 
        </>
    )
})