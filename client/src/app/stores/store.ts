import { createContext, useContext } from 'react';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import QuizStore from './quizStore';
import UserStore from './userStore';

interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    quizStore: QuizStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    quizStore: new QuizStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}