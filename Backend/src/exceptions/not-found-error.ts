import { MySchoolError } from './myschool-error';

export class NotFoundError extends MySchoolError {
    constructor(message: string) {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}
