import {
    isNumberDecimal,
    isNumberNegative,
    isStrictlyNaN,
    isStringEmpty,
} from '../utils';
import { User } from './user';
import { UserService } from './user.service';

export class UserController {
    constructor(private userService: UserService) {}

    async add(email: string, name: string, password: string): Promise<User> {
        if (isStringEmpty(email)) {
            throw new Error('The email is required');
        }
        if (isStringEmpty(name)) {
            throw new Error('The name is required');
        }
        if (isStringEmpty(password)) {
            throw new Error('The password is required');
        }

        return await this.userService.add(email, name, password);
    }

    async getById(id: number): Promise<User> {
        if (isStrictlyNaN(id)) {
            throw new Error('Given id is not a number.');
        }

        if (isNumberDecimal(id)) {
            throw new Error('Given id is a decimal.');
        }

        if (isNumberNegative(id)) {
            throw new Error('Given id is negative.');
        }

        return await this.userService.getById(id);
    }
}
