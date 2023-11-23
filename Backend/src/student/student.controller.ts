import { Student } from './student';
import { StudentService } from './student.service';

export class StudentController {
    constructor(private studentService: StudentService) {}

    add(name: string, email: string, password: string ): Student {
        // is the username empty ?
        // is the username whitespaced ?
        // other checks...
        return this.studentService.add(name,email,password );
    }

    getById(id: number): Student | null {
        // is the id a decimal ?
        // is the id a negative number ?
        // other checks...
        return this.studentService.getById(id);
    }

    delete(id: number): void {
        return this.studentService.delete(id);
    }
}
