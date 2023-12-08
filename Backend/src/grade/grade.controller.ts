import { promises } from 'fs';
import { Grade } from './grade';
import { GradeService } from './grade.service';

export class GradeController {
    constructor(private gradeService: GradeService) {}

    add(id_student: number, id_subject: number, id_teacher: number, value: number): Promise<Grade> {
      
        return this.gradeService.add(id_student, id_subject, id_teacher, value);
    }

    getById(id: number): Promise<Grade | null> {
    
        return this.gradeService.getById(id);
    }

    delete(id: number): void {
        return this.gradeService.delete(id);
    }
    updatevalue(ids: number,ide: number, newvalue: number): Promise<Grade | null> {
        return this.gradeService.updatevalue(ids ,ide, newvalue);
    }
}
