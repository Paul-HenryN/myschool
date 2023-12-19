import { BadInputError } from '../exceptions/bad-input-error';
import {
    isNumberDecimal,
    isNumberNegative,
    isStrictlyNaN,
    isStringEmpty,
} from '../utils';
import { Admin } from './admin';
import { AdminService } from './admin.service';

export class AdminController {
    constructor(private adminService: AdminService) {}

    async add(name: string, email: string, password: string): Promise<Admin> {
        try {
            if (
                isStringEmpty(name) ||
                isStringEmpty(email) ||
                isStringEmpty(password)
            ) {
                throw new BadInputError(
                    'Name, email and password are required',
                );
            }

            const admin = await this.adminService.add(name, email, password);

            return admin;
        } catch (error: unknown) {
            throw error;
        }
    }

    async getAll(): Promise<Admin[]> {
        try {
            const admins = await this.adminService.getAll();
            return admins;
        } catch (error: unknown) {
            throw error;
        }
    }

    async getById(id: number): Promise<Admin> {
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

            const admin = await this.adminService.getById(id);

            return admin;
        } catch (error: unknown) {
            throw error;
        }
    }
}
