import { prisma } from '../db/init';
import { User } from './user';
import { UserService } from './user.service';
import { NotFoundError } from '../exceptions/not-found-error';

export class UserDbService implements UserService {
    async getAll(): Promise<User[]> {
        try {
            const users = await prisma.user.findMany({
                include: {
                    role: true,
                },
            });

            return users.map(({ id, name, email, role }) => {
                return { id, name, email, role };
            });
        } catch (error: unknown) {
            throw error;
        }
    }

    async getById(id: number): Promise<User> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: id,
                },

                include: {
                    role: true,
                },
            });

            if (!user) {
                throw new NotFoundError('User not found.');
            }

            const { email, name, role } = user;

            return { id, name, email, role };
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });

            if (!user) {
                throw new NotFoundError('User not found.');
            }

            await prisma.user.delete({
                where: {
                    id,
                },
            });
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
}
