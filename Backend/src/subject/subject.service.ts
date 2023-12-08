import { Subject } from './subject';

export interface SubjectService {
    add(name: string, teacher: string): Promise<Subject>;
    updateTeacher(name: string, teacher: string): Promise<Subject | null>;
    getAllSubject(): Promise<String[]  | null>;
    delete(name: string): Promise<string>;
    getByName(name: string): Promise<Subject | null>;
}
