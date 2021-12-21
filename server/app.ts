import express, { Application, Request, Response, NextFunction } from 'express';
import quizRoutes from './routes/quizRoutes';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());

// Default routes
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send(`App name: ${process.env.APP_NAME}`);
});

// Quiz Routes
app.use('/quiz', quizRoutes); 

// User routes
app.use('/user', userRoutes);

app.listen(process.env.SERVER_PORT, () =>
    console.log(`Server running on localhost:${process.env.SERVER_PORT}`)
);
