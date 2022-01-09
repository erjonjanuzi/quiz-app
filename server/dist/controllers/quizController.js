"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuiz = exports.deleteQuiz = exports.createQuiz = exports.getQuiz = exports.getQuizzes = void 0;
const quiz_1 = __importDefault(require("../modules/quiz"));
// Get all quizzes
let getQuizzes = (req, res) => {
    let quizzes = quiz_1.default.find((err, quizzes) => {
        if (err) {
            res.send(err);
        }
        res.json(quizzes);
    });
};
exports.getQuizzes = getQuizzes;
// Get one quiz by id
let getQuiz = (req, res) => {
    quiz_1.default.findById(req.params.id, (err, quiz) => {
        if (err) {
            res.send(err);
        }
        res.json(quiz);
    });
};
exports.getQuiz = getQuiz;
// Add a new quiz
let createQuiz = (req, res) => {
    let newQuiz = new quiz_1.default(req.body);
    newQuiz.save((err, quiz) => {
        if (err) {
            res.send(err);
        }
        res.json(quiz);
    });
};
exports.createQuiz = createQuiz;
// Delete a quiz
let deleteQuiz = (req, res) => {
    quiz_1.default.deleteOne({ quiz: req.params.title }, (err) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: `Quiz successfully deleted!` });
    });
};
exports.deleteQuiz = deleteQuiz;
// Update a quiz
let updateQuiz = (req, res) => {
    quiz_1.default.findOneAndUpdate({ title: req.params.title }, req.body, { new: true }, (err, quiz) => {
        if (err) {
            res.send(err);
        }
        res.json(quiz);
    });
};
exports.updateQuiz = updateQuiz;
