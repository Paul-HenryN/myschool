import { Grade } from './grade';

export interface GradeService {
    add(id_student: number, id_subject: number, id_teacher: number, value: number): Promise<Grade>;
    getById(id: number): Promise<Grade | null>;
    delete(id: number): void;
    updatevalue(ids: number, ide:number,newvalue: number): Promise<Grade | null>;
}
