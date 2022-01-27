import express from 'express';
import { currentUser } from '../common/middlewares/current-user';
import { UserController } from '../controllers/UserController';
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
], validateRequest, UserController.login);

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
        .isLength({ min: 8, max: 20 })
        .withMessage('Password must be between 8 and 20 characters'),
    body('role')
        .isString()
        .withMessage('Role must be provided'),
], validateRequest, UserController.register);

router.get('/api/users/current', currentUser, UserController.current);

export { router as userRoutes };