import { prisma } from '../db/init';
import { NotFoundError } from '../exceptions/not-found-error';
import { UserDbService } from './user.db-service';

jest.mock('../db/init', () => ({
    prisma: {
        user: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            delete: jest.fn(),
        },
        $disconnect: jest.fn(),
    },
}));

describe('UserDbService', () => {
    let userDbService: UserDbService;

    beforeEach(() => {
        jest.resetAllMocks();
        userDbService = new UserDbService();
    });

    afterEach(async () => {
        jest.clearAllMocks();
    });

    describe('getAll', () => {
        it('should return an array of users', async () => {
            const mockUsers = [
                {
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com',
                    role: 'user',
                },
            ];

            (prisma.user.findMany as jest.Mock).mockResolvedValueOnce(
                mockUsers,
            );

            const result = await userDbService.getAll();

            expect(result).toEqual(
                mockUsers.map(({ id, name, email, role }) => ({
                    id,
                    name,
                    email,
                    role,
                })),
            );
            expect(prisma.user.findMany).toHaveBeenCalledWith({
                include: { role: true },
            });
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.user.findMany as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(userDbService.getAll()).rejects.toThrow(mockError);
        });
    });

    describe('getById', () => {
        it('should return a user by ID', async () => {
            const mockUser = {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                role: 'user',
            };

            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(
                mockUser,
            );

            const result = await userDbService.getById(1);

            expect(result).toEqual({
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                role: 'user',
            });
            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
                include: { role: true },
            });
        });

        it('should throw NotFoundError if user is not found', async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

            await expect(userDbService.getById(1)).rejects.toThrow(
                NotFoundError,
            );
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.user.findUnique as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(userDbService.getById(1)).rejects.toThrow(mockError);
        });
    });

    describe('delete', () => {
        it('should delete a user by ID', async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
                id: 1,
            });

            await userDbService.delete(1);

            expect(prisma.user.delete).toHaveBeenCalledWith({
                where: { id: 1 },
            });
        });

        it('should throw NotFoundError if user is not found', async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

            await expect(userDbService.delete(1)).rejects.toThrow(
                NotFoundError,
            );
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
                id: 1,
            });
            (prisma.user.delete as jest.Mock).mockRejectedValueOnce(mockError);

            await expect(userDbService.delete(1)).rejects.toThrow(mockError);
        });
    });
});
