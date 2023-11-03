import { Teacher } from './teacher';

export interface TeacherService {
    add(username: string): Teacher;
    getById(id: number): Teacher | null;
    delete(id: number): void;
}
