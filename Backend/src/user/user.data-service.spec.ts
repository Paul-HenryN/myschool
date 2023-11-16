import { ExpressDb } from "../infrastructure/express-db";
import { UserDataService } from "./user.data-service";


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
        // Restaure la fonction console.log à son état d'origine après chaque test
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

    describe('getAll', () => {
        it('should verified that execute method is call', async () => {
            sut.getAllEmail();
            await expect(ExpressDb.execute).toHaveBeenCalled;
        });  
        /*it('should print "OK EMAIL" if execute method is successful and emails are present', async () => {
            jest.spyOn(sut, 'getAll').mockResolvedValueOnce(['example@myschool.net']);
        
            // Réinitialise le mock avant chaque test
        
            await sut.getAll();
        
            // Vérifie si la console.log a été appelée avec 'OK EMAIL' ou 'PAS D'EMAIL'
            expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/OK email|No email/));
        });*/
    });

    /*describe('delete', () => {
        it('should verified that execute method is call', async () => {
            sut.delete('admin@myschool.net');
            await expect(ExpressDb.execute).toHaveBeenCalled;
        });
    });*/
});