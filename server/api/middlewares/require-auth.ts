import { Request, Response, NextFunction } from 'express';
import { ErrorFactory, Type } from '../../application/errors/ErrorFactory';


export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        throw ErrorFactory.create(Type.NotAuthorized);
    }
    next();
}