import * as userController from '../controllers/userController';
import express from 'express';

const app = express();

app.get('/users', userController.allUsers);
app.get('/users/:username', userController.getUser);
app.put('/user', userController.addUser);
app.post('/user/:username', userController.updateUser);
app.delete('/user/:username', userController.deleteUser);

export default app;
