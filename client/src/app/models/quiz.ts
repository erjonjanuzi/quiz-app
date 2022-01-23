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
    leaderboard: any[];
}

interface Question {
    text: string;
    points: number;
    answers: Answer[];
    time: number
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