import { Grade } from './grade';

export interface GradeService {
    add(username: string): Grade;
    getById(id: number): Grade | null;
    delete(id: number): void;
}
