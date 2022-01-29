import { CustomError } from "./CustomError";
import { DatabaseConnectionError } from "./DatabaseConnectionError";
import { NotAuthorizedError } from "./NotAuthorizedError";
import { NotFoundError } from "./NotFoundError";

export class ErrorFactory {
    private static errorData = new Map<string, CustomError>([
        ["NotAuthorizedError", new NotAuthorizedError()],
        ["DatabaseConnectionError", new DatabaseConnectionError()],
        ["NotFoundError", new NotFoundError()],
    ])

    public static create(type: string){
        const error: CustomError = this.errorData.get(type)!;
        return error;
    }
}

export enum Type {
    NotAuthorized = 'NotAuthorizedError',
    DatabaseConnection = 'DatabaseConnectionError',
    NotFound = 'NotFoundError',
}