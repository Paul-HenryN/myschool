import { Student } from './student';
import { StudentService } from './student.service';

export class StudentController {
    constructor(private studentService: StudentService) {}

    add(name: string, email: string, password: string ): Promise<Student> {
        // is the username empty ?
        // is the username whitespaced ?
        // other checks...
        return this.studentService.add(name,email,password );
    }

    // async getAll(): Promise<Student[]> {
    //     try {
    //         // Call the getAll method from the service
    //         const students = await this.studentService.getAll();
    //         return students;
    //     } catch (error) {
    //         // Handle errors, log, or rethrow as needed
    //         throw new Error('Error fetching all students: ');
    //     }
    // }

    getById(id: number):  Promise<Student | null> {
        // is the id a decimal ?
        // is the id a negative number ?
        // other checks...
        return this.studentService.getById(id);
    }

    update( id: number, name: string, email: string,): Promise<void> {
        return this.studentService.update(id,name, email);
    }

    delete(id: number): void {
        return this.studentService.delete(id);
    }
}
