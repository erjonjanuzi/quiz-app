import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri: string = process.env.DB_URI!;

mongoose.connect(uri, (err: any) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('Connected to database');
    }
});

export const QuizSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        creator: { type: String, required: true },
        questions: { type: Array, required: true },
    },
    { versionKey: false }
);

export interface quizType {
    title: String;
    creator: String;
    questions: Object[];
}

const Quiz = mongoose.model('Quiz', QuizSchema);
export default Quiz;
