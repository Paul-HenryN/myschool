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

    getAll(): Promise<String[] | null> {
        // is the id a decimal ?
        // is the id a negative number ?
        // other checks...
        return this.userService.getAll();
    }

    delete(email: string): Promise<string> {
        return this.userService.delete(email);
    }
}
