import { Student } from './student';
import { StudentService } from './student.service';

export class StudentDataService implements StudentService {

    private students: Student[] = [];
/*
    add(username: string): Student {
        throw new Error('Method not implemented.');
    }
    */

    add(name: string, email: string, password: string): Student {
        const newStudent: Student = {
            id: this.students.length + 1,
            name: name,
            email: email,
            password: password,
        };

        this.students.push(newStudent);

        return newStudent;
    }

    /*
    getById(id: number): Student | null {
        throw new Error('Method not implemented.');
    }
     */


    getById(id: number): Student | null {
        const student = this.students.find((s) => s.id === id);
        return student || null;
    }


    /*
    delete(id: number): void {
        throw new Error('Method not implemented.');
    }

    */

    delete(id: number): void {
        this.students = this.students.filter((s) => s.id !== id);
    }

    
}
