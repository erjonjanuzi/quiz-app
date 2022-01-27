import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../../services/TokenService';
import { UserPayload } from '../interfaces/UserPayload';

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers?.authorization) {
        return next();
    }

    try {
        req.currentUser = new TokenService().verifyToken(req.headers.authorization);
    } catch (err) {
        console.log(err);
    }

    next();
}