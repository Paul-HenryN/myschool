import { Grade } from './grade';
import { GradeService } from './grade.service';

export class GradeDataService implements GradeService {
    add(username: string): Grade {
        throw new Error('Method not implemented.');
    }
    getById(id: number): Grade | null {
        throw new Error('Method not implemented.');
    }
    delete(id: number): void {
        throw new Error('Method not implemented.');
    }
}
