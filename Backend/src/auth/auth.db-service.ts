import { prisma } from '../db/init';
import { BadInputError } from '../exceptions/bad-input-error';
import { User } from '../user/user';
import { AuthService } from './auth.service';
import bcrypt from 'bcrypt';

export class AuthDbService implements AuthService {
    async login(email: string, password: string): Promise<User> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },

                include: {
                    role: true,
                },
            });

            if (!user) {
                throw new BadInputError('Invalid credentials');
            }

            const isValidPassword = await bcrypt.compare(
                password,
                user.password,
            );

            if (!isValidPassword) {
                throw new BadInputError('Invalid credentials');
            }

            const { id, name, role } = user;

            return { id, email, name, role };
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
}
