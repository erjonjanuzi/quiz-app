import { Request, Response, NextFunction } from 'express';
import { logger } from '../../infrastructure/logging/LoggerFactory';
import { CustomError } from '../../application/errors/CustomError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    logger.error(err);
    res.status(400).send({
        errors: [
            { message: 'Something went wrong' }
        ]
    });
};