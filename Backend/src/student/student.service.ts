import { Student } from './student';

export interface StudentService {
    add(name: string, email: string, password: string): Student;
    getById(id: number): Student | null;
    getAll(): Student[];
    delete(id: number): void;
}
