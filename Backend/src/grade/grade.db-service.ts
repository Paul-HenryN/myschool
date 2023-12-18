import { prisma } from '../db/init';
import { BadInputError } from '../exceptions/bad-input-error';
import { NotFoundError } from '../exceptions/not-found-error';
import { Grade } from './grade';
import { GradeService } from './grade.service';

export class GradeDBService implements GradeService {
    async add(
        studentId: number,
        subjectId: number,
        value: number,
    ): Promise<Grade> {
        try {
            const student = await prisma.student.findUnique({
                where: {
                    userId: studentId,
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
                throw new NotFoundError('Student not found.');
            }

            const subject = await prisma.subject.findUnique({
                where: {
                    id: subjectId,
                },
            });

            if (!subject) {
                throw new NotFoundError('Subject not found.');
            }

            const existingGrade = await prisma.grade.findFirst({
                where: {
                    studentId,
                    subjectId,
                },
            });

            if (existingGrade) {
                throw new BadInputError(
                    "There's already a grade for that student for the subject specified. Try to update it instead.",
                );
            }

            const grade = await prisma.grade.create({
                data: {
                    value,
                    student: {
                        connect: {
                            userId: studentId,
                        },
                    },
                    subject: {
                        connect: {
                            id: subjectId,
                        },
                    },
                },
            });

            return {
                id: grade.id,
                student: {
                    id: studentId,
                    name: student.user.name,
                    email: student.user.email,
                    role: student.user.role,
                },
                subject,
                value,
            };
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getAll(): Promise<Grade[]> {
        try {
            const grades = await prisma.grade.findMany({
                include: {
                    student: {
                        include: {
                            user: {
                                include: {
                                    role: true,
                                },
                            },
                        },
                    },

                    subject: true,
                },
            });

            return grades.map(({ id, student, subject, value }) => {
                return {
                    id,
                    student: {
                        id: student.user.id,
                        email: student.user.email,
                        name: student.user.name,
                        role: student.user.role,
                    },
                    subject,
                    value,
                };
            });
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getByStudentId(studentId: number): Promise<Grade[]> {
        try {
            const student = await prisma.student.findUnique({
                where: {
                    userId: studentId,
                },
            });

            if (!student) {
                throw new NotFoundError('Student not found.');
            }

            const grades = await prisma.grade.findMany({
                where: {
                    studentId,
                },

                include: {
                    student: {
                        include: {
                            user: {
                                include: {
                                    role: true,
                                },
                            },
                        },
                    },

                    subject: true,
                },
            });

            return grades.map(({ id, student, subject, value }) => {
                return {
                    id,
                    student: {
                        id: studentId,
                        name: student.user.name,
                        email: student.user.email,
                        role: student.user.role,
                    },
                    subject,
                    value,
                };
            });
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getByStudentAndSubject(
        studentId: number,
        subjectId: number,
    ): Promise<Grade> {
        try {
            const student = await prisma.student.findUnique({
                where: {
                    userId: studentId,
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
                throw new NotFoundError('Student not found.');
            }

            const subject = await prisma.subject.findUnique({
                where: {
                    id: subjectId,
                },
            });

            if (!subject) {
                throw new NotFoundError('Subject not found.');
            }

            const grade = await prisma.grade.findFirst({
                where: {
                    studentId,
                    subjectId,
                },
            });

            if (!grade) {
                throw new NotFoundError(
                    'No grade found for the specified student in the specified subject.',
                );
            }

            return {
                id: grade.id,
                student: {
                    id: student.user.id,
                    name: student.user.name,
                    email: student.user.email,
                    role: student.user.role,
                },
                subject,
                value: grade.value,
            };
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    async update(
        studentId: number,
        subjectId: number,
        value: number,
    ): Promise<Grade> {
        try {
            const student = await prisma.student.findUnique({
                where: {
                    userId: studentId,
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
                throw new NotFoundError('Student not found.');
            }

            const subject = await prisma.subject.findUnique({
                where: {
                    id: subjectId,
                },
            });

            if (!subject) {
                throw new NotFoundError('Subject not found.');
            }

            const grade = await prisma.grade.findFirst({
                where: {
                    studentId,
                    subjectId,
                },
            });

            if (!grade) {
                throw new NotFoundError(
                    'No grade found for the specified student in the specified subject.',
                );
            }

            await prisma.grade.update({
                where: {
                    id: grade.id,
                },
                data: {
                    value,
                },
            });

            return {
                id: grade.id,
                student: {
                    id: student.user.id,
                    name: student.user.name,
                    email: student.user.email,
                    role: student.user.role,
                },
                subject,
                value: value,
            };
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    async delete(studentId: number, subjectId: number): Promise<void> {
        try {
            const student = await prisma.student.findUnique({
                where: {
                    userId: studentId,
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
                throw new NotFoundError('Student not found.');
            }

            const subject = await prisma.subject.findUnique({
                where: {
                    id: subjectId,
                },
            });

            if (!subject) {
                throw new NotFoundError('Subject not found.');
            }

            const grade = await prisma.grade.findFirst({
                where: {
                    studentId,
                    subjectId,
                },
            });

            if (!grade) {
                throw new NotFoundError(
                    'No grade found for the specified student in the specified subject.',
                );
            }

            await prisma.grade.delete({
                where: {
                    id: grade.id,
                },
            });
        } catch (error: unknown) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
}
