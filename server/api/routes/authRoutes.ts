import express from 'express';
import { currentUser } from '../middlewares/current-user';
import { Auth } from '../../application/auth/Auth';
import { body } from 'express-validator'
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/users/login', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password must be provided')
], validateRequest, Auth.login);

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
], validateRequest, Auth.register);

router.get('/api/users/current', currentUser, Auth.current);

export { router as authRoutes };