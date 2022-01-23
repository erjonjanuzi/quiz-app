import express from 'express';
import { currentUser } from '../common/middlewares/current-user';
import { requireAuth } from '../common/middlewares/require-auth';
import { validateRequest } from '../common/middlewares/validate-request';
import { addQuestion, create, deleteQuiz, getAllQuizzes, getQuiz, getUserQuizzes } from '../controllers/quizController';

const router = express.Router();

router.post('/api/quiz', currentUser, requireAuth, [

], validateRequest, create);

router.get('/api/quiz/:id', validateRequest, getQuiz);

router.get('/api/quiz', validateRequest, getAllQuizzes);

router.delete('/api/quiz/:id', currentUser, requireAuth, validateRequest, deleteQuiz);

router.put('/api/quiz/:id/addQuestion', currentUser, requireAuth, validateRequest, addQuestion);

router.get('/api/quiz/userQuizzes', currentUser, requireAuth, validateRequest, getUserQuizzes);

export {router as quizRoutes}