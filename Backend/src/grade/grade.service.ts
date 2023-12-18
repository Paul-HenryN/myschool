import { Grade } from './grade';

export interface GradeService {
    add(studentId: number, subjectId: number, value: number): Promise<Grade>;
    getAll(): Promise<Grade[]>;
    getByStudentId(studentId: number): Promise<Grade[]>;
    getByStudentAndSubject(
        studentId: number,
        subjectId: number,
    ): Promise<Grade>;
    update(studentId: number, subjectId: number, value: number): Promise<Grade>;
    delete(studentId: number, subjectId: number): Promise<void>;
}
