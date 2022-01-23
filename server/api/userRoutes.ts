import express from 'express';
import { currentUser } from '../common/middlewares/current-user';
import { current, login, register } from '../controllers/userController';
import { body } from 'express-validator'
import { validateRequest } from '../common/middlewares/validate-request';

const router = express.Router();

router.post('/api/users/login', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password must be provided')
], validateRequest, login);

router.post('/api/users/register', [
    body('firstName')
        .isString()
        .withMessage('First name must be provided'),
    body('lastName')
        .isString()
        .withMessage('Last name must be provided'),
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters'),
    body('role')
        .isString()
        .withMessage('Role must be provided'),
], validateRequest, register);

router.get('/api/users/current', currentUser, current);

export { router as userRoutes };