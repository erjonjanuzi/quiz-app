import * as userController from '../controllers/userController';
import express from 'express';
import auth from '../middleware/auth';
const app = express();

app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/current', auth, userController.current);

export default app;
