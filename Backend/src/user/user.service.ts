import { User } from './user';

export interface UserService {
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User>;
    delete(id: number): Promise<void>;
}
