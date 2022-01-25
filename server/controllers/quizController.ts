import { Request, Response } from 'express';
import { BadRequestError } from '../common/errors/bad-request-error';
import { NotAuthorizedError } from '../common/errors/not-authorized-error';
import { Quiz } from '../models/quiz';
import mongoose from 'mongoose';
import { NotFoundError } from '../common/errors/not-found-error';

export const create = async (req: Request, res: Response) => {
    const { name, subject, description, questions } = req.body;

    const quiz = Quiz.build({
        name,
        subject,
        description,
        questions,
        creator: req.currentUser!.id,
        timesPlayed: 0,
        leaderboard: [],
        createdAt: new Date(),
        isPublic: false
    });

    await quiz.save();

    res.status(201).send(quiz);
}

export const getQuiz = async (req: Request, res: Response) => {
    const quiz = await Quiz.findById(req.params.id).populate("creator");

    if (!quiz) {
        throw new BadRequestError('Quiz does not exist');
    }

    res.send(quiz);
}

export const getAllQuizzes = async (req: Request, res: Response) => {
    const quizzes = await Quiz.find({ isPublic: true }).populate("creator");

    if (!quizzes) {
        throw new BadRequestError('Something went wrong while fetching quizzes');
    }

    res.send(quizzes);
}

export const getUserQuizzes = async (req: Request, res: Response) => {
    const quizzes = await Quiz.find({ creator: req.currentUser?.id });

    res.send(quizzes);
}

export const deleteQuiz = async (req: Request, res: Response) => {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
        throw new BadRequestError('Quiz does not exist');
    }

    if (quiz.creator.toString() !== req.currentUser?.id) {
        throw new NotAuthorizedError();
    }

    const result = await Quiz.deleteOne({ _id: quiz.id });

    if (result.deletedCount > 0)
        res.send('Deleted successfully');
    else
        res.status(400).send('Something went wrong');
}

export const updateQuiz = async (req: Request, res: Response) => {
    const { name, subject, description } = req.body;

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
        throw new NotFoundError();
    }

    if (quiz.creator.toString() !== req.currentUser?.id) {
        throw new NotAuthorizedError();
    }

    quiz.set({
        name,
        subject,
        description
    });

    await quiz.save();

    res.status(200).send(quiz);
}

export const changeVisibility = async (req: Request, res: Response) => {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
        throw new NotFoundError();
    }

    if (quiz.creator.toString() !== req.currentUser?.id) {
        throw new NotAuthorizedError();
    }

    quiz.set({
        isPublic: !quiz.isPublic
    });

    await quiz.save();

    res.status(200).send({ isPublic: quiz.isPublic });
}

export const addQuestion = async (req: Request, res: Response) => {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
        throw new BadRequestError('Quiz does not exist');
    }

    if (quiz.creator.toString() !== req.currentUser?.id) {
        throw new NotAuthorizedError();
    }

    quiz.questions.push(req.body);

    await quiz.save();

    res.send(quiz);
}

export const removeQuestion = async (req: Request, res: Response) => {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
        throw new NotFoundError();
    }

    if (quiz.creator.toString() !== req.currentUser?.id) {
        throw new NotAuthorizedError();
    }

    const { index } = req.params;

    quiz.questions.splice(parseInt(index), 1);

    await quiz.save();

    res.send(quiz);
}

// // Get all quizzes
// export let getQuizzes = (req: Request, res: Response) => {
//     let quizzes = Quiz.find((err: any, quizzes: quizType[]) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json(quizzes);
//     });
// };

// // Get one quiz by id
// export let getQuiz = (req: Request, res: Response) => {
//     Quiz.findById(req.params.id, (err: any, quiz: quizType) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json(quiz);
//     });
// };

// // Add a new quiz
// export let createQuiz = (req: Request, res: Response) => {
//     let newQuiz = new Quiz(req.body);

//     newQuiz.save((err: any, quiz: quizType) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json(quiz);
//     });
// };

// // Delete a quiz
// export let deleteQuiz = (req: Request, res: Response) => {
//     Quiz.deleteOne({ quiz: req.params.title }, (err: any) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json({ message: `Quiz successfully deleted!` });
//     });
// };

// // Update a quiz
// export let updateQuiz = (req: Request, res: Response) => {
//     Quiz.findOneAndUpdate(
//         { title: req.params.title },
//         req.body,
//         { new: true },
//         (err: any, quiz: quizType) => {
//             if (err) {
//                 res.send(err);
//             }
//             res.json(quiz);
//         }
//     );
// };
