import { User } from './user';

export interface UserService {
    add(email: string, name: string, password: string): Promise<User>;
    getById(id: number): Promise<User>;
}
