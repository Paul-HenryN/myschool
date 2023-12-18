import { Subject } from './subject';

export interface SubjectService {
    add(name: string, coefficient: number): Promise<Subject>;
    getAll(): Promise<Subject[]>;
    getById(id: number): Promise<Subject>;
    update(id: number, name: string, coefficient: number): Promise<Subject>;
    delete(id: number): Promise<void>;
}
