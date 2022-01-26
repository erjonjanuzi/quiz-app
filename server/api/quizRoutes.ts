import express from 'express';
import { currentUser } from '../common/middlewares/current-user';
import { requireAuth } from '../common/middlewares/require-auth';
import { validateRequest } from '../common/middlewares/validate-request';
import { addQuestion, changeVisibility, create, deleteQuiz, getAllQuizzes, getQuiz, getUserQuizzes, removeQuestion, saveResult, updateQuiz } from '../controllers/quizController';

const router = express.Router();

router.get('/api/quiz/userQuizzes', currentUser, requireAuth, validateRequest, getUserQuizzes);

router.get('/api/quiz/:id', validateRequest, getQuiz);

router.get('/api/quiz', validateRequest, getAllQuizzes);

router.delete('/api/quiz/:id', currentUser, requireAuth, validateRequest, deleteQuiz);


router.post('/api/quiz', currentUser, requireAuth, validateRequest, create);

router.put('/api/quiz/saveResult/:id', currentUser, requireAuth, validateRequest, saveResult)

router.put('/api/quiz/changeVisibility/:id', currentUser, requireAuth, validateRequest, changeVisibility);

router.put('/api/quiz/addQuestion/:id/', currentUser, requireAuth, validateRequest, addQuestion);

router.put('/api/quiz/removeQuestion/:index/:id', currentUser, requireAuth, validateRequest, removeQuestion);

router.put('/api/quiz/:id', currentUser, requireAuth, validateRequest, updateQuiz);


export {router as quizRoutes}