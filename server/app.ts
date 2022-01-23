import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import 'express-async-errors';

config(); //dotenv config

import { userRoutes } from './api/userRoutes';
import { quizRoutes } from './api/quizRoutes';

import { NotFoundError } from './common/errors/not-found-error';
import { errorHandler } from './common/middlewares/error-handler';

const app = express();

app.use(json());
app.use(cors());

app.use(userRoutes);
app.use(quizRoutes);

app.all('*', async (req, res, next) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app }
