import { BadInputError } from '../exceptions/bad-input-error';
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

    async getAll(): Promise<User[]> {
        try {
            const users = await this.userService.getAll();

            return users;
        } catch (error: unknown) {
            throw error;
        }
    }

    async getById(id: number): Promise<User> {
        try {
            if (isStrictlyNaN(id)) {
                throw new BadInputError('Given id is not a number.');
            }

            if (isNumberDecimal(id)) {
                throw new BadInputError('Given id is a decimal.');
            }

            if (isNumberNegative(id)) {
                throw new BadInputError('Given id is negative.');
            }

            return await this.userService.getById(id);
        } catch (error: unknown) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            if (isStrictlyNaN(id)) {
                throw new BadInputError('Given id is not a number.');
            }

            if (isNumberDecimal(id)) {
                throw new BadInputError('Given id is a decimal.');
            }

            if (isNumberNegative(id)) {
                throw new BadInputError('Given id is negative.');
            }

            await this.userService.delete(id);
        } catch (error: unknown) {
            throw error;
        }
    }
}
