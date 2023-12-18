import { ExpressDb } from "../infrastructure/express-db";
import { UserDataService } from "./subject.data-service";


jest.mock("../infrastructure/express-db");

describe('UserDataService', ()=>{
    let sut: UserDataService;
    let logSpy: jest.SpyInstance;
    
    beforeEach(() => {
        sut = new UserDataService();
        jest.resetAllMocks();
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('add', () => {
        it('should verified that execute method is call', async () => {
            sut.add('Admin', 'admin@myschool.net', '1235');
            await expect(ExpressDb.execute).toHaveBeenCalled;
        });
        
        it('should have a valid email', async () => {
            const user = await sut.add('Teacher1', 'user@myschool.net', '1235');
          
            expect(user).toBeDefined();
          
            // Utilisez une expression régulière pour valider la structure de l'email.
            const emailRegex = /^[A-Za-z0-9._%-]+@myschool\.net$/;
            expect(emailRegex.test(user.email)).toBe(true);
        });

        it('should return a user', async () => {
            const user = await sut.add('user', 'user@myschool.net', 'lde@g_');
          
            expect(user).toBeDefined();
            expect(user.name).toBe('user');
            expect(user.email).toBe('user@myschool.net');
        });
    });

    describe('updatePassword', () => {
        it('should verified that execute method is call', async () => {
            sut.updatePassword('admin@myschool.net', '1235');
            await expect(ExpressDb.execute).toHaveBeenCalled;
        });

        it('should return updateUser or null', async () => {
            const email = 'admin@myschool.net';
            const newPassword = 'newPassword123';
        
            jest.spyOn(ExpressDb, 'execute').mockResolvedValueOnce({ affectedRows: 1 });
        
            const result = await sut.updatePassword(email, newPassword);
        
            if (result !== null) {
                expect(result.name).toBe('');
                expect(result.email).toBe(email);
                expect(result.password).toBe(newPassword);
            } else {
                expect(result).toBe(null);
            }
        });
        
    });

    describe('getAllEmail', () => {
        it('should verified that execute method is call', async () => {
            sut.getAllEmail();
            await expect(ExpressDb.execute).toHaveBeenCalled;
        });  

        it('should return an array of strings or null', async () => {
            jest.spyOn(sut, 'getAllEmail').mockResolvedValueOnce(['example1@myschool.net', 'example2@myschool.net']);
        
            const result = await sut.getAllEmail();
        
            if (result !== null) {
                expect(Array.isArray(result)).toBe(true);
                result.forEach(email => {
                    expect(typeof email).toBe('string');
                });
            } else {
                expect(result).toBe(null);
            }
        });
    });

    describe('delete', () => {
        it('should verified that execute method is call', async () => {
            sut.delete('admin@myschool.net');
            await expect(ExpressDb.execute).toHaveBeenCalled;
        });

        it('should verify that user is deleted', async () => {
            jest.spyOn(sut, 'delete').mockResolvedValueOnce('User deleted successfully');
            const result = await sut.delete('admin@myschool.net');
            expect(result).toBe('User deleted successfully');
        });
        
    });
});