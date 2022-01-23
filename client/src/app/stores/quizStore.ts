import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Quiz } from "../models/quiz";

export default class QuizStore {
    quizRegistry = new Map<string, Quiz>();
    selectedQuiz: Quiz | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

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

    loadUserQuizzes = async (userId: string) => {
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

    // createActivity = async (activity: ActivityFormValues) => {
    //     const user = store.userStore.user;
    //     const attendee = new Profile(user!);
    //     try {
    //         await agent.Activities.create(activity);
    //         const newActivity = new Activity(activity);
    //         newActivity.hostUsername = user!.username;
    //         newActivity.attendees = [attendee];
    //         this.setActivity(newActivity);
    //         runInAction(() => {
    //             this.selectedActivity = newActivity;
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // updateActivity = async (activity: ActivityFormValues) => {
    //     try {
    //         await agent.Activities.update(activity);
    //         runInAction(() => {
    //             if (activity.id) {
    //                 let updatedActivity = {...this.getActivity(activity.id), ...activity}
    //                 this.activityRegistry.set(activity.id, updatedActivity as Activity);
    //                 this.selectedActivity = updatedActivity as Activity;
    //             } 
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // deleteActivity = async (id: string) => {
    //     this.loading = true;
    //     try {
    //         await agent.Activities.delete(id);
    //         runInAction(() => {
    //             this.activityRegistry.delete(id);
    //             this.loading = false;
    //         })
    //     } catch (error) {
    //         console.log(error);
    //         runInAction(() => {
    //             this.loading = false;
    //         })
    //     }
    // }

    // updateAttendance = async () => {
    //     const user = store.userStore.user;
    //     this.loading = true;
    //     try {
    //         await agent.Activities.attend(this.selectedActivity!.id);
    //         runInAction(() => {
    //             if (this.selectedActivity?.isGoing) {
    //                 this.selectedActivity.attendees = 
    //                     this.selectedActivity.attendees?.filter(a => a.username !== user?.username);
    //                 this.selectedActivity.isGoing = false;
    //             } else {
    //                 const attendee = new Profile(user!);
    //                 this.selectedActivity?.attendees?.push(attendee);
    //                 this.selectedActivity!.isGoing = true;
    //             }
    //             this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!)
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         runInAction(() => this.loading = false);
    //     }
    // }

    // cancelActivityToggle = async () => {
    //     this.loading = true;
    //     try {
    //         await agent.Activities.attend(this.selectedActivity!.id);
    //         runInAction(() => {
    //             this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
    //             this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         runInAction(() => this.loading = false);
    //     }
    // }
}