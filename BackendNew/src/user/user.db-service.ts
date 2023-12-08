import { prisma } from '../db/init';
import { User } from './user';
import { UserService } from './user.service';
import { NotFoundError } from '../exceptions/not-found-error';
import bcrypt from 'bcrypt';

export class UserDbService implements UserService {
    async add(email: string, name: string, password: string): Promise<User> {
        const hash = await bcrypt.hash(password, 10);

        const { id } = await prisma.user.create({
            data: {
                email,
                name,
                password: hash,
            },
        });

        return { id, name, email };
    }

    async getById(id: number): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!user) {
            throw new NotFoundError('User not found.');
        }

        const { email, name } = user;

        return { id, name, email };
    }
}
