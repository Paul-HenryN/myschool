import { User } from './user';

export interface UserService {
    add(name: string, email: string, password: string): Promise<User>;
    updatePassword(email: string, newPassword: string): Promise<User | null>;
    getAllEmail(): Promise<String[]  | null>;
    delete(email: string): Promise<string>;
}
