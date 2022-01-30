import express from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { QuizController } from '../../application/quiz/QuizController';

const router = express.Router();

router.get('/api/quiz/userQuizzes', requireAuth, validateRequest, QuizController.getUserQuizzes);

router.get('/api/quiz/:id', requireAuth, validateRequest, QuizController.getQuiz);

router.get('/api/quiz', requireAuth, validateRequest, QuizController.getAllQuizzes);

router.delete('/api/quiz/:id', requireAuth, validateRequest, QuizController.deleteQuiz);

router.post('/api/quiz', requireAuth, [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Quiz name is required'),
    body('subject')
        .not()
        .isEmpty()
        .withMessage('Quiz subject is required'),
    body('description')
        .not()
        .isEmpty()
        .withMessage('Quiz description is required'),
    body('questions')
        .isArray()
        .isLength({min: 1})
        .withMessage('Questions are required')
], validateRequest, QuizController.create);

router.put('/api/quiz/saveResult/:id', requireAuth, [
    body('score')
        .not()
        .isEmpty()
        .withMessage('Score is required'),
    body('answerHistory')
        .not()
        .isEmpty()
        .isArray()
        .withMessage('Answer history is required')
], validateRequest, QuizController.saveResult)

router.put('/api/quiz/changeVisibility/:id', requireAuth, validateRequest, QuizController.changeVisibility);

router.put('/api/quiz/addQuestion/:id/', requireAuth, [
    body('question')
        .not()
        .isEmpty()
        .withMessage('Question is required')
], validateRequest, QuizController.addQuestion);

router.put('/api/quiz/removeQuestion/:index/:id', requireAuth, validateRequest, QuizController.removeQuestion);

router.put('/api/quiz/:id', requireAuth, [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Quiz name is required'),
    body('subject')
        .not()
        .isEmpty()
        .withMessage('Quiz subject is required'),
    body('description')
        .not()
        .isEmpty()
        .withMessage('Quiz description is required')
], validateRequest, QuizController.updateQuiz);


export { router as quizRoutes }