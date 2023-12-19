import { prisma } from '../db/init';
import { NotFoundError } from '../exceptions/not-found-error';
import { SubjectDbService } from './subject.db-service';

jest.mock('../db/init', () => ({
    prisma: {
        subject: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        $disconnect: jest.fn(),
    },
}));

describe('SubjectDbService', () => {
    let subjectDbService: SubjectDbService;

    beforeEach(() => {
        jest.resetAllMocks();
        subjectDbService = new SubjectDbService();
    });

    afterEach(async () => {
        jest.clearAllMocks();
    });

    describe('add', () => {
        it('should add a new subject', async () => {
            const mockSubject = {
                id: 1,
                name: 'Math',
                coefficient: 2,
            };

            (prisma.subject.create as jest.Mock).mockResolvedValueOnce(
                mockSubject,
            );

            const result = await subjectDbService.add('Math', 2);

            expect(result).toEqual(mockSubject);
            expect(prisma.subject.create).toHaveBeenCalledWith({
                data: {
                    name: 'Math',
                    coefficient: 2,
                },
            });
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.subject.create as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(subjectDbService.add('Math', 2)).rejects.toThrow(
                mockError,
            );
        });
    });

    describe('getAll', () => {
        it('should return an array of subjects', async () => {
            const mockSubjects = [
                {
                    id: 1,
                    name: 'Math',
                    coefficient: 2,
                },
            ];

            (prisma.subject.findMany as jest.Mock).mockResolvedValueOnce(
                mockSubjects,
            );

            const result = await subjectDbService.getAll();

            expect(result).toEqual(mockSubjects);
            expect(prisma.subject.findMany).toHaveBeenCalled();
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.subject.findMany as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(subjectDbService.getAll()).rejects.toThrow(mockError);
        });
    });

    describe('getById', () => {
        it('should return a subject by ID', async () => {
            const mockSubject = {
                id: 1,
                name: 'Math',
                coefficient: 2,
            };

            (prisma.subject.findUnique as jest.Mock).mockResolvedValueOnce(
                mockSubject,
            );

            const result = await subjectDbService.getById(1);

            expect(result).toEqual(mockSubject);
            expect(prisma.subject.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
            });
        });

        it('should throw NotFoundError if subject is not found', async () => {
            (prisma.subject.findUnique as jest.Mock).mockResolvedValueOnce(
                null,
            );

            await expect(subjectDbService.getById(1)).rejects.toThrow(
                NotFoundError,
            );
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.subject.findUnique as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(subjectDbService.getById(1)).rejects.toThrow(
                mockError,
            );
        });
    });

    describe('update', () => {
        it('should update a subject by ID', async () => {
            const mockSubject = {
                id: 1,
                name: 'Math',
                coefficient: 2,
            };

            (prisma.subject.findUnique as jest.Mock).mockResolvedValueOnce(
                mockSubject,
            );

            const result = await subjectDbService.update(1, 'Physics', 3);

            expect(result).toEqual({ id: 1, name: 'Physics', coefficient: 3 });
            expect(prisma.subject.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: { name: 'Physics', coefficient: 3 },
            });
        });

        it('should throw NotFoundError if subject is not found', async () => {
            (prisma.subject.findUnique as jest.Mock).mockResolvedValueOnce(
                null,
            );

            await expect(
                subjectDbService.update(1, 'Physics', 3),
            ).rejects.toThrow(NotFoundError);
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.subject.findUnique as jest.Mock).mockResolvedValueOnce({
                id: 1,
            });
            (prisma.subject.update as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(
                subjectDbService.update(1, 'Physics', 3),
            ).rejects.toThrow(mockError);
        });
    });

    describe('delete', () => {
        it('should delete a subject by ID', async () => {
            (prisma.subject.findUnique as jest.Mock).mockResolvedValueOnce({
                id: 1,
            });

            await subjectDbService.delete(1);

            expect(prisma.subject.delete).toHaveBeenCalledWith({
                where: { id: 1 },
            });
        });

        it('should throw NotFoundError if subject is not found', async () => {
            (prisma.subject.findUnique as jest.Mock).mockResolvedValueOnce(
                null,
            );

            await expect(subjectDbService.delete(1)).rejects.toThrow(
                NotFoundError,
            );
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.subject.findUnique as jest.Mock).mockResolvedValueOnce({
                id: 1,
            });
            (prisma.subject.delete as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(subjectDbService.delete(1)).rejects.toThrow(mockError);
        });
    });
});
