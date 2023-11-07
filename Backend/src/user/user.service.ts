import { User } from './user';

export interface UserService {
    add(name: string, email: string, password: string): Promise<User>;
    getAll(): Promise<User[] | null>;
    delete(id: number): void;
}
