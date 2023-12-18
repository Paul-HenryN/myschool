import { BadInputError } from '../exceptions/bad-input-error';
import {
    isNumberDecimal,
    isNumberNegative,
    isStrictlyNaN,
    isStringEmpty,
} from '../utils';
import { Student } from './student';
import { StudentService } from './student.service';

export class StudentController {
    constructor(private studentService: StudentService) {}

    async add(name: string, email: string, password: string): Promise<Student> {
        try {
            if (
                isStringEmpty(name) ||
                isStringEmpty(email) ||
                isStringEmpty(password)
            ) {
                throw new BadInputError(
                    'Name, email and password are required',
                );
            }

            const student = await this.studentService.add(
                name,
                email,
                password,
            );

            return student;
        } catch (error: unknown) {
            throw error;
        }
    }

    async getAll(): Promise<Student[]> {
        try {
            const students = await this.studentService.getAll();
            return students;
        } catch (error: unknown) {
            throw error;
        }
    }

    async getById(id: number): Promise<Student> {
        try {
            if (isStrictlyNaN(id)) {
                throw new BadInputError('Given id is not a number.');
            }

            if (isNumberDecimal(id)) {
                throw new BadInputError('Given id is a decimal.');
            }

            if (isNumberNegative(id)) {
                throw new BadInputError('Given id is negative.');
            }

            const student = await this.studentService.getById(id);

            return student;
        } catch (error: unknown) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            if (isStrictlyNaN(id)) {
                throw new BadInputError('Given id is not a number.');
            }

            if (isNumberDecimal(id)) {
                throw new BadInputError('Given id is a decimal.');
            }

            if (isNumberNegative(id)) {
                throw new BadInputError('Given id is negative.');
            }

            await this.studentService.delete(id);
        } catch (error: unknown) {
            throw error;
        }
    }
}
