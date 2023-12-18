import { Student } from './student';

export interface StudentService {
    add(name: string, email: string, password: string): Promise<Student>;
    getAll(): Promise<Student[]>;
    getById(id: number): Promise<Student>;
    delete(id: number): Promise<void>;
}
