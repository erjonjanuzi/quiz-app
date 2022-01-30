import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Quiz } from '../models/quiz';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:4000/api';

axios.interceptors.request.use((config) => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `${token}`;
    return config;
});

axios.interceptors.response.use(
    async (response) => {
        return response;
    },
    (error: AxiosError) => {
        const { data, status, config, headers } = error.response!;
        switch (status) {
            case 400:
                if (
                    config.method === 'get' &&
                    data.errors.hasOwnProperty('id')
                ) {
                    history.push('/not-found');
                }
                if (data.errors) {
                    const modalStateErrors = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErrors.push(data.errors[key]);
                        }
                    }
                    throw modalStateErrors.flat();
                } else {
                    toast.error(data);
                }
                break;
            case 401:
                if (
                    status === 401 &&
                    headers['www-authenticate']?.startsWith(
                        'Bearer error="invalid_token"'
                    )
                ) {
                    store.userStore.logout();
                    toast.error('Session expired - please login again');
                }
                break;
            case 404:
                history.push('/not-found');
                break;
            case 500:
                store.commonStore.setServerError(data);
                history.push('/server-error');
                break;
        }
        return Promise.reject(error);
    }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) =>
        axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) =>
        axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Account = {
    current: () => requests.get<User>('/users/current'),
    login: (user: UserFormValues) => requests.post<User>('/users/login', user),
    register: (user: UserFormValues) =>
        requests.post<User>('/users/register', user),
};

const Quizzes = {
    all: () => requests.get<Quiz[]>('/quiz'),
    details: (id: string) => requests.get<Quiz>(`/quiz/${id}`),
    userQuizzes: () => requests.get<Quiz[]>(`/quiz/userQuizzes`),
    create: (quiz: any) => requests.post('/quiz', quiz),
    update: (id: string, quiz: any) => requests.put(`/quiz/${id}`, quiz),
    changeVisibility: (id: string) =>
        requests.put(`/quiz/changeVisibility/${id}`, {}),
    addQuestion: (id: string, question: any) =>
        requests.put(`/quiz/addQuestion/${id}`, question),
    removeQuestion: (id: string, index: number) =>
        requests.put(`/quiz/removeQuestion/${index}/${id}`, {}),
    saveResult: (
        id: string,
        body: { score: number; answerHistory: string[] }
    ) => requests.put(`/quiz/saveResult/${id}`, body),
    delete: (id: string) => requests.del(`/quiz/${id}`),
};

const agent = {
    Account,
    Quizzes,
};

export default agent;
