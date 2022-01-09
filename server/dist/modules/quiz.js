"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.DB_URI;
mongoose_1.default.connect(uri, (err) => {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log('Connected to database');
    }
});
exports.QuizSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    creator: { type: String, required: true },
    questions: { type: Array, required: true },
}, { versionKey: false });
const Quiz = mongoose_1.default.model('Quiz', exports.QuizSchema);
exports.default = Quiz;
