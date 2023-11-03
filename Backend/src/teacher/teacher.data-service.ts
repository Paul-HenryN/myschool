import { Teacher } from './teacher';
import { TeacherService } from './teacher.service';

export class TeacherDataService implements TeacherService {
    add(username: string): Teacher {
        throw new Error('Method not implemented.');
    }
    getById(id: number): Teacher | null {
        throw new Error('Method not implemented.');
    }
    delete(id: number): void {
        throw new Error('Method not implemented.');
    }
}
