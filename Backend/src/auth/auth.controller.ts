import { BadInputError } from '../exceptions/bad-input-error';
import { User } from '../user/user';
import { isStringEmpty } from '../utils';
import { AuthService } from './auth.service';

export class AuthController {
    constructor(private authService: AuthService) {}

    async login(email: string, password: string): Promise<User> {
        try {
            if (isStringEmpty(email) || isStringEmpty(email)) {
                throw new BadInputError('Email and password are required');
            }

            return await this.authService.login(email, password);
        } catch (error: unknown) {
            throw error;
        }
    }
}
