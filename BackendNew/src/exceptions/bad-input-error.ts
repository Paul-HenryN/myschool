import { MySchoolError } from './myschool-error';

export class BadInputError extends MySchoolError {
    constructor(message: string) {
        super(message, 422);
    }
}
