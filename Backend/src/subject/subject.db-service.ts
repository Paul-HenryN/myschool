import { prisma } from '../db/init';
import { NotFoundError } from '../exceptions/not-found-error';
import { Subject } from './subject';
import { SubjectService } from './subject.service';

export class SubjectDbService implements SubjectService {
    async add(name: string, coefficient: number): Promise<Subject> {
        try {
            const subject = prisma.subject.create({
                data: {
                    name,
                    coefficient,
                },
            });

            return subject;
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getAll(): Promise<Subject[]> {
        try {
            const subjects = await prisma.subject.findMany();

            return subjects;
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getById(id: number): Promise<Subject> {
        try {
            const subject = await prisma.subject.findUnique({
                where: {
                    id,
                },
            });

            if (!subject) {
                throw new NotFoundError('Subject not found.');
            }

            return subject;
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    async update(
        id: number,
        name: string,
        coefficient: number,
    ): Promise<Subject> {
        try {
            const subject = await prisma.subject.findUnique({
                where: {
                    id,
                },
            });

            if (!subject) {
                throw new NotFoundError('Subject not found.');
            }

            await prisma.subject.update({
                where: {
                    id,
                },

                data: {
                    name,
                    coefficient,
                },
            });

            return { id, name, coefficient };
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const subject = await prisma.subject.findUnique({
                where: {
                    id,
                },
            });

            if (!subject) {
                throw new NotFoundError('Subject not found');
            }

            await prisma.subject.delete({
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
