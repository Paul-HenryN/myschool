import { TeacherDbService } from './teacher.db-service';
import { prisma } from '../db/init';
import { BadInputError } from '../exceptions/bad-input-error';
import { NotFoundError } from '../exceptions/not-found-error';
import bcrypt from 'bcrypt';

jest.mock('../db/init', () => ({
    prisma: {
        teacher: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
        },
        user: {
            findUnique: jest.fn(),
        },
        subject: {
            findUnique: jest.fn(),
        },
        role: {
            findFirst: jest.fn(),
        },
        $disconnect: jest.fn(),
    },
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
}));

describe('TeacherDbService', () => {
    let teacherDbService: TeacherDbService;

    beforeEach(() => {
        jest.resetAllMocks();
        teacherDbService = new TeacherDbService();
    });

    afterEach(async () => {
        jest.clearAllMocks();
    });

    describe('add', () => {
        it('should add a new teacher', async () => {
            const mockTeacher = {
                id: 1,
                email: 'john.doe@example.com',
                name: 'John Doe',
                roleId: 2,
                role: {
                    id: 2,
                    name: 'teacher',
                }, // Assuming the teacher role ID is 2
            };

            (prisma.role.findFirst as jest.Mock).mockResolvedValueOnce({
                id: 2,
                name: 'teacher',
            });
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
            (prisma.subject.findUnique as jest.Mock).mockResolvedValueOnce({
                id: 1,
                name: 'Math',
            });
            (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashedPassword');
            (prisma.teacher.create as jest.Mock).mockResolvedValueOnce({
                user: mockTeacher,
            });

            const result = await teacherDbService.add(
                'John Doe',
                'john.doe@example.com',
                1,
                'password',
            );

            expect(result).toEqual({
                id: mockTeacher.id,
                email: mockTeacher.email,
                name: mockTeacher.name,
                role: { id: mockTeacher.roleId, name: 'teacher' },
                subject: { id: 1, name: 'Math' },
            });
        });

        it('should throw BadInputError if email is already taken', async () => {
            (prisma.role.findFirst as jest.Mock).mockResolvedValueOnce({
                id: 2,
                name: 'teacher',
            });

            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
                id: 1,
                email: 'john.doe@example.com',
            });

            await expect(
                teacherDbService.add(
                    'John Doe',
                    'john.doe@example.com',
                    1,
                    'password',
                ),
            ).rejects.toThrow(BadInputError);
        });

        it('should throw NotFoundError if subject does not exist', async () => {
            (prisma.role.findFirst as jest.Mock).mockResolvedValueOnce({
                id: 2,
                name: 'teacher',
            });
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
            (prisma.subject.findUnique as jest.Mock).mockResolvedValueOnce(
                null,
            );

            await expect(
                teacherDbService.add(
                    'John Doe',
                    'john.doe@example.com',
                    1,
                    'password',
                ),
            ).rejects.toThrow(NotFoundError);
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.role.findFirst as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(
                teacherDbService.add(
                    'John Doe',
                    'john.doe@example.com',
                    1,
                    'password',
                ),
            ).rejects.toThrow(mockError);
        });
    });

    describe('getAll', () => {
        it('should get all teachers', async () => {
            const mockTeachers = [
                {
                    id: 1,
                    email: 'john.doe@example.com',
                    name: 'John Doe',
                    roleId: 2,
                    role: {
                        id: 2,
                        name: 'teacher',
                    },
                },
                {
                    id: 2,
                    email: 'jane.smith@example.com',
                    name: 'Jane Smith',
                    roleId: 2,
                    role: {
                        id: 2,
                        name: 'teacher',
                    },
                },
            ];

            (prisma.teacher.findMany as jest.Mock).mockResolvedValueOnce([
                { user: mockTeachers[0], subject: { id: 1, name: 'Math' } },
                { user: mockTeachers[1], subject: { id: 2, name: 'English' } },
            ]);

            const result = await teacherDbService.getAll();

            expect(result).toEqual([
                {
                    id: mockTeachers[0].id,
                    email: mockTeachers[0].email,
                    name: mockTeachers[0].name,
                    role: { id: mockTeachers[0].roleId, name: 'teacher' },
                    subject: { id: 1, name: 'Math' },
                },
                {
                    id: mockTeachers[1].id,
                    email: mockTeachers[1].email,
                    name: mockTeachers[1].name,
                    role: { id: mockTeachers[1].roleId, name: 'teacher' },
                    subject: { id: 2, name: 'English' },
                },
            ]);
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.teacher.findMany as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(teacherDbService.getAll()).rejects.toThrow(mockError);
        });
    });

    describe('getById', () => {
        it('should get a teacher by ID', async () => {
            const mockTeacher = {
                id: 1,
                email: 'john.doe@example.com',
                name: 'John Doe',
                roleId: 2,
                role: {
                    id: 2,
                    name: 'teacher',
                },
            };

            (prisma.teacher.findUnique as jest.Mock).mockResolvedValueOnce({
                user: mockTeacher,
                subject: { id: 1, name: 'Math' },
            });

            const result = await teacherDbService.getById(1);

            expect(result).toEqual({
                id: mockTeacher.id,
                email: mockTeacher.email,
                name: mockTeacher.name,
                role: { id: mockTeacher.roleId, name: 'teacher' },
                subject: { id: 1, name: 'Math' },
            });
        });

        it('should throw NotFoundError if teacher does not exist', async () => {
            (prisma.teacher.findUnique as jest.Mock).mockResolvedValueOnce(
                null,
            );

            await expect(teacherDbService.getById(1)).rejects.toThrow(
                NotFoundError,
            );
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.teacher.findUnique as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(teacherDbService.getById(1)).rejects.toThrow(
                mockError,
            );
        });
    });

    describe('update', () => {
        it('should throw BadInputError if email is already taken', async () => {
            const mockTeacher = {
                subject: {
                    id: 1,
                    name: 'Math',
                    coefficient: 5,
                },
                user: {
                    id: 1,
                    name: 'John Doe',
                    email: 'john-doe@example.com',
                    roleId: 2,
                    role: {
                        id: 2,
                        name: 'teacher',
                    },
                },
            };

            const mockExistingUser = {
                id: 2,
                email: 'existing.email@example.com',
                name: 'User',
                password: 'a password',
                roleId: 2,
            };

            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(
                mockExistingUser,
            );

            (prisma.teacher.findUnique as jest.Mock).mockResolvedValueOnce(
                mockTeacher,
            );

            await expect(
                teacherDbService.update(
                    1,
                    'John Doe',
                    'existing.email@example.com',
                    1,
                    'password',
                ),
            ).rejects.toThrow(BadInputError);
        });

        it('should update a teacher', async () => {
            const mockTeacher = {
                id: 1,
                email: 'john.doe@example.com',
                name: 'John Doe',
                roleId: 2,
                role: {
                    id: 2,
                    name: 'teacher',
                },
            };

            (prisma.teacher.findUnique as jest.Mock).mockResolvedValueOnce({
                user: mockTeacher,
            });
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
            (prisma.subject.findUnique as jest.Mock).mockResolvedValueOnce({
                id: 1,
                name: 'Math',
            });
            (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashedPassword');
            (prisma.teacher.update as jest.Mock).mockResolvedValueOnce({
                user: mockTeacher,
            });

            const result = await teacherDbService.update(
                1,
                'John Doe',
                'john.doe@example.com',
                1,
                'password',
            );

            expect(result).toEqual({
                id: mockTeacher.id,
                email: mockTeacher.email,
                name: mockTeacher.name,
                role: { id: mockTeacher.roleId, name: 'teacher' },
                subject: { id: 1, name: 'Math' },
            });
        });

        it('should throw NotFoundError if teacher does not exist', async () => {
            (prisma.teacher.findUnique as jest.Mock).mockResolvedValueOnce(
                null,
            );

            (prisma.subject.findUnique as jest.Mock).mockResolvedValueOnce({
                id: '1',
                name: 'Math',
                coefficient: 5,
            });

            await expect(
                teacherDbService.update(
                    1,
                    'John Doe',
                    'john.doe@example.com',
                    1,
                    'password',
                ),
            ).rejects.toThrow(NotFoundError);
        });

        it('should throw NotFoundError if subject does not exist', async () => {
            const mockTeacher = {
                subject: {
                    id: 1,
                    name: 'Math',
                    coefficient: 5,
                },
                user: {
                    id: 1,
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    roleId: 2,
                    role: {
                        id: 2,
                        name: 'teacher',
                    },
                },
            };

            (prisma.teacher.findUnique as jest.Mock).mockResolvedValueOnce(
                mockTeacher,
            );
            (prisma.subject.findUnique as jest.Mock).mockResolvedValueOnce(
                null,
            );

            await expect(
                teacherDbService.update(
                    1,
                    'John Doe',
                    'john.doe@example.com',
                    1,
                    'password',
                ),
            ).rejects.toThrow(NotFoundError);
        });

        it('should throw an error if an error occurs', async () => {
            const mockTeacher = {
                subject: {
                    id: 1,
                    name: 'Math',
                    coefficient: 5,
                },
                user: {
                    id: 1,
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    roleId: 2,
                    role: {
                        id: 2,
                        name: 'teacher',
                    },
                },
            };

            const mockError = new Error('Test error');
            (prisma.teacher.findUnique as jest.Mock).mockResolvedValueOnce(
                mockTeacher,
            );
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
            (prisma.subject.findUnique as jest.Mock).mockResolvedValueOnce({
                id: 1,
                name: 'Math',
            });
            (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashedPassword');
            (prisma.teacher.update as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(
                teacherDbService.update(
                    1,
                    'John Doe',
                    'john.doe@example.com',
                    1,
                    'password',
                ),
            ).rejects.toThrow(mockError);
        });
    });
});
