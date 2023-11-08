import { ExpressDb } from "../infrastructure/express-db";
import { UserDataService } from "./user.data-service";

jest.mock("../infrastructure/express-db");

describe('UserDataService', ()=>{
    let sut: UserDataService;
    
    beforeEach(() => {
        sut = new UserDataService();
        jest.resetAllMocks();
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

    /*describe('getAll', () => {
        it('should return a table of string or null', async () => {
            const result = await sut.getAll();

            // Vérification des résultats
            if (result === null) {
              expect(result).toBeNull(); // Vérifie si le résultat est nul
            } else {
              expect(Array.isArray(result)).toBe(true); // Vérifie si le résultat est un tableau
              // Vérifie si chaque élément du tableau est une chaîne de caractères
              result.forEach(item => {
                expect(typeof item).toBe('string');
              });
            }        
        });
    });*/

    describe('delete', () => {
        it('should delete the email', async () => {
            const result = await sut.delete('Teacher1');        
            expect(result).toBe('User deleted successfully');
        });
    });
});