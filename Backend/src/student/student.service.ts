import { Student } from './student';

export interface StudentService {
    add(name: string, email: string, password: string): Promise<Student>;
    getById(id: number): Promise<Student | null>;
    //getAll(): Promise<Student[]>;
    update(id: number, name: string, email: string): Promise<void>;
    delete(id: number): void;
}