import { prisma } from '../db/init';
import { BadInputError } from '../exceptions/bad-input-error';
import { NotFoundError } from '../exceptions/not-found-error';
import { Admin } from './admin';
import { AdminService } from './admin.service';
import bcrypt from 'bcrypt';

export class AdminDbService implements AdminService {
    async add(name: string, email: string, password: string): Promise<Admin> {
        try {
            const adminRole = await prisma.role.findFirst({
                where: {
                    name: 'admin',
                },
            });

            if (!adminRole) {
                throw new Error(
                    "Database Error: No role found with name 'admin'",
                );
            }

            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                throw new BadInputError('Email already taken');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const { id } = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: {
                        connect: {
                            id: adminRole.id,
                        },
                    },
                },

                include: {
                    role: true,
                },
            });

            return { id, name, email, role: adminRole };
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getAll(): Promise<Admin[]> {
        try {
            const adminRole = await prisma.role.findFirst({
                where: {
                    name: 'admin',
                },
            });

            if (!adminRole) {
                throw new Error(
                    "Database Error: No role found with name 'admin'",
                );
            }

            const admins = await prisma.user.findMany({
                where: {
                    roleId: adminRole.id,
                },

                include: {
                    role: true,
                },
            });

            return admins.map(({ id, email, name, role }) => {
                return {
                    id,
                    name,
                    email,
                    role,
                };
            });
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getById(id: number): Promise<Admin> {
        try {
            const adminRole = await prisma.role.findFirst({
                where: {
                    name: 'admin',
                },
            });

            if (!adminRole) {
                throw new Error(
                    "Database Error: No role found with name 'admin'",
                );
            }

            const admin = await prisma.user.findUnique({
                where: {
                    id,
                    roleId: adminRole.id,
                },

                include: {
                    role: true,
                },
            });

            if (!admin) {
                throw new NotFoundError('Admin not found');
            }

            const { name, email, role } = admin;

            return { id, name, email, role };
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
}
