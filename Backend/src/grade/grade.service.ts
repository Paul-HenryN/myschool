import { Grade } from './grade';

export interface GradeService {
    add(id_student: number, id_subject: number, id_teacher: number, value: number): Grade;
    getById(id: number): Grade | null;
    delete(id: number): void;
}
