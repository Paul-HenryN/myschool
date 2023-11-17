import { User } from './user';

export interface UserService {
    add(name: string, email: string, password: string): Promise<User>;
    updatePassword(email: string, newPassword: string): Promise<User | null>;
    getAllEmail(): Promise<String[]  | null>;
    delete(email: string): Promise<string>;
    login(email: string, password: string): Promise<string | null>;
    getByEmail(email: string): Promise<User | null>;
}
