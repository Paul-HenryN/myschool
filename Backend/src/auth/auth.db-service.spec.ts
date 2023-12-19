import { AuthDbService } from './auth.db-service';
import { prisma } from '../db/init';
import { BadInputError } from '../exceptions/bad-input-error';
import { User } from '../user/user';
import bcrypt from 'bcrypt';

jest.mock('../db/init', () => ({
    prisma: {
        user: {
            findUnique: jest.fn(),
        },
        $disconnect: jest.fn(),
    },
}));

jest.mock('bcrypt', () => ({
    compare: jest.fn(),
}));

describe('AuthDbService', () => {
    let authDbService: AuthDbService;

    beforeEach(() => {
        jest.resetAllMocks();
        authDbService = new AuthDbService();
    });

    afterEach(async () => {
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should login with valid credentials', async () => {
            const mockUser = {
                id: 1,
                email: 'john.doe@example.com',
                name: 'John Doe',
                password: 'hashedPassword',
                roleId: 1,
                role: { id: 1, name: 'user' },
            };

            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(
                mockUser,
            );
            (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

            const result = await authDbService.login(
                'john.doe@example.com',
                'password',
            );

            expect(result).toEqual({
                id: 1,
                email: 'john.doe@example.com',
                name: 'John Doe',
                role: { id: 1, name: 'user' },
            });
        });

        it('should throw BadInputError with invalid email', async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

            await expect(
                authDbService.login('john.doe@example.com', 'password'),
            ).rejects.toThrow(BadInputError);
        });

        it('should throw BadInputError with invalid password', async () => {
            const mockUser = {
                id: 1,
                email: 'john.doe@example.com',
                name: 'John Doe',
                password: 'hashedPassword',
                roleId: 1,
                role: { id: 1, name: 'user' },
            };

            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(
                mockUser,
            );
            (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

            await expect(
                authDbService.login('john.doe@example.com', 'password'),
            ).rejects.toThrow(BadInputError);
        });

        it('should throw an error if an error occurs', async () => {
            const mockError = new Error('Test error');
            (prisma.user.findUnique as jest.Mock).mockRejectedValueOnce(
                mockError,
            );

            await expect(
                authDbService.login('john.doe@example.com', 'password'),
            ).rejects.toThrow(mockError);
        });
    });
});
