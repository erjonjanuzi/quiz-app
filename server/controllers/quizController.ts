import { Request, Response } from 'express';
import Quiz, { quizType } from '../modules/quiz';

// Get all quizzes
export let getQuizzes = (req: Request, res: Response) => {
    let quizzes = Quiz.find((err: any, quizzes: quizType[]) => {
        if (err) {
            res.send(err);
        }
        res.json(quizzes);
    });
};

// Get one quiz by id
export let getQuiz = (req: Request, res: Response) => {
    Quiz.findById(req.params.id, (err: any, quiz: quizType) => {
        if (err) {
            res.send(err);
        }
        res.json(quiz);
    });
};

// Add a new quiz
export let createQuiz = (req: Request, res: Response) => {
    let newQuiz = new Quiz(req.body);

    newQuiz.save((err: any, quiz: quizType) => {
        if (err) {
            res.send(err);
        }
        res.json(quiz);
    });
};

// Delete a quiz
export let deleteQuiz = (req: Request, res: Response) => {
    Quiz.deleteOne({ quiz: req.params.title }, (err: any) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: `Quiz successfully deleted!` });
    });
};

// Update a quiz
export let updateQuiz = (req: Request, res: Response) => {
    Quiz.findOneAndUpdate(
        { title: req.params.title },
        req.body,
        { new: true },
        (err: any, quiz: quizType) => {
            if (err) {
                res.send(err);
            }
            res.json(quiz);
        }
    );
};
