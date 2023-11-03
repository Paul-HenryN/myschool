import { Teacher } from './teacher';
import { TeacherService } from './teacher.service';

export class TeacherController {
    constructor(private teacherService: TeacherService) {}

    add(username: string): Teacher {
        // is the username empty ?
        // is the username whitespaced ?
        // other checks...
        return this.teacherService.add(username);
    }

    getById(id: number): Teacher | null {
        // is the id a decimal ?
        // is the id a negative number ?
        // other checks...
        return this.teacherService.getById(id);
    }

    delete(id: number): void {
        return this.teacherService.delete(id);
    }
}
