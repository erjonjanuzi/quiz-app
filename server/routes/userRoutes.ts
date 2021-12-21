import * as userController from '../controllers/userController';
import express from 'express';
const app = express();

app.post('/register', userController.register);
app.post('/login', userController.login);

export default app;
