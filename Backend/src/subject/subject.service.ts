import { Subject } from './subject';

export interface SubjectService {
    add(name: string, coefficient: number): Promise<Subject>;
    getByid(id: number): Promise<Subject>;
    update(id: number, newName: string, newCoefficient: number): Promise<void>;
    delete(id: number): Promise<void>;
}
