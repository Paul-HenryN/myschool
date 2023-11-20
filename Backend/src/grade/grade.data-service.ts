import { Grade } from './grade';
import { GradeService } from './grade.service';

export class GradeDataService implements GradeService {
    private grades: Grade[] = [];

    add(id_student: number, id_subject: number, id_teacher: number, value: number): Grade {
        const newGrade = new Grade(id_student, id_subject, id_teacher, value);
        this.grades.push(newGrade);
        return newGrade;
    }

    getById(id: number): Grade | null {
        return this.grades.find(grade => grade.id_student === id) || null;
    }

    delete(id: number): void {
        this.grades = this.grades.filter(grade => grade.id_student !== id);
    }
}