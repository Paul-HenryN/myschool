import { ExpressDb } from "../infrastructure/express-db";
import { UserDataService } from "./user.data-service";

jest.mock("./user.data-service");

describe('UserDataService', ()=>{
    let sut: UserDataService;
    
    beforeEach(() => {
        sut = new UserDataService();
        jest.resetAllMocks();
    });

    describe('add', () => {
        it('should verified that execute method is call', () => {
            // Créez un mock pour la méthode execute
        })
    })
});