import { AdminDbService } from './admin.db-service';
import { prisma } from '../db/init';
import { BadInputError } from '../exceptions/bad-input-error';
import { NotFoundError } from '../exceptions/not-found-error';
import bcrypt from 'bcrypt';
import { Admin } from './admin';

jest.mock('../db/init', () => ({
    prisma: {
        role: {
            findFirst: jest.fn(),
        },
        user: {
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

describe('AdminDbService', () => {
    let adminDbService: AdminDbService;

    beforeEach(() => {
        jest.resetAllMocks();
        adminDbService = new AdminDbService();
    });

    afterEach(async () => {
        jest.clearAllMocks();
    });

    describe('add', () => {
        it('should add a new admin', async () => {
            const mockRole = {
                id: 1,
                name: 'admin',
            };

            const mockUser = {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'hashedPassword',
                roleId: 1,
                role: {
                    id: 1,
                    name: 'admin',
                },
            };

            (prisma.role.findFirst as jest.Mock).mockResolvedValueOnce(
                mockRole,
            );
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
            (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashedPassword');
            (prisma.user.create as jest.Mock).mockResolvedValueOnce({
                ...mockUser,
            });

            const result = await adminDbService.add(
                'John Doe',
                'john.doe@example.com',
                'password',
            );

            expect(result).toEqual({
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                role: { id: 1, name: 'admin' },
            });
        });

        it('should throw BadInputError if email is already taken', async () => {
            const existingUser = {
                id: 1,
            };

            (prisma.role.findFirst as jest.Mock).mockResolvedValueOnce({
                id: 1,
                name: 'admin',
            });
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(
                existingUser,
            );

            await expect(
                adminDbService.add(
                    'John Doe',
                    'john.doe@example.com',
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
                adminDbService.add(
                    'John Doe',
                    'john.doe@example.com',
                    'password',
                ),
            ).rejects.toThrow(mockError);
        });
    });

    describe('getAll', () => {
        it('should return an array of admins', async () => {
            const mockAdmins = [
                {
                    id: 1,
                    email: 'john.doe@example.com',
                    name: 'John Doe',
                    roleId: 1,
                    role: { id: 1, name: 'admin' },
                },
            ];

            (prisma.role.findFirst as jest.Mock).mockResolvedValueOnce({
                id: 1,
                name: 'admin',
            });
            (prisma.user.findMany as jest.Mock).mockResolvedValueOnce(
                mockAdmins,
            );

            const result = await adminDbService.getAll();

            expect(result).toEqual([
                {
                    id: 1,
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    role: { id: 1, name: 'admin' },
                },
            ]);
            expect(prisma.user.findMany).toHaveBeenCalled();
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.role.findFirst as jest.Mock).mockResolvedValueOnce({
                id: 1,
                name: 'admin',
            });
            (prisma.user.findMany as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(adminDbService.getAll()).rejects.toThrow(mockError);
        });
    });

    describe('getById', () => {
        it('should return an admin by ID', async () => {
            const mockRole = {
                id: 1,
                name: 'admin',
            };

            const mockAdmin = {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                roleId: 1,
                role: { id: 1, name: 'admin' },
            };

            (prisma.role.findFirst as jest.Mock).mockResolvedValueOnce(
                mockRole,
            );
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(
                mockAdmin,
            );

            const result = await adminDbService.getById(1);

            expect(result).toEqual({
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                role: { id: 1, name: 'admin' },
            });
            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { id: 1, roleId: 1 },
                include: {
                    role: true,
                },
            });
        });

        it('should throw NotFoundError if admin is not found', async () => {
            (prisma.role.findFirst as jest.Mock).mockResolvedValueOnce({
                id: 1,
                name: 'admin',
            });
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

            await expect(adminDbService.getById(1)).rejects.toThrow(
                NotFoundError,
            );
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.role.findFirst as jest.Mock).mockResolvedValueOnce({
                id: 1,
                name: 'admin',
            });
            (prisma.user.findUnique as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(adminDbService.getById(1)).rejects.toThrow(mockError);
        });
    });
});
