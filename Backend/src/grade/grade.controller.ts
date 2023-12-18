import { BadInputError } from '../exceptions/bad-input-error';
import {
    isNumberDecimal,
    isNumberNegative,
    isStrictlyNaN,
    isStringEmpty,
} from '../utils';
import { Grade } from './grade';
import { GradeService } from './grade.service';

export class GradeController {
    constructor(private gradeService: GradeService) {}

    async add(
        studentId: number,
        subjectId: number,
        value: number,
    ): Promise<Grade> {
        try {
            if (isStrictlyNaN(studentId)) {
                throw new BadInputError('Given studentId is not a number.');
            }

            if (isNumberDecimal(studentId)) {
                throw new BadInputError('Given studentId is a decimal.');
            }

            if (isNumberNegative(studentId)) {
                throw new BadInputError('Given studentId is negative.');
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

            if (isStrictlyNaN(value)) {
                throw new BadInputError('Given grade value is not a number.');
            }

            if (isNumberNegative(value)) {
                throw new BadInputError('Given grade value is negative.');
            }

            if (value > 20) {
                throw new BadInputError('Grade value out of range (> 20).');
            }

            const subject = await this.gradeService.add(
                studentId,
                subjectId,
                value,
            );

            return subject;
        } catch (error: unknown) {
            throw error;
        }
    }

    async getAll(): Promise<Grade[]> {
        try {
            const grades = await this.gradeService.getAll();
            return grades;
        } catch (error: unknown) {
            throw error;
        }
    }

    async getByStudentId(studentId: number): Promise<Grade[]> {
        try {
            if (isStrictlyNaN(studentId)) {
                throw new Error('Given id is not a number.');
            }

            if (isNumberDecimal(studentId)) {
                throw new Error('Given id is a decimal.');
            }

            if (isNumberNegative(studentId)) {
                throw new Error('Given id is negative.');
            }

            const grades = await this.gradeService.getByStudentId(studentId);

            return grades;
        } catch (error: unknown) {
            throw error;
        }
    }

    async getByStudentAndSubject(
        studentId: number,
        subjectId: number,
    ): Promise<Grade> {
        try {
            if (isStrictlyNaN(studentId)) {
                throw new Error('Given studentId is not a number.');
            }

            if (isNumberDecimal(studentId)) {
                throw new Error('Given studentId is a decimal.');
            }

            if (isNumberNegative(studentId)) {
                throw new Error('Given studentId is negative.');
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

            const grade = await this.gradeService.getByStudentAndSubject(
                studentId,
                subjectId,
            );

            return grade;
        } catch (error: unknown) {
            throw error;
        }
    }

    async update(
        studentId: number,
        subjectId: number,
        value: number,
    ): Promise<Grade> {
        try {
            if (isStrictlyNaN(studentId)) {
                throw new Error('Given studentId is not a number.');
            }

            if (isNumberDecimal(studentId)) {
                throw new Error('Given studentId is a decimal.');
            }

            if (isNumberNegative(studentId)) {
                throw new Error('Given studentId is negative.');
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

            const grade = await this.gradeService.update(
                studentId,
                subjectId,
                value,
            );

            return grade;
        } catch (error: unknown) {
            throw error;
        }
    }

    async delete(studentId: number, subjectId: number): Promise<void> {
        try {
            if (isStrictlyNaN(studentId)) {
                throw new Error('Given studentId is not a number.');
            }

            if (isNumberDecimal(studentId)) {
                throw new Error('Given studentId is a decimal.');
            }

            if (isNumberNegative(studentId)) {
                throw new Error('Given studentId is negative.');
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

            await this.gradeService.delete(studentId, subjectId);
        } catch (error: unknown) {
            throw error;
        }
    }
}
