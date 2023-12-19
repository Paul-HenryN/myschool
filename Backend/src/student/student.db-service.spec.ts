import { StudentDbService } from './student.db-service';
import { prisma } from '../db/init';
import { BadInputError } from '../exceptions/bad-input-error';
import { NotFoundError } from '../exceptions/not-found-error';
import bcrypt from 'bcrypt';
import { Student } from './student';

jest.mock('../db/init', () => ({
    prisma: {
        role: {
            findFirst: jest.fn(),
        },
        user: {
            findUnique: jest.fn(),
        },
        student: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
        $disconnect: jest.fn(),
    },
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
}));

describe('StudentDbService', () => {
    let studentDbService: StudentDbService;

    beforeEach(() => {
        jest.resetAllMocks();
        studentDbService = new StudentDbService();
    });

    afterEach(async () => {
        jest.clearAllMocks();
    });

    describe('add', () => {
        it('should add a new student', async () => {
            const mockRole = {
                id: 2,
                name: 'student',
            };

            const mockUser = {
                id: 2,
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
                password: 'hashedPassword',
                roleId: 2,
                role: {
                    id: 2,
                    name: 'student',
                },
            };

            (prisma.role.findFirst as jest.Mock).mockResolvedValueOnce(
                mockRole,
            );
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
            (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashedPassword');
            (prisma.student.create as jest.Mock).mockResolvedValueOnce({
                user: mockUser,
            });

            const result = await studentDbService.add(
                'Jane Doe',
                'jane.doe@example.com',
                'password',
            );

            expect(result).toEqual({
                id: 2,
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
                role: { id: 2, name: 'student' },
            });
        });

        it('should throw BadInputError if email is already taken', async () => {
            const existingUser = {
                id: 2,
            };

            (prisma.role.findFirst as jest.Mock).mockResolvedValueOnce({
                id: 2,
                name: 'student',
            });
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(
                existingUser,
            );

            await expect(
                studentDbService.add(
                    'Jane Doe',
                    'jane.doe@example.com',
                    'password',
                ),
            ).rejects.toThrow(BadInputError);
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.role.findFirst as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(
                studentDbService.add(
                    'Jane Doe',
                    'jane.doe@example.com',
                    'password',
                ),
            ).rejects.toThrow(mockError);
        });
    });

    describe('getAll', () => {
        it('should return an array of students', async () => {
            const mockStudents = [
                {
                    user: {
                        id: 2,
                        name: 'Jane Doe',
                        email: 'jane.doe@example.com',
                        roleId: 2,
                        role: { id: 2, name: 'student' },
                    },
                },
            ];

            (prisma.student.findMany as jest.Mock).mockResolvedValueOnce(
                mockStudents,
            );

            const result = await studentDbService.getAll();

            expect(result).toEqual([
                {
                    id: 2,
                    name: 'Jane Doe',
                    email: 'jane.doe@example.com',
                    role: { id: 2, name: 'student' },
                },
            ]);
            expect(prisma.student.findMany).toHaveBeenCalled();
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.student.findMany as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(studentDbService.getAll()).rejects.toThrow(mockError);
        });
    });

    describe('getById', () => {
        it('should return a student by ID', async () => {
            const mockStudent = {
                user: {
                    id: 2,
                    name: 'Jane Doe',
                    email: 'jane.doe@example.com',
                    roleId: 2,
                    role: { id: 2, name: 'student' },
                },
            };

            (prisma.student.findUnique as jest.Mock).mockResolvedValueOnce(
                mockStudent,
            );

            const result = await studentDbService.getById(2);

            expect(result).toEqual({
                id: 2,
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
                role: { id: 2, name: 'student' },
            });
            expect(prisma.student.findUnique).toHaveBeenCalledWith({
                where: { userId: 2 },
                include: {
                    user: {
                        include: {
                            role: true,
                        },
                    },
                },
            });
        });

        it('should throw NotFoundError if student is not found', async () => {
            (prisma.student.findUnique as jest.Mock).mockResolvedValueOnce(
                null,
            );

            await expect(studentDbService.getById(2)).rejects.toThrow(
                NotFoundError,
            );
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.student.findUnique as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(studentDbService.getById(2)).rejects.toThrow(
                mockError,
            );
        });
    });
});
