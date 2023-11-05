import { User } from './user';
import { UserService } from './user.service';

export class UserController {
    constructor(private userService: UserService) {}

    add(name: string, email: string, password: string): Promise<User> {
        // is the username empty ?
        // is the username whitespaced ?
        // other checks...
        return this.userService.add(name, email, password);
    }

    getById(id: number): User | null {
        // is the id a decimal ?
        // is the id a negative number ?
        // other checks...
        return this.userService.getById(id);
    }

    delete(id: number): void {
        return this.userService.delete(id);
    }
}
