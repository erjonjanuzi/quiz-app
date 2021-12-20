import * as quizController from '../controllers/quizController';
import express from 'express';

const app = express();

app.get('/', quizController.getQuizzes);
app.get('/:id', quizController.getQuiz);
app.put('/', quizController.updateQuiz);
app.post('/', quizController.createQuiz);
app.delete('/:id', quizController.deleteQuiz);

export default app;
