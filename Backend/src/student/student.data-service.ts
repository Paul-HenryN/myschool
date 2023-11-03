import { Student } from './student';
import { StudentService } from './student.service';

export class StudentDataService implements StudentService {
    add(username: string): Student {
        throw new Error('Method not implemented.');
    }
    getById(id: number): Student | null {
        throw new Error('Method not implemented.');
    }
    delete(id: number): void {
        throw new Error('Method not implemented.');
    }
}
