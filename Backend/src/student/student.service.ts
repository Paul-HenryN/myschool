import { Student } from './student';

export interface StudentService {
    add(username: string): Student;
    getById(id: number): Student | null;
    delete(id: number): void;
}
