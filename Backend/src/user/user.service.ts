import { User } from './user';

export interface UserService {
    add(name: string, email: string, password: string): Promise<User>;
    getAll(): Promise<String[]  | null>;
    delete(email: string): Promise<string>;
}
