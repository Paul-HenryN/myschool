import { Teacher } from './teacher';

export interface TeacherService {
    add(
        name: string,
        email: string,
        password: string,
        subjectId: number,
    ): Promise<Teacher>;
    updatePassword(email: string, newPassword: string): Promise<Teacher | null>;
    getAllEmail(): Promise<String[] | null>;
    delete(email: string): Promise<string>;
    login(email: string, password: string): Promise<string | null>;
    getByEmail(email: string): Promise<Teacher | null>;
}
