import * as quizController from '../controllers/quizController';
import express from 'express';
import auth from '../middleware/auth';

const app = express();

app.get('/all', auth, quizController.getQuizzes);

app.get('/:id', auth, quizController.getQuiz);

app.delete('/:id', auth, quizController.deleteQuiz);

// app.put('/', auth, quizController.updateQuiz);

// app.post('/', auth, quizController.createQuiz);

export default app;
