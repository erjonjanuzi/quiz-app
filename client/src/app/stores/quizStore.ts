import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Quiz } from "../models/quiz";
import { toast } from "react-toastify";
import { history } from "../..";

export default class QuizStore {
    quizRegistry = new Map<string, Quiz>();
    selectedQuiz: Quiz | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    quizLibrary = new Map<string, Quiz>();
    tempQuestions: any[] = [];
    streak = 0;
    questionsCorrectCount = 0;
    answerHistory: string[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    get quizzesByDate() {
        return Array.from(this.quizRegistry.values()).reverse().slice(0, 8);
    }

    get mostPopularQuizzes() {
        return Array.from(this.quizRegistry.values()).sort((a, b) =>
            b.timesPlayed - a.timesPlayed).slice(0, 4);
    }

    get quizzesBySubject() {
        return Array.from(this.quizRegistry.values()).sort((a, b) =>
            (a.subject > b.subject) ? 1 : ((b.subject > a.subject) ? -1 : 0));
    }

    get quizzes() {
        return Array.from(this.quizRegistry.values());
    }

    get userQuizzes() {
        return Array.from(this.quizLibrary.values()).reverse();
    }

    getQuizzesBySubject(subject: string){
        return this.quizzesBySubject.filter(i => i.subject === subject).slice(0, 4);
    }

    increaseStreak = () => {
        this.streak++;
    }

    restartStreak = () => {
        this.streak = 0;
    }

    increaseCorrectCount = () => {
        this.questionsCorrectCount++;
    }

    restartCorrectCount = () => {
        this.questionsCorrectCount = 0;
    }

    loadQuizzes = async () => {
        this.loadingInitial = true;
        try {
            const quizzes = await agent.Quizzes.all();
            quizzes.forEach(quiz => {
                this.setQuiz(quiz);
            })
            this.restartCorrectCount();
            this.restartStreak();
            this.answerHistory = [];
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadQuiz = async (id: string) => {
        let quiz = this.getQuiz(id);
        if (quiz) {
            this.selectedQuiz = quiz;
            return quiz;
        } else {
            this.loadingInitial = true;
            try {
                quiz = await agent.Quizzes.details(id);
                this.setQuiz(quiz);
                runInAction(() => {
                    this.selectedQuiz = quiz;
                })
                this.setLoadingInitial(false);
                return quiz;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setQuiz = (quiz: Quiz) => {
        this.quizRegistry.set(quiz.id!, quiz);
    }

    private getQuiz = (id: string) => {
        return this.quizRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    clearSelectedQuiz = () => {
        this.selectedQuiz = undefined;
    }

    loadUserQuizzes = async () => {
        this.loadingInitial = true;
        try {
            const quizzes = await agent.Quizzes.userQuizzes();
            quizzes.forEach(quiz => {
                this.quizLibrary.set(quiz.id!, quiz);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    createQuiz = async (quiz: any) => {
        try {
            quiz.questions = this.tempQuestions;
            await agent.Quizzes.create(quiz);
            this.tempQuestions = [];
        } catch (error) {
            console.log(error);
        }
    }

    updateQuiz = async (id: string, quiz: any) => {
        try {
            const updatedQuiz = await agent.Quizzes.update(id, quiz) as Quiz;
            runInAction(() => {
                this.selectedQuiz = updatedQuiz;
            })
        } catch (error) {
            console.log(error);
        }
    }

    changeVisibility = async (id: string) => {
        try {
            const result: any = await agent.Quizzes.changeVisibility(id);
            runInAction(() => {
                if (this.selectedQuiz) {
                    this.selectedQuiz.isPublic = result.isPublic as boolean;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    addQuestion = async (id: string, question: any) => {
        try {
            const questionObj = {
                text: question.text,
                points: question.points,
                time: question.time,
                answers: [
                    {
                        text: question.answer1,
                        isCorrect: question.correct === 'a'
                    },
                    {
                        text: question.answer2,
                        isCorrect: question.correct === 'b'
                    },
                    {
                        text: question.answer3,
                        isCorrect: question.correct === 'c'
                    },
                    {
                        text: question.answer4,
                        isCorrect: question.correct === 'd'
                    }
                ]
            }
            const quiz = await agent.Quizzes.addQuestion(id, questionObj) as Quiz;
            runInAction(() => {
                this.selectedQuiz = quiz;
            })
        } catch (error) {
            console.log(error);
        }
    }

    removeQuestion = async (id: string, index: number) => {
        try {
            if (this.selectedQuiz?.isPublic && this.selectedQuiz.questions.length === 1) {
                throw new Error('Minimum 1 question is required for a public quiz')
            }
            const quiz = await agent.Quizzes.removeQuestion(id, index) as Quiz;
            runInAction(() => {
                this.selectedQuiz = quiz;
            })
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    saveResult = async (id: string, body: { score: number, answerHistory: string[] }) => {
        try {
            const quiz = await agent.Quizzes.saveResult(id, body) as Quiz;
            runInAction(() => {
                if (this.selectedQuiz) {
                    this.selectedQuiz.leaderboard = quiz.leaderboard;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteQuiz = async (id: string) => {
        try {
            await agent.Quizzes.delete(id);
            runInAction(() => {
                this.loadQuizzes();
                this.selectedQuiz = undefined;
            })
            history.push('/library')
        } catch (error) {
            console.log(error);
        }
    }
}