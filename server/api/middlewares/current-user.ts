import { Request, Response, NextFunction } from 'express';
import { logger } from '../../infrastructure/logging/LoggerFactory';
import { tokenService } from '../../application/services/TokenService';
import { UserPayload } from '../../infrastructure/interfaces/UserPayload';

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers?.authorization) {
        logger.warn('No Authorization header');
        return next();
    }

    try {
        req.currentUser = tokenService.verify(req.headers.authorization);
    } catch (err: any) {
        logger.error(err);
    }

    next();
}