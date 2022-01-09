export interface User {
    firstName: string;
    lastName: string;
    token: string;
    role?: string;
}

export interface UserFormValues {
    email: string;
    password: string;
}