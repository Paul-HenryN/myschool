import { Teacher } from './teacher';

export interface TeacherService {
    add(
        name: string,
        email: string,
        subjectId: number,
        password: string,
    ): Promise<Teacher>;
    getAll(): Promise<Teacher[]>;
    getById(id: number): Promise<Teacher>;
    update(
        id: number,
        name: string,
        email: string,
        subjectId: number,
        password: string,
    ): Promise<Teacher>;
}
