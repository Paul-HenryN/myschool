import { Admin } from './admin';

export interface AdminService {
    add(name: string, email: string, password: string): Promise<Admin>;
    getAll(): Promise<Admin[]>;
    getById(id: number): Promise<Admin>;
}
