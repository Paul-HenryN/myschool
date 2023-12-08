import { NextFunction, Request, Response } from 'express';
import { MySchoolError } from '../exceptions/myschool-error';

export const errorHandler = (
    err: MySchoolError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error(err);

    res.status(err.code).send({ errors: [{ message: err.message }] });
};
