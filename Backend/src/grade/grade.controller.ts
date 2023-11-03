import { Grade } from './grade';
import { GradeService } from './grade.service';

export class GradeController {
    constructor(private gradeService: GradeService) {}

    add(username: string): Grade {
        // is the username empty ?
        // is the username whitespaced ?
        // other checks...
        return this.gradeService.add(username);
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
