export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    role?: string;
}

export interface UserFormValues {
    email: string;
    password: string;
}