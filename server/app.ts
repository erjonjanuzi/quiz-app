import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import 'express-async-errors';
import mongoose from 'mongoose'

config(); //dotenv config

import { userRoutes } from './api/userRoutes';
import { quizRoutes } from './api/quizRoutes';

import { NotFoundError } from './common/errors/not-found-error';
import { errorHandler } from './common/middlewares/error-handler';
import { currentUser } from './common/middlewares/current-user';

const app = express();

app.use(json());
app.use(cors());

app.use(currentUser);

app.use(userRoutes);
app.use(quizRoutes);

app.all('*', async (req, res, next) => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined')
    }
    if (!process.env.DB_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`🚀Listening on port ${process.env.SERVER_PORT}!`);
    });
}

start();
