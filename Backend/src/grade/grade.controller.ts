import { Grade } from './grade';
import { GradeService } from './grade.service';

export class GradeController {
    constructor(private gradeService: GradeService) {}

    add(id_student: number, id_subject: number, id_teacher: number, value: number): Grade {
        // is the username empty ?
        // is the username whitespaced ?
        // other checks...
        return this.gradeService.add(id_student, id_subject, id_teacher, value);
    }

    getById(id: number): Grade | null {
        // is the id a decimal ?
        // is the id a negative number ?
        // other checks...
        return this.gradeService.getById(id);
    }

    delete(id: number): void {
        return this.gradeService.delete(id);
    }
}
