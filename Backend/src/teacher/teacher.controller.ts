import { Teacher } from './teacher';
import { BadInputError } from '../exceptions/bad-input-error';
import {
    isNumberDecimal,
    isNumberNegative,
    isStrictlyNaN,
    isStringEmpty,
} from '../utils';
import { TeacherService } from './teacher.service';

export class TeacherController {
    constructor(private teacherService: TeacherService) {}

    async add(
        name: string,
        email: string,
        subjectId: number,
        password: string,
    ): Promise<Teacher> {
        try {
            if (
                isStringEmpty(name) ||
                isStringEmpty(email) ||
                isStringEmpty(password) ||
                !subjectId
            ) {
                throw new BadInputError(
                    'Name, email, password and subjectId are required.',
                );
            }

            if (isStrictlyNaN(subjectId)) {
                throw new BadInputError('Given subjectId is not a number.');
            }

            if (isNumberDecimal(subjectId)) {
                throw new BadInputError('Given subjectId is a decimal.');
            }

            if (isNumberNegative(subjectId)) {
                throw new BadInputError('Given subjectId is negative.');
            }

            const teacher = await this.teacherService.add(
                name,
                email,
                subjectId,
                password,
            );

            return teacher;
        } catch (error: unknown) {
            throw error;
        }
    }

    async getAll(): Promise<Teacher[]> {
        try {
            const teachers = await this.teacherService.getAll();
            return teachers;
        } catch (error: unknown) {
            throw error;
        }
    }

    async getById(id: number): Promise<Teacher> {
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

            const teacher = await this.teacherService.getById(id);

            return teacher;
        } catch (error: unknown) {
            throw error;
        }
    }

    async update(
        id: number,
        name: string,
        email: string,
        subjectId: number,
        password: string,
    ): Promise<Teacher> {
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

            if (isStrictlyNaN(subjectId)) {
                throw new Error('Given subjectId is not a number.');
            }

            if (isNumberDecimal(subjectId)) {
                throw new Error('Given subjectId is a decimal.');
            }

            if (isNumberNegative(subjectId)) {
                throw new Error('Given subjectId is negative.');
            }
            if (
                isStringEmpty(name) ||
                isStringEmpty(email) ||
                isStringEmpty(password) ||
                !subjectId
            ) {
                throw new BadInputError(
                    'Name, email, password and subjectId are required.',
                );
            }

            const teacher = await this.teacherService.update(
                id,
                name,
                email,
                subjectId,
                password,
            );

            return teacher;
        } catch (error: unknown) {
            throw error;
        }
    }
}
