import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Quiz } from "../models/quiz";
import { toast } from "react-toastify";

export default class QuizStore {
    quizRegistry = new Map<string, Quiz>();
    selectedQuiz: Quiz | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    quizLibrary = new Map<string, Quiz>();
    tempQuestions: any[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    // get quizzesByDate() {
    //     return Array.from(this.activityRegistry.values()).sort((a, b) =>
    //         a.date!.getTime() - b.date!.getTime());
    // }

    // get groupedActivities() {
    //     return Object.entries(
    //         this.activitiesByDate.reduce((activities, activity) => {
    //             const date = format(activity.date!, 'dd MMM yyyy');
    //             activities[date] = activities[date] ? [...activities[date], activity] : [activity];
    //             return activities;
    //         }, {} as {[key: string]: Activity[]})
    //     )
    // }

    get quizzes() {
        return Array.from(this.quizRegistry.values());
    }

    get userQuizzes() {
        return Array.from(this.quizLibrary.values());
    }

    loadQuizzes = async () => {
        this.loadingInitial = true;
        try {
            const quizzes = await agent.Quizzes.all();
            quizzes.forEach(quiz => {
                this.setQuiz(quiz);
            })
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

    deleteQuiz = async (id: string) => {
        try {
            await agent.Quizzes.delete(id);
            runInAction(() => {
                this.loadUserQuizzes();
                this.loadQuizzes();
                this.selectedQuiz = undefined;
            })
        } catch (error) {
            console.log(error);
        }
    }
}