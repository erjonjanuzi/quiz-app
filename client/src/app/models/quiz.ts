export interface Quiz {
    id?: string;
    name: string;
    description: string;
    subject: string;
    timesPlayed: number;
    questions: Question[],
    isPublic: boolean,
    creator: Creator,
    createdAt: Date,
    leaderboard: {
        user: {
            firstName: string,
            lastName: string,
            id: string
        },
        score: number
    }[];
}

interface Question {
    text: string;
    points: number;
    answers: Answer[];
    time: number;
    resultHistory: {
        correct: number,
        incorrect: number
    }
}

interface Answer {
    text: string;
    isCorrect: boolean;
}

interface Creator {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}