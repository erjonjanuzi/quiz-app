import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import 'express-async-errors';
import mongoose from 'mongoose'
import { logger } from './infrastructure/logging/LoggerFactory';

config(); //dotenv config

import { authRoutes } from './api/routes/authRoutes';
import { quizRoutes } from './api/routes/quizRoutes';

import { errorHandler } from './api/middlewares/error-handler';
import { currentUser } from './api/middlewares/current-user';
import { ErrorFactory, Type } from './application/errors/ErrorFactory';


const app = express();

app.use(json());
app.use(cors());

app.use(currentUser);

app.use(authRoutes);
app.use(quizRoutes);

app.all('*', async (req, res, next) => {
    throw ErrorFactory.create(Type.NotFound);
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
        logger.info('Connected to MongoDB');
    } catch (err: any) {
        throw ErrorFactory.create(Type.DatabaseConnection);
    }

    app.listen(process.env.SERVER_PORT, () => {
        logger.info(`🚀Listening on port ${process.env.SERVER_PORT}!`);
    });
}

start();
