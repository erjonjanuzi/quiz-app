import { Request, Response } from 'express';

import { BadRequestError } from '../common/errors/bad-request-error';
import { NotAuthorizedError } from '../common/errors/not-authorized-error';
import { NotFoundError } from '../common/errors/not-found-error';

import { Quiz } from '../models/quiz';
import { User } from '../models/user';

export class QuizController {

    static getAllQuizzes = async (req: Request, res: Response) => {
        const quizzes = await Quiz.find({ isPublic: true }).populate("creator");

        if (!quizzes) {
            throw new NotFoundError();
        }

        res.send(quizzes);
    }

    static create = async (req: Request, res: Response) => {
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

    static getQuiz = async (req: Request, res: Response) => {
        const quiz = await Quiz.findById(req.params.id).populate("creator");
    
        if (!quiz) {
            throw new NotFoundError();
        }
    
        res.send(quiz);
    }

    static getUserQuizzes = async (req: Request, res: Response) => {
        const quizzes = await Quiz.find({ creator: req.currentUser?.id });
    
        res.send(quizzes);
    }

    static deleteQuiz = async (req: Request, res: Response) => {
        const quiz = await Quiz.findById(req.params.id);
    
        if (!quiz) {
            throw new NotFoundError();
        }
    
        if (quiz.creator.toString() !== req.currentUser?.id) {
            throw new NotAuthorizedError();
        }
    
        const result = await Quiz.deleteOne({ _id: quiz.id });
    
        res.status(204).send({});
    }

    static updateQuiz = async (req: Request, res: Response) => {
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

    static changeVisibility = async (req: Request, res: Response) => {
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

    static addQuestion = async (req: Request, res: Response) => {
        const quiz = await Quiz.findById(req.params.id);
    
        if (!quiz) {
            throw new NotFoundError();
        }
    
        if (quiz.creator.toString() !== req.currentUser?.id) {
            throw new NotAuthorizedError();
        }
        
        const { question } = req.body;

        quiz.questions.push(question);
    
        await quiz.save();
    
        res.send(quiz);
    }

    static removeQuestion = async (req: Request, res: Response) => {
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

    static saveResult = async (req: Request, res: Response) => {
        const quiz = await Quiz.findById(req.params.id);
    
        if (!quiz) {
            throw new NotFoundError();
        }
    
        const { score } = req.body;
    
        quiz.timesPlayed++;
    
        const answerHistory: string[] = req.body.answerHistory;
        const tempQuestions = quiz.questions;
        for (let answer in answerHistory) {
            tempQuestions[answer].resultHistory[answerHistory[answer]]++;
        }
    
        const existingLeaderboardUser = quiz.leaderboard.find(element => element.user.id === req.currentUser?.id);
        if (existingLeaderboardUser) {
            const index = quiz.leaderboard.indexOf(existingLeaderboardUser);
            if (quiz.leaderboard[index].score < score)
                quiz.leaderboard[index].score = score;
        } else {
            const user = await User.findById(req.currentUser!.id);
            if (!user) return;
            quiz.leaderboard.push({
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    id: user.id
                },
                score: score
            });
        }
    
        quiz.leaderboard.sort((a, b) => b.score - a.score);
    
        await quiz.save();
    
        await Quiz.findByIdAndUpdate(quiz.id, { questions: tempQuestions });
    
        res.send(quiz);
    }
}