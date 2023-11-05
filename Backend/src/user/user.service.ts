import { User } from './user';

export interface UserService {
    add(name: string, email: string, password: string): Promise<User>;
    getById(id: number): User | null;
    delete(id: number): void;
}
