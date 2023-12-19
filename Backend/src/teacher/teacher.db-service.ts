import { prisma } from '../db/init';
import { BadInputError } from '../exceptions/bad-input-error';
import { NotFoundError } from '../exceptions/not-found-error';
import bcrypt from 'bcrypt';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher';

export class TeacherDbService implements TeacherService {
    async add(
        name: string,
        email: string,
        subjectId: number,
        password: string,
    ): Promise<Teacher> {
        try {
            const teacherRole = await prisma.role.findFirst({
                where: {
                    name: 'teacher',
                },
            });

            if (!teacherRole) {
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

            const subject = await prisma.subject.findUnique({
                where: {
                    id: subjectId,
                },
            });

            if (!subject) {
                throw new NotFoundError('Subject not found.');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const { user } = await prisma.teacher.create({
                data: {
                    user: {
                        create: {
                            name,
                            email,
                            password: hashedPassword,
                            roleId: teacherRole.id,
                        },
                    },

                    subject: {
                        connect: {
                            id: subjectId,
                        },
                    },
                },

                include: {
                    user: {
                        include: {
                            role: true,
                        },
                    },
                },
            });

            return { id: user.id, email, name, role: user.role, subject };
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getAll(): Promise<Teacher[]> {
        try {
            const teachers = await prisma.teacher.findMany({
                include: {
                    user: {
                        include: {
                            role: true,
                        },
                    },

                    subject: true,
                },
            });

            return teachers.map(
                ({ user: { id, name, email, role }, subject }) => {
                    return {
                        id,
                        name,
                        email,
                        role,
                        subject,
                    };
                },
            );
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getById(id: number): Promise<Teacher> {
        try {
            const teacher = await prisma.teacher.findUnique({
                where: {
                    userId: id,
                },

                include: {
                    user: {
                        include: {
                            role: true,
                        },
                    },

                    subject: true,
                },
            });

            if (!teacher) {
                throw new NotFoundError('Teacher not found');
            }

            const { user, subject } = teacher;

            return {
                id,
                name: user.name,
                email: user.email,
                role: user.role,
                subject,
            };
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    async update(
        id: number,
        name: string,
        email: string,
        subjectId: number,
        password: string,
    ): Promise<Teacher> {
        try {
            const teacher = await prisma.teacher.findUnique({
                where: { userId: id },
                include: {
                    user: true,
                },
            });

            if (!teacher) {
                throw new NotFoundError('Teacher not found');
            }

            if (teacher.user.email !== email) {
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });

                console.log(existingUser);

                if (existingUser !== null) {
                    throw new BadInputError('Email already taken');
                }
            }

            const subject = await prisma.subject.findUnique({
                where: {
                    id: subjectId,
                },
            });

            if (!subject) {
                throw new NotFoundError('Subject not found.');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const { user } = await prisma.teacher.update({
                where: {
                    userId: id,
                },

                data: {
                    user: {
                        update: {
                            email,
                            name,
                            password,
                        },
                    },

                    subject: {
                        connect: {
                            id: subjectId,
                        },
                    },
                },

                include: {
                    user: {
                        include: {
                            role: true,
                        },
                    },
                },
            });

            return { id, email, name, role: user.role, subject };
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
}
