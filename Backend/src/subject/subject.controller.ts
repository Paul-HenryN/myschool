import { BadInputError } from '../exceptions/bad-input-error';
import {
    isNumberDecimal,
    isNumberNegative,
    isStrictlyNaN,
    isStringEmpty,
} from '../utils';
import { Subject } from './subject';
import { SubjectService } from './subject.service';

export class SubjectController {
    constructor(private subjectService: SubjectService) {}

    async add(name: string, coefficient: number): Promise<Subject> {
        try {
            if (isStringEmpty(name) || !coefficient) {
                throw new BadInputError('Name and coefficient are required.');
            }

            if (isStrictlyNaN(coefficient)) {
                throw new BadInputError('Coefficient must be a number.');
            }

            const subject = await this.subjectService.add(name, coefficient);

            return subject;
        } catch (error: unknown) {
            throw error;
        }
    }

    async getAll(): Promise<Subject[]> {
        try {
            const subjects = await this.subjectService.getAll();
            return subjects;
        } catch (error: unknown) {
            throw error;
        }
    }

    async getById(id: number): Promise<Subject> {
        try {
            if (isStrictlyNaN(id)) {
                throw new Error('Given id is not a number.');
            }

            if (isNumberDecimal(id)) {
                throw new Error('Given id is a decimal.');
            }

            if (isNumberNegative(id)) {
                throw new Error('Given id is negative.');
            }

            const subject = await this.subjectService.getById(id);

            return subject;
        } catch (error: unknown) {
            throw error;
        }
    }

    async update(
        id: number,
        name: string,
        coefficient: number,
    ): Promise<Subject> {
        try {
            if (isStrictlyNaN(id)) {
                throw new Error('Given id is not a number.');
            }

            if (isNumberDecimal(id)) {
                throw new Error('Given id is a decimal.');
            }

            if (isNumberNegative(id)) {
                throw new Error('Given id is negative.');
            }

            if (isStringEmpty(name) || !coefficient) {
                throw new BadInputError('Name and coefficient are required.');
            }

            if (isStrictlyNaN(coefficient)) {
                throw new BadInputError('Coefficient must be a number.');
            }

            const subject = await this.subjectService.update(
                id,
                name,
                coefficient,
            );

            return subject;
        } catch (error: unknown) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            if (isStrictlyNaN(id)) {
                throw new Error('Given id is not a number.');
            }

            if (isNumberDecimal(id)) {
                throw new Error('Given id is a decimal.');
            }

            if (isNumberNegative(id)) {
                throw new Error('Given id is negative.');
            }

            await this.subjectService.delete(id);
        } catch (error: unknown) {
            throw error;
        }
    }
}
