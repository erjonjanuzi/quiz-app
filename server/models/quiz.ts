import mongoose from 'mongoose';

interface Question {
    text: string;
    points: number;
    time: number;
    resultHistory: {
        correct: number;
        incorrect: number;
    }
    answers: Answer[]
}

interface Answer {
    text: string;
    isCorrect: boolean
}

interface Leaderboard {
    user: {
        id: string;
        firstName: string;
        lastName: string;
    },
    score: number
}

// An interface that describes the properties that are required
// to create a new quiz
interface QuizAttrs {
    name: string;
    description: string;
    subject: string;
    creator: string;
    timesPlayed: number;
    leaderboard: Leaderboard[];
    questions: Question[];
    createdAt: Date;
    isPublic: boolean;
}

// An interface that describes the properties
// that a Quiz Model has
interface QuizModel extends mongoose.Model<QuizDoc> {
    build(attrs: QuizAttrs): QuizDoc;
}

// An interface that describes the props
// that a Quiz Document has
interface QuizDoc extends mongoose.Document {
    name: string;
    description: string;
    subject: string;
    creator: string;
    timesPlayed: number;
    leaderboard: Leaderboard[];
    questions: Question[];
    createdAt: Date;
    isPublic: boolean;
}

const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timesPlayed: {
        type: Number,
        required: true
    },
    leaderboard: {
        type: Array,
        required: true
    },
    questions: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    isPublic: {
        type: Boolean,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

quizSchema.statics.build = (attrs: QuizAttrs) => {
    return new Quiz(attrs);
}

const Quiz = mongoose.model<QuizDoc, QuizModel>('Quiz', quizSchema);

export { Quiz };