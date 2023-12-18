import { User } from '../user/user';

export interface AuthService {
    login(email: string, password: string): Promise<User>;
}
