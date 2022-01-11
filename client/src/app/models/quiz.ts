export interface Quiz {
    _id?: string;
    name: string;
    description: string;
    subject: string;
    timesPlayed: number;
    questions: Question[]
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