import { NextFunction, Request, Response } from 'express';
import { MySchoolError } from '../exceptions/myschool-error';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error(err);

    const code = (err as MySchoolError).code;
    res.status(+code || 500).send({ error: err.message });
};
