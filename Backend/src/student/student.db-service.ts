import { prisma } from '../db/init';
import { BadInputError } from '../exceptions/bad-input-error';
import { NotFoundError } from '../exceptions/not-found-error';
import { Student } from './student';
import { StudentService } from './student.service';
import bcrypt from 'bcrypt';

export class StudentDbService implements StudentService {
    async add(name: string, email: string, password: string): Promise<Student> {
        try {
            const studentRole = await prisma.role.findFirst({
                where: {
                    name: 'student',
                },
            });

            if (!studentRole) {
                throw new Error(
                    "Database Error: No role found with name 'teacher'",
                );
            }

            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                throw new BadInputError('Email already taken');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const { user } = await prisma.student.create({
                data: {
                    user: {
                        create: {
                            name,
                            email,
                            password: hashedPassword,
                            roleId: studentRole.id,
                        },
                    },
                },

                include: {
                    user: true,
                },
            });

            return { id: user.id, name, email, role: studentRole };
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getAll(): Promise<Student[]> {
        try {
            const students = await prisma.student.findMany({
                include: {
                    user: {
                        include: {
                            role: true,
                        },
                    },
                },
            });

            return students.map(({ user: { id, name, email, role } }) => {
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

    async getById(id: number): Promise<Student> {
        try {
            const student = await prisma.student.findUnique({
                where: {
                    userId: id,
                },

                include: {
                    user: {
                        include: {
                            role: true,
                        },
                    },
                },
            });

            if (!student) {
                throw new NotFoundError('Student not found');
            }

            const { name, email, role } = student.user;

            return { id, name, email, role };
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const student = await prisma.student.findUnique({
                where: {
                    userId: id,
                },
            });

            if (!student) {
                throw new NotFoundError('Student not found');
            }

            await prisma.student.delete({
                where: {
                    userId: id,
                },
            });
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
}
