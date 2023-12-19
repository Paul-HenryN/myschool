import { GradeDBService } from './grade.db-service';
import { prisma } from '../db/init';
import { BadInputError } from '../exceptions/bad-input-error';
import { NotFoundError } from '../exceptions/not-found-error';

jest.mock('../db/init', () => ({
    prisma: {
        student: {
            findUnique: jest.fn(),
        },
        subject: {
            findUnique: jest.fn(),
        },
        grade: {
            findFirst: jest.fn(),
            create: jest.fn(),
            findMany: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        $disconnect: jest.fn(),
    },
}));

describe('GradeDBService', () => {
    let gradeDbService: GradeDBService;

    beforeEach(() => {
        jest.resetAllMocks();
        gradeDbService = new GradeDBService();
    });

    afterEach(async () => {
        jest.clearAllMocks();
    });

    describe('add', () => {
        it('should add a new grade', async () => {
            const mockStudent = {
                user: {
                    id: 1,
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    role: { id: 3, name: 'student' },
                },
            };
            const mockSubject = { id: 1, name: 'Math' };

            (prisma.student.findUnique as jest.Mock).mockResolvedValueOnce(
                mockStudent,
            );
            (prisma.subject.findUnique as jest.Mock).mockResolvedValueOnce(
                mockSubject,
            );
            (prisma.grade.findFirst as jest.Mock).mockResolvedValueOnce(null);
            (prisma.grade.create as jest.Mock).mockResolvedValueOnce({
                id: 1,
                value: 90,
                studentId: 1,
                subjectId: 1,
            });

            const result = await gradeDbService.add(1, 1, 90);

            expect(result).toEqual({
                id: 1,
                student: {
                    id: mockStudent.user.id,
                    email: mockStudent.user.email,
                    name: mockStudent.user.name,
                    role: mockStudent.user.role,
                },
                subject: mockSubject,
                value: 90,
            });
        });

        it('should throw NotFoundError if student does not exist', async () => {
            (prisma.student.findUnique as jest.Mock).mockResolvedValueOnce(
                null,
            );

            await expect(gradeDbService.add(1, 1, 90)).rejects.toThrow(
                NotFoundError,
            );
        });

        it('should throw NotFoundError if subject does not exist', async () => {
            (prisma.student.findUnique as jest.Mock).mockResolvedValueOnce({
                user: {
                    id: 1,
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    role: { id: 3, name: 'student' },
                },
            });
            (prisma.subject.findUnique as jest.Mock).mockResolvedValueOnce(
                null,
            );

            await expect(gradeDbService.add(1, 1, 90)).rejects.toThrow(
                NotFoundError,
            );
        });

        it('should throw BadInputError if grade already exists for the student and subject', async () => {
            const mockStudent = {
                user: {
                    id: 1,
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    role: { id: 3, name: 'student' },
                },
            };
            const mockSubject = { id: 1, name: 'Math' };

            (prisma.student.findUnique as jest.Mock).mockResolvedValueOnce(
                mockStudent,
            );
            (prisma.subject.findUnique as jest.Mock).mockResolvedValueOnce(
                mockSubject,
            );
            (prisma.grade.findFirst as jest.Mock).mockResolvedValueOnce({
                id: 1,
                value: 80,
                studentId: 1,
                subjectId: 1,
            });

            await expect(gradeDbService.add(1, 1, 90)).rejects.toThrow(
                BadInputError,
            );
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.student.findUnique as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(gradeDbService.add(1, 1, 90)).rejects.toThrow(
                mockError,
            );
        });
    });

    describe('getAll', () => {
        it('should get all grades', async () => {
            const mockGrades = [
                { id: 1, studentId: 1, subjectId: 1, value: 90 },
                { id: 2, studentId: 2, subjectId: 2, value: 85 },
            ];
            const mockStudents = [
                {
                    user: {
                        id: 1,
                        name: 'John Doe',
                        email: 'john.doe@example.com',
                        role: { id: 3, name: 'student' },
                    },
                },
                {
                    user: {
                        id: 2,
                        name: 'Jane Smith',
                        email: 'jane.smith@example.com',
                        role: { id: 3, name: 'student' },
                    },
                },
            ];
            const mockSubjects = [
                { id: 1, name: 'Math' },
                { id: 2, name: 'English' },
            ];

            (prisma.grade.findMany as jest.Mock).mockResolvedValueOnce([
                {
                    ...mockGrades[0],
                    student: mockStudents[0],
                    subject: mockSubjects[0],
                },
                {
                    ...mockGrades[1],
                    student: mockStudents[1],
                    subject: mockSubjects[1],
                },
            ]);

            const result = await gradeDbService.getAll();

            expect(result).toEqual([
                {
                    id: mockGrades[0].id,
                    student: {
                        id: mockStudents[0].user.id,
                        email: mockStudents[0].user.email,
                        name: mockStudents[0].user.name,
                        role: mockStudents[0].user.role,
                    },
                    subject: mockSubjects[0],
                    value: mockGrades[0].value,
                },
                {
                    id: mockGrades[1].id,
                    student: {
                        id: mockStudents[1].user.id,
                        email: mockStudents[1].user.email,
                        name: mockStudents[1].user.name,
                        role: mockStudents[1].user.role,
                    },
                    subject: mockSubjects[1],
                    value: mockGrades[1].value,
                },
            ]);
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.grade.findMany as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(gradeDbService.getAll()).rejects.toThrow(mockError);
        });
    });

    describe('getByStudentId', () => {
        it('should get grades by student ID', async () => {
            const mockStudent = {
                user: {
                    id: 1,
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    role: { id: 3, name: 'student' },
                },
            };
            const mockGrades = [
                { id: 1, studentId: 1, subjectId: 1, value: 90 },
                { id: 2, studentId: 1, subjectId: 2, value: 85 },
            ];
            const mockSubjects = [
                { id: 1, name: 'Math' },
                { id: 2, name: 'English' },
            ];

            (prisma.student.findUnique as jest.Mock).mockResolvedValueOnce(
                mockStudent,
            );
            (prisma.grade.findMany as jest.Mock).mockResolvedValueOnce([
                {
                    ...mockGrades[0],
                    student: mockStudent,
                    subject: mockSubjects[0],
                },
                {
                    ...mockGrades[1],
                    student: mockStudent,
                    subject: mockSubjects[1],
                },
            ]);

            const result = await gradeDbService.getByStudentId(1);

            expect(result).toEqual([
                {
                    id: mockGrades[0].id,
                    student: {
                        id: mockStudent.user.id,
                        email: mockStudent.user.email,
                        name: mockStudent.user.name,
                        role: mockStudent.user.role,
                    },
                    subject: mockSubjects[0],
                    value: mockGrades[0].value,
                },
                {
                    id: mockGrades[1].id,
                    student: {
                        id: mockStudent.user.id,
                        email: mockStudent.user.email,
                        name: mockStudent.user.name,
                        role: mockStudent.user.role,
                    },
                    subject: mockSubjects[1],
                    value: mockGrades[1].value,
                },
            ]);
        });

        it('should throw NotFoundError if student does not exist', async () => {
            (prisma.student.findUnique as jest.Mock).mockResolvedValueOnce(
                null,
            );

            await expect(gradeDbService.getByStudentId(1)).rejects.toThrow(
                NotFoundError,
            );
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.student.findUnique as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(gradeDbService.getByStudentId(1)).rejects.toThrow(
                mockError,
            );
        });
    });
});
